const Repository = require('./repository');

function BooksRepository() {
    return new Repository();
}

module.exports = BooksRepository;