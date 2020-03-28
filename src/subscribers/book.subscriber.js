const events = require('../subscribers/events');

function BookSubscriber({ notificationService }) {
    this._notificationService = notificationService;
    notificationService.subscribe({ id: 'bookSubscriber', event: events.book.bookCreated, handler: onBookCreated });
    notificationService.subscribe({ id: 'bookSubscriber', event: events.book.bookUpdated, handler: onBookUpdated });
    notificationService.subscribe({ id: 'bookSubscriber', event: events.book.bookDeleted, handler: onBookDeleted });
    function onBookCreated(data) {
        console.log(`Book created -- ${JSON.stringify(data)}`);
    }
    function onBookUpdated(data) {
        console.log(`Book updated -- ${JSON.stringify(data)}`);
    }
    function onBookDeleted(data) {
        console.log(`Book deleted -- ${JSON.stringify(data)}`);
    }
}

module.exports = BookSubscriber;