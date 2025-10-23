import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCreate() {
	const [text, setText] = useState("https://example.com/menu/123");
	const [qrId, setQrId] = useState("qr-001");
	const [qrName, setQrName] = useState("Dummy merchant QR Code");
	const [generatedPayload, setGeneratedPayload] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Mock POST API: simulates sending data to server and server returns final payload to encode.
	async function mockPostApi(body: { qrId: string; qrName: string; memo: string }) {
		// simulate network latency
		await new Promise((r) => setTimeout(r, 600));
		const serverPayload = `${body.memo.trim()}\n(id=${body.qrId};name=${body.qrName})`;
		return { ok: true, data: { qrPayload: serverPayload } };
	}

	function downloadPng() {
		const canvas = document.querySelector<HTMLCanvasElement>("canvas[data-testid='qrcode-canvas']");
		if (!canvas) return;
		const url = canvas.toDataURL("image/png");
		const a = document.createElement("a");
		a.href = url;
		a.download = `${qrId || 'qr-code'}.png`;
		document.body.appendChild(a);
		a.click();
		a.remove();
	}

	async function handleCreateAndSend() {
		setLoading(true);
		setError(null);
		try {
			const payload = { qrId, qrName, memo: text };
			// try real API via axios
			try {
				const res = await axios.post('/api/qr', payload);
				// server could return different shapes; prefer qrPayload
				const qrPayload = res.data?.qrPayload ?? res.data?.data?.qrPayload ?? null;
				if (qrPayload) {
					setGeneratedPayload(qrPayload);
					return;
				}
				// if response doesn't contain payload, fall through to mock
			} catch (axiosErr) {
				// network error or 404 — fall back to mock for local/dev
				console.warn('axios request failed, falling back to mockPostApi', axiosErr);
			}

			// fallback to mock API (local dev)
			const res = await mockPostApi(payload);
			if (!res.ok) throw new Error('server error');
			setGeneratedPayload(res.data.qrPayload);
		} catch (e: any) {
			console.error(e);
			setError(e?.message ?? 'Unknown error');
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (!generatedPayload) return;
		const t = setTimeout(() => {
			downloadPng();
		}, 120);
		return () => clearTimeout(t);
	}, [generatedPayload]);


	return (
		<div>
			<h2 className="text-xl font-semibold">Create QR</h2>

			<div className="mt-4 grid text-center grid-cols-1">
				<div className="flex justify-center items-center gap-4 p-4">
					{generatedPayload ? (
						<QRCodeCanvas
							value={generatedPayload}
							size={256}
							bgColor="#ffffff"
							fgColor="#000000"
							includeMargin={true}
							id="qr-canvas"
							className="bg-white/5 border p-3 rounded border-gray-300"
							data-testid="qrcode-canvas"
						/>
					) : (
						<div className="w-64 h-64 flex items-center justify-center border rounded border-gray-200 text-sm text-gray-500">
							QR will appear here after you press Create
						</div>
					)}
				</div>
			</div>

				<div className="mt-4 grid text-center grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block mb-2 font-medium" htmlFor="qr-id">
							QR Code ID
						</label>
						<input
							type="text"
							id="qr-id"
							className="w-full p-2 border border-gray-300 rounded"
							value={qrId}
							onChange={(e) => setQrId(e.target.value)}
							disabled
						/>
					</div>

					<div>
						<label className="block mb-2 font-medium" htmlFor="qr-name">
							QR Code Name
						</label>
						<input
							type="text"
							id="qr-name"    
							className="w-full p-2 border border-gray-300 rounded"
							value={qrName}
							onChange={(e) => setQrName(e.target.value)}
						/>
					</div>
				</div>

			<div>
				<label className="block mt-4 mb-2 font-medium" htmlFor="qr-text">
					QR Code Memo (this also updates the QR preview)
				</label>
				<textarea
					id="qr-memo"
					className="w-full p-2 border border-gray-300 rounded"
					rows={3}
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			</div>

			<div className="mt-4 flex flex-col items-center gap-3">
				<div className="flex gap-3">
					<button
						className="btn-primary disabled:opacity-50"
						onClick={handleCreateAndSend}
						disabled={loading}
					>
						{loading ? "Creating..." : "Create QR"}
					</button>
				</div>

				{error && <div className="text-sm text-red-600 mt-2">{error}</div>}
			</div>
			
		</div>
	);
}
