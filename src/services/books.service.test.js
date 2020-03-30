const BooksService = require('./books.service');
const BooksRepository = require('../respositories/books.repository');
const NotificationService = require('./notification.service');
const testCases = require('./books.service.test-cases');

describe('book.service.js', () => {
    let _booksRepository;
    let _notificationService;
    beforeEach(() => {
        _booksRepository = new BooksRepository();
        _notificationService = new NotificationService();
    });
    testCases.create.forEach(({ books, testName, subscribers, expected }) =>
        it(testName, () => {
            const onBookCreated = jest.fn();
            subscribers.forEach(subscriber => _notificationService.subscribe({
                ...subscriber, 
                handler: onBookCreated
            }));
            const _booksService = new BooksService({
                booksRepository: _booksRepository,
                notificationService: _notificationService,
            });
            
            books.forEach(book => _booksService.create(book));
            
            expected.forEach(({ book, subscribers }, index) => {
                expect(_booksRepository.get(book.id)).toEqual(book);
                expect(onBookCreated.mock.calls[index]).toEqual(subscribers);
            });
        })
    );
    testCases.get.forEach(({ books, expected, testName }) => 
        it(testName, () => {
            const _booksService = new BooksService({
                booksRepository: _booksRepository,
            });
            books.forEach(book => _booksRepository.create(book));
            
            expected.forEach(({ id, book }) =>
                expect(_booksService.get(id)).toEqual(book),
            );
        })
    )
    testCases.getAll.forEach(({ testName, books }) => 
        it(testName, () => {
            books.forEach(book => _booksRepository.create(book));
            const _booksService = new BooksService({
                booksRepository: _booksRepository,
            });
    
            expect(_booksService.getAll()).toEqual(books);
        })
    )
    testCases.update.forEach(({ books, testName, subscribers, updateBook, expected }) =>
        it(testName, () => {
            const onBookUpdated = jest.fn();
            subscribers.forEach(subscriber => _notificationService.subscribe({
                ...subscriber, 
                handler: onBookUpdated
            }));
            const _booksService = new BooksService({
                booksRepository: _booksRepository,
                notificationService: _notificationService,
            });
            books.forEach(book => _booksService.create(book));

            _booksService.update(updateBook);

            expected.forEach(({ book, subscribers }, index) => {
                expect(_booksRepository.get(updateBook.id)).toEqual(book);
                expect(onBookUpdated.mock.calls[index]).toEqual(subscribers);
            });
        })
    );
    testCases.delete.forEach(({ books, testName, subscribers, deleteBookId, expected }) =>
        it(testName, () => {
            const onBookDeleted = jest.fn();
            subscribers.forEach(subscriber => _notificationService.subscribe({
                ...subscriber, 
                handler: onBookDeleted
            }));
            const _booksService = new BooksService({
                booksRepository: _booksRepository,
                notificationService: _notificationService,
            });
            books.forEach(book => _booksService.create(book));
            
            _booksService.delete(deleteBookId);
            
            expected.forEach(({ book, subscribers }, index) => {
                expect(_booksRepository.get(books[index].id)).toEqual(book);
                expect(onBookDeleted.mock.calls[index]).toEqual(subscribers);
            });
        })
    );
});