import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { db } from "../mocks/db";
import { getBookDetails } from "../mocks/handlers";

import BookDetails from "./BookDetails";

const book = db.book.findFirst({ where: {} });

export default {
  title: "Routes/Book Details Page",
  component: BookDetails,
  args: { route: `/book/${book?.uuid}`, routePath: "/book/:uuid" },
  parameters: {
    msw: {
      handlers: {
        other: [getBookDetails],
      },
    },
  },
} as ComponentMeta<typeof BookDetails>;

const Template: ComponentStory<typeof BookDetails> = () => <BookDetails />;

export const BookDetailsPage = Template.bind({});
