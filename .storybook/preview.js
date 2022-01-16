import React from "react";

import { initialize, mswDecorator } from "msw-storybook-addon";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { seedDb } from "../src/mocks/db";
import { Main, Section } from "../src/modules/ui";

import "../src/index.css";

export const parameters = {};

seedDb();

initialize({
  onUnhandledRequest: ({ method, url }) => {
    // eslint-disable-next-line no-console
    console.error(`Unhandled ${method} request to ${url}.

        This exception has been only logged in the console, however, it's strongly recommended to resolve this error as you don't want unmocked data in Storybook stories.

        If you wish to mock an error response, please refer to this guide: https://mswjs.io/docs/recipes/mocking-error-responses
      `);
  },
});

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const decorators = [
  mswDecorator,
  (Story) => (
    <QueryClientProvider client={mockedQueryClient}>
      <Story />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  ),
  (Story, context) => {
    const route = context.args.route ?? "/";
    const routePath = context.args.routePath ?? route;

    return (
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={routePath} element={<Story />} />
        </Routes>
      </MemoryRouter>
    );
  },
  (Story) => (
    <Main>
      <Section>
        <Story />
      </Section>
    </Main>
  ),
];
