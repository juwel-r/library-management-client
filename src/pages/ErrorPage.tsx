import Lottie from "lottie-react";
import notFound from "../assets/404-not-found.json";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="sm:w-2/5 mx-auto mb-auto h-full overflow-hidden text-center space-y-2">
      <Lottie animationData={notFound} />
      <Button variant={"outline"} className="bg-[#6255E3] text-white">
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
