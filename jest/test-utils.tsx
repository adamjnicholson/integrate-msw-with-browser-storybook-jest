import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

type AllTheProvidersBaseProps = {
  children: JSX.Element;
};

type UrlString = `/${string}`;

type RoutePathProps = {
  route: UrlString;
  routePath: UrlString;
};

type MaybeRoutePathProps = {
  route: UrlString;
  routePath?: UrlString;
};

type NoRouteProps = {
  route: never;
  routePath: never;
};

type AllTheProvidersProps = AllTheProvidersBaseProps &
  (RoutePathProps | MaybeRoutePathProps | NoRouteProps);

const AllTheProviders = ({ route, children }: AllTheProvidersProps) => {
  const routeToUse = route ?? "/";

  return (
    <QueryClientProvider client={mockedQueryClient}>
      <MemoryRouter initialEntries={[routeToUse]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: JSX.Element,
  {
    route,
    routePath,
    ...options
  }: Omit<RenderOptions, "wrapper"> & Omit<AllTheProvidersProps, "children"> = {
    route: "/",
  }
) =>
  render(ui, {
    wrapper: () => (
      <AllTheProviders route={route} routePath={routePath} children={ui} />
    ),
    ...options,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
