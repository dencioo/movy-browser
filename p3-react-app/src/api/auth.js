import MOVYAPI_BASEURL from './apiConfig';

export async function registerUser(userData) {
  const res = await fetch(`${MOVYAPI_BASEURL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }
  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${MOVYAPI_BASEURL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }
  return res.json();
}
