import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import BookDetails from "./routes/BookDetails";
import CreateBook from "./routes/CreateBook";
import { Heading, Section, Main } from "./modules/ui";

export default function App() {
  return (
    <Main>
      <Heading as="h1">
        <Link to="/">My Book Reviews</Link>
      </Heading>
      <Section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:uuid" element={<BookDetails />} />
          <Route path="/book/create" element={<CreateBook />} />
        </Routes>
      </Section>
    </Main>
  );
}
