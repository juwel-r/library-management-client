import BookCard from "@/components/BookCard";
import SkeletonUI from "@/components/SkeletonUI";
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

const AllBooks = () => {
  const [itemPerPage, setItemPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, error } = useGetBooksQuery(
    { limit: itemPerPage, currentPage },
    { refetchOnMountOrArgChange: true }
  );
  const totalPage = Math.ceil((data?.totalBooks || 0) / itemPerPage);
  const pages = [...Array(totalPage).keys()];

  if (isLoading) {
    return (
      <div className="flex items-center w-full justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-28">
          <SkeletonUI></SkeletonUI>
          <SkeletonUI></SkeletonUI>
          <SkeletonUI></SkeletonUI>
          <SkeletonUI></SkeletonUI>
          <SkeletonUI></SkeletonUI>
          <SkeletonUI></SkeletonUI>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-3xl  italic text-red-300">Failed to load Books.</p>
      </div>
    );
  } else if ((!isLoading && !data) || !data.data.length) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-3xl  italic text-red-300">No Book's data Found.</p>
      </div>
    );
  } else {
    return (
      <div className="mx-auto px-8 mt-24">
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
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
              </SelectContent>
            </Select>
          </Pagination>
        </div>
      </div>
    );
  }
};

export default AllBooks;

{
  /* <button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  Processing…
</button> */
}
