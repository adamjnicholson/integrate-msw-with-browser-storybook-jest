import React from "react";

import { Route, Routes } from "react-router-dom";

import {
  render,
  screen,
  waitForElementToBeRemoved,
  userEvent,
} from "../../jest/test-utils";
import { db } from "../mocks/db";

import BookDetails from "./BookDetails";
import { WithBooks } from "./Home.stories";

it("displays links to all books", async () => {
  const books = db.book.findMany({ where: {} });
  const firstBook = books[0];
  const lastBook = books[books.length - 1];

  render(
    <Routes>
      <Route path="/" element={<WithBooks />} />
      <Route path="book/:uuid" element={<BookDetails />} />
    </Routes>
  );

  await waitForElementToBeRemoved(() => screen.queryByText("loading"));

  const firstBookLink = screen.getByRole("link", {
    name: `${firstBook.name} ->`,
  });
  screen.getByRole("link", { name: `${lastBook.name} ->` });

  userEvent.click(firstBookLink);

  await waitForElementToBeRemoved(() => screen.queryByText("loading"));

  screen.getByRole("heading", { name: firstBook.name });
});
