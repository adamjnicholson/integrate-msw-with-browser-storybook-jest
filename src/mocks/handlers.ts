import { rest } from "msw";
import { db } from "./db";

export const getBooks = rest.get("/books", (req, res, ctx) => {
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
});

export const getBookDetails = rest.get("/book/:uuid", (req, res, ctx) => {
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
});

export const createBook = rest.post<string>("/book/new", (req, res, ctx) => {
  const { name, rating, review } = JSON.parse(req.body);

  const book = db.book.create({
    name,
    review,
    rating,
  });

  return res(ctx.status(200), ctx.json(book));
});

export const handlers = [getBooks, getBookDetails, createBook];
