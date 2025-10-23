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
	<div>
	  <h2 className="text-xl font-semibold">QR List</h2>
	  <p className="mt-2">Mock list of QR codes. Click View to preview, Download to get a file, or Delete to remove.</p>

	  <div className="mt-4">
		<table className="w-full text-left border-collapse">
		  <thead>
			<tr className="border-b">
			  <th className="p-2">ID</th>
			  <th className="p-2">Name</th>
			  <th className="p-2">Payload</th>
			  <th className="p-2">Actions</th>
			</tr>
		  </thead>
		  <tbody>
			{items.map((it) => (
			  <tr key={it.id} className="border-b">
				<td className="p-2 align-top">{it.id}</td>
				<td className="p-2 align-top">{it.name}</td>
				<td className="p-2 align-top break-words">{it.payload}</td>
				<td className="p-2 align-top">
				  <div className="flex gap-2">
					<button className="px-2 py-1 border rounded" onClick={() => setViewing(it)}>
					  View
					</button>
					<button className="px-2 py-1 border rounded" onClick={() => downloadAsPng(it)}>
					  Download
					</button>
					<button className="px-2 py-1 border rounded text-red-600" onClick={() => remove(it.id)}>
					  Delete
					</button>
				  </div>
				</td>
			  </tr>
			))}
		  </tbody>
		</table>
	  </div>

	  {viewing && (
		<div className="mt-4 p-4 border rounded bg-white/5">
		  <h3 className="font-semibold">Preview {viewing.name}</h3>
		  <div className="mt-2 flex gap-4 items-center">
			<div>
			  <QRCodeCanvas value={viewing.payload} size={160} data-testid="qrcode-canvas" />
			</div>
			<div>
			  <div className="text-sm">ID: {viewing.id}</div>
			  <div className="text-sm">Payload: {viewing.payload}</div>
			  <div className="mt-2 flex gap-2">
				<button className="px-2 py-1 border rounded" onClick={() => downloadAsPng(viewing)}>
				  Download
				</button>
				<button className="px-2 py-1 border rounded" onClick={() => setViewing(null)}>
				  Close
				</button>
			  </div>
			</div>
		  </div>
		</div>
	  )}
	</div>
  );
}
