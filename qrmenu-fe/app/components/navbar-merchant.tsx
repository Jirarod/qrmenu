
export default function NavbarMerchant({
	onToggle,
	notifications = 0,
}: {
	onToggle: () => void;
	notifications?: number;
}) {
	return (
		<header className="merchant-header">
			<div className="container mx-auto flex items-center justify-between p-1">
				<div className="flex items-center gap-4">
					<button
						className="px-2 py-1 border rounded"
						aria-label="Open sidebar"
						onClick={onToggle}
					>
						☰
					</button>

					<a href="/merchant" className="logo text-lg font-semibold">
						QRMenu
					</a>
				</div>

				<div className="flex items-center gap-4">
					<div className="relative">
						<button className="p-2 rounded-full bg-white/10">
							🔔
						</button>
						{notifications > 0 && (
							<span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
								{notifications}
							</span>
						)}
					</div>

					<div className="flex items-center gap-2">
						<img
							src="https://scontent.fbkk12-2.fna.fbcdn.net/v/t39.30808-1/544915170_24280348141648688_1712111814892523632_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-7jO-iagYjkQ7kNvwE8Uri9&_nc_oc=AdkRg9T__nqH1hjY_4im8PGeKGsqtng-nuiQHjHDREe8CeYsWNgm11b4_yxcyjOBwnrww06KoABBFsHXCj8I_jG2&_nc_zt=24&_nc_ht=scontent.fbkk12-2.fna&_nc_gid=ERuYyrOlwP36hbYdNIEU1A&oh=00_Affof1gtnNojouTI5htBlVP8R7o766tz3lbXqW5lJVOrfw&oe=68F9334B"
							alt="profile"
							className="w-8 h-8 rounded-full object-cover border"
						/>
					</div>
				</div>
			</div>
		</header>
	);
}
