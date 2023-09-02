import axios from "../../axios";

// login user
const login = async (userData) => {
  const response = await axios.post("/users/login", userData);

  if (response.data) {
    // This will make our data persist even when we refresh
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  logout,
  login,
};

export default authService;
