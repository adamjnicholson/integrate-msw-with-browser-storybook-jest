import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { createBook } from "../mocks/handlers";

import CreateBook from "./CreateBook";

export default {
  title: "Routes/Create Book Page",
  component: CreateBook,
  parameters: {
    msw: {
      handlers: {
        other: [createBook],
      },
    },
  },
} as ComponentMeta<typeof CreateBook>;

const Template: ComponentStory<typeof CreateBook> = () => <CreateBook />;

export const CreateBookPage = Template.bind({});
