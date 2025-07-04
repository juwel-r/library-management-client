export type IBookBorrowData = {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
};

export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY"
  |"";


export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBooksResponse {
  success: boolean;
  totalBooks: number;
  message: string;
  data: IBook[];
}

export interface GetBooksQueryArg {
  limit?: number;
  currentPage?: number;
}



export const genre: Array<string> = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];