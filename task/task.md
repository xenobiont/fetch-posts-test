# Task

## Part 1

write the unit tests for rest-service:

- mock the response of fetch function and check that this value is returned by fetchData method
- ensure that fetch function was called
- test if fetch function was called with correct url
- make sure that fetchData rejects with correct error message if fetch returns not ok status

- check that fetch is called with correct arguments when .post() method is called

hint: use globalThis.fetch to access fetch function (it works this way on Codesandbox)

## Part 2

write the unit tests for posts-component:

- test that createElemenet returns a valid Li DOM element
- test that information is correctly rendered on the page.
- create a snapshot test for the rendered page
- integration test: ensure that postService fetchData is called once with correct url during component initialization

hint: manually mock restService (note: jest.mock won't work in codesandbox, so you need ot mick it manually)
