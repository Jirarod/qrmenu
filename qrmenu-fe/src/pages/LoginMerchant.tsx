import React, { useState } from 'react';
import '../css/management-style.css';

const LoginMerchant: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert(`อีเมล: ${email}\nรหัสผ่าน: ${password}`);
	};

	return (
		<div className="login-bg">
			<div className="login-card">
				<h3 className="login-title">เข้าสู่ระบบจัดการ order ร้านค้า</h3>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email" className="login-label">อีเมล</label>
						<input
							type="email"
							className="form-control login-input"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							placeholder="กรอกอีเมลของคุณ"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="login-label">รหัสผ่าน</label>
						<input
							type="password"
							className="form-control login-input"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							placeholder="กรอกรหัสผ่านของคุณ"
						/>
					</div>
					<button type="submit" className="login-btn">เข้าสู่ระบบ</button>
				</form>
			</div>
		</div>
	);
};

export default LoginMerchant;