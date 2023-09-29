import { url, methods } from "../variables";

export function test() {
  fetch("http://localhost:3900/api/test")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}

export async function getBooks() {
  const res = await fetch(url + methods.book);

  if (!res.ok) {
    throw new Error(`Ha ocurrido un error ${res.status}`);
  }

  const data = await res.json();

  return data;
}

export async function saveBook({ title, author, pages, readed }) {
  const book = JSON.stringify({
    title: title,
    author: author,
    pages: pages,
    readed: readed,
    image: null,
  });

  const res = await fetch(url + methods.book, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: book,
  });

  if (!res.ok) {
    throw new Error("Ha ocurrido un error al guardar el libro");
  }

  const data = await res.json();

  return data;
}

export async function deleteBook(id) {
  const res = await fetch(url + methods.book + `/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el libro");
  }

  const data = await res.json();

  return data;
}
