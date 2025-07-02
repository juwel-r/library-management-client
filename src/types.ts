export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  description: string;
  copies: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IBookBorrowData = {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
};
