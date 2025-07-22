import React from "react";

const dummyTokens = [
  { id: 1, name: "Mohammad Abid", department: "General", status: "Waiting" },
  { id: 2, name: "Rahul Mehta", department: "Cardiology", status: "In Progress" },
  { id: 3, name: "Aisha Khan", department: "Pediatrics", status: "Done" },
];

const TokenList = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
        Current Tokens
      </h2>
      <div className="space-y-4">
        {dummyTokens.map((token) => (
          <div
            key={token.id}
            className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <div>
              <p className="text-lg font-medium">{token.name}</p>
              <p className="text-sm text-gray-500">{token.department}</p>
            </div>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                token.status === "Waiting"
                  ? "bg-yellow-100 text-yellow-800"
                  : token.status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {token.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenList;
