const Book = require('./book');
const testsCases = require('./book.test.json');

describe('book.js', () => {
    testsCases.forEach(({ testName, book, expected }) =>
        it(testName, () => {
            expect(new Book({...book}).isValid()).toBe(expected);
        })
    );
});