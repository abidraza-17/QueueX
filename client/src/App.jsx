import React from "react";
import TokenRequest from "./components/TokenRequest";
import TokenList from "./components/TokenList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        QueueX – Token & Queue Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TokenRequest />
        <TokenList />
      </div>
    </div>
  );
}

export default App;
