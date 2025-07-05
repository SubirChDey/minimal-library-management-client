import { useParams, Link } from "react-router-dom";
import { useGetBookQuery } from "@/redux/Features/bookApi";

const BookDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetBookQuery(id);

    if (isLoading) return <div className="p-4 text-lg">Loading book details...</div>;
    if (isError) return <div className="p-4 text-red-500 text-lg">Error</div>;

    if (!data?.data) return <div className="p-4 text-lg">Book not found.</div>;

    const book = data.data;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Link to="/books" className="text-blue-500 hover:underline mb-4 inline-block">
                &larr; Back to All Books
            </Link>

            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
                    {book.title}
                </h2>

                <div className="space-y-2 text-lg text-gray-700">
                    <p><span className="font-semibold">Author:</span> {book.author}</p>
                    <p><span className="font-semibold">Genre:</span> {book.genre}</p>
                    <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
                    <p><span className="font-semibold">Copies Available:</span> {book.copies}</p>
                    <p><span className="font-semibold">Description:</span> {book.description}</p>
                    <p>
                        <span className="font-semibold">Status:</span>{" "}
                        {book.copies > 0 ? (
                            <span className="text-green-600 font-semibold">Available</span>
                        ) : (
                            <span className="text-red-600 font-semibold">Unavailable</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
