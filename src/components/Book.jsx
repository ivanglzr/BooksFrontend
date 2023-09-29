/* eslint-disable react/prop-types */

import "../css/Book.css";

import { useState, useCallback } from "react";

import { deleteBook } from "../services/books";

import { updateBook } from "../services/books";

import debounce from "just-debounce-it";

export default function Book({
  title,
  author,
  pages,
  readed,
  index,
  bg,
  id,
  deleteUpdate,
  setShowUpdateModal,
}) {
  const [readedPages, setReadedPages] = useState(readed);

  const percentageReaded = (readedPages / pages) * 100;

  const percentageColorGreen = percentageReaded * 2.55 + 50;
  const percentageColorRed = 255 - percentageReaded * 2 + 50;

  const debouncedUpdateReaded = useCallback(
    debounce((readedPages) => {
      updateBook({
        id: id,
        title: title,
        author: author,
        pages: pages,
        readed: readedPages,
      });
      console.log(readedPages);
    }, 1000),
    []
  );

  const handleChange = (e) => {
    const newReadedPages = e.target.value;
    if (newReadedPages > pages)
      return alert("No puedes leer mas paginas de las que tiene el libro");
    setReadedPages(newReadedPages);
    debouncedUpdateReaded(newReadedPages);
  };

  return (
    <tr className={bg}>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{author}</td>
      <td>{pages}</td>
      <td>
        <input
          type="number"
          name="readedPages"
          autoComplete="off"
          value={readedPages}
          onChange={handleChange}
        />
      </td>
      <td
        style={{
          color: `rgb(${percentageColorRed}, ${percentageColorGreen}, 0)`,
        }}
      >
        {Math.round(percentageReaded)}%
      </td>
      <td>
        <button>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() =>
              setShowUpdateModal({
                title: title,
                author: author,
                pages: pages,
                readed: readed,
                id: id,
              })
            }
          ></i>
        </button>
        <button
          onClick={() => {
            deleteBook(id);
            deleteUpdate(index);
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
