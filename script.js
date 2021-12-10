let myLibrary = JSON.parse(localStorage.getItem('books')) || []

updateLocalStorage()

// Check if storage is available
function storageAvailable(type) {
    var storage
    try {
        storage = window[type]
        var x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0)
    }
}

let bookCount = 0

class Book {
    constructor(title, author, pages) {
        this.title = title
        this.author = author
        this.pages = pages
        this.id = bookCount++
    }

    createCard() {
        const books = document.querySelector('.books')
        const div = document.createElement('div')
        const title = document.createElement('p')
        const author = document.createElement('p')
        const pages = document.createElement('p')
        const del = document.createElement('button')
        const read = document.createElement('button')
        books.appendChild(div)
        del.classList.add = 'delete'
        del.innerText = 'Remove'
        read.classList.add = 'read'
        read.innerText = 'Read'
        div.classList.add = 'card'
        div.appendChild(title)
        div.appendChild(author)
        div.appendChild(pages)
        div.appendChild(del)
        div.appendChild(read)
        title.innerText = 'Title: ' + this.title
        author.innerText = 'Author: ' + this.author
        pages.innerText = 'Pages: ' + this.pages
        del.addEventListener('click', () => {
            div.parentNode.removeChild(div)
            removeBookFromLibrary(this.id)
        })
        read.addEventListener('click', () => {
            read.innerText = read.innerText === 'Read' ? 'Unread' : 'Read'
        })
    }
}

displayLibrary()

const newBookButton = document.getElementById('new-book')
newBookButton.addEventListener('click', () => toggleBookInfoForm())

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault()
    saveBook()
})

function toggleBookInfoForm() {
    const addBook = document.querySelector('.form-container')
    let currentVisibility = addBook.style.display
    
    addBook.style.display = currentVisibility == 'block' ? 'none' : 'block'

    newBookButton.innerText = newBookButton.innerText === '-' ? '+' : '-'
}

function saveBook() {
    addBookToLibrary()
    displayLibrary()
}


function addBookToLibrary() {
    // Add form input to local storage
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    
    const book = new Book(title, author, pages)
    myLibrary.push(book)
    console.log(myLibrary)
    localStorage.setItem('books', JSON.stringify(myLibrary))
}

function displayLibrary() {
    bookCount = 0
    clearDisplay()
    for (let book of myLibrary) {
        book = new Book(book['title'], book['author'], book['pages'])
        book.createCard()
    }
}

function removeBookFromLibrary(index) {
    console.log(myLibrary)
    myLibrary.splice(index, 1)
    console.log(myLibrary)
    updateLocalStorage()
}

function updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(myLibrary))
    console.log(myLibrary)
}

function clearForm() {

}

function clearDisplay() {
    const books = document.querySelector('.books')
    while (books.firstChild) {
        books.removeChild(books.lastChild)
    }
}