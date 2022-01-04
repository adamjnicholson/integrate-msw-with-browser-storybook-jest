import { rest } from "msw";
import { db } from "./db";

export const handlers = [
  rest.get("/books", (req, res, ctx) => {
    const books = db.book.findMany({});

    return res(
      ctx.status(201),
      ctx.json(
        books.map(({ name, uuid }) => ({
          name,
          uuid,
        }))
      )
    );
  }),
];
