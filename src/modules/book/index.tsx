import React from "react";

import { FaStar, FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link, LinkProps } from "react-router-dom";

import { Books, Book } from "../../types";
import {
  Heading,
  Button,
  LinkButton,
  LinkButtonProps,
  Form,
  Input,
  Textarea,
  InputGroup,
} from "../ui";

type BookDetailsLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement>;

function BookDetailsLink({ className = "", ...props }: BookDetailsLinkProps) {
  return (
    <Link
      {...props}
      className={`flex items-center justify-between p-2 bg-gray-100 rounded-md transition-colors  hover:bg-gray-300 hover:font-bold ${className}`}
    />
  );
}

type BookDetailsLinkListProps = {
  books: Books;
};

export function BookDetailsLinkList({ books }: BookDetailsLinkListProps) {
  return (
    <ul className="space-y-4">
      {books?.map((book) => (
        <li key={book.uuid}>
          <BookDetailsLink to={`book/${book.uuid}`}>
            {book.name}
            <FaChevronRight title="right arrow" />
          </BookDetailsLink>
        </li>
      ))}
    </ul>
  );
}

export function AddNewBookButton(props: LinkButtonProps) {
  return (
    <div className="pt-8">
      <LinkButton {...props} to="/book/create">
        <FaPlus title="plus sign" />
        <span className="pl-1">Add new book</span>
      </LinkButton>
    </div>
  );
}

type BookDetailProps = {
  heading: string;
  children: JSX.Element;
  className?: string;
};

function BookDetail({ heading, children, className = "" }: BookDetailProps) {
  return (
    <div className={`flex w-full ${className}`}>
      <div className="w-1/4">
        <Heading as="h3">{heading}</Heading>
      </div>
      <div className="w-full pl-4 pb-2">{children}</div>
    </div>
  );
}

type BookDetailsInfoProps = {
  book: Book | undefined;
};

// @TODO think of a better name
export function BookDetailsInfo({ book }: BookDetailsInfoProps) {
  if (!book) {
    return null;
  }

  const stars = Array(book.rating).fill(null);

  return (
    <>
      <Heading as="h2">{book.name}</Heading>
      <BookDetail heading="Rating" className="items-center">
        <div className="flex w-full  space-x-2 text-purple-500">
          {stars.map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <FaStar key={index} title="star" />
          ))}
        </div>
      </BookDetail>
      <BookDetail heading="Review">
        <div>{book.review}</div>
      </BookDetail>

      <LinkButton to="/" className="mt-8">
        <FaChevronLeft /> <span className="pl-1">Back</span>
      </LinkButton>
    </>
  );
}

type CreateBookFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

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
  );
}
