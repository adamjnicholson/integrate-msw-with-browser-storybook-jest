import { setGlobalConfig } from "@storybook/testing-react";

import * as globalStorybookConfig from "../.storybook/preview";

import { seedDb } from "./mocks/db";
import { server } from "./mocks/server";
import "@testing-library/jest-dom";

setGlobalConfig(globalStorybookConfig);

beforeAll(() => {
  seedDb();
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
});
