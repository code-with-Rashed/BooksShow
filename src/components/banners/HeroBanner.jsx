import booksImg from "../../assets/books.jpg"
export default function HeroBanner() {
    return (
        <div className="hero bg-base-200 my-5">
            <div className="hero-content w-full flex-col lg:flex-row-reverse justify-around">
                <img
                    src={booksImg}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">Best Selling Books</h1>
                    <p className="py-6">Books to freshen up your bookshelf</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}