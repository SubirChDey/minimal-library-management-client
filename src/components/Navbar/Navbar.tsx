import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../mode-toggler";

const Navbar = () => {
    const navItems = (
        <>
            <NavLink
                to={"/"}
                className={({ isActive }) =>
                    isActive
                        ? "text-blue-600 dark:text-yellow-400 font-semibold underline"
                        : "hover:text-red-400 dark:hover:text-yellow-300 transition"
                }
            >
                Home
            </NavLink>
            <NavLink
                to={"/books"}
                className={({ isActive }) =>
                    isActive
                        ? "text-blue-600 dark:text-yellow-400 font-semibold underline"
                        : "hover:text-red-400 dark:hover:text-yellow-300 transition"
                }
            >
                All Books
            </NavLink>
            <NavLink
                to={"/create-book"}
                className={({ isActive }) =>
                    isActive
                        ? "text-blue-600 dark:text-yellow-400 font-semibold underline"
                        : "hover:text-red-400 dark:hover:text-yellow-300 transition"
                }
            >
                Add Book
            </NavLink>
            <NavLink
                to={"/borrow-summary"}
                className={({ isActive }) =>
                    isActive
                        ? "text-blue-600 dark:text-yellow-400 font-semibold underline"
                        : "hover:text-red-400 dark:hover:text-yellow-300 transition"
                }
            >
                Borrow Summary
            </NavLink>
        </>
    );

    return (
        <div className="navbar bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        {navItems}
                    </ul>
                </div>
                <Link to={"/"} className="btn btn-ghost text-xl">Library</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <ModeToggle />
            </div>
        </div>
    );
};

export default Navbar;
