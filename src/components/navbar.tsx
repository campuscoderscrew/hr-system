import { Link } from "react-router-dom"

export default function NavBar(){
    return(
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="text-xl font-bold">
                SSLC
                </div>

                <div className="flex space-x-6">
                    <Link to="/about">About</Link>
                    <Link to="/committees">Committees</Link>
                </div>

            </div>
            </nav>

    )
}