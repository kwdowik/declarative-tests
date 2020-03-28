const BooksRepository = require('./respositories/books.repository');
const BooksService = require('./services/books.service');
const NotificationService = require('./services/notification.service');
const BookSubscriber = require('./subscribers/book.subscriber');
const Book = require('./model/book');

(() => {
    const notificationService = NotificationService();
    const service = BooksService({ 
        booksRepository: BooksRepository(),
        notificationService,
    });
    new BookSubscriber({ notificationService });
    service.create(new Book({ id: 1, author: 'Joe Doe', title: 'Harry Potter' }));
    // console.log(service.getAll());
    // service.delete(1);
    // console.log(service.getAll());
})()