const NotFoundPage: React.FC = () => {
  return (
    <div className="w-screen h-screen min-h-screen max-h-screen overflow-hidden bg-black flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold text-white">
        404 - Page Not Found
      </h1>
      <p className="text-white mt-3">
        The page you were looking for is not available
      </p>
    </div>
  );
};

export default NotFoundPage;
