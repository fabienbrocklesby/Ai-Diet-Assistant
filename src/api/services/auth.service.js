import Model from "../models/auth.model.js";

export default {
	async register(userData) {
		console.log(userData);
		const result = await Model.register(userData);
		return result;
	},

	async login() {
		const result = await Model.login();
		return result;
	},
};
