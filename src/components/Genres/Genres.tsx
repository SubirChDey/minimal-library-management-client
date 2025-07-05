import { useGetBooksQuery } from "@/redux/Features/bookApi";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

// Book type
interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  createdAt: string;
}

const Genres = () => {
  const { data, isLoading } = useGetBooksQuery();
  const [selectedGenre, setSelectedGenre] = useState<string>("All Genres");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const books: IBook[] = data?.data || [];
  const genres = [...new Set(books.map((book) => book.genre))];

  const filteredBooks =
    selectedGenre === "All Genres"
      ? books.slice(0, 6)
      : books.filter((book) => book.genre === selectedGenre).slice(0, 6);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8 text-center dark:text-gray-100">Book Genres</h2>

      {/* Genre Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => setSelectedGenre("All Genres")}
          className={`px-6 py-2 rounded-full transition-transform transform hover:scale-105
            ${selectedGenre === "All Genres"
              ? 'bg-blue-800 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
        >
          All Genres
        </button>

        {genres.map((genre: string) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-6 py-2 rounded-full transition-transform transform hover:scale-105
              ${selectedGenre === genre
                ? 'bg-blue-800 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
          >
            {genre}
          </button>
        ))}
      </div>

      {selectedGenre && (
        <>
          <h3 className="text-2xl font-semibold mb-6 text-center dark:text-gray-100">
            {selectedGenre === "All Genres" ? "All Books" : `Books in "${selectedGenre}"`}
          </h3>

          {filteredBooks.length > 0 ? (
            <div className="flex flex-wrap -mx-4">
              {filteredBooks.map((book) => (
                <div key={book._id} className="w-full md:w-1/2 px-4 mb-8">
                  <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow hover:shadow-xl transition-all duration-300 p-4 gap-6 h-full">
                    {/* Genre Badge */}
                    <div className="flex-shrink-0 w-full md:w-32 h-32 bg-blue-600 text-white flex items-center justify-center rounded-xl text-base font-semibold dark:bg-gray-600">
                      {book.genre}
                    </div>

                    {/* Book Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 dark:text-gray-100">{book.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-1">
                        <span className="font-medium">Author:</span> {book.author}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {book.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}
                        </p>
                        <Link
                          to={`/book-details/${book._id}`}
                          className="text-blue-700 dark:text-blue-400 font-semibold hover:underline"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500 dark:text-gray-400 mt-10">
              No books are available in this genre.
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default Genres;
