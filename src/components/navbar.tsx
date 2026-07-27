import { Link } from "react-router-dom"

export default function NavBar(){
    return(
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="text-xl font-bold">
                CCC
                </div>

                <div className="flex space-x-6">
                    <Link to="/login">Login</Link>
                </div>

            </div>
            </nav>

    )
}