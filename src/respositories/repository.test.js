const Repository = require('./repository');
const testCases = require('./repository.test.json');

describe('repository.js', () => {
    let _repository;
    beforeEach(() => {
        _repository = new Repository();
    });
    testCases.create.forEach(({ testName, items, expected }) =>
        it(testName, () => {
            items.forEach(item => _repository.create(item));

            expect(_repository.get(expected.id)).toEqual(expected.item);
            expect(_repository.getAll().length).toEqual(expected.amount);
        })
    );
    testCases.get.forEach(({ testName, items, expected }) =>
        it(testName, () => {
            items.forEach(item => _repository.create(item));

            expect(_repository.get(expected.id)).toEqual(expected.item);
        })
    );
    testCases.getAll.forEach(({ testName, items, expected }) =>
        it(testName, () => {
            items.forEach(item => _repository.create(item));

            expect(_repository.getAll()).toEqual(expected.items);
        })
    );
    testCases.update.forEach(({ testName, items, itemToUpdate, expected }) =>
        it(testName, () => {
            items.forEach(item => _repository.create(item));
            
            _repository.update(itemToUpdate.id, itemToUpdate);

            expect(_repository.get(expected.id)).toEqual(expected.item);
        })
    );
    testCases.delete.forEach(({ testName, items, itemToDelete, expected }) =>
        it(testName, () => {
            items.forEach(item => _repository.create(item));
            
            _repository.delete(itemToDelete.id);

            expect(_repository.get(expected.id)).toEqual(expected.item);
        })
    );
});