import { Link } from "react-router";
import SkeletonUI from "./SkeletonUI";
import { Button } from "./ui/button";
import type { IBooksResponse } from "@/types";

type ErrorHandleProps = {
  isLoading: boolean;
  error: unknown;
  data?: IBooksResponse;
};

const ErrorHandle = ({ isLoading, error, data }: ErrorHandleProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center w-full justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-28">
          <SkeletonUI />
          <SkeletonUI />
          <SkeletonUI />
          <SkeletonUI />
          <SkeletonUI />
          <SkeletonUI />
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-3xl  italic text-red-300">Failed to load Books.</p>
      </div>
    );
  } else if ((!isLoading && !data) || !data?.data.length) {
    return (
      <div className="h-full text-center pt-8 space-y-8">
        <p className="text-3xl  italic text-gray-400">No Book's data Found.</p>
        <div>
          <Link to={"/create-book"}>
            <Button className=" bg-[#6255E3]">Add New Book</Button>
          </Link>
        </div>
      </div>
    );
  }
};

export default ErrorHandle;
