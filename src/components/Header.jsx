/* eslint-disable react/prop-types */
import "../css/Header.css";

export default function Header({ setModal }) {
  return (
    <header>
      <h1>Book App</h1>
      <button className="btn" onClick={setModal}>
        Add Book
      </button>
    </header>
  );
}
