import React, { useState } from "react";

const TokenForm = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("General");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Token requested for ${name} in ${department} department`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🏥 Request a Token
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              👤 Patient Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter patient name"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              🏨 Department
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="General">General</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            🎟️ Request Token
          </button>
        </form>
      </div>
    </div>
  );
};

export default TokenForm;