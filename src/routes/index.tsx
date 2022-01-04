import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

async function getBooks() {
  return fetch("/books")
    .then((res) => res.json())
    .then((data) => data);
}

export default function Index() {
  const { data, status } = useQuery<Book[]>("books", getBooks);

  return (
    <>
      <h2 className="font-bold text-2xl text-gray-900 pb-4">Books</h2>

      {status === "error" ? "There was an error" : null}
      {status === "loading" ? "loading" : null}
      {status === "success" ? (
        <ul className="space-y-2">
          {data?.map((book) => {
            return (
              <li>
                <Link
                  className="block p-2 hover:bg-gray-300 rounded-md transition-colors"
                  to={`students/${book.uuid}`}
                >
                  {book.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
