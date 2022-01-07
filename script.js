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
        const edit = document.createElement('div')
        const title = document.createElement('p')
        const author = document.createElement('p')
        const pages = document.createElement('p')
        const del = document.createElement('button')
        const readContainer = document.createElement('div')
        const readLabel = document.createElement('label')
        let readInput = document.createElement('input')

        div.classList.add('card')
        edit.classList.add('edit')
        title.setAttribute('id', 'book-title')
        author.setAttribute('id', 'book-author')
        pages.setAttribute('id', 'book-pages')
        del.classList.add('delete')
        readContainer.classList.add('checkbox')
        readInput.setAttribute('type', 'checkbox')
        readInput.setAttribute('id', 'cb')
        readInput.setAttribute('name', 'cb')
        readLabel.setAttribute('for', 'have-read')
        readLabel.setAttribute('id', 'have-read')

        books.appendChild(div)
        div.appendChild(title)
        div.appendChild(author)
        div.appendChild(pages)
        div.appendChild(edit)
        edit.appendChild(del)
        edit.appendChild(readContainer)
        readContainer.appendChild(readInput)
        readContainer.appendChild(readLabel)

        title.innerText = this.title
        author.innerText = this.author
        pages.innerText = `${this.pages} pages`
        del.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>'
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