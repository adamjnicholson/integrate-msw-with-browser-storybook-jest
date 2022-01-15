import React from "react";

import { Route, Routes } from "react-router-dom";

import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from "../../jest/test-utils";
import { getModelInstance } from "../mocks/db";

import BookDetails from "./BookDetails";
import { CreateBookPage } from "./CreateBook.stories";

it("creates a new book", async () => {
  render(
    <Routes>
      <Route path="/book/create" element={<CreateBookPage />} />
      <Route path="book/:uuid" element={<BookDetails />} />
    </Routes>,
    { route: "/book/create" }
  );

  const heading = screen.getByRole("heading", { name: /Add New Book/i });

  const newBook = getModelInstance("book", "uuid");

  await userEvent.type(
    screen.getByRole("textbox", {
      name: /book name/i,
    }),
    newBook.name
  );

  await userEvent.type(
    screen.getByRole("spinbutton", {
      name: /rating/i,
    }),
    newBook.rating.toString()
  );

  await userEvent.type(
    screen.getByRole("textbox", {
      name: /review/i,
    }),
    newBook.review
  );

  userEvent.click(
    screen.getByRole("button", {
      name: /create new book/i,
    })
  );

  await waitForElementToBeRemoved(heading);

  await waitForElementToBeRemoved(() => screen.queryByText("loading"));

  screen.getByRole("heading", { name: newBook.name });
});
