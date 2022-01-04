import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

async function getBooks() {
  return fetch("/books")
    .then((res) => res.json())
    .then((data) => data);
}

export default function Index() {
  const { data, status } = useQuery<Books>("books", getBooks);

  return (
    <>
      <h2 className="font-bold text-2xl text-gray-900 pb-4">Books</h2>

      {status === "error" ? "There was an error" : null}
      {status === "loading" ? "loading" : null}
      {status === "success" ? (
        <ul className="space-y-2">
          {data?.map((book) => {
            return (
              <li key={book.uuid}>
                <Link
                  className="flex justify-between p-2 rounded-md transition-colors  hover:bg-gray-300 hover:font-bold"
                  to={`book/${book.uuid}`}
                >
                  {book.name}
                  <span>{`->`}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
