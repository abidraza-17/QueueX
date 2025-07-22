import React from "react";
import TokenForm from "./components/TokenForm";
import TokenList from "./components/TokenList";
import TokenRequest from "./components/TokenRequest"; // path sahi rakhna



function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"> 
        <TokenForm />
        <TokenList />
        <TokenRequest />

      </div>
    </div>
  );
}

export default App;
