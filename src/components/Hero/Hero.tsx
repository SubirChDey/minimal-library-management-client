import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white min-h-[80vh] flex items-center
                        dark:from-gray-900 dark:to-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight
                         dark:text-white">
            Discover Your Next Great Read
          </h1>
          <p className="text-lg md:text-xl text-blue-200
                        dark:text-gray-400">
            Explore thousands of books from our extensive library collection. Find, borrow, and enjoy reading anytime, anywhere.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link to={"/books"} className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-lg 
                               hover:bg-blue-100 transition
                               dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Browse Books
            </Link>
            <button className="border border-white text-white font-semibold px-6 py-3 rounded-lg 
                               hover:bg-white hover:text-blue-700 transition
                               dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
              Join Library
            </button>
          </div>
        </div>

        {/* Image or Illustration */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
            alt="Books and Library"
            className="rounded-lg shadow-xl mx-auto md:mx-0 max-w-full h-auto
                       dark:brightness-90 dark:contrast-90"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
