import BookCard from "@/components/BookCard";
import SkeletonUI from "@/components/SkeletonUI";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";

const AllBooks = () => {
  const { data, isLoading } = useGetBooksQuery(undefined, {
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
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {!isLoading &&
        data.data.length > 0 &&
        data.data.map((book: IBook) => <BookCard key={book._id} book={book} />)}
    </div>
  );
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
