// CONSTANTS
const addBtn = document.getElementById("add");
const addBook = document.getElementById("add-book");
const modal = document.getElementById("new-book-container")
let books = JSON.parse(localStorage.getItem("books"));

// FUNCTIONS
const openModal = () => {
  addBtn.classList.add("active");
  modal.classList.add("visible");
}

const closeModal = () => {
  addBtn.classList.remove("active");
  modal.classList.remove("visible");
}

const colorRead = e => {
  if(e.currentTarget.checked) {
    e.currentTarget.parentNode.parentNode.classList.add("read");
    e.currentTarget.parentNode.parentNode.classList.remove("not-read");
  } else {
    e.currentTarget.parentNode.parentNode.classList.add('not-read');
    e.currentTarget.parentNode.parentNode.classList.remove('read');
  }
}

const newBook = (title, author, pages, year, read) => {
  books.push(new Book(title, author, pages, year, read));
}

// OBJECTS
function Book(bookTitle, bookAuthor, bookPages, yearPublished, bookRead) {
  this.title = bookTitle;
  this.author = bookAuthor;
  this.pages = bookPages;
  this.year = yearPublished;
  this.read = bookRead;
}


const addNewBookCard = (title, author, pages, published, read) => {
  let newChild = document.createElement('div');
  newChild.classList.add('book-card');
  newChild.innerHTML = `<h2 class="book-title">
    ${title}
  </h2>
  <div class="book-info ${read?'read':'not-read'}">
    <p>Author: ${author}</p>
    <p>Pages: ${pages}</p>
    <p>Year published: ${published}</p>
    <div class="bottom-row">
      <input type="checkbox" class="read-status" ${read?'checked':''}> Read?</input>
      <button class="delete">Delete</button>
    </div>
  </div>
  `
  document.getElementsByClassName("books-container")[0].appendChild(newChild);
}

let readStatus = Array.from(document.getElementsByClassName("read-status"));

readStatus.forEach(checkbox => {
  checkbox.addEventListener('click', colorRead);
})

addBtn.addEventListener("click", e => {
  if (addBtn.classList.contains("active")) {
    closeModal();
  } else {
    openModal();
    document.body.addEventListener('keyup', function handleEsc(e) {
      if (e.key === "Escape") {
        closeModal();
        document.body.removeEventListener('keyup', handleEsc);
      }
    })
    window.addEventListener('click', function handleClick(e) {
      if (e.target === modal) {
        closeModal();
        document.body.removeEventListener('keyup', handleClick);
      }
    })
  }
})

addBook.addEventListener("click", e => {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let published = document.getElementById("year").value;
  let read = document.getElementById("read").checked;
  addNewBookCard(title, author, pages, published, read);
  newBook(title, author, pages, published, read);
  localStorage.setItem("books", JSON.stringify(books))
  closeModal();
  e.preventDefault();
  readStatus.forEach(checkbox => {
    checkbox.removeEventListener("click", colorRead);
  })
  readStatus = Array.from(document.getElementsByClassName("read-status"));
  readStatus.forEach(checkbox => {
  checkbox.addEventListener('click', colorRead);
})
})

books.forEach(book => {
  addNewBookCard(book.title, book.author, book.pages, book.published, book.read);
})
readStatus = Array.from(document.getElementsByClassName("read-status"));
readStatus.forEach(checkbox => {
checkbox.addEventListener('click', colorRead);
})