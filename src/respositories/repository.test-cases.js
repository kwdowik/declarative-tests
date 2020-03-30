module.exports = {
    create: [
        {
            testName: '#create - should add item to repository',
            items: [
                {
                    id: '1',
                    name: 'test name',
                }
            ],
            expected: {
                id: '1',
                item: {
                    id: '1',
                    name: 'test name',
                },
                amount: 1,
            }
        },
        {
            testName: '#create - should not add item to repository - item already exists',
            items: [
                {
                    id: '1',
                    name: 'test name',
                },
                {
                    id: '1',
                    name: 'new name',
                }
            ],
            expected: {
                id: '1',
                item: {
                    id: '1',
                    name: 'test name',
                },
                amount: 1,
            }
        }
    ],
    get: [
        {
            testName: '#get - should return item from repository',
            items: [
                {
                    id: '1',
                    name: 'test name',
                }
            ],
            expected: {
                id: '1',
                item: {
                    id: '1',
                    name: 'test name',
                },
            }
        },
        {
            testName: '#get - should not return item from repository - item does not exist',
            items: [],
            expected: {
                id: '1',
            }
        }
    ],
    getAll: [
        {
            testName: '#getAll - should return all items from repository',
            items: [
                {
                    id: '1',
                    name: 'test name',
                },
                {
                    id: '2',
                    name: 'test name',
                }
            ],
            expected: {
                items: [
                    {
                        id: '1',
                        name: 'test name',
                    },
                    {
                        id: '2',
                        name: 'test name',
                    }
                ]
            }
        },
    ],
    update: [
        {
            testName: '#update - should update item from repository',
            items: [
                {
                    id: '1',
                    name: 'test name',
                }
            ],
            itemToUpdate: {
                id: '1',
                name: 'new name',
            },
            expected: {
                id: '1',
                item: {
                    id: '1',
                    name: 'new name',
                },
            }
        },
        {
            testName: '#update - should not update item from repository - item does not exist',
            items: [
                {
                    id: '1',
                    name: 'test name',
                },
            ],
            itemToUpdate: {
                id: '2',
                name: 'new name',
            },
            expected: {
                id: '1',
                item: {
                    id: '1',
                    name: 'test name',
                },
            }
        }
    ],
    delete: [
        {
            testName: '#delete - should delete item from repository',
            items: [
                {
                    id: '1',
                    name: 'test name',
                }
            ],
            itemToDelete: {
                id: '1',
            },
            expected: {
                id: '1',
            }
        },
        {
            testName: '#delete - should not update item from repository - item does not exist',
            items: [
                {
                    id: '1',
                    name: 'test name',
                },
            ],
            itemToDelete: {
                id: '2',
            },
            expected: {
                id: '1',
                item: {
                    id: '1',
                    name: 'test name',
                },
            }
        }
    ],
}