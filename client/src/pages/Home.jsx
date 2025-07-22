import Header from "../components/Header";
import TokenRequest from "../components/TokenRequest";
import TokenList from "../components/TokenList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="space-y-8">
          <TokenRequest />
          <TokenList />
        </div>
      </div>
    </div>
  );
};

export default Home;
