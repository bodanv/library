// CONSTANTS
const addBtn = document.getElementById("add");
const addBook = document.getElementById("add-book");
const modal = document.getElementById("new-book-container");
let deleteButtons;
let readStatus;
let localBooks = JSON.parse(localStorage.getItem("books"));
let books = [];
if (localBooks !== null) {
  console.log(localBooks);
  localBooks.forEach((localBook) => {
    books.push(
      new Book(
        localBook.title,
        localBook.author,
        localBook.pages,
        localBook.read
      )
    );
  });
}

// FUNCTIONS
const openModal = () => {
  addBtn.classList.add("active");
  modal.classList.add("visible");
};

const closeModal = () => {
  addBtn.classList.remove("active");
  modal.classList.remove("visible");
};

const colorRead = (e) => {
  const title = e.currentTarget.parentNode.parentNode.previousElementSibling.innerHTML.trim();
  if (e.currentTarget.checked) {
    e.currentTarget.parentNode.parentNode.classList.add("read");
    e.currentTarget.parentNode.parentNode.classList.remove("not-read");
    books.forEach((book) => {
      if (book.title == title) {
        book.read = true;
      }
    });
  } else {
    e.currentTarget.parentNode.parentNode.classList.add("not-read");
    e.currentTarget.parentNode.parentNode.classList.remove("read");
    books.forEach((book) => {
      if (book.title == title) {
        book.read = false;
      }
    });
  }
  localStorage.setItem("books", JSON.stringify(books));
};

const deleteBook = (e) => {
  const bookNode = e.currentTarget.parentNode.parentNode.parentNode;
  const title = bookNode.firstChild.innerHTML.trim();
  books = books.filter((book) => book.title !== title);
  bookNode.parentNode.removeChild(bookNode);
  localStorage.setItem("books", JSON.stringify(books));
};

const newBook = (title, author, pages, read) => {
  books.push(new Book(title, author, pages, read));
};

// OBJECTS
function Book(bookTitle, bookAuthor, bookPages, bookRead) {
  this.title = bookTitle;
  this.author = bookAuthor;
  this.pages = bookPages;
  this.read = bookRead;
}

const addNewBookCard = (title, author, pages, read) => {
  let newChild = document.createElement("div");
  newChild.classList.add("book-card");
  newChild.innerHTML = `<h2 class="book-title">
    ${title}
  </h2>
  <div class="book-info ${read ? "read" : "not-read"}">
    <div>
      <p>Author: ${author}</p>
      <p>Pages: ${pages}</p>
    </div>
    <div class="bottom-row">
      <input type="checkbox" class="read-status" ${
        read ? "checked" : ""
      }> Read?</input>
      <button class="delete">Delete</button>
    </div>
  <div>
  `;
  document.getElementsByClassName("books-container")[0].appendChild(newChild);
};

const updateReadStatus = () => {
  readStatus = Array.from(document.getElementsByClassName("read-status"));
  readStatus.forEach((checkbox) => {
    checkbox.addEventListener("click", colorRead);
  });
  localStorage.setItem("books", JSON.stringify(books));
};

const updateDeleteStatus = () => {
  deleteButtons = Array.from(document.getElementsByClassName("delete"));
  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", deleteBook);
  });
  localStorage.setItem("books", JSON.stringify(books));
};

addBtn.addEventListener("click", (e) => {
  if (addBtn.classList.contains("active")) {
    closeModal();
  } else {
    openModal();
    document.body.addEventListener("keyup", function handleEsc(e) {
      if (e.key === "Escape") {
        closeModal();
        document.body.removeEventListener("keyup", handleEsc);
      }
    });
    window.addEventListener("click", function handleClick(e) {
      if (e.target === modal) {
        closeModal();
        document.body.removeEventListener("keyup", handleClick);
      }
    });
  }
});

addBook.addEventListener("click", (e) => {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;
  addNewBookCard(title, author, pages, read);
  newBook(title, author, pages, read);
  localStorage.setItem("books", JSON.stringify(books));
  closeModal();
  e.preventDefault();
  readStatus.forEach((checkbox) => {
    checkbox.removeEventListener("click", colorRead);
  });
  updateReadStatus();
  updateDeleteStatus();
});

if (books !== null) {
  books.forEach((book) => {
    if (book !== null) {
      addNewBookCard(book.title, book.author, book.pages, book.read);
    }
  });
}
updateReadStatus();
updateDeleteStatus();
