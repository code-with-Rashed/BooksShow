import { useEffect, useState } from "react"
import { getReadBookList, getWishBookList, removeReadBookList, removeWishBookList, Bookdb } from "../../utilities/bookdb";
import { Link } from "react-router";
import Loading from "../../components/loading/loading";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { TfiPrinter } from "react-icons/tfi";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";

export default function ListedBooks() {
    const [bookList, setBooksList] = useState([]);
    const [randerReadBookList, setRanderReadBookList] = useState([]);
    const [randerWishBookList, setRanderWishBookList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortTypeForReadBook, setSortTypeForReadBook] = useState("");
    const [sortTypeForWishBook, setSortTypeForWishBook] = useState("");

    useEffect(() => {
        async function getBooks() {
            try {
                const fetchBooks = await fetch("https://raw.githubusercontent.com/ProgrammingHero1/boi-poka-Book-Vibe-Resources/refs/heads/main/data/booksData.json");
                const result = await fetchBooks.json();
                setBooksList(result);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        getBooks();
    }, [])
    useEffect(() => randerBookList(), [bookList]);
    const randerBookList = () => {
        const readList = getReadBookList();
        const wishList = getWishBookList();
        const filteredReadBooks = bookList.filter(book => readList.includes(book.bookId))
        const filteredWishBooks = bookList.filter(book => wishList.includes(book.bookId))
        setRanderReadBookList(filteredReadBooks)
        setRanderWishBookList(filteredWishBooks)
    }
    const removeReadBookListItem = (id) => {
        removeReadBookList(id);
        randerBookList()
    }
    const removeWishBookListItem = (id) => {
        removeWishBookList(id);
        randerBookList();
    }
    const sortReadListBooks = (type) => {
        setSortTypeForReadBook(type);
        let sortedReadBookList = [...randerReadBookList];
        if (type == "pages") {
            sortedReadBookList = sortedReadBookList.sort((a, b) => a.totalPages - b.totalPages);
        } else {
            sortedReadBookList = sortedReadBookList.sort((a, b) => a.rating - b.rating);
        }
        setRanderReadBookList(sortedReadBookList);
    }
    const sortWishListBooks = (type) => {
        setSortTypeForWishBook(type);
        let sortedWishBookList = [...randerWishBookList];
        if (type == "pages") {
            sortedWishBookList = sortedWishBookList.sort((a, b) => a.totalPages - b.totalPages);
        } else {
            sortedWishBookList = sortedWishBookList.sort((a, b) => a.rating - b.rating);
        }
        setRanderWishBookList(sortedWishBookList);
    }
    if (isLoading) return <Loading></Loading>
    return (
        <div>
            <div className="bg-base-200 p-5 text-center shadow-sm my-5 rounded font-bold">Book List</div>
            <div className="tabs tabs-lift" >
                <input type="radio" name="my_tabs_3" className="tab" aria-label="Read Books" defaultChecked />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    {randerReadBookList.length > 0 && (
                        <div className="text-end">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn m-1">Sort By : {sortTypeForReadBook ? sortTypeForReadBook : ""}</div>
                                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><a onClick={() => sortReadListBooks("pages")}>Pages</a></li>
                                    <li><a onClick={() => sortReadListBooks("ratings")}>Ratings</a></li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {randerReadBookList.map(readBook => (
                        <div className="card card-side bg-base-100 shadow-sm my-5 border border-gray-200 p-5" key={readBook.bookId}>
                            <figure className="bg-base-200 shadow-sm rounded-xl px-6">
                                <img
                                    src={readBook.image}
                                    alt={readBook.bookName}
                                    className="h-50 rounded"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{readBook.bookName}</h2>
                                <p>By : {readBook.author}</p>
                                <div className="mt-2">
                                    <span className="font-bold">Tag</span>
                                    {readBook.tags.map((tag, i) => <div key={i} className="badge badge-soft badge-success mx-3 font-medium cursor-pointer"># {tag}</div>)}
                                    <div className="badge badge-ghost me-2"><FaRegCalendarCheck /> Year of Publishing : {readBook.yearOfPublishing}</div>
                                </div>
                                <div className="mt-2">
                                    <div className="badge badge-ghost me-2"><TfiPrinter /> Publisher: {readBook.publisher}</div>
                                    <div className="badge badge-ghost"><HiOutlineDocumentChartBar /> Page {readBook.totalPages}</div>
                                </div>
                                <div className="border my-3 border-gray-300"></div>
                                <div>
                                    <div className="badge badge-soft badge-success font-medium">Category : {readBook.category}</div>
                                    <div className="badge badge-soft badge-warning font-medium mx-3">Rating : {readBook.rating}</div>
                                    <Link to={`/book-details/${readBook.bookId}`}>
                                        <div className="badge badge-success font-medium">View Details</div>
                                    </Link>
                                </div>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-error" onClick={() => removeReadBookListItem(readBook.bookId)}><MdDeleteOutline className="font-bolder text-white text-2xl" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <input type="radio" name="my_tabs_3" className="tab" aria-label="Wishlist Books" />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    {randerWishBookList.length > 0 && (
                        <div className="text-end">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn m-1">Sort By : {sortTypeForWishBook ? sortTypeForWishBook : ""}</div>
                                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><a onClick={() => sortWishListBooks("pages")}>Pages</a></li>
                                    <li><a onClick={() => sortWishListBooks("ratings")}>Ratings</a></li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {randerWishBookList.map(readBook => (
                        <div className="card card-side bg-base-100 shadow-sm my-5 border border-gray-200 p-5" key={readBook.bookId}>
                            <figure className="bg-base-200 shadow-sm rounded-xl px-6">
                                <img
                                    src={readBook.image}
                                    alt={readBook.bookName}
                                    className="h-50 rounded"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{readBook.bookName}</h2>
                                <p>By : {readBook.author}</p>
                                <div className="mt-2">
                                    <span className="font-bold">Tag</span>
                                    {readBook.tags.map((tag, i) => <div key={i} className="badge badge-soft badge-success mx-3 font-medium cursor-pointer"># {tag}</div>)}
                                    <div className="badge badge-ghost me-2"><FaRegCalendarCheck /> Year of Publishing : {readBook.yearOfPublishing}</div>
                                </div>
                                <div className="mt-2">
                                    <div className="badge badge-ghost me-2"><TfiPrinter /> Publisher: {readBook.publisher}</div>
                                    <div className="badge badge-ghost"><HiOutlineDocumentChartBar /> Page {readBook.totalPages}</div>
                                </div>
                                <div className="border my-3 border-gray-300"></div>
                                <div>
                                    <div className="badge badge-soft badge-success font-medium">Category : {readBook.category}</div>
                                    <div className="badge badge-soft badge-warning font-medium mx-3">Rating : {readBook.rating}</div>
                                    <Link to={`/book-details/${readBook.bookId}`}>
                                        <div className="badge badge-success font-medium">View Details</div>
                                    </Link>
                                </div>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-error" onClick={() => removeWishBookListItem(readBook.bookId)}><MdDeleteOutline className="font-bolder text-white text-2xl" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
            <Bookdb />
        </div>
    )
}