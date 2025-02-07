import { jwtDecode } from "jwt-decode";

async function fetchWithToken(url, options = {}) {
  const accessToken = localStorage.getItem("authToken");

  if (!accessToken) {
    window.location.href = "/users/sign_in";
    return;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    console.log("Access token has expired. Logging out...");

    localStorage.removeItem('authToken');
    window.location.href = "/admin";
    return;
  }

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: headers,
    });

    if (response.status === 401) {
      console.log("Token expired or invalid. Logging out...");
      localStorage.removeItem('authToken');
      logoutUser();
      window.location.href = "/admin";
      return;
    }

    return response;
  } catch (error) {
    console.error("Error during API request:", error);
    throw error;
  }
}

async function logoutUser() {
  try {
    const response = await fetch("/api/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.clear();
      window.location.href = "/users/sign_in";
      toast.success("Session expired. Please sign in or sign up again.");
    } else {
      console.error("Error during logout:", data.message);
    }
  } catch (error) {
    console.error("Error during logout request:", error);
  }
}


export { fetchWithToken };
