const NotificationService = require('./notification.service');
const testCases = require('./notification.service.test.json');

describe('notification.service.js', () => {
    let _notificationService;
    beforeEach(() => {
        _notificationService = new NotificationService()
    });

    testCases.forEach(({ testName, subscribers, handler, emitArgs, expected }) =>
        it(testName, () => {
            const fakeHandler = jest.fn();
            subscribers.forEach(subscriber => _notificationService.subscribe({...subscriber, handler: fakeHandler}));
            _notificationService.emit(emitArgs);
            expect(fakeHandler).toHaveBeenCalledTimes(expected.called);
            expect(fakeHandler.mock.calls[0]).toEqual(expected.args);
        })
    );
    it('should not invoke handler for subscribers will unsubscribed for this event', () => {
        const fakeHandler = jest.fn();
        _notificationService.subscribe({
            id: '1',
            event: 'eventName',
            handler: fakeHandler,
        });
        _notificationService.subscribe({
            id: '2',
            event: 'eventName',
            handler: fakeHandler,
        });
        _notificationService.subscribe({
            id: '3',
            event: 'eventName',
            handler: fakeHandler,
        });
        _notificationService.unsubscribe({ id: '1', event: 'eventName' })
        _notificationService.unsubscribe({ id: '2', event: 'eventName' })
        _notificationService.unsubscribe({ id: '3', event: 'eventName2' })
        _notificationService.emit({
            event: 'eventName',
            data: 'eventData',
        });
        expect(fakeHandler).toHaveBeenCalledTimes(1);
        expect(fakeHandler).toHaveBeenCalledWith('eventData');
    })
});