import React, { useState } from "react";

const VerifyEmail = () => {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleOtpChange = (e) => {
		setOtp(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Add verification logic here
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md">
				<h1 className="text-2xl font-bold mb-4">Verify Email</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 font-bold mb-2"
						>
							Email:
						</label>
						<input
							type="email"
							id="email"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
							value={email}
							onChange={handleEmailChange}
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="otp" className="block text-gray-700 font-bold mb-2">
							OTP:
						</label>
						<input
							type="text"
							id="otp"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
							value={otp}
							onChange={handleOtpChange}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
					>
						Verify
					</button>
				</form>
			</div>
		</div>
	);
};

export default VerifyEmail;
