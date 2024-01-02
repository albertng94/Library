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


// Function to create new books:

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}