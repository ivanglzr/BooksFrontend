/* eslint-disable react/prop-types */
import "../css/BookModal.css";

import validateString from "../logic/validateString";
import validateNumber from "../logic/validateNumber";

import { updateBook } from "../services/books";

import Swal from "sweetalert2";
import { useState } from "react";

export default function EditBookModal({
  setModal,
  title,
  author,
  pages,
  readed,
  id,
}) {
  const [book, setBook] = useState({
    title: title,
    author: author,
    pages: pages,
    readed: readed,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let { title, author, pages, readed } = Object.fromEntries(
      new FormData(e.target)
    );

    pages = parseInt(pages);
    readed = parseInt(readed);

    if (
      !validateString(title) ||
      !validateString(author) ||
      !validateNumber(pages) ||
      !validateNumber(readed)
    )
      return alert("Los datos no son validos");

    updateBook({
      id: id,
      title: title,
      author: author,
      pages: pages,
      readed: readed,
    })
      .then((book) => {
        console.log(book);

        Swal.fire("Book updated", "Book updated correctly", "success");
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setModal({ id: "123", title: "", author: "", pages: 0, readed: 0 })
      );
  };

  const handleChange = (e) => {
    setBook((prevState) => {
      return {
        ...prevState,
        [e.target.dataset.name]: e.target.value,
      };
    });
  };

  return (
    <div id="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Update Book</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            data-name="title"
            onChange={handleChange}
            id="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            data-name="author"
            onChange={handleChange}
            id="author"
          />
        </div>
        <div className="number-form-group">
          <div>
            <label htmlFor="title">Pages</label>
            <input
              type="number"
              name="pages"
              value={book.pages}
              data-name="pages"
              onChange={handleChange}
              id="pages"
            />
          </div>
          <div>
            <label htmlFor="title">Readed</label>
            <input
              type="number"
              name="readed"
              value={book.readed}
              data-name="readed"
              onChange={handleChange}
              id="readed"
            />
          </div>
        </div>

        <button type="submit" className="btn">
          Submit
        </button>

        <button id="close-modal" onClick={setModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </form>
    </div>
  );
}
