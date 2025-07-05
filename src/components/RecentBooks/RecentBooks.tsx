import { useGetBooksQuery } from "@/redux/Features/bookApi";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const RecentBooks = () => {
  const { data, isLoading } = useGetBooksQuery({});

  const books = data?.data?.slice(0, 6) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center dark:text-gray-100">Recent Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book: any) => (
          <div
            key={book._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-3 dark:text-gray-100">{book.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <span className="font-medium">Author:</span> {book.author}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <span className="font-medium">Genre:</span> {book.genre}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {book.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}
              </p>
              <Link
                to={`/books/${book._id}`}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentBooks;
