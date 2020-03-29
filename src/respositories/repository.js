function Repository() {
    let _items = [];
    return ({
        create: (item) => {
            _items = _items.concat([item]);
        },
        get: (id) => _items.find(item => item.id === id),
        getAll: () => _items,
        update: (id, item) => {
            const itemToUpdate = _items.find(item => item.id === id);
            if (!itemToUpdate) {
                console.warn(`Cannot find item with id: ${id}`);
                return;
                // throw Error(`Cannot find item with id: ${id}`);
            }
            _items  = _items.filter(item => item.id !== id);
            _items = _items.concat([{...itemToUpdate, ...item}])
        },
        delete: (id) => { 
            _items = _items.filter(item => item.id !== id);
        },
    })
}

module.exports = Repository;