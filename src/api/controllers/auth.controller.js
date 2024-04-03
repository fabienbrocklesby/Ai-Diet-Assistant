import Service from "../Services/auth.Service.js";

class AuthController {
	async register(request, response) {
		const result = await Service.register();
		response.send(result);
	}

	async login(request, response) {
		const result = await Service.login();
		response.send(result);
	}
}

export default new AuthController();
