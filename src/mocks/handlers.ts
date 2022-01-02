import { rest } from "msw";

export const handlers = [
  rest.get("/students", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json([
        {
          uuid: "123",
          name: "student name",
          grade: "A",
          notes: "student notes",
        },
      ])
    );
  }),
];
