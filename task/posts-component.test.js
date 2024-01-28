import { PostsComponent } from './posts-component.js';

const mockData = [
	{ id: 1, title: 'Post 1', body: 'Lorem ipsum dolor sit amet' },
	{ id: 2, title: 'Post 2', body: 'Consectetur adipiscing elit' },
	{ id: 3, title: 'Post 3', body: 'Sed do eiusmod tempor incididunt' },
	{ id: 4, title: 'Post 4', body: 'Ut labore et dolore magna aliqua' },
	{ id: 5, title: 'Post 5', body: 'Ut enim ad minim veniam' },
];

const RestServiceMock = jest.fn().mockImplementation(() => ({
	fetchData: jest.fn().mockResolvedValue(mockData),
}));

const restServiceMock = new RestServiceMock();

let sut;

beforeEach(() => {
	sut = new PostsComponent(restServiceMock);
});

afterEach(() => {
	restServiceMock.mockClear();
	// jest.clearAllMocks();
	document.body.innerHTML = /* html */ ``; // reset document state between the tests
});

describe('createElement', () => {
	// Test case to check if the getElement function returns a valid DOM element
	test('createElement should return a valid DOM element', () => {
		// Call the getElement function with a mock post object
		const post = mockData[0];
		const element = sut.createElement(post);

		// Check if the returned element is an <li> element
		expect(element.nodeName).toBe('LI');

		// Check if the <li> element contains a <h2> and a <p> element
		expect(element.querySelector('h2').innerText).toBe(post.title);
		expect(element.querySelector('p').innerText).toBe(post.body);
	});
});

describe('render', () => {
	test('content is rendered on the page', () => {
		sut.render(mockData);

		// Check if the DOM contains an <ol> element with 5 child <li> elements
		expect(document.querySelector('ol').childElementCount).toBe(5);
	});
});

describe('integration test', () => {
	test('API call is successful and content is rendered to the page', async () => {
		await sut.init();

		expect.assertions(2);

		expect(restServiceMock.fetchData).toBeCalled();

		// Check if the DOM contains an <ol> element with 5 child <li> elements
		expect(document.querySelector('ol').childElementCount).toBe(5);
	});

	test('snapshot is not changed', async () => {
		await sut.init();

		const app = document.body;

		expect(app).toMatchSnapshot();
	});
});
