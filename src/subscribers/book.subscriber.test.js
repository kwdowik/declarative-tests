const BookSubscriber = require('./book.subscriber');

describe('book.subscriber.js', () => {
    let _bookSubscriber;
    let _fakeSubscribe;
    beforeEach(() => {
        _fakeSubscribe = jest.fn()
        _bookSubscriber = new BookSubscriber({
            notificationService: {
                subscribe: _fakeSubscribe,
            }
        })
    })
    it('should subscribe for all book events', () => {
        expect(_fakeSubscribe).toHaveBeenCalledTimes(3);
        expect(JSON.stringify(_fakeSubscribe.mock.calls[0][0]))
            .toEqual(JSON.stringify({
                id: "bookSubscriber",
                event: "bookCreated",
            }));
        expect(JSON.stringify(_fakeSubscribe.mock.calls[1][0]))
            .toEqual(JSON.stringify({
                id: "bookSubscriber",
                event: "bookUpdated",
            }));
        expect(JSON.stringify(_fakeSubscribe.mock.calls[2][0]))
            .toEqual(JSON.stringify({
                id: "bookSubscriber",
                event: "bookDeleted",
            }));
    });
});