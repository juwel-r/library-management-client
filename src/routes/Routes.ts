import MainLayout from "@/layouts/MainLayout";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import BorrowSummery from "@/pages/BorrowSummery";
import ErrorPage from "@/pages/ErrorPage";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    ErrorBoundary:ErrorPage,
    children: [
      {
        index: true,
        Component: AllBooks,
      },
      {
        path: "books",
        Component: AllBooks,
      },
      {
        path: "create-book",
        Component: AddBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummery,
      },
    ],
  },
]);

export default router;
