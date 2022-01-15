import React from "react";

import { Routes, Route, Link, Outlet } from "react-router-dom";

import { Heading, Section, Main } from "./modules/ui";
import BookDetails from "./routes/BookDetails";
import CreateBook from "./routes/CreateBook";
import Home from "./routes/Home";

function AppLayout() {
  return (
    <Main>
      <Heading as="h1">
        <Link to="/">My Book Reviews</Link>
      </Heading>
      <Section>
        <Outlet />
      </Section>
    </Main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="book/:uuid" element={<BookDetails />} />
        <Route path="book/create" element={<CreateBook />} />
      </Route>
    </Routes>
  );
}
