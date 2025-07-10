from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson import ObjectId  # ✅ Required for ObjectId conversion
from datetime import datetime

load_dotenv()

app = Flask(__name__)

# Connect to MongoDB Atlas
client = MongoClient(os.getenv("MONGO_URI"))
db = client["queuex"]  # your database name
tokens_collection = db["tokens"]  # your collection name

@app.route("/")
def home():
    return jsonify({"message": "QueueX API is running!"})

@app.route("/create-token", methods=["POST"])
def create_token():
    data = request.get_json()
    name = data.get("name")
    dept = data.get("department")

    # Insert into MongoDB
    token = {
        "name": name,
        "department": dept
    }
    result = tokens_collection.insert_one(token)

    # Convert ObjectId to string before returning
    return jsonify({
        "message": "Token created successfully",
        "token_id": str(result.inserted_id)  # ✅ convert ObjectId to string
    }), 201

@app.route('/next-token', methods=['GET'])
def next_token():
    department = request.args.get('department')

    if not department:
        return jsonify({"message": "Department is required"}), 400

    # Find next token where status is "waiting"
    token = tokens_collection.find_one(
        {"department": department, "status": "waiting"},
        sort=[("created_at", 1)]
    )

    if token:
        token['_id'] = str(token['_id'])  # convert ObjectId to string
        return jsonify(token), 200
    else:
        return jsonify({"message": f"No unserved tokens in {department} department."}), 404


@app.route('/serve-token', methods=['POST'])
def serve_token():
    data = request.json
    token_id = data.get('token_id')

    if not token_id:
        return jsonify({"message": "token_id is required"}), 400

    try:
        result = tokens_collection.update_one(
            {"_id": ObjectId(token_id), "status": "waiting"},
            {"$set": {"status": "served"}}
        )

        if result.matched_count == 0:
            return jsonify({"message": "Token not found or already served"}), 404

        return jsonify({"message": "Token served successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@app.route('/debug-tokens')
def debug_tokens():
    department = request.args.get('department', 'cardio')
    tokens = list(tokens_collection.find({"department": department}))
    for t in tokens:
        t['_id'] = str(t['_id'])  # Convert ObjectId to string
    return jsonify(tokens)

@app.route('/cleanup-invalid-tokens', methods=['DELETE'])
def cleanup_invalid_tokens():
    result = tokens_collection.delete_many({
        "$or": [
            {"status": {"$exists": False}},
            {"token_no": {"$exists": False}}
        ]
    })
    return jsonify({
        "message": f"Deleted {result.deleted_count} invalid tokens"
    }), 200

@app.route('/view-tokens', methods=['GET'])
def view_tokens():
    dept = request.args.get('department')

    if not dept:
        return jsonify({'message': 'Missing department'}), 400

    try:
        tokens = list(tokens_collection.find({'department': dept}))

        grouped = {
            'waiting': [],
            'served': [],
            'unknown': []
        }

        for token in tokens:
            token['_id'] = str(token['_id'])

            if token.get('status') == 'waiting':
                grouped['waiting'].append(token)
            elif token.get('status') == 'served' or token.get('served') is True:
                grouped['served'].append(token)
            else:
                grouped['unknown'].append(token)

        return jsonify(grouped)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

from datetime import datetime

@app.route('/doctor-dashboard', methods=['GET'])
def doctor_dashboard():
    department = request.args.get('department')

    if not department:
        return jsonify({'message': 'Missing department parameter'}), 400

    try:
        # 1. Currently serving
        serving_now = tokens_collection.find_one(
            {'department': department, 'status': 'served'},
            sort=[('created_at', 1)]
        )

        # 2. Waiting list
        waiting_list_cursor = tokens_collection.find(
            {'department': department, 'status': 'waiting'}
        ).sort('created_at', 1)

        waiting_list = []
        for token in waiting_list_cursor:
            time_str = datetime.fromisoformat(token['created_at']).strftime('%H:%M')
            waiting_list.append({
                'token_no': token['token_no'],
                'name': token['name'],
                'time': time_str
            })

        # 3. Recently completed
        completed_cursor = tokens_collection.find(
            {'department': department, 'status': 'completed'}
        ).sort('created_at', -1).limit(5)

        recently_completed = []
        for token in completed_cursor:
            time_str = datetime.fromisoformat(token['created_at']).strftime('%H:%M')
            recently_completed.append({
                'token_no': token['token_no'],
                'name': token['name'],
                'time': time_str
            })

        return jsonify({
            'serving_now': {
                'token_no': serving_now['token_no'],
                'name': serving_now['name'],
                'time': datetime.fromisoformat(serving_now['created_at']).strftime('%H:%M')
            } if serving_now else None,
            'waiting_list': waiting_list,
            'recently_completed': recently_completed
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    
@app.route('/complete-token', methods=['POST'])
def complete_token():
    data = request.get_json()
    token_id = data.get('token_id')
    notes = data.get('notes', {})

    if not token_id:
        return jsonify({'message': 'Missing token_id'}), 400

    try:
        result = tokens_collection.update_one(
            {'_id': ObjectId(token_id)},
            {
                '$set': {
                    'status': 'completed',
                    'notes': notes
                }
            }
        )

        if result.modified_count == 1:
            return jsonify({'message': 'Token marked as completed with notes'})
        else:
            return jsonify({'message': 'Token not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/patient-records', methods=['GET'])
def get_patient_records():
    try:
        completed_tokens = list(tokens_collection.find(
            {'status': 'completed'},
            {'_id': 0, 'name': 1, 'department': 1, 'token_no': 1, 'notes': 1, 'created_at': 1}
        ).sort('created_at', -1))  # Latest first

        return jsonify({'records': completed_tokens}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/patient-record/<token_no>', methods=['GET'])
def get_single_patient_record(token_no):
    try:
        record = tokens_collection.find_one({'token_no': token_no})
        if not record:
            return jsonify({'message': 'Record not found'}), 404

        # Convert ObjectId to string
        record['_id'] = str(record['_id'])

        return jsonify({'record': record})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/token/<token_no>', methods=['GET'])
def get_token_status(token_no):
    token = tokens_collection.find_one({'token_no': token_no})

    if not token:
        return jsonify({'message': 'Token not found'}), 404

    return jsonify({
        'token_no': token['token_no'],
        'name': token['name'],
        'department': token['department'],
        'status': token.get('status', 'unknown'),
        'created_at': token.get('created_at'),
        'notes': token.get('notes', None)
    })


if __name__ == "__main__":
    app.run(debug=True)