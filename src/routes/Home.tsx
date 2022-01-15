import React from "react";

import { useQuery } from "react-query";

import { AddNewBookButton, BookDetailsLinkList } from "../modules/book";
import { Heading } from "../modules/ui";
import { Books } from "../types";

async function getBooks() {
  return fetch("/books")
    .then((res) => res.json())
    .then((data) => data);
}

export default function Index() {
  const { data, status } = useQuery<Books>("books", getBooks);

  return (
    <>
      <Heading as="h2">Books</Heading>

      {status === "error" ? "There was an error" : null}
      {status === "loading" ? "loading" : null}
      {status === "success" ? <BookDetailsLinkList books={data ?? []} /> : null}
      <AddNewBookButton to="/book/create">Add new book</AddNewBookButton>
    </>
  );
}
