import React from 'react';
import '../css/management-style.css';

const menuItems = [
{
	title: 'ออก QR โต๊ะ',
	description: 'สร้าง QR สำหรับแต่ละโต๊ะในร้าน',
	icon: '📲',
	action: () => { /* TODO: add navigation or logic */ },
},
{
	title: 'ดูรายการสินค้า',
	description: 'จัดการและแก้ไขเมนูอาหาร',
	icon: '🍽️',
	action: () => { /* TODO: add navigation or logic */ },
},
{
	title: 'ดูรายการคำสั่งซื้อ',
	description: 'ตรวจสอบสถานะและรายละเอียดคำสั่งซื้อ',
	icon: '🧾',
	action: () => { /* TODO: add navigation or logic */ },
},
];

const MenuMerchant: React.FC = () => {
return (
	<div className="login-bg">
	<div className="login-card" style={{ maxWidth: 600 }}>
		<h2 className="login-title">แดชบอร์ดร้านอาหาร</h2>
		<div
		style={{
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			gap: '1.5rem',
			marginTop: '1.5rem',
		}}
		>
		{menuItems.map((item, idx) => (
			<div
			key={idx}
			style={{
				background: 'var(--color-accent)',
				borderRadius: '12px',
				boxShadow: '0 2px 8px rgba(244, 172, 183, 0.10)',
				padding: '1.2rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				cursor: 'pointer',
				transition: 'background 0.2s',
			}}
			onClick={item.action}
			>
			<span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.icon}</span>
			<span style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '1.15rem' }}>
				{item.title}
			</span>
			<span style={{ color: 'var(--color-text)', fontSize: '0.95rem', marginTop: '0.4rem', textAlign: 'center' }}>
				{item.description}
			</span>
			</div>
		))}
		</div>
	</div>
	</div>
);
};

export default MenuMerchant;