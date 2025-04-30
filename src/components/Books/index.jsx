import React from "react";
import Nav from "./Nav";
import BooksList from "./BooksList";
import BooksFilter from "./BooksFilter";

const BooksLayout = () => {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="flex">
        <BooksFilter />
        <BooksList />
      </div>
    </div>
  );
};

export default BooksLayout;
