import React, { useState } from "react";

const TokenRequest = () => {
  const [patientName, setPatientName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("General");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientName || !selectedDepartment) return;

    try {
      const res = await fetch("http://localhost:5000/request-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: patientName,
          department: selectedDepartment,
        }),
      });

      const data = await res.json();
      console.log("New token issued:", data);
      setPatientName("");
      setSelectedDepartment("General");
    } catch (err) {
      console.error("Error submitting token request:", err);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Request a Token
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            className="mt-1 p-2 w-full border rounded-md"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Dental">Dental</option>
            <option value="Cardiology">Cardiology</option>
            <option value="ENT">ENT</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Request Token
        </button>
      </form>
    </div>
  );
};

export default TokenRequest;
