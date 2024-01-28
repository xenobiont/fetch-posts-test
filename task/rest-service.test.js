import { RestService } from './rest-service';

const mockResponse = [
	{ id: 1, title: 'Post 1', body: 'Lorem ipsum dolor sit amet' },
	{ id: 2, title: 'Post 2', body: 'Consectetur adipiscing elit' },
	{ id: 3, title: 'Post 3', body: 'Sed do eiusmod tempor incididunt' },
	{ id: 4, title: 'Post 4', body: 'Ut labore et dolore magna aliqua' },
	{ id: 5, title: 'Post 5', body: 'Ut enim ad minim veniam' },
];

const fakeUrl = 'fakeUrl';

const originalFetch = window.fetch;
const mockFetch = jest.fn().mockName('mock fetch');

const sut = new RestService();

describe('API calls', () => {
	beforeAll(() => {
		window.fetch = mockFetch;
	});

	afterAll(() => {
		// mockFetch.mockRestore(); // we could use it we spied on fetch method
		window.fetch = originalFetch;
	});

	beforeEach(() => {
		mockFetch.mockResolvedValue({
			ok: true,
			json: jest
				.fn()
				.mockName('mock json method')
				.mockResolvedValue(mockResponse),
		});

		// In Codesandbox we need to reference globalThis instead of window
		// there's already globalThis.fetch provided by codesandbox so we can spy on it
		/* eslint-disable */
		globalThis.fetch = mockFetch;
	});

	afterEach(() => {
		mockFetch.mockReset();
	});

	describe('fetch data', () => {
		test('resolves with correct value', async () => {
			await expect(sut.fetchData(fakeUrl)).resolves.toBe(mockResponse);
			expect.assertions(1);
		});

		test('correctly calls global fetch method', async () => {
			expect.assertions(3);

			const result = await sut.fetchData(fakeUrl);

			expect(mockFetch).toBeCalledTimes(1);
			expect(mockFetch).toBeCalledWith(fakeUrl);
			expect(result).toEqual(mockResponse);
		});

		test('throws an error if API request fails', async () => {
			mockFetch.mockResolvedValue({
				ok: false,
			});

			try {
				await sut.fetchData(fakeUrl);
			} catch (e) {
				expect(e.message).toBe('Cannot fetch data');
			}

			expect.assertions(1);
		});
	});

	describe('post', () => {
		test('correctly calls fetch', async () => {
			expect.assertions(5);

			await sut.post(mockResponse, fakeUrl);

			expect(mockFetch).toBeCalledTimes(1);

			expect(mockFetch.mock.calls[0][0]).toBe(fakeUrl);

			expect(mockFetch.mock.calls[0][1].method).toBe('POST');
			expect(mockFetch.mock.calls[0][1].headers['Content-type']).toBe(
				'application/json; charset=UTF-8',
			);
			expect(mockFetch.mock.calls[0][1].body).toBeDefined();
		});
	});
});
