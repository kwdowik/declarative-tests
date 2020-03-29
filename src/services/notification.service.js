function NotificationSerivce() {
    let _subscribers = [];
    return ({
        emit: ({ event, data }) => {
            _subscribers
                .filter(subscribe => subscribe.event === event)
                .forEach(subscribe => subscribe.handler(data))
        },
        subscribe: ({ id, event, handler }) => _subscribers.push({ id, event, handler }),
        unsubscribe: ({ id, event }) => {
            _subscribers  = _subscribers.filter(subscribe => subscribe.id !== id || subscribe.event !== event);
        }
    })
}

module.exports = NotificationSerivce;