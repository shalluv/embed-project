export async function GET(request: Request) {
	const res = await fetch("https://api.netpie.io/v2/feed/api/v1/datapoints/query", {
		method: "POST",
		headers: {
			Authorization: `Device ${process.env.DEVICE_ID}:${process.env.DEVICE_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"start_relative": { "value": 2, "unit": "days" },
			"metrics": [
				{
					"name": `${process.env.DEVICE_ID}`,
					"tags": { "attr": ["temperature", "humidity", "dust_density"] },
					"limit": 50,
					"group_by": [{ "name": "tag", "tags": ["attr"] }]
				}
			]
		}),
		next: { revalidate: 60 }
	})
	const data = await res.json()

	const labels = data.queries[0].results[0].values.map((value: any) => value[0])
	const temperature = data.queries[0].results[0].values.map((value: any) => value[1])
	const humidity = data.queries[0].results[1].values.map((value: any) => value[1])
	const pm10 = data.queries[0].results[2].values.map((value: any) => value[1])

	return Response.json({
		labels,
		temperature,
		humidity,
		pm10,
	})
}
