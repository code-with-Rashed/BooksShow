import { FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router";
export default function Book({ book }) {
    return (
        <Link to={`book-details/${book.bookId}`}>
            <div className="card bg-base-100 w-96 shadow-sm border border-gray-300 rounded-2xl p-4">
                <figure className="bg-gray-100 py-4 rounded-lg">
                    <img
                        src={book.image}
                        alt={book.bookName}
                        className="h-50 rotate-x-12 rotate-y-20"
                    />
                </figure>
                <div className="card-body">
                    <div className="flex">
                        {book.tags.map((tag, i) => (
                            <div key={i} className="badge badge-soft badge-success me-3 font-medium">{tag}</div>
                        ))}
                    </div>
                    <h2 className="card-title">{book.bookName}</h2>
                    <p className="font-semibold">By : {book.author}</p>
                    <div className="border border-dashed border-gray-400 my-3"></div>
                    <div className="card-actions justify-between">
                        <span>{book.category}</span>
                        <span className="flex items-center font-semibold"><span className="me-2">{book.rating}</span> <FaStarHalfAlt className="text-yellow-500" /> </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}