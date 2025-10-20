import { Outlet } from "react-router";
import { useState } from "react";
import NavbarMerchant from "../../components/navbar-merchant";
import SidebarMerchant from "../../components/sidebar-merchant";
import  "../../css/merchant.css";

// export const links: any = () => [{ rel: "stylesheet", href: merchantStyles }];

export default function MerchantLayout() {
	const [open, setOpen] = useState(true);
	console.log("MerchantLayout render, sidebar open:", open);

	return (
			<div className="merchant-shell md:flex">
				<SidebarMerchant open={open} onClose={() => setOpen(true)} />
				<div className={`flex-1 min-h-screen ${open ? 'md:ml-64' : ''}`}>
					<NavbarMerchant onToggle={() => setOpen((v) => !v)} notifications={3} />
					<main className="p-4 container mx-auto">
					<section>
						<Outlet />
					</section>
				</main>
			</div>
		</div>
	);
}
