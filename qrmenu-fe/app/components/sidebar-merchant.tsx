import { useState } from "react";
import { NavLink } from "react-router";

export default function SidebarMerchant({open,onClose,}: {open: boolean; onClose: () => void;}) {
	return (
		<>
		{/* Sidebar for md+ is static, for small screens it's an overlay drawer */}
		<aside
			className={`merchant-sidebar fixed top-0 left-0 h-full transform shadow-lg transition-transform duration-200 z-40 ${open ? 'translate-x-0 md:translate-x-0' : '-translate-x-full md:-translate-x-full'}`}
			aria-hidden={!open}
		>
			<div className="p-6 head-sidebar-name">
				<div className="text-lg font-bold">Merchant</div>
			</div>
			<hr className="hr-side-name" />
			<nav className="p-4 space-y-1">
				<NavLink to="/merchant" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
					Dashboard
				</NavLink>

                {/* QR menu group */}
                <QrMenuGroup onClose={onClose} />

				<NavLink to="/merchant/menu-management" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
					Menu Management
				</NavLink>

				<NavLink to="/merchant/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
					Settings
				</NavLink>
			</nav>
		</aside>

		{/* overlay for small screens when open */}
		{open && (
			<div className="merchant-sidebar-overlay fixed inset-0 bg-black/40 z-30 md:hidden" onClick={onClose} aria-hidden />
		)}
		</>
	);
}

function QrMenuGroup({ onClose }: { onClose: () => void }) {
	const [open, setOpen] = useState(true);
	return (
		<div>
			<button
				type="button"
				className="w-full text-left nav-item flex items-center justify-between"
				onClick={() => setOpen((v) => !v)}
			>
				<span>QR Menu</span>
				<span className="ml-2">{open ? '▾' : '▸'}</span>
			</button>

			{open && (
				<div className="pl-3 mt-1 space-y-1">
					<NavLink to="/merchant/qr-create" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
						Create QR
					</NavLink>
					<NavLink to="/merchant/qr-list" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
						QR List
					</NavLink>
				</div>
			)}
		</div>
	);
}
