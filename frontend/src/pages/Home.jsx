import LoginButton from "../components/LoginButton";

const Home = ({ setUser }) => {
  return (
    <div>
      <h1>Invoice Automation</h1>
      <LoginButton setUser={setUser} />
    </div>
  );
};

export default Home;
