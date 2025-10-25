import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

type QrItem = { id: string; name: string; payload: string };

export default function QrList() {
  const [items, setItems] = useState<QrItem[]>([
	{ id: "qr-001", name: "Table 1", payload: "https://example.com/menu/1" },
	{ id: "qr-002", name: "Table 2", payload: "https://example.com/menu/2" },
	{ id: "qr-003", name: "Takeaway", payload: "https://example.com/menu/takeaway" },
  ]);

  const [viewing, setViewing] = useState<QrItem | null>(null);

  function remove(id: string) {
	setItems((s) => s.filter((i) => i.id !== id));
  }

  function downloadAsPng(item: QrItem) {
	// Try to find the rendered canvas first
	const canvas = document.querySelector<HTMLCanvasElement>("canvas[data-testid='qrcode-canvas']");
	if (canvas && viewing && viewing.id === item.id) {
	  const url = canvas.toDataURL("image/png");
	  const a = document.createElement("a");
	  a.href = url;
	  a.download = `${item.id}.png`;
	  document.body.appendChild(a);
	  a.click();
	  a.remove();
	  return;
	}

	// fallback: open payload as text file
	const a = document.createElement("a");
	a.href = "data:text/plain," + encodeURIComponent(item.payload);
	a.download = `${item.id}.txt`;
	document.body.appendChild(a);
	a.click();
	a.remove();
  }

  return (
	<div className="p-6">
	  <div className="mb-6">
		<h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>QR Code Management</h2>
		<p className="text-sm opacity-75" style={{ color: 'var(--text-primary)' }}>
		  Manage your QR codes. Click View to preview, Download to save as PNG, or Delete to remove.
		</p>
	  </div>

	  <div className="bg-white/5 rounded-lg overflow-hidden shadow-lg">
		<table className="w-full text-left">
		  <thead>
			<tr className="bg-white/10 border-b border-white/10">
			  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
				ID
			  </th>
			  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
				Name
			  </th>
			  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
				URL
			  </th>
			  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide text-center" style={{ color: 'var(--text-primary)' }}>
				Actions
			  </th>
			</tr>
		  </thead>
		  <tbody>
			{items.map((it, index) => (
			  <tr key={it.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white/2' : ''}`}>
				<td className="px-6 py-4 align-top">
				  <span className="font-mono text-sm px-2 py-1 bg-white/10 rounded text-blue-300">
					{it.id}
				  </span>
				</td>
				<td className="px-6 py-4 align-top">
				  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
					{it.name}
				  </span>
				</td>
				<td className="px-6 py-4 align-top">
				  <span className="text-sm break-all opacity-75 max-w-xs block" style={{ color: 'var(--text-primary)' }}>
					{it.payload}
				  </span>
				</td>
				<td className="px-6 py-4 align-top">
				  <div className="flex justify-center gap-2 flex-wrap">
					<button 
					  className="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
					  onClick={() => setViewing(it)}
					>
					  👁️ View
					</button>
					<button 
					  className="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md"
					  onClick={() => downloadAsPng(it)}
					>
					  💾 Download
					</button>
					<button 
					  className="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md"
					  onClick={() => remove(it.id)}
					>
					  🗑️ Delete
					</button>
				  </div>
				</td>
			  </tr>
			))}
		  </tbody>
		</table>
		
		{items.length === 0 && (
		  <div className="text-center py-12">
			<div className="text-gray-400 mb-2">📱</div>
			<p className="text-gray-400">No QR codes found</p>
			<p className="text-gray-500 text-sm">Create your first QR code to get started</p>
		  </div>
		)}
	  </div>

	  {viewing && (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
		  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-md w-full mx-auto border border-white/20 shadow-2xl">
			<div className="flex justify-between items-center mb-4">
			  <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
				🔍 QR Code Preview
			  </h3>
			  <button 
				className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
				onClick={() => setViewing(null)}
			  >
				✕
			  </button>
			</div>
			
			<div className="text-center mb-4">
			  <div className="inline-block p-4 bg-white rounded-lg shadow-lg mb-3">
				<QRCodeCanvas value={viewing.payload} size={160} data-testid="qrcode-canvas" />
			  </div>
			  
			  <div className="space-y-2 text-left">
				<div className="bg-white/5 rounded-lg p-3">
				  <div className="text-xs font-medium opacity-75 mb-1" style={{ color: 'var(--text-primary)' }}>
					ID
				  </div>
				  <div className="font-mono text-sm" style={{ color: 'var(--accent-2)' }}>
					{viewing.id}
				  </div>
				</div>
				
				<div className="bg-white/5 rounded-lg p-3">
				  <div className="text-xs font-medium opacity-75 mb-1" style={{ color: 'var(--text-primary)' }}>
					Name
				  </div>
				  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
					{viewing.name}
				  </div>
				</div>
				
				<div className="bg-white/5 rounded-lg p-3">
				  <div className="text-xs font-medium opacity-75 mb-1" style={{ color: 'var(--text-primary)' }}>
					URL
				  </div>
				  <div className="text-sm break-all opacity-75" style={{ color: 'var(--text-primary)' }}>
					{viewing.payload}
				  </div>
				</div>
			  </div>
			</div>
			
			<div className="flex gap-3 pt-4 border-t border-white/10">
			  <button 
				className="flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md"
				onClick={() => downloadAsPng(viewing)}
			  >
				💾 Download PNG
			  </button>
			  <button 
				className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-gray-600 hover:bg-gray-700 text-white shadow-sm"
				onClick={() => setViewing(null)}
			  >
				Close
			  </button>
			</div>
		  </div>
		</div>
	  )}
	</div>
  );
}
