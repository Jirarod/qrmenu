export default function MerchantDashboard() {
	return (
		<div>
			<h2 className="text-xl font-semibold">Merchant Dashboard</h2>

			{/* box for card dashboard */}
			<div className="mt-4 grid text-center grid-cols-1 md:grid-cols-3 gap-4">
				{/* @todo api get data form merchant */}
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="pb-2 mb-4">
						<h3 className="text-lg font-medium text-gray-900">จำนวน Qr ที่สร้าง</h3>
					</div>
					<div className="text-gray-600">
						Card content goes here
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="pb-2 mb-4">
						<h3 className="text-lg font-medium text-gray-900">จำนวนเมนูที่สร้าง</h3>
					</div>
					<div className="text-gray-600">
						Card content goes here
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="pb-2 mb-4">
						<h3 className="text-lg font-medium text-gray-900">รายการสั่ง</h3>
					</div>
					<div className="text-gray-600">
						Card content goes here
					</div>
				</div>
			</div>
		</div>
	);
}
