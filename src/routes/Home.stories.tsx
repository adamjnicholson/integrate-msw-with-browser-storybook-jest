import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";

import { getBooks } from "../mocks/handlers";

import Home from "./Home";

export default {
  title: "Routes/Home Page",
  component: Home,
  parameters: {
    msw: {
      handlers: {
        other: [getBooks],
      },
    },
  },
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = () => <Home />;

export const WithBooks = Template.bind({});

export const WithoutBooks = Template.bind({});
WithoutBooks.parameters = {
  msw: {
    handlers: {
      other: [
        rest.get("/books", (req, res, ctx) =>
          res(ctx.status(201), ctx.json([]))
        ),
      ],
    },
  },
};
