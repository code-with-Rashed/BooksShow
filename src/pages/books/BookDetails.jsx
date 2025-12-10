import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import { useParams } from "react-router";
import { bookMarkAsRead, wishMarkAsRead, Bookdb } from "../../utilities/bookdb";
function BookDetails() {
    const params = useParams();
    const id = parseInt(params.id);
    const [isLoading, setLoading] = useState(true);
    const [book, setBook] = useState([]);
    useEffect(() => {
        async function getBooks() {
            try {
                const fetchBooks = await fetch("https://raw.githubusercontent.com/ProgrammingHero1/boi-poka-Book-Vibe-Resources/refs/heads/main/data/booksData.json");
                const result = await fetchBooks.json();
                const singleBook = result.find((book) => book.bookId === id)
                setBook(singleBook);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getBooks()
    }, [])
    if (isLoading) return <Loading></Loading>;
    return (
        <div className="flex my-8">
            <div className="basis-1/2 me-6">
                <div className="card bg-gray-100 shadow-sm">
                    <figure className="px-10 py-10">
                        <img
                            src={book.image}
                            alt={book.bookName}
                        />
                    </figure>
                </div>
            </div>
            <div className="basis-2/3">
                <h1 className="text-2xl font-medium">{book.bookName}</h1>
                <p className="font-medium my-2">By : {book.author}</p>
                <p className="border-y my-4 py-3 font-medium border-gray-300">{book.category}</p>
                <p><span className="font-bold">Review : </span> <span className="text-base/8 text-gray-500">{book.review}</span></p>
                <div className="pt-5">
                    <span className="font-bold">Tag</span>
                    {book.tags.map((tag, i) => <div key={i} className="badge badge-soft badge-success mx-3 font-medium cursor-pointer"># {tag}</div>)}
                </div>
                <div className="my-4 border-t border-gray-300">
                    <p className="my-5 flex justify-between"><span>Number of Pages:</span><span className="font-bold basis-2/3">{book.totalPages}</span></p>
                    <p className="my-5 flex justify-between"><span>Publisher:</span><span className="font-bold basis-2/3">{book.publisher}</span></p>
                    <p className="my-5 flex justify-between"><span>Year of Publishing:</span><span className="font-bold basis-2/3">{book.yearOfPublishing}</span></p>
                    <p className="my-5 flex justify-between"><span>Rating:</span><span className="font-bold basis-2/3">{book.rating}</span></p>
                </div>
                <div>
                    <button className="btn btn-soft btn-primary me-4 shadow-sm" onClick={() => bookMarkAsRead(book.bookId)}>Mark as Read</button>
                    <button className="btn btn-success" onClick={() => wishMarkAsRead(book.bookId)}>Wishlist</button>
                </div>
            </div>
            <Bookdb />
        </div>
    )
}
export default BookDetails;