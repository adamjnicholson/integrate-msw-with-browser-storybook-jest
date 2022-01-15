import React from "react";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { BookDetailsInfo } from "../modules/book";
import { Book } from "../types";

async function getBook(uuid: string) {
  return fetch(`/book/${uuid}`)
    .then((res) => res.json())
    .then((data) => data);
}

export default function BookDetails() {
  const { uuid } = useParams();
  const { data, status } = useQuery<Book>([`book-${uuid}`], () =>
    getBook(uuid ?? "")
  );

  return (
    <>
      {status === "error" ? "There was an error" : null}
      {status === "loading" ? "loading" : null}
      {status === "success" ? <BookDetailsInfo book={data} /> : null}
    </>
  );
}
