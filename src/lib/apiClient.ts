export async function fetchNowPlayingMovies() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/now_playing`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch movies');
	}

	// 응답 텍스트를 먼저 받아서 비어 있는지 확인
	const responseText = await response.text();
	if (!responseText) {
		throw new Error('Empty response body');
	}

	try {
		// JSON 파싱
		const data = JSON.parse(responseText);
		return data.results; // 결과 반환
	} catch (error) {
		throw new Error('Invalid JSON format');
	}
}