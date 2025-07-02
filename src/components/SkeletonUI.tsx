import { Skeleton } from "./ui/skeleton";
import bookPlaceholder from "../assets/book-placeholder.png";

const SkeletonUI = () => {
  return (
    <div className="mt-12">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-24 w-24 rounded-md">
          <img className="opacity-70" src={bookPlaceholder} alt="book-placeholder" />
        </Skeleton>
        <div className="space-y-2">
        <Skeleton className="bg-transparent text-gray-300">Loading Book Data...</Skeleton>
          <Skeleton className="h-2 w-[150px]" />
          <Skeleton className="h-2 w-[150px]" />
          <Skeleton className="h-2 w-[100px]" />
          <Skeleton className="h-2 w-[150px]" />
        </div>
      </div>
      <Skeleton className="h-2 w-[260px] mt-2" />
      <Skeleton className="h-2 w-[212px] mt-2" />
    </div>
  );
};

export default SkeletonUI;
