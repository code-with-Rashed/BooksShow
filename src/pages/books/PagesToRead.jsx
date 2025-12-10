import { useEffect, useState } from 'react';
import { getReadBookList } from "../../utilities/bookdb";
import Chart from './Chart';
import Loading from "../../components/loading/loading";

export default function PagesToRead() {
    const [booksList, setBooksList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function getBooks() {
            try {
                const fetchBooks = await fetch("https://raw.githubusercontent.com/ProgrammingHero1/boi-poka-Book-Vibe-Resources/refs/heads/main/data/booksData.json");
                const result = await fetchBooks.json();
                const readList = getReadBookList();
                const filteredReadBooks = result.filter(book => readList.includes(book.bookId))
                setBooksList(filteredReadBooks);
            } catch (error) {
                console.log(error)
            } finally {

                setIsLoading(false);
            }
        }
        getBooks();
    }, []);

    if (isLoading) return <Loading></Loading>;
    return (
        <div className="my-8 flex justify-center bg-base-200 p-5 rounded">
            <Chart booksList={booksList} />
        </div>
    );
}
