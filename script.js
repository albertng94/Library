// Open and close new book dialog box

const addNewBookButton = document.getElementById("new-book-button");
const bookDialog = document.getElementById("new-book-dialog");
const closeBook = document.getElementById("close-book");
const bookForm = document.getElementById("book-form");

addNewBookButton.addEventListener("click", () => {
    bookForm.reset();
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
        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("id", `${counter + 1}`)
        bookDiv.classList.add("grid-item");
        grid.appendChild(bookDiv);

        // Create constants for the 3 divs and the button that will go inside "bookDiv".
        const titleDiv = document.createElement("div");
        const authorDiv = document.createElement("div");
        const pagesDiv = document.createElement("div");
        const readButton = document.createElement("button");
        const deleteImgDiv = document.createElement("div");

        // Give each div within book div its text content, corresponding with the object different property values.
        titleDiv.textContent = `${myLibrary[counter + 1].title}`;
        authorDiv.textContent = `${myLibrary[counter + 1].author}`;
        pagesDiv.textContent = `${myLibrary[counter + 1].pages}`;
        readButton.textContent = `${(myLibrary[counter + 1].read) === true ? "Read" : "Not read"}`;

        // Add id to the divs/button
        titleDiv.setAttribute("id", "titleDiv");
        authorDiv.setAttribute("id", "authorDiv");
        pagesDiv.setAttribute("id", "pagesDiv");
        readButton.setAttribute("id", "readButton");
        deleteImgDiv.setAttribute("id", "deleteImgDiv")

        // Append divs/button as bookDiv childs
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(pagesDiv);
        bookDiv.appendChild(readButton);
        bookDiv.appendChild(deleteImgDiv);

        // Create, add id and append bin img inside "deleteImgDiv"
        const deleteBookImg = document.createElement("img");
        deleteBookImg.setAttribute("src", "");
        deleteBookImg.setAttribute("alt", "an image from a bin");
        deleteImgDiv.appendChild(deleteBookImg);

        // increment counter (keeping track of the exact number of books)
        counter++;
    }
   
});

// submitBookButton solo deberá utilizarse cuando todos los campos del form han sido rellenados correctamente
// Añadir los sub-elementos y el styling para los .grid-item 
// cuando la array se queda con 0 objetos, habrá que hacer un counter-- para volverlo a dejar en -1. No puede quedar en 0.
