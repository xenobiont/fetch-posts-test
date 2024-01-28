export class RestService {
	async fetchData(url) {
		const response = await fetch(url);

		if (!response.ok) throw new Error('Cannot fetch data');

		const result = await response.json();
		return result;
	}

	async post(post, url) {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(post),
		});

		if (!response.ok) throw new Error(response.statusText);

		const result = await response.json();

		return result;
	}
}
