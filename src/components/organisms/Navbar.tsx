import Link from "next/link";

const Navbar = ({ user }) => {
    return (
        <nav className="bg-gray-800 p-4">
                {user ? (
                    <Link href="/api/auth/logout" className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700">
                        Déconnexion
                    </Link>
                ) : (
                    <div className="space-x-2">
                        <Link href="/api/auth/login" className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700">
                            Connexion
                        </Link>
                        <Link href="/api/auth/signup" className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700">
                            Inscription
                        </Link>
                    </div>
                )}
        </nav>
    );
};

export default Navbar;