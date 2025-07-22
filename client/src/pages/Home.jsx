// src/pages/Home.jsx
import Header from "../components/Header";
import TokenForm from "../components/TokenForm";
import QueueDisplay from "../components/QueueDisplay";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      {/* Centered Content */}
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="space-y-8">
          <TokenForm />
          <QueueDisplay />
        </div>
      </div>
    </div>
  );
};

export default Home;
