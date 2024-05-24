export async function GET(request: Request) {
	const res = await fetch("https://api.netpie.io/v2/device/shadow/data", {
		method: "GET",
		headers: {
			Authorization: `Device ${process.env.DEVICE_ID}:${process.env.DEVICE_TOKEN}`,
		},
	})
	const data = await res.json()

	const temperature = data.data.temperature
	const humidity = Math.min(100, Math.max(0, data.data.humidity))
	const pm10 = Math.min(604, Math.max(0, data.data.dust_density));
	const timestamp = data.timestamp
	const aqi = (() => {
		const { Lo, Hi } = (() => {
			if (pm10 <= 54) return { Lo: 0, Hi: 50 }
			if (pm10 <= 154) return { Lo: 51, Hi: 100 }
			if (pm10 <= 254) return { Lo: 101, Hi: 150 }
			if (pm10 <= 354) return { Lo: 151, Hi: 200 }
			if (pm10 <= 424) return { Lo: 201, Hi: 300 }
			return { Lo: 301, Hi: 500 }
		})()
		const { concLo, concHi } = (() => {
			if (pm10 <= 54) return { concLo: 0, concHi: 54 }
			if (pm10 <= 154) return { concLo: 55, concHi: 154 }
			if (pm10 <= 254) return { concLo: 155, concHi: 254 }
			if (pm10 <= 354) return { concLo: 255, concHi: 354 }
			if (pm10 <= 424) return { concLo: 355, concHi: 424 }
			return { concLo: 425, concHi: 604 }
		})()
		return Math.round((((Hi - Lo) / (concHi - concLo)) * (pm10 - concLo)) + Lo)
	})()

	return Response.json({
		aqi,
		temperature,
		humidity,
		pm10,
		timestamp,
	})
}
