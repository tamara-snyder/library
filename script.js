const books = document.querySelector(".books");

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
    createCard() {
        const div = document.createElement("div");
        const title = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const del = document.createElement("button");
        const read = document.createElement("button");
        del.className = "delete";
        del.innerHTML = "Remove";
        read.className = "read";
        read.innerHTML = "Read";
        books.appendChild(div);
        div.className = "card";
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(del);
        div.appendChild(read);
        title.innerHTML = "<strong>Title: </strong>" + book["title"];
        author.innerHTML = "<strong>Author: </strong>" + book["author"];
        pages.innerHTML = "<strong>Pages: </strong>" + book["pages"];
        del.addEventListener("click", () => div.parentNode.removeChild(div));
        read.addEventListener("click", () => {
            if (read.innerHTML === "Read") {
                read.innerHTML = "Unread";
            } else {
                read.innerHTML = "Read";
            }
        });
    }
}

// Create starter book
let book = new Book("Fahrenheit 451", "Ray Bradbury", 256);
console.log(book[title]);
book.createCard();

const bookForm = document.querySelector(".form-container");
const newBook = document.getElementById("new-book");
newBook.addEventListener("click", () => {
    if (bookForm.style.display === "none") {
        bookForm.style.display = "block";
    } else {
        bookForm.style.display = "none";
    }
});

const submit = document.getElementById("submit");
submit.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    book = new Book(title, author, pages);
    book.createCard();
}