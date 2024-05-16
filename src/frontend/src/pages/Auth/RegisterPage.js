import React, { useState } from "react";

const RegisterPage = () => {
	const [isRegistered, setIsRegistered] = useState(false);

	const name = `user${Math.floor(Math.random() * 10000)}`;
	const [username, setUsername] = useState(name);
	const [email, setEmail] = useState(`${name}@fabienbrocklesby.com`);

	const [password, setPassword] = useState("12345678");
	const [confirmPassword, setConfirmPassword] = useState("12345678");
	const [errorMessage, setErrorMessage] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setErrorMessage("Passwords do not match");
			return;
		}
		try {
			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					email,
					password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}

			setIsRegistered(true);
		} catch (error) {
			setErrorMessage(error);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md">
				<h2 className="text-2xl font-bold mb-4">Register</h2>
				{errorMessage && <p className="text-red-500">{errorMessage.message}</p>}
				{isRegistered ? (
					<div>
						<p className="text-green-500">You have successfully registered</p>
						<p>Please check your email to verify your account</p>
						Click{" "}
						<a
							href="/login"
							className="text-blue-500 hover:text-blue-700 underline"
						>
							here
						</a>{" "}
						to login
					</div>
				) : (
					<form onSubmit={handleRegister}>
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
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
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
								onChange={(e) => setEmail(e.target.value)}
								required
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
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="confirmPassword"
								className="block text-gray-700 font-bold mb-2"
							>
								Confirm Password
							</label>
							<input
								type="password"
								id="confirmPassword"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
						>
							Register
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default RegisterPage;
