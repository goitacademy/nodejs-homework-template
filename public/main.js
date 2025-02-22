const API_URL = "http://localhost:5000"; // Replace with your backend URL

// Select the necessary DOM elements
const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");
const statusElement = document.getElementById("status");
const logoutButton = document.getElementById("logout");
const getUsersButton = document.getElementById("users");
const generateJWTButton = document.getElementById("jwts");

let currentToken = null;

// Function to set the status
function setStatus(message) {
  statusElement.textContent = message;
}

// Function to handle registration
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await axios.post(`${API_URL}/users/signup`, data);
    alert("Registration successful!");
  } catch (error) {
    alert("Registration failed: " + error.response.data.message);
  }
});

// Function to handle login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await axios.post(`${API_URL}/users/login`, data);
    currentToken = response.data.token;
    setStatus("Logged in successfully");
    localStorage.setItem("jwt", currentToken); // Store token in local storage
  } catch (error) {
    alert("Login failed: " + error.response.data.message);
  }
});

// Function to handle logout
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("jwt"); // Remove token from local storage
  currentToken = null;
  setStatus("Please login");
});

// Function to fetch users (protected route)
getUsersButton.addEventListener("click", async () => {
  if (!currentToken && !localStorage.getItem("jwt")) {
    alert("Please login first");
    return;
  }

  const token = currentToken || localStorage.getItem("jwt");
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Users fetched successfully: " + JSON.stringify(response.data));
  } catch (error) {
    alert("Failed to fetch users: " + error.response.data.message);
  }
});

// Function to generate JWT (protected route)
generateJWTButton.addEventListener("click", async () => {
  if (!currentToken && !localStorage.getItem("jwt")) {
    alert("Please login first");
    return;
  }

  const token = currentToken || localStorage.getItem("jwt");
  try {
    const response = await axios.get(`${API_URL}/jwts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Generated JWT: " + JSON.stringify(response.data));
  } catch (error) {
    alert("Failed to generate JWT: " + error.response.data.message);
  }
});

// Check if the user is already logged in (check localStorage for JWT)
window.onload = () => {
  const savedToken = localStorage.getItem("jwt");
  if (savedToken) {
    currentToken = savedToken;
    setStatus("Logged in successfully");
  } else {
    setStatus("Please login");
  }
};
