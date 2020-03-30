const Book = require('./book');

describe('book.js', () => {
    [
        {
            testName: 'should be valid',
            book: {
                id: '1',
                author: 'author name',
                title: 'title'
            },
            expected: true,
        },
        {
            testName: 'should be invalid - id is required',
            book: {
                author: 'author name',
                title: 'title'
            },
            expected: false,
        },
        {
            testName: 'should be invalid - author name must be longer than 3 characters',
            book: {
                id: '1',
                author: 'aut',
                title: 'title'
            },
            expected: false,
        },
        {
            testName: 'should be invalid - title must be longer than 1 character',
            book: {
                id: '1',
                author: 'author name',
                title: 't'
            },
            expected: false,
        }
    ].forEach(({ testName, book, expected }) =>
        it(testName, () => {
            expect(new Book({...book}).isValid()).toBe(expected);
        })
    );
});