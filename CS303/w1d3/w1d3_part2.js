"use strict";
let viewMode = "title";
const library = [
  {
    title: 'The Road Ahead',
    author: 'Bill Gates',
    libraryID: 1254
  },
  {
    title: 'Walter Isaacson',
    author: 'Steve Jobs',
    libraryID: 4264
  },
  {
    title: 'Mockingjay: The Final Book of The Hunger Games',
    author: 'Suzanne Collins',
    libraryID: 3245
  }];

/**
 * Event handler for click event of "Add Book" button
 * Get data from user input fields
 * Create book object
 * Add book object to the library
 * Refresh list of books
 */
function onAddBook() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let id = document.getElementById("libraryId").value;
  library.push({ title: title, author: author, libraryID: id });
  updateBookList();
}
/**
 * Update display of books based on global variable setting of viewMode
 * Retrieve relevent data from library (titles/authors/ids)
 * Sort data accordingly
 * Display to user in textarea
 */
function updateBookList() {
  // retrieve data from library
  const output = [];
  for (let i = 0; i < library.length; i++) {
    output.push(library[i][viewMode]);
  }

  // according to type of data, sort data to show 
  if (viewMode == "libraryID") {
    output.sort((a, b) => a - b);
  } else {
    output.sort();
  }
  // display data in textarea
  document.getElementById("books").value = output.join("\n");
}

/**
 * Event handler for click event of view buttons
 * Set view mode based on input
 * Refresh list of books
 * @param {string} view key for mode of viewing the table
 */
function onViewButtonClick(view) {
  viewMode = view;
  updateBookList();
}

