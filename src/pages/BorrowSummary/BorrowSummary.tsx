import { useBorrowSummaryQuery } from "@/redux/Features/bookApi";

const BorrowSummary = () => {
    const { data, isLoading, isError } = useBorrowSummaryQuery(undefined);

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (isError) return <div className="p-4 text-red-500">Error: {"Something went wrong"}</div>;

    if (!data?.data || data.data.length === 0) return <div className="p-4">No borrowed books found.</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Borrow Summary</h2>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                        <th className="border p-2">Book Title</th>
                        <th className="border p-2">ISBN</th>
                        <th className="border p-2">Total Quantity Borrowed</th>
                        <th className="border p-2">Borrowers</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((item: any, index: number) => (
                        <tr key={index}>
                            <td className="border p-2">{item.book.title}</td>
                            <td className="border p-2">{item.book.isbn}</td>
                            <td className="border p-2">{item.totalQuantity}</td>
                            <td className="border p-2">{item.borrowers.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default BorrowSummary;
