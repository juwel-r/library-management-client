import BookCard from "@/components/BookCard";
import SkeletonUI from "@/components/SkeletonUI";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { Link } from "react-router";

const AllBooks = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center w-full justify-center">
        <div className="grid grid-cols-3 gap-y-16 gap-x-28">
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
      <div className="h-screen flex justify-center items-center">
        <p className="text-3xl  italic text-red-300">Failed to load Books.</p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex justify-between items-center sm:mx-8 mx-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">All Books</h2>
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
