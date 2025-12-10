import { useEffect, useState } from "react";
import Book from "./Book";
import Loading from "../../components/loading/loading";

export default function Books() {
    const [booksList, setBooksList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function getBooks() {
            try {
                const fetchBooks = await fetch("https://raw.githubusercontent.com/ProgrammingHero1/boi-poka-Book-Vibe-Resources/refs/heads/main/data/booksData.json");
                const result = await fetchBooks.json();
                setBooksList(result)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getBooks()
    }, [])
    if (isLoading) return <Loading></Loading>
    return (
        <section>
            <h3 className="text-center font-bold text-2xl">Books</h3>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 justify-center">
                {booksList.map(book => <Book book={book} key={book.bookId}></Book>)}
            </div>
        </section>
    )
}
