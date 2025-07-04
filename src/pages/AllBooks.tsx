import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { useState } from "react";
import { Link } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorHandle from "@/components/ErrorHandle";

const AllBooks = () => {
  const [itemPerPage, setItemPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = [2, 6, 10, 15];
  const { data, isLoading, error } = useGetBooksQuery(
    { limit: itemPerPage, currentPage },
    { refetchOnMountOrArgChange: true }
  );
  const totalPage = Math.ceil((data?.totalBooks || 0) / itemPerPage);
  const pages = [...Array(totalPage).keys()];

  if (isLoading || error || (!isLoading && !data) || !data?.data.length) {
    return <ErrorHandle isLoading={isLoading} error={error} data={data} />;
  }

  return (
    <div className="mx-auto px-8 pt-8">
      <div className="flex justify-between items-center sm:mx-8 mx-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">All Books</h2>
        <Link to={"/create-book"}>
          <Button className=" bg-[#6255E3]">Add New Book</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {!isLoading &&
          data.data.length > 0 &&
          data.data.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 0 ? setCurrentPage(currentPage - 1) : ""
                }
              />
            </PaginationItem>
            <PaginationItem>
              {pages.map((page, index) => (
                <PaginationLink
                  key={index}
                  className={cn(currentPage === page && "selected-page")}
                  onClick={() => setCurrentPage(page)}
                >
                  {page + 1}
                </PaginationLink>
              ))}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPage - 1
                    ? setCurrentPage(currentPage + 1)
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
          <Select
            onValueChange={(value) => {
              setItemPerPage(Number(value));
              setCurrentPage(0);
            }}
            defaultValue="6"
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Select Book Per Page" />
            </SelectTrigger>
            <SelectContent>
              {limit.map((number) => (
                <SelectItem key={number} value={String(number)}>
                  {number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Pagination>
      </div>
    </div>
  );
};

export default AllBooks;
