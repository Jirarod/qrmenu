import { Link, Outlet } from "react-router";

export default function MerchantLayout() {
	return (
		<main className="p-4 container mx-auto">
			<header className="mb-4">
				<h1 className="text-2xl font-bold">Merchant Management</h1>
				<nav className="mt-2 space-x-4">
					<Link to="/merchant">Home</Link>
					<Link to="/merchant/qr-create">Create QR</Link>
					<Link to="/merchant/menu-management">Menu Management</Link>
				</nav>
			</header>

			<section>
				<Outlet />
			</section>
		</main>
	);
}
