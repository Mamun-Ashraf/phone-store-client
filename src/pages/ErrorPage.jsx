import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error, status } = useRouteError();

  return (
    <div className="container flex flex-col justify-center items-center h-screen text-center py-32">
      <h2 className="text-7xl font-extrabold mb-8">Error {status || 404}</h2>
      <h2 className="lg:text-3xl">{error?.message}</h2>
      <button className="btn bg-red-500 text-white mt-8">
        <Link to="/">Home page</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
