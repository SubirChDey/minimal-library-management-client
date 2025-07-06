import { useCreateBookMutation } from "@/redux/Features/bookApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
}

const AddBook = () => {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();
  const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createBook(formData).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Book Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Book',
        text: 'Please try again later.',
      });
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="" disabled className="text-gray-500 dark:text-gray-400">
              Select genre
            </option>
            {genres.map((g) => (
              <option key={g} value={g} className="dark:bg-gray-700 dark:text-white">
                {g.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Copies</label>
          <input
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            min={0}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
