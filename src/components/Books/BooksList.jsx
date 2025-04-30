import React, { useContext } from "react";
import BookCard from "./BookCard";
import { useGetBooksQuery } from "../../app/features/booksApi";
import BookCardSkeleton from "./BookCard/BookCardSkeleton";
import { userContext } from "../../Context/userContext";

const BooksList = ({ filters = { page: 1, limit: 6 } }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDY0MjU3NzY2ZjBkMTljZDEzNGQxZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NjAxODkwNiwiZXhwIjoxNzQ4NjEwOTA2fQ.CLWWHpfuxZEy6is2yOPKOyvtiRIkP8pTNkJeRZo3CsI";
  const { data, isLoading, isError } = useGetBooksQuery({ filters, token });

  if (isLoading)
    return (
      <div className=" flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <BookCardSkeleton key={idx} />
        ))}
      </div>
    );

  return (
    <div className=" flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data?.books.map((book) => (
        <BookCard book={book} key={book._id} />
      ))}
    </div>
  );
};

export default BooksList;
