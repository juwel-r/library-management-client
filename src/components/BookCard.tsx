import type { IBook } from "@/types";
import bookPlaceholder from "../assets/book-placeholder.png";
import { Button } from "./ui/button";
import { BorrowModal } from "./BorrowModal";
import { EditBookModal } from "./EditModal";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import { toastify } from "@/utils/alerts";

interface IProps {
  book: IBook;
}
const BookCard = ({ book }: IProps) => {
  const [deleteBook] = useDeleteBookMutation();

  const deleteHandler = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteBook(id);
        if (res?.data?.success) {
          toastify("success", " Successfully Deleted!");
        } else {
          toastify("error", "Deletion Failed");
        }
      }
    });
  };

  return (
    <div className="relative max-w-80 h-[400px] rounded-2xl shadow-sm border flex flex-col justify-between p-4 transition duration-200">
      {/* Book Cover */}
      <img
        src={bookPlaceholder}
        alt="Book Cover"
        className="w-full h-40 object-contain rounded-md"
      />

      {/* Info */}
      <div className="mt-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {book.title}
        </h2>
        <p>Author: {book.author}</p>
        <p>Genre: {book.genre}</p>
        <p>ISBN: {book.isbn}</p>
        <p>Copies: {book.copies}</p>
        <p
          className={`absolute left-0 top-0 rounded-tl-2xl rounded-br-2xl p-2 overflow-hidden text-white ${
            book.available ? "bg-green-500" : "bg-red-400"
          } font-medium`}
        >
          {book.available ? "Available" : "Unavailable"}
        </p>
      </div>
      <div className="border"></div>
      {/* Actions */}
      <div className="mt-4 flex justify-between text-sm">
        <BorrowModal book={book}></BorrowModal>
        <EditBookModal book={book}></EditBookModal>
        <Button
          onClick={() => deleteHandler(book._id)}
          variant={"outline"}
          className="hover:bg-red-500"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
