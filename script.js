// Open and close new book dialog box

const addNewBookButton = document.getElementById("new-book-button");
const bookDialog = document.getElementById("new-book-dialog");
const closeBook = document.getElementById("close-book");

addNewBookButton.addEventListener("click", () => {
    console.log("modal opened");
    bookDialog.showModal();
});

closeBook.addEventListener("click", () => {
    bookDialog.close();
});


// Book Object Constructor - stores the basic information to be added from each book.

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Array myLibrary stores all book objects

const myLibrary = [];


// Variables used by the submitBookButton() function.

const submitBookButton = document.getElementById("submit-book");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");
const grid = document.getElementById("grid");


// Counter variable is used by submitBookButton keep track of the books number ((created - deleted)-1)

let counter = -1;


// Add new book to library when the necessary button is clicked
submitBookButton.addEventListener("click", () => {
    // Push new book into myLibrary Array
    myLibrary.push(new book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked));
    // Close dialog
    bookDialog.close();

    // Loop through myLibrary Array
    for (let i = counter; i < myLibrary.length-1; i++) {
        // Create a div, 
        // add an id attribute equal to counter+1 (id is the index of the book within myLibrary Array), 
        // add the class "grid-item" to style the div through css, 
        // append the div, 
        // increment counter (keeping track of the exact number of books)
        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("id", `${counter + 1}`)
        bookDiv.classList.add("grid-item");
        grid.appendChild(bookDiv);
        counter++;
    }
   
});


// Añadir los sub-elementos y el styling para los .grid-item 
// cuando la array se queda con 0 objetos, habrá que hacer un counter-- para volverlo a dejar en -1. No puede quedar en 0.
