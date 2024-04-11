const { ZodSchema, string, number, object, boolean, optional } = require("zod");

const profileSchema = new ZodSchema({
	firstName: optional(
		string().trim().min(2, "First name must be at least 2 characters")
	),
	lastName: optional(
		string().trim().min(2, "Last name must be at least 2 characters")
	),
	dateOfBirth: optional(string().isoDate("Invalid date of birth format")),
	height: optional(number().positive("Height must be a positive number")),
	weight: optional(number().positive("Weight must be a positive number")),
	sex: optional(string().enum(["Male", "Female"])),
	activityLevel: optional(
		string().enum([
			"Sedentary",
			"Lightly Active",
			"Moderately Active",
			"Very Active",
			"Extremely Active",
		])
	),
	dietaryRestrictions: optional(string()),
}).optional();

module.exports = profileSchema;
