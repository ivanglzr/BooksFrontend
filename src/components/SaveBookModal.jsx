/* eslint-disable react/prop-types */
import "../css/BookModal.css";

import validateString from "../logic/validateString";
import validateNumber from "../logic/validateNumber";

import { saveBook } from "../services/books";

import Swal from "sweetalert2";

export default function SaveBookModal({ setModal }) {
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

    saveBook({ title, author, pages, readed })
      .then((book) => {
        console.log(book);

        Swal.fire("Book added", "Book added correctly", "success");
      })
      .catch((err) => console.log(err))
      .finally(() => setModal());
  };

  return (
    <div id="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Save Book</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input type="text" name="author" id="author" />
        </div>
        <div className="number-form-group">
          <div>
            <label htmlFor="title">Pages</label>
            <input type="number" name="pages" id="pages" />
          </div>
          <div>
            <label htmlFor="title">Readed</label>
            <input type="number" name="readed" id="readed" />
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
