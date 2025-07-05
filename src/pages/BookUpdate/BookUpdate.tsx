import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleBookQuery, useUpdateBookMutation } from "@/redux/Features/bookApi";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const BookUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: bookData, isLoading } = useGetSingleBookQuery(id);
  const [updateBook] = useUpdateBookMutation();

  const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
  });

  useEffect(() => {
    if (bookData?.data) {
      setFormData(bookData.data);
    }
  }, [bookData]);

  if (isLoading) return <div>Loading...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "copies" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateBook({ id, ...formData }).unwrap();

      if (response && response.success) {
        // Swal Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Book updated successfully!',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate('/books');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Update failed: Server did not confirm success',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update book',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 dark:bg-gray-800 dark:text-white"
          placeholder="Book Title"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border p-2 dark:bg-gray-800 dark:text-white"
          placeholder="Author"
        />

        {/* Genre Select Dropdown */}
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full border p-2 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full border p-2 dark:bg-gray-800 dark:text-white"
          placeholder="ISBN"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 dark:bg-gray-800 dark:text-white"
          placeholder="Description"
        />
        <input
          type="number"
          name="copies"
          value={formData.copies}
          onChange={handleChange}
          className="w-full border p-2 dark:bg-gray-800 dark:text-white"
          placeholder="Copies"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default BookUpdate;
