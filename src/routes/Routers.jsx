import { createBrowserRouter } from "react-router";
import Root from "../pages/roots/Root";
import Home from "../pages/home/Home";
import PageNotFound from "../pages/errors/PageNotFound";
import BookDetails from "../pages/books/BookDetails";
import ListedBooks from "../pages/books/ListedBooks";
import PagesToRead from "../pages/books/PagesToRead";

const Routers = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <PageNotFound></PageNotFound>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "book-details/:id",
                Component: BookDetails
            },
            {
                path: "listed-books",
                Component: ListedBooks
            },
            {
                path: "pages-to-read",
                Component: PagesToRead
            }
        ]
    }
])
export default Routers;