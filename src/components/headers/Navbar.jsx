import { NavLink } from "react-router"

export default function Navbar() {
    const links = <>
        <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "btn btn-outline btn-success" : ""}>Home</NavLink>
        </li>
        <li>
            <NavLink to="/listed-books" className={({ isActive }) => isActive ? "btn btn-outline btn-success" : ""}>Listed Books</NavLink>
        </li>
        <li>
            <NavLink to="/pages-to-read" className={({ isActive }) => isActive ? "btn btn-outline btn-success" : ""}>Pages to Read</NavLink>
        </li>
    </>
    return (
        <div className="max-w-6xl mx-auto">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <NavLink className="btn btn-ghost text-xl font-bold" to="/">Boi Poka</NavLink>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-success mx-2">Login</button>
                    <button className="btn btn-info">Register</button>
                </div>
            </div>
        </div>
    )
}