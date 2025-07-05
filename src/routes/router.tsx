import MainLayout from "@/layouts/MainLayout";
import AddBook from "@/pages/AddBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
import BookDetails from "@/pages/BookDetails/BookDetails";
import BookUpdate from "@/pages/BookUpdate/BookUpdate";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/books",
            element: <AllBooks></AllBooks>
        },
        {
            path: "/create-book",
            element: <AddBook></AddBook>
        },
        {
            path: "/borrow-summary",
            element: <BorrowSummary></BorrowSummary>
        },
        {
            path: "/books/:id",
            element: <BookDetails></BookDetails>
        },
        {
            path: "/edit-book/:id",
            element: <BookUpdate></BookUpdate>
        },
    ]
  },
]);


export default router;