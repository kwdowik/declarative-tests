const events = require('../subscribers/events');

function BooksService({booksRepository, notificationService}) {
    let _booksRepository = booksRepository;
    let _notificationService = notificationService;
    return ({
        create: (book) => {
            _booksRepository.create(book);
            _notificationService.emit({event: events.book.bookCreated, data: book })
        },
        get: (id) => {
            _booksRepository.get(id)
        },
        getAll: () => {
            return _booksRepository.getAll()
        },
        update: ({ id, book }) => {
            _booksRepository.update(id, { ...book })
            _notificationService.emit({ event: events.book.bookUpdated, data: { ...book, id }})
        },
        delete: (id) => {
            _booksRepository.delete(id);
            _notificationService.emit({ event: events.book.bookDeleted, data: { id }})
        }
    })
}

module.exports = BooksService;
