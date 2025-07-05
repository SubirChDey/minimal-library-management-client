import { useDeleteBookMutation, useGetBooksQuery, useBorrowBookMutation } from "@/redux/Features/bookApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AllBooks = () => {
  const navigate = useNavigate();
  const { data: books, isLoading, refetch } = useGetBooksQuery();
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

  // Delete Confirmation
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      deleteBook(id);
    }
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
      alert(`Quantity must be between 1 and ${selectedBook.copies}`);
      return;
    }

    if (!borrowForm.dueDate) {
      alert("Please select a due date");
      return;
    }

    if (!borrowForm.borrowerName.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      await borrowBook({
        book: selectedBook._id,
        quantity: borrowForm.quantity,
        dueDate: borrowForm.dueDate,
        borrowerName: borrowForm.borrowerName,
      }).unwrap();

      alert("Book borrowed successfully!");
      setIsBorrowModalOpen(false);
      refetch();

    } catch (error) {
      alert("Failed to borrow book");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Books</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
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
          {books.data.map((book) => (
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
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleBorrow(book)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
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

      {/* Borrow Book Modal */}
      {isBorrowModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
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
              className="w-full border p-2 mb-2"
              placeholder={`Quantity (max ${selectedBook.copies})`}
            />

            <input
              type="date"
              value={borrowForm.dueDate}
              onChange={(e) =>
                setBorrowForm({ ...borrowForm, dueDate: e.target.value })
              }
              className="w-full border p-2 mb-2"
            />

            <input
              type="text"
              value={borrowForm.borrowerName}
              onChange={(e) =>
                setBorrowForm({ ...borrowForm, borrowerName: e.target.value })
              }
              className="w-full border p-2 mb-2"
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
