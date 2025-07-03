import MainLayout from "@/layouts/MainLayout";
import AddBook from "@/pages/AddBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
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
    ]
  },
]);


export default router;