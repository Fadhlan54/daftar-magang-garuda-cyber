import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex justify-center min-h-screen items-center flex-col">
      <h1 className="text-3xl font-bold">
        {error.status} - {error.statusText || error.message}
      </h1>
      <p className="text-xl my-5">Hayo mau ngapain?</p>
      <p>
        Kembali ke{" "}
        <Link to="/" className="text-blue-600">
          Home
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
