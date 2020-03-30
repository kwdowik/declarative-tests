const events = require('../subscribers/events');

module.exports = {
    // book create test cases
    create: [
        {
            testName: 'should create book - subscriber should received data',
            books: [
                {
                    id: '1',
                    author: 'John Doe',
                    title: 'test title',
                }
            ],
            subscribers: [
                {
                    id: '1',
                    event: events.book.bookCreated,
                }
            ],
            expected: [
                {
                    book: {
                        id: '1',
                        author: 'John Doe',
                        title: 'test title',
                    },
                    subscribers: [{
                        id: '1',
                        author: 'John Doe',
                        title: 'test title',
                    }]
                }
            ]
        },
        {
            testName: 'should create book - subscriber should not received data',
            books: [
                {
                    id: '1',
                    author: 'John Doe',
                    title: 'test title',
                }
            ],
            subscribers: [
                {
                    id: '1',
                    event: events.book.bookUpdated,
                }
            ],
            expected: [
                {
                    book: {
                        id: '1',
                        author: 'John Doe',
                        title: 'test title',
                    },
                }
            ]
        }
    ],
    // book get test cases
    get: [
        {
            testName: 'should get book by id',
            books: [
                {
                    id: '1',
                    author: 'John Doe',
                    title: 'test title',
                },
                {
                    id: '2',
                    author: 'John Smith',
                    title: 'test title',
                }
            ],
            expected: [
                {
                    id: '1',
                    book: {
                        id: '1',
                        author: 'John Doe',
                        title: 'test title',
                    },
                }
            ]
        },
        {
            testName: 'should not get book by id - id does not exist',
            books: [
                {
                    id: '1',
                    author: 'John Doe',
                    title: 'test title',
                },
                {
                    id: '2',
                    author: 'John Smith',
                    title: 'test title',
                }
            ],
            expected: [
                {
                    id: '3',
                }
            ]
        }
    ],
    // get all test cases
    getAll: [
        {
            testName: 'should get all books',
            books: [
                {
                    id: '1',
                    author: 'John Doe',
                    title: 'test title'
                },
                {
                    id: '2',
                    author: 'John Smith',
                    title: 'test title'
                },
            ]
        }
    ],
    // book update test cases
    update: [
        {
            testName: 'should update book by id',
            books: [
                {
                    id: '1',
                    author: 'John Doe',
                    title: 'test title',
                }
            ],
            updateBook: {
                id: '1',
                book: {
                    author: 'new author',
                }
            },
            subscribers: [
                {
                    id: '1',
                    event: events.book.bookUpdated,
                }
            ],
            expected: [
                {
                    book: {
                        id: '1',
                        author: 'new author',
                        title: 'test title',
                    },
                    subscribers: [{
                        id: '1',
                        author: 'new author',
                    }]
                }
            ]
        },
        {
            testName: 'should not update book by id - id does not exist',
            books: [
                {
                    id: '1',
                    author: 'John Doe',
                    title: 'test title',
                }
            ],
            updateBook: {
                id: '2',
                book: {
                    author: 'new author',
                }
            },
            subscribers: [
                {
                    id: '1',
                    event: events.book.bookUpdated,
                }
            ],
            expected: [
                {
                    subscribers: [{
                        id: '2',
                        author: 'new author',
                    }]
                }
            ]
        }
    ],
    // book delete test cases
    delete: [
        {
            testName: 'should delete book by id',
            books: [
                {
                    id: '1',
                    author: 'John Doe',
                    title: 'test title',
                }
            ],
            deleteBookId: '1',
            subscribers: [
                {
                    id: '1',
                    event: events.book.bookDeleted,
                }
            ],
            expected: [
                {
                    subscribers: [{
                        id: '1',
                    }]
                }
            ]
        },
        {
            testName: 'should not delete book by id - id does not exist',
            books: [
                {
                    id: '1',
                    author: 'John Doe',
                    title: 'test title',
                }
            ],
            deleteBookId: '2',
            subscribers: [
                {
                    id: '1',
                    event: events.book.bookDeleted,
                }
            ],
            expected: [
                {
                    book: {
                        id: '1',
                        author: 'John Doe',
                        title: 'test title',
                    },
                    subscribers: [{
                        id: '2',
                    }]
                }
            ]
        }
    ]
}