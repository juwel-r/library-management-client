import Lottie from 'lottie-react';
import notFound from '../assets/404-not-found.json'

const ErrorPage = () => {
  return (
    <div className="my-auto mt-0 max-h-screen/50">
        <Lottie animationData={notFound} width={5} height={5}/>
      </div>
  );
};

export default ErrorPage;