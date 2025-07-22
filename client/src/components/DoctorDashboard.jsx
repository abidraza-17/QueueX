import React from "react";

const DoctorDashboard = () => {
  const handleNext = () => {
    alert("Fetching next patient from queue... (Backend logic needed)");
  };

  const handleComplete = () => {
    alert("Marking current consultation as complete... (Backend logic needed)");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">Doctor Dashboard</h2>
      <div className="space-y-4">
        <button
          onClick={handleNext}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Next Patient
        </button>
        <button
          onClick={handleComplete}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Complete Consultation
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
