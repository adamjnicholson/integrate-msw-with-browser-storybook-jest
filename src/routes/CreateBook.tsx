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

    // get the values for each input
    const nameInput = e.currentTarget.bookName;
    const ratingInput = e.currentTarget.rating;
    const reviewInput = e.currentTarget.review;


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
