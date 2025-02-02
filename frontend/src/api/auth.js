import { jwtDecode } from "jwt-decode";

export const handleGoogleLogin = (response, setUser) => {
  const userData = jwtDecode(response.credential);
  setUser({
    name: userData.name,
    email: userData.email,
    picture: userData.picture,
  });
  localStorage.setItem("user", JSON.stringify(userData));
};
