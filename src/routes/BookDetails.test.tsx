import React from "react";

import { Route, Routes } from "react-router-dom";

import {
  render,
  screen,
  waitForElementToBeRemoved,
  userEvent,
} from "../../jest/test-utils";
import { db } from "../mocks/db";

import { BookDetailsPage } from "./BookDetails.stories";
import Home from "./Home";

it("displays links to all books", async () => {
  const book = db.book.findFirst({ where: {} });

  render(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="book/:uuid" element={<BookDetailsPage />} />
    </Routes>,
    {
      route: `/book/${book?.uuid}`,
    }
  );

  await waitForElementToBeRemoved(() => screen.queryByText("loading"));

  screen.getByRole("heading", { name: book?.name });
  screen.getByRole("heading", { name: /rating/i });
  screen.getByText(book?.rating ?? "");
  screen.getByRole("heading", { name: /review/i });
  screen.getByText(book?.review ?? "");

  userEvent.click(
    screen.getByRole("link", {
      name: /<- back/i,
    })
  );

  await waitForElementToBeRemoved(() => screen.queryByText("loading"));

  screen.getByRole("heading", { name: /books/i });
});
