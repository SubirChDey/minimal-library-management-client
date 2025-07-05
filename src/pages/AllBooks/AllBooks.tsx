import { useDeleteBookMutation, useGetBooksQuery, useBorrowBookMutation } from "@/redux/Features/bookApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AllBooks = () => {
  const navigate = useNavigate();

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  // API call with pagination params
  const { data: books, isLoading, refetch } = useGetBooksQuery({ page, limit });
  const [deleteBook] = useDeleteBookMutation();
  const [borrowBook] = useBorrowBookMutation();

  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  // Borrow form state
  const [borrowForm, setBorrowForm] = useState({
    quantity: 1,
    dueDate: '',
    borrowerName: '',
  });

  if (isLoading) return <div>Loading...</div>;

  if (!Array.isArray(books?.data)) return <div>No books found.</div>;

  // Delete Confirmation with Swal
  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBook(id).unwrap();
          Swal.fire(
            'Deleted!',
            'The book has been deleted.',
            'success'
          );
          refetch();
        } catch (error) {
          Swal.fire(
            'Error!',
            'Failed to delete the book.',
            'error'
          );
        }
      }
    });
  };

  // Navigate to Edit Page
  const handleEdit = (book: any) => {
    navigate(`/edit-book/${book._id}`);
  };

  // Handle Borrow Book (open modal & reset form)
  const handleBorrow = (book: any) => {
    setSelectedBook(book);
    setBorrowForm({
      quantity: 1,
      dueDate: '',
      borrowerName: '',
    });
    setIsBorrowModalOpen(true);
  };

  // Borrow Submit with validation and API call
  const handleBorrowSubmit = async () => {
    if (borrowForm.quantity < 1 || borrowForm.quantity > selectedBook.copies) {
      Swal.fire('Invalid Quantity', `Quantity must be between 1 and ${selectedBook.copies}`, 'warning');
      return;
    }

    if (!borrowForm.dueDate) {
      Swal.fire('Missing Due Date', 'Please select a due date', 'warning');
      return;
    }

    if (!borrowForm.borrowerName.trim()) {
      Swal.fire('Missing Name', 'Please enter your name', 'warning');
      return;
    }

    try {
      await borrowBook({
        book: selectedBook._id,
        quantity: borrowForm.quantity,
        dueDate: borrowForm.dueDate,
        borrowerName: borrowForm.borrowerName,
      }).unwrap();

      setIsBorrowModalOpen(false);
      refetch();

      Swal.fire({
        title: 'Success!',
        text: 'Book borrowed successfully!',
        icon: 'success',
        confirmButtonText: 'Go to Summary'
      }).then(() => {
        navigate('/borrow-summary');
      });

    } catch (error) {
      Swal.fire('Error', 'Failed to borrow book', 'error');
    }
  };

  // Pagination controls
  const totalPages = books?.meta?.totalPages || 1;

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Books</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Genre</th>
            <th className="border p-2">ISBN</th>
            <th className="border p-2">Copies</th>
            <th className="border p-2">Availability</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.data.map((book: any) => (
            <tr key={book._id}>
              <td className="border p-2">
                <Link to={`/books/${book._id}`} className="text-blue-500 underline">{book.title}</Link>
              </td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.genre}</td>
              <td className="border p-2">{book.isbn}</td>
              <td className="border p-2">{book.copies}</td>
              <td className="border p-2">
                {book.copies === 0 ? (
                  <span className="text-red-500 font-semibold">Unavailable</span>
                ) : (
                  <span className="text-green-500 font-semibold">Available</span>
                )}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleBorrow(book)}
                  className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                  disabled={book.copies === 0}
                  title={book.copies === 0 ? "No copies available" : "Borrow this book"}
                >
                  Borrow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'}`}
        >
          Previous
        </button>
        <span className="self-center">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'}`}
        >
          Next
        </button>
      </div>

      {/* Borrow Book Modal */}
      {isBorrowModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded w-96 text-black dark:text-white">
            <h3 className="text-xl mb-4">Borrow Book</h3>
            <p><strong>Book:</strong> {selectedBook.title}</p>

            <input
              type="number"
              min={1}
              max={selectedBook.copies}
              value={borrowForm.quantity}
              onChange={(e) =>
                setBorrowForm({ ...borrowForm, quantity: Number(e.target.value) })
              }
              className="w-full border p-2 mb-2 dark:bg-gray-700 dark:text-white"
              placeholder={`Quantity (max ${selectedBook.copies})`}
            />

            <input
              type="date"
              value={borrowForm.dueDate}
              onChange={(e) =>
                setBorrowForm({ ...borrowForm, dueDate: e.target.value })
              }
              className="w-full border p-2 mb-2 dark:bg-gray-700 dark:text-white"
            />

            <input
              type="text"
              value={borrowForm.borrowerName}
              onChange={(e) =>
                setBorrowForm({ ...borrowForm, borrowerName: e.target.value })
              }
              className="w-full border p-2 mb-2 dark:bg-gray-700 dark:text-white"
              placeholder="Your Name"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsBorrowModalOpen(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleBorrowSubmit}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Confirm Borrow
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AllBooks;
