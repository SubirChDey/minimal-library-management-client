const testimonials = [
  {
    id: 1,
    name: "Robert Wood",
    comment: "This library is amazing! I found all my favorite books easily and the user interface is super friendly.",
    designation: "Book Lover",
  },
  {
    id: 2,
    name: "Sara Islam",
    comment: "Excellent book collection and smooth borrowing process. Highly recommended!",
    designation: "Student",
  },
  {
    id: 3,
    name: "David White",
    comment: "Very helpful platform. I can quickly browse genres and find what I need. Great job by the developers.",
    designation: "Writer",
  },
];

const Testimonials = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8 text-center dark:text-gray-100">What Our Readers Say</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-between"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
              "{testimonial.comment}"
            </p>
            <div className="mt-auto">
              <h4 className="text-xl font-semibold dark:text-gray-100">{testimonial.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.designation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
