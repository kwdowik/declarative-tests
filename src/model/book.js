function Book({ id, author, title }) {
    this.id = id;
    this.author = author;
    this.title = title;
    return ({
        isValid: () => {
            return !!this.id &&
                this.author.trim().length > 3 &&
                this.title.trim().length > 1;
        }
    })
}

module.exports = Book;