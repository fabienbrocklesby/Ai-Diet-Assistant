import React, { useState } from "react";

const LoginPage = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					username,
					password,
				}),
				credentials: "include",
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}

			setErrorMessage("");
			setLoggedIn(true);
		} catch (error) {
			setErrorMessage(error);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md">
				<h2 className="text-2xl font-bold mb-4">Login</h2>
				{errorMessage && (
					<p className="text-red-500 mb-4">{errorMessage.message}</p>
				)}
				{loggedIn ? (
					<p className="text-green-500 mb-4">You have successfully logged in</p>
				) : (
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 font-bold mb-2"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
								value={email}
								onChange={handleEmailChange}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="username"
								className="block text-gray-700 font-bold mb-2"
							>
								Username
							</label>
							<input
								type="text"
								id="username"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
								value={username}
								onChange={handleUsernameChange}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-gray-700 font-bold mb-2"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
								value={password}
								onChange={handlePasswordChange}
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
						>
							Login
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default LoginPage;
