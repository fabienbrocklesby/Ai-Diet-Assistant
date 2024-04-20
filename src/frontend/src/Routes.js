import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import VerifyEmail from "./pages/Auth/VerifyEmail";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Home />} />

		<Route path="/login" element={<LoginPage />} />
		<Route path="/register" element={<RegisterPage />} />
		<Route path="/verify-email" element={<VerifyEmail />} />
	</Routes>
);

export default AppRoutes;
