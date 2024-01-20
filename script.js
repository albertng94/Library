// ................................ MAIN FUNCTIONS ...............................................

// Open new book dialog box on button click

const openNewBookDialog = (function() {

    const addNewBookButton = document.getElementById("new-book-button");
    const bookDialog = document.getElementById("new-book-dialog");
    const bookForm = document.getElementById("book-form");

    addNewBookButton.addEventListener("click", () => {
        bookForm.reset();
        bookDialog.showModal();
    });

})();


// Close new book dialog box on button click

const closeNewBookDialog = (function() {

    const bookDialog = document.getElementById("new-book-dialog");
    const closeBook = document.getElementById("close-book");

    closeBook.addEventListener("click", () => {
        bookDialog.close();
    });

})();


// Add new book to library and display book cards each time the necessary button is clicked

const executeNewBookCreation = (function() {

    const submitBookButton = document.getElementById("submit-book");

    submitBookButton.addEventListener("click", () => {
        // "createNewBookCard" executes "pushNewBookArray" (pushes the current book into "myLibrary" array) and creates the book card in the DOM.
        createNewBookCard();
        console.log(myLibrary);
        booksCount++;
        console.log(booksCount);
    });

})();


// Delete book selected by user from myLibrary array and the display. Decrease "booksCount" variable by one to keep track of the current number of books.

function executeBookDeletion(e) {
    const deleteBookDialog = document.getElementById("delete-book-dialog");
    const confirmDeleteBook = document.getElementById("delete-book-yes");
    const rejectDeleteBook = document.getElementById("delete-book-no");
    const gridItemId = e.target.parentNode.parentNode.id;
    const gridItem = e.target.parentNode.parentNode;

            deleteBookDialog.showModal();

            confirmDeleteBook.addEventListener("click", () => {
                    deleteBookDialog.close();
                    deleteBookFromArray(gridItemId);
                    deleteBookCard(gridItem);
                    booksCount--;
                }, { once: true });

            rejectDeleteBook.addEventListener("click", () => {
                deleteBookDialog.close();
            });
}


// .................................................................................................................







// ................................ GLOBAL VARIABLES ...............................................................

// Array myLibrary stores all book objects (A new book is added when "executeNewBookCreation" and the book selected by user is deleted when "executeBookDeletion()"" is executed instead). 
// Variable booksCount keeps track of the current number of books (is incremented when "executeNewBookCreation" is executed and decremented when "executeBookDeletion()"" is executed).

let myLibrary = [];
let booksCount = 0;

// .................................................................................................................






// ............................. FUNCTIONS USED BY MAIN FUNCTION ...................................................


// Book Object Constructor - stores the basic information to be added from each book (Used by function "pushBookToArray").

function book(title, bookAuthor, bookPages, bookRead) {
    const author = `By ${bookAuthor}`;
    const pages = `${bookPages} pages`;
    const read = bookRead === true ? "Read" : "In progress...";

    return {title, author, pages, read};
}


// Push a new book object to myLibrary Array and close the dialog (used by function "createNewBookCard()").

function pushBookToArray() {

    const bookDialog = document.getElementById("new-book-dialog");
    const bookTitle = document.getElementById("title");
    const bookAuthor = document.getElementById("author");
    const bookPages = document.getElementById("pages");
    const bookRead = document.getElementById("read");
    
    const newBook = book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);   
    myLibrary.push(newBook);
    bookDialog.close();

    return newBook ;
}


// Create as many book cards as book objects has myLibrary Array and add all the necessary elements to them (used by const "executeNewBookCreation").

function createNewBookCard() {

    // Execute function "pushNewBookArray" and save "newBook" (current book object) into variable "bookCard", so its values can be used to add them to the div (to the Book Card)
    const bookCard = pushBookToArray();

    // Create a div, 
    // add an id attribute equal to counter+1 (id is the index of the book within myLibrary Array), 
    // add the class "grid-item" to style the div through css, 
    // append the div, 
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("id", `${booksCount}`)
    bookDiv.classList.add("grid-item");
    grid.appendChild(bookDiv);

    // Create constants for the 3 divs and the button that will go inside "bookDiv".
    const titleDiv = document.createElement("div");
    const authorDiv = document.createElement("div");
    const pagesDiv = document.createElement("div");
    const readButton = document.createElement("button");
    const deleteIconDiv = document.createElement("div");

    // Give each div within book div its text content, corresponding with the object different property values.
    titleDiv.textContent = `${bookCard.title}`;
    authorDiv.textContent = `${bookCard.author}`;
    pagesDiv.textContent = `${bookCard.pages}`;
    readButton.textContent = `${bookCard.read}`;

    // Add id/class to the divs/button
    titleDiv.setAttribute("id", "titleDiv");
    authorDiv.setAttribute("id", "authorDiv");
    pagesDiv.setAttribute("id", "pagesDiv");
    readButton.setAttribute("id", "readButton");
    deleteIconDiv.setAttribute("onclick", "executeBookDeletion(event)");
    deleteIconDiv.classList.add("deleteIconDiv");

    // Add a different background color to the readButton depending on its value
    if (bookCard.read === "Read") {
        readButton.style.backgroundColor = "rgb(133, 211, 166)";            
    } else {
        readButton.style.backgroundColor = "rgb(163, 163, 163)";
    }

    // Append divs/button as bookDiv childs
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pagesDiv);
    bookDiv.appendChild(readButton);
    bookDiv.appendChild(deleteIconDiv);

    // Create, add id and append bin img inside "deleteImgDiv"
    const deleteBookIcon = document.createElement("ion-icon");
    deleteBookIcon.setAttribute("name", "trash-outline");
    deleteIconDiv.appendChild(deleteBookIcon); 

}


// Delete user-selected book from array and re-write the book-card-main-div's id to match the new position number within the array (used by function "executeBookDeletion()").

function deleteBookFromArray(element) {

    myLibrary.splice(element, 1);

    for (let i = element; i <= myLibrary.length; i++) {
        const bookCard = document.getElementById(`${i}`);

        bookCard.id = `${i-1}`;
    }


}


// Delete the user-selected book card from the display (Used by function "executeBookDeletion()").

function deleteBookCard(element) {
        element.remove(); 
}