import type { Route } from "./+types/home";
import "./../app.css"; // นำเข้าไฟล์ CSS

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Login | QR Menu" },
		{ name: "description", content: "Login to QR Menu" },
	];
}

export default function Login() {
	return (
		<div className="login-container">
			<h2 className="login-title">เข้าสู่ระบบ</h2>
			<form className="login-form">
			<div className="form-group">
				<label htmlFor="username">ชื่อผู้ใช้</label>
				<input type="text" id="username" name="username" className="input" />
			</div>
			<div className="form-group">
				<label htmlFor="password">รหัสผ่าน</label>
				<input type="password" id="password" name="password" className="input" />
			</div>
			<button type="submit" className="login-btn">เข้าสู่ระบบ</button>
			</form>
		</div>
	);
}
