export async function GET(request: Request) {
	const res = await fetch("https://api.netpie.io/v2/feed/api/v1/datapoints/query", {
		method: "POST",
		headers: {
			Authorization: `Device ${process.env.DEVICE_ID}:${process.env.DEVICE_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
		})
	})
	const data = await res.json()

	console.log(data)

	return Response.json(data)
}
