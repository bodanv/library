const addBtn = document.getElementById("add");
const modal = document.getElementById("new-book-container")
let readStatus = Array.from(document.getElementsByClassName("read-status"));

const openModal = () => {
  addBtn.classList.add("active");
  modal.classList.add("visible");
}

const closeModal = () => {
  addBtn.classList.remove("active");
  modal.classList.remove("visible");
}

function Book(bookTitle, bookAuthor, bookPages, bookRead) {
  this.title = bookTitle;
  this.author = bookAuthor;
  this.pages = bookPages;
  this.read = bookRead;
}

Book.prototype.info = function () {
  return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read?"have read it":"not read yet"}`);
}

readStatus.forEach(checkbox => {
  checkbox.addEventListener('click', e => {
    if(e.currentTarget.checked) {
      e.currentTarget.parentNode.parentNode.classList.add("read");
      e.currentTarget.parentNode.parentNode.classList.remove("not-read");
    } else {
      e.currentTarget.parentNode.parentNode.classList.add('not-read');
      e.currentTarget.parentNode.parentNode.classList.remove('read');
    }
  })
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