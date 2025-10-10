import { useState } from 'react';
import { registerUser } from '../api/auth';

export default function Register() {
  const [ name, setName ] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await registerUser({name, email, password});
      localStorage.setItem("token", data.token) // store JWT
      setMessage("Registration succesful");
    } catch (error) {
      setMessage(error.message || "Registration failed")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
            className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded transition"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-yellow-400">{message}</p>
        )}
      </div>
    </div>
  )
}