import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleBookQuery, useUpdateBookMutation } from "@/redux/Features/bookApi";
import { useState, useEffect } from "react";

const BookUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: bookData, isLoading } = useGetSingleBookQuery(id);
  const [updateBook] = useUpdateBookMutation();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "copies" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({ id, body: formData }).unwrap();
      alert('Book updated successfully');
      navigate('/books');
    } catch (error) {
      alert('Failed to update book');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Book Title"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Author"
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Genre"
        />
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="ISBN"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Description"
        />
        <input
          type="number"
          name="copies"
          value={formData.copies}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Copies"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default BookUpdate;
