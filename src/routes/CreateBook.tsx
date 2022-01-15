import React from "react";

import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { CreateBookForm } from "../modules/book";
import { Heading } from "../modules/ui";

type CreateBookArgs = {
  name: string;
  rating: number;
  review: string;
};

type EventTarget = {
  elements: {
    bookName: { value: string };
    rating: { value: number };
    review: { value: string };
  };
};

async function createBook(book: CreateBookArgs) {
  return fetch("/book/new", {
    method: "POST",
    body: JSON.stringify(book),
  });
}

export default function CreateBook() {
  const { mutate } = useMutation(createBook);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & EventTarget;

    // get the values for each input
    const nameInput = target.elements.bookName;
    const ratingInput = target.elements.rating;
    const reviewInput = target.elements.review;

    // call the createBook function above
    mutate(
      {
        name: nameInput.value,
        rating: ratingInput.value,
        review: reviewInput.value,
      },
      {
        onSuccess: async (res) => {
          const newBook = await res.json().then((data) => data);

          // after successfully creating a new book, navigate
          // to the new book's detail page
          navigate(`/book/${newBook.uuid}`, { replace: true });
        },
      }
    );
  };

  return (
    <>
      <Heading as="h2">Add New Book</Heading>
      <CreateBookForm onSubmit={onSubmit} />
    </>
  );
}
