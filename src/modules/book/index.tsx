import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Books, Book } from "../../types";
import { Button, LinkButton, LinkButtonProps, Form, Input, Textarea, InputGroup } from "../ui";
import { Heading } from "../../modules/ui";

type BookDetailsLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement>;

function BookDetailsLink({ className = "", ...props }: BookDetailsLinkProps) {
  return (
    <Link
      {...props}
      className={`flex justify-between p-2 bg-gray-100 rounded-md transition-colors  hover:bg-gray-300 hover:font-bold ${className}`}
    />
  );
}

type BookDetailsLinkListProps = {
  books: Books
}

export function BookDetailsLinkList({ books }: BookDetailsLinkListProps) {
  return (
    <ul className="space-y-4">
      {books?.map((book) => {
        return (
          <li key={book.uuid}>
            <BookDetailsLink to={`book/${book.uuid}`}>
              {book.name}
              <span>{`->`}</span>
            </BookDetailsLink>
          </li>
        );
      })}
    </ul>
  )
}

export function AddNewBookButton(props: LinkButtonProps) {
  return (
    <div className="pt-8">
      <LinkButton {...props} to="/book/create"  >Add new book</LinkButton>
    </div>
  );
}

type BookDetailsInfoProps = {
  book: Book | undefined
}

//@TODO think of a better name
export function BookDetailsInfo({ book }: BookDetailsInfoProps) {
  if (!book) {
    return null
  }

  return (
    <>
      <Heading as="h2">{book.name}</Heading>
      <h3 className="font-bold text-xl text-gray-900">Rating</h3>
      <p>{book.rating}</p>
      <h3 className="font-bold text-xl text-gray-900 pt-2">Review</h3>
      <p>{book.review}</p>
      <Link className="pt-4 block font-bold" to="/">
        {`<-`} Back
      </Link>
    </>
  )
}

type CreateBookFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function CreateBookForm({ onSubmit }: CreateBookFormProps) {
  return (
    <Form onSubmit={onSubmit}>
      <InputGroup label="Book Name">
        <Input type="text" name="bookName" />
      </InputGroup>
      <InputGroup label="Rating">
        <Input type="number" name="rating" />
      </InputGroup>
      <InputGroup label="Review">
        <Textarea name="review" />
      </InputGroup>
      <Button type="submit">Create new book</Button>
    </Form>
  )
}
