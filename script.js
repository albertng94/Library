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


// Add new book to library and display book cards each time the necessary button is clicked. Increment bookCount. Update stats information.

const executeNewBookCreation = (function() {

    const submitBookButton = document.getElementById("submit-book");
    const bookTitle = document.getElementById("title");
    const bookAuthor = document.getElementById("author");
    const bookPages = document.getElementById("pages");

    submitBookButton.addEventListener("click", () => {
        if ((bookPages.value) && (bookPages.checkValidity() === false)) {
            alert("The pages camp requires an integer number");
            bookPages.value = "";
        } else if ((bookTitle.value == false) || (bookAuthor.value == false) || (bookPages.value == false)) {
            alert("All camps with the * symbol must be filled to create the book.");
        } else {
            // "createNewBookCard" executes "pushNewBookArray" (pushes the current book into "myLibrary" array) and creates the book card in the DOM.
            createNewBookCard();
            booksCount++;
        }
    });

})();


// Delete book selected by user from myLibrary array and the display. Decrease "booksCount" variable by one to keep track of the current number of books. Update stats information.

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


// Change read status of bookObject/Card on button click. Upate stats accordingly.

function changeReadStatus(e) {

    const bookCardId = e.target.parentNode.id;
    const readButton = e.target;

    if (readButton.textContent === "Read") {
        readButton.textContent = "In progress...";
        readButton.style.backgroundColor = "rgb(150, 170, 236)";
        myLibrary[bookCardId].read = "In progress...";
        readButton.id = "inprogress-button";

    } else {
        readButton.textContent = "Read";
        readButton.style.backgroundColor = "rgb(146, 209, 172)";
        myLibrary[bookCardId].read = "Read";
        readButton.id = "read-button";
    }

}


// Open stats dialog box

const openStatsDialog = (function() {

    const statsButton = document.getElementById("stats");
    const statsDialog = document.getElementById("stats-dialog");

    statsButton.addEventListener("click", () => {
        updateStats();
        statsDialog.showModal();
    })


})();

// Close stats dialog box

const closeStatsDialog = (function() {

    const closeStats = document.getElementById("close-stats");
    const statsDialog = document.getElementById("stats-dialog");

    closeStats.addEventListener("click", () => {
        statsDialog.close();
    })
})();

// .................................................................................................................







// ................................ GLOBAL VARIABLES ...............................................................

// Array myLibrary stores all book objects (A new book is added when "executeNewBookCreation" and the book selected by user is deleted when "executeBookDeletion()"" is executed instead). 
// Variable booksCount keeps track of the current number of books (is incremented when "executeNewBookCreation" is executed and decremented when "executeBookDeletion()"" is executed).

let myLibrary = [];
let booksCount = 0;

// .................................................................................................................






// ............................. FUNCTIONS USED BY MAIN FUNCTION ...................................................


// Book Object Constructor - stores the basic information to be added from each book (Used by function "pushBookToArray").

function book(bookTitle, bookAuthor, bookPages, bookRead) {

    function capitalize (str) {
        return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    const title = `${capitalize(bookTitle)}`;
    const author = `By ${capitalize(bookAuthor)}`;
    const pages = `${bookPages} pages`;
    const read = bookRead === true ? "Read" : "In progress...";
    const statsPages = Number(bookPages);

    return {title, author, pages, read, statsPages};
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
    readButton.classList.add("readButton");
    readButton.setAttribute("onclick", "changeReadStatus(event)")
    deleteIconDiv.setAttribute("onclick", "executeBookDeletion(event)");
    deleteIconDiv.classList.add("deleteIconDiv");

    // Add a different background color to the readButton depending on its value
    if (bookCard.read === "Read") {
        readButton.style.backgroundColor = "rgb(146, 209, 172)";
        readButton.setAttribute("id", "read-button");            
    } else {
        readButton.style.backgroundColor = "rgb(150, 170, 236)";
        readButton.setAttribute("id", "inprogress-button"); 
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


// Attach and update stats content to the stats dialog (Used by functions "executeNewBookCreation" and "executeBookDeletion").

function updateStats() {


    let totalBooksRead = 0;
    let totalBooksInProgress = 0;
    let totalPages = 0;


    myLibrary.forEach(element => {
        if (element.read === "Read") {
            totalBooksRead++;
        } else if (element.read === "In progress...") {
            totalBooksInProgress++;
        }
        totalPages += element.statsPages;
    });

    const totalBooksDiv = document.getElementById("totalBooks");
    const totalBooksPresentation = document.getElementById("total-books");
    const totalReadDiv = document.getElementById("totalRead");
    const totalReadPresentation = document.getElementById("books-read");
    const totalInProgressDiv = document.getElementById("totalInProgress");
    const totalInProgressPresentation = document.getElementById("books-in-progress");
    const totalPagesDiv = document.getElementById("totalPages");
    const totalPagesPresentation = document.getElementById("pages-read");
    const noStatsDiv1 = document.getElementById("no-stat1");
    const noStatsDiv2 = document.getElementById("no-stat2");


    if ((totalBooksRead === 0) && (totalBooksInProgress === 0) && (totalPages === 0)) {
        noStatsDiv1.textContent = "Sorry!";
        noStatsDiv2.textContent = "There are no books created yet...";
        totalBooksPresentation.textContent = "";
        totalBooksDiv.textContent = ``;
        totalReadPresentation.textContent = "";
        totalReadDiv.textContent = ``;
        totalInProgressPresentation.textContent = "";
        totalInProgressDiv.textContent = ``;
        totalPagesPresentation.textContent = "";
        totalPagesDiv.textContent = ``;
    } else {
        noStatsDiv1.textContent = "";
        noStatsDiv2.textContent = "";
        totalBooksPresentation.textContent = "Total Books";
        totalBooksDiv.textContent = `${booksCount}`;
        totalReadPresentation.textContent = "Books Read";
        totalReadDiv.textContent = `${totalBooksRead}`;
        totalInProgressPresentation.textContent = "Books In Progress";
        totalInProgressDiv.textContent = `${totalBooksInProgress}`;
        totalPagesPresentation.textContent = "Pages Read";
        totalPagesDiv.textContent = `${totalPages}`;

        totalBooksPresentation.classList.add("stat-presentation");
        totalReadPresentation.classList.add("stat-presentation");
        totalInProgressPresentation.classList.add("stat-presentation");
        totalPagesPresentation.classList.add("stat-presentation");
    }

}

