const BooksService = require('./books.service');
const BooksRepository = require('../respositories/books.repository');
const NotificationService = require('./notification.service');
const Book = require('../model/book');
const events = require('../subscribers/events');
const testCases = require('./books.service.test-cases');

describe('book.service.js', () => {
    testCases.create.forEach(({ books, testName, subscribers, expected }) =>
        it(testName, () => {
            const booksRepository = new BooksRepository();
            const notificationService = new NotificationService();
            const onBookCreated = jest.fn();
            subscribers.forEach(subscriber => notificationService.subscribe({
                ...subscriber, 
                handler: onBookCreated
            }));
            const _booksService = new BooksService({
                booksRepository,
                notificationService,
            });
            books.forEach(book => _booksService.create(book));
            expected.forEach(({ book, subscriber }, index) => {
                expect(booksRepository.get(book.id)).toEqual(book);
                expect(onBookCreated.mock.calls[index]).toEqual(subscriber);
            });
        })
    );
    testCases.get.forEach(({ books, expected, testName }) => 
        it(testName, () => {
            const booksRepository = new BooksRepository();
            const _booksService = new BooksService({
                booksRepository,
            });
            books.forEach(book => booksRepository.create(book));
            expected.forEach(({ id, book }) =>
                expect(_booksService.get(id)).toEqual(book),
            );
        })
    )
    it('should get all books', () => {
        const booksRepository = new BooksRepository();
        const book1 = new Book({
            id: '1',
            author: 'John Doe',
            title: 'test title'
        });
        const book2 = new Book({
            id: '2',
            author: 'John Doe',
            title: 'test title'
        });
        booksRepository.create(book1);
        booksRepository.create(book2);
        const _booksService = new BooksService({
            booksRepository,
        });
        expect(_booksService.getAll()).toEqual([book1, book2]);
    });
    testCases.update.forEach(({ books, testName, subscribers, updateBook, expected }) =>
        it(testName, () => {
            const booksRepository = new BooksRepository();
            const notificationService = new NotificationService();
            const onBookUpdated = jest.fn();
            subscribers.forEach(subscriber => notificationService.subscribe({
                ...subscriber, 
                handler: onBookUpdated
            }));
            const _booksService = new BooksService({
                booksRepository,
                notificationService,
            });
            books.forEach(book => _booksService.create(book));
            _booksService.update(updateBook);
            expected.forEach(({ book, subscriber }, index) => {
                expect(booksRepository.get(updateBook.id)).toEqual(book);
                expect(onBookUpdated.mock.calls[index]).toEqual(subscriber);
            });
        })
    );
    testCases.delete.forEach(({ books, testName, subscribers, deleteBookId, expected }) =>
        it(testName, () => {
            const booksRepository = new BooksRepository();
            const notificationService = new NotificationService();
            const onBookDeleted = jest.fn();
            subscribers.forEach(subscriber => notificationService.subscribe({
                ...subscriber, 
                handler: onBookDeleted
            }));
            const _booksService = new BooksService({
                booksRepository,
                notificationService,
            });
            books.forEach(book => _booksService.create(book));
            _booksService.delete(deleteBookId);
            expected.forEach(({ book, subscriber }, index) => {
                expect(booksRepository.get(books[index].id)).toEqual(book);
                expect(onBookDeleted.mock.calls[index]).toEqual(subscriber);
            });
        })
    );
});