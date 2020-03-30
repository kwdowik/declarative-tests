module.exports = [
    {
        testName: 'should invoke handler for subscriber',
        subscribers: [{
            id: '1',
            event: 'eventName',
        }],
        emitArgs: {
            event: 'eventName',
            data: 'eventData'
        },
        handler: jest.fn(),
        expected: {
            called: 1,
            args: ['eventData'],
        },
    },
    {
        testName: 'should invoke handler for subscribers - all registered for this event',
        subscribers: [
            {
                id: '1',
                event: 'eventName',
            },
            {
                id: '2',
                event: 'eventName',
            },
            {
                id: '3',
                event: 'eventName',
            },
        ],
        emitArgs: {
            event: 'eventName',
            data: 'eventData'
        },
        handler: jest.fn(),
        expected: {
            called: 3,
            args: ['eventData'],
        },
    },
    {
        testName: 'should not invoke handler for subscriber - register for different event',
        subscribers: [{
            id: '1',
            event: 'differentEventName',
        }],
        emitArgs: {
            event: 'eventName',
            data: 'eventData'
        },
        handler: jest.fn(),
        expected: {
            called: 0,
        },
    },
    {
        testName: 'should not invoke handler for subscriber - any registered subscriber',
        subscribers: [],
        emitArgs: {
            event: 'eventName',
            data: 'eventData'
        },
        handler: jest.fn(),
        expected: {
            called: 0,
        },
    },
]