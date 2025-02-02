import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "../api/auth";

const LoginButton = ({ setUser }) => {
  return (
    <GoogleLogin
      onSuccess={(response) => handleGoogleLogin(response, setUser)}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default LoginButton;
