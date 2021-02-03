import * as mdb from 'mdb-ui-kit';

//  --  Get inputs  --

const title = document.querySelector('.from__title');
const author = document.querySelector('.from__author');
var category = document.querySelector('.from__category');
const priority = document.querySelector('.from__priority');
const submit = document.querySelector('.from__submit');
const newCategoryName = document.querySelector('.newCategoryName');

//  --  Get buttons  --

const print = document.querySelector('.print');
const loadButton = document.querySelector('.load');
const saveButton = document.querySelector('.save');
const newCategory = document.querySelector('.newCategory');
saveButton.onclick = saveBooks;

//  --  Get table  --

const table = document.querySelector('.table__body');

//  --  Save inputs  --

let bookTitle = '';
let bookAuthor = '';
let bookCategory = '';
let bookPriority = '';
let bookArray = [];
let newName = '';
let book = {
  bookTitle: '',
  bookAuthor: '',
  bookCategory: '',
  bookPriority: '',
};

//  -- Table elements  --

let row;
let cell1;
let cell2;
let cell3;
let cell4;
let cell5;
let deleteButton;

//  --  New category values ---

var category;
let cat;

//  --  Table of book  --

let bookTable;

//  --  Load variable  --

let load;

//  --  Events  --

//  --   Get title  --
title.addEventListener('keyup', (event) => {
  bookTitle = event.target.value;
});

//  --   Get author  --
author.addEventListener('keyup', (event) => {
  bookAuthor = event.target.value;
});

//  --   Get category  --
category.addEventListener('change', (event) => {
  bookCategory = event.target.value;
});

//  --   Get priority  --
priority.addEventListener('change', (event) => {
  bookPriority = event.target.value;
});

//  --   Add new book  --
submit.addEventListener('click', (event) => {
  row = document.createElement('tr');
  row.classList.add('book');
  cell1 = document.createElement('td');
  cell2 = document.createElement('td');
  cell3 = document.createElement('td');
  cell4 = document.createElement('td');
  cell5 = document.createElement('td');
  deleteButton = document.createElement('button');

  cell1.innerText = bookTitle;
  cell2.innerText = bookAuthor;
  cell3.innerText = bookCategory;
  cell4.innerText = bookPriority;
  deleteButton.innerText = 'delete';
  deleteButton.classList.add('button');
  deleteButton.classList.add('delete');
  deleteButton.onclick = deleteItem;

  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  row.appendChild(cell4);
  row.appendChild(cell5);
  cell5.appendChild(deleteButton);

  table.appendChild(row);

  title.value = '';
  author.value = '';
  category.value = '-Choice-';
  priority.value = '-Choice-';
});

//  --  Print  --
print.addEventListener('click', (event) => {
  window.frames.print_frame.document.body.innerHTML = document.getElementById(
    'tableToPrint'
  ).innerHTML;
  window.frames.print_frame.window.focus();
  window.frames.print_frame.window.print();
});

//  --   Load books  --
loadButton.addEventListener('click', (event) => {
  load = JSON.parse(localStorage.getItem('book'));
  load.map((element) => {
    row = document.createElement('tr');
    row.classList.add('book');
    cell1 = document.createElement('td');
    cell2 = document.createElement('td');
    cell3 = document.createElement('td');
    cell4 = document.createElement('td');
    cell5 = document.createElement('td');
    deleteButton = document.createElement('button');

    cell1.innerText = element.bookTitle;
    cell2.innerText = element.bookAuthor;
    cell3.innerText = element.bookCategory;
    cell4.innerText = element.bookPriority;
    deleteButton.innerText = 'delete';
    deleteButton.classList.add('button');
    deleteButton.classList.add('delete');
    deleteButton.onclick = deleteItem;

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    cell5.appendChild(deleteButton);

    table.appendChild(row);
  });
  loadButton.classList.add('hide');
});

//  --  Get new category name  --
newCategoryName.addEventListener('keyup', (event) => {
  newName = event.target.value;
});

//  --  Create new category  --
newCategory.addEventListener('click', (event) => {
  event.preventDefault();
  category = document.querySelector('.from__category');
  cat = document.createElement('option');
  cat.value = newName;
  cat.innerText = newName;
  newCategoryName.value = '';
  category.appendChild(cat);
});

//  --  Save books function  --
function saveBooks() {
  localStorage.removeItem('book');
  bookTable = document.querySelectorAll('.book');
  for (let i = 0; i < bookTable.length; i++) {
    bookTitle = bookTable[i].children[0].innerText;
    bookAuthor = bookTable[i].children[1].innerText;
    bookCategory = bookTable[i].children[2].innerText;
    bookPriority = bookTable[i].children[3].innerText;
    book = {
      bookTitle,
      bookAuthor,
      bookCategory,
      bookPriority,
    };
    bookArray.push(book);

    localStorage.setItem('book', JSON.stringify(bookArray));
  }
  bookArray = [];
}

//  --  Delete books function  --
function deleteItem(event) {
  event.target.parentElement.parentElement.remove();
  saveBooks();
}

export default {
  mdb,
};
