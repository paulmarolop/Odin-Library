const myLibrary = [];

function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks(){
    let booksContainer = document.getElementById('books');
    // Clear existing books display before adding new ones
    booksContainer.innerHTML = '';
    
    // Only create and display the table if there are books in the library
    if(myLibrary.length > 0) {
        // Create table element
        let table = document.createElement('table');
        
        // Create table header
        let tableHeader = document.createElement('thead');
        tableHeader.innerHTML = `
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Pages</th>
                <th>Read Status</th>
                <th>Actions</th>
            </tr>
        `;
        table.appendChild(tableHeader);
        
        // Create table body
        let tableBody = document.createElement('tbody');
        
        // Add each book as a row in the table
        for(let i = 0; i < myLibrary.length; i++){
            let row = document.createElement('tr');
            // Add the book's ID as a data attribute for easier reference
            row.dataset.bookId = myLibrary[i].id;
            
            // Create cells for book data
            let titleCell = document.createElement('td');
            titleCell.textContent = myLibrary[i].title;
            
            let authorCell = document.createElement('td');
            authorCell.textContent = myLibrary[i].author;
            
            let pagesCell = document.createElement('td');
            pagesCell.textContent = myLibrary[i].pages;
            
            let readCell = document.createElement('td');
            readCell.textContent = myLibrary[i].read ? 'Read' : 'Not Read';
            
            let actionsCell = document.createElement('td');
            
            // Create remove button
            let removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove');
            removeBtn.addEventListener('click', () => {
                // Use the book's unique ID to find and remove it
                const bookId = myLibrary[i].id;
                const bookIndex = myLibrary.findIndex(book => book.id === bookId);
                if (bookIndex !== -1) {
                    myLibrary.splice(bookIndex, 1);
                    displayBooks();
                }
            });
            
            // Create toggle read status button
            let readBtn = document.createElement('button');
            readBtn.textContent = 'Toggle Read';
            readBtn.classList.add('read');
            readBtn.addEventListener('click', () => {
                // Use the book's unique ID to find and update it
                const bookId = myLibrary[i].id;
                const book = myLibrary.find(book => book.id === bookId);
                if (book) {
                    book.read = !book.read;
                    displayBooks();
                }
            });
            
            // Add buttons to actions cell
            actionsCell.appendChild(removeBtn);
            actionsCell.appendChild(readBtn);
            
            // Add all cells to the row
            row.appendChild(titleCell);
            row.appendChild(authorCell);
            row.appendChild(pagesCell);
            row.appendChild(readCell);
            row.appendChild(actionsCell);
            
            // Add row to table body
            tableBody.appendChild(row);
        }
        
        // Add table body to table
        table.appendChild(tableBody);
        
        // Add table to books container
        booksContainer.appendChild(table);
    } else {
        // Display a message when there are no books
        let noBooks = document.createElement('p');
        noBooks.textContent = 'No books in your library yet. Add a book using the form above.';
        booksContainer.appendChild(noBooks);
    }
}

let form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let read = document.getElementById('read');
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayBooks();
    form.reset();
});