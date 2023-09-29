/* eslint-disable react/prop-types */

import "../css/Book.css";

import { useState } from "react";

import { deleteBook } from "../services/books";

export default function Book({
  title,
  author,
  pages,
  readed,
  index,
  bg,
  id,
  deleteUpdate,
}) {
  const [readedPages, setReadedPages] = useState(readed);

  const percentageReaded = (readedPages / pages) * 100;

  const percentageColorGreen = percentageReaded * 2.55 + 50;
  const percentageColorRed = 255 - percentageReaded * 2 + 50;

  const handleChange = (e) => {
    const newReadedPages = e.target.value;
    if (newReadedPages > pages)
      return alert("No puedes leer mas paginas de las que tiene el libro");
    setReadedPages(e.target.value);
  };

  return (
    <tr className={bg}>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{author}</td>
      <td>{pages}</td>
      <td>
        <input
          type="text"
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
