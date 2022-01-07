'use strict'

let myLibrary = JSON.parse(localStorage.getItem('books')) || []

updateLocalStorage() 

let bookCount = 0
class Book {
    constructor(title, author, pages, isRead = false) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
        this.id = bookCount++
    }

    createCard() {
        const books = document.querySelector('.books')
        const div = document.createElement('div')
        const title = document.createElement('p')
        const author = document.createElement('p')
        const pages = document.createElement('p')
        const del = document.createElement('button')
        const readContainer = document.createElement('div')
        let readInput = document.createElement('input')
        const readLabel = document.createElement('label')

        div.classList.add('card')
        title.setAttribute('id', 'book-title')
        author.setAttribute('id', 'book-author')
        pages.setAttribute('id', 'book-pages')
        del.classList.add('delete')
        del.innerText = 'Remove'
        readContainer.classList.add('checkbox')
        readInput.setAttribute('type', 'checkbox')
        readInput.setAttribute('id', 'cb')
        readInput.setAttribute('name', 'cb')

        books.appendChild(div)
        div.appendChild(title)
        div.appendChild(author)
        div.appendChild(pages)
        div.appendChild(del)
        div.appendChild(readContainer)
        readContainer.appendChild(readInput)
        readContainer.appendChild(readLabel)

        title.innerText = this.title
        author.innerText = this.author
        pages.innerText = `${this.pages} pages`
        readInput.checked = this.isRead ? true : false
        readLabel.innerText = 'Have read'

        del.addEventListener('click', () => {
            div.parentNode.removeChild(div)
            removeBookFromLibrary(this.id)
        })
        readInput.addEventListener('click', () => {
            readInput = readInput.checked ? false: true
            myLibrary[this.id].isRead = this.isRead ? false : true
            updateLocalStorage()
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
    toggleBookInfoForm()
    clearForm()
}


function addBookToLibrary() {
    // Add form input to local storage
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = false
    
    const book = new Book(title, author, pages, isRead)
    myLibrary.push(book)
    localStorage.setItem('books', JSON.stringify(myLibrary))
}

function displayLibrary() {
    bookCount = 0
    clearDisplay()
    for (let book of myLibrary) {
        book = new Book(book['title'], book['author'], book['pages'], book['isRead'])
        book.createCard()
    }
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1)
    updateLocalStorage()
}

function updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(myLibrary))
}

function clearForm() {
    document.querySelector('.add-book').reset()
}

function clearDisplay() {
    const books = document.querySelector('.books')
    while (books.firstChild) {
        books.removeChild(books.lastChild)
    }
}