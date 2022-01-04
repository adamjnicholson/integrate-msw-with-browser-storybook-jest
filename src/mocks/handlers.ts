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
  rest.get("/book/:uuid", (req, res, ctx) => {
    const { uuid } = req.params;
    const book = db.book.findFirst({
      where: {
        uuid: {
          equals: Array.isArray(uuid) ? uuid[0] : uuid,
        },
      },
    });

    if (book) {
      return res(ctx.status(201), ctx.json(book));
    }

    return res(ctx.status(404));
  }),
];
