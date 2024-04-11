import { totp } from "otplib";

export const generateOTP = () => {
	const otp = totp.generate(process.env.OTP_SECRET);

	return { otp };
};

export const verifyOTP = (otp) => {
	console.log(otp);
	const isValid = totp.verify({
		token: otp,
		secret: process.env.OTP_SECRET,
	});

	return { isValid };
};
