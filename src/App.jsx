import "./App.css";

import { useState, useEffect } from "react";

import Book from "./components/Book";
import Header from "./components/Header";
import SaveBookModal from "./components/SaveBookModal";

import { getBooks } from "./services/books";

export default function App() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getBooks()
      .then((books) => {
        setBooks(books.book);
        console.log(books);
      })
      .catch((err) => console.log(err));
  }, [showModal]);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const deleteUpdate = (i) => {
    setBooks((prevState) => {
      return prevState.filter((e) => e !== prevState[i]);
    });
  };

  return (
    <>
      <Header setModal={handleClick} />
      <table className={showModal ? "hide-overflow" : ""}>
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Readed</th>
            <th>%</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => {
            const { title, author, pages, readed } = book;

            const id = books[i]._id;

            const bg = i % 2 ? "light-row" : "";

            return (
              <Book
                key={title}
                title={title}
                author={author}
                pages={pages}
                readed={readed}
                bg={bg}
                id={id}
                deleteUpdate={deleteUpdate}
                index={i}
              />
            );
          })}
        </tbody>
      </table>
      {showModal && <SaveBookModal setModal={handleClick} />}
    </>
  );
}
