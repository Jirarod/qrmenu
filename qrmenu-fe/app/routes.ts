import { type RouteConfig, index, route } from "@react-router/dev/routes";

	export default [
	index("routes/home.tsx"),
	// merchant management section: layout + nested routes
	route("merchant", "routes/merchant/layout.tsx", [
		index("routes/merchant/home.tsx"),
		route("qr-create", "routes/merchant/qr-create.tsx"),
		route("menu-management", "routes/merchant/menu-management.tsx"),
	]),
] satisfies RouteConfig;
