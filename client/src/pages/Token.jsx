import React from "react";

const TokenPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Token Management</h1>

      {/* Main Row Layout */}
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {/* Patient Details */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Patient Details</h2>
          {/* Add your patient form or data here */}
          <p>Name: John Doe</p>
          <p>Age: 28</p>
          <p>Problem: Fever</p>
        </div>

        {/* Current Token */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Current Token</h2>
          <p className="text-6xl text-green-500 text-center">12</p>
        </div>

        {/* Request Token */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Request Token</h2>
          {/* Token request form */}
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Enter Name" className="border p-2 rounded" />
            <input type="number" placeholder="Age" className="border p-2 rounded" />
            <textarea placeholder="Problem" className="border p-2 rounded" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Request Token
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TokenPage;
