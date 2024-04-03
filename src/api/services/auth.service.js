import Model from "../models/auth.model.js";

export const register = async () => {
	const result = await Model.register();
	return result;
};

export const login = async () => {
	const result = await Model.login();
	return result;
};
