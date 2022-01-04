import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

async function getBook(uuid: string) {
  return fetch(`/book/${uuid}`)
    .then((res) => res.json())
    .then((data) => data);
}

export default function Book() {
  const { uuid } = useParams();
  const { data, status } = useQuery<Book>([`book-${uuid}`], () =>
    getBook(uuid ?? "")
  );

  if (status === "error") {
    return <div>There was an error</div>;
  }

  if (status === "loading") {
    return <div>loading...</div>;
  }

  return (
    <>
      <h2 className="font-bold text-2xl text-gray-900 pb-4">{data?.name}</h2>
      <h3 className="font-bold text-xl text-gray-900">Rating</h3>
      <p>{data?.rating}</p>
      <h3 className="font-bold text-xl text-gray-900 pt-2">Review</h3>
      <p>{data?.review}</p>
      <Link className="pt-4 block font-bold" to="/">
        {`<-`} Back
      </Link>
    </>
  );
}
