export type Book = {
  uuid: string;
  name: string;
  rating: number;
  review: string;
};

// @TODO give this type a better name
export type Books = Pick<Book, "uuid" | "name">[];
