type Book = {
  uuid: string;
  name: string;
  rating: number;
  review: string;
};

type Books = Pick<Book, "uuid" | "name">[];
