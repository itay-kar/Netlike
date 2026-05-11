import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        toast.success('Logged out');
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/?search=${encodeURIComponent(query.trim())}`);
            setShowSearch(false);
            setQuery('');
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black to-transparent">
            <div className="flex items-center gap-8">
                <Link to="/">
                    <img src="/netflix-logo.png" alt="Netlike" className="w-32" />
                </Link>
                <div className="hidden md:flex gap-6 text-sm text-gray-300">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <Link to="/?type=movies" className="hover:text-white transition-colors">Movies</Link>
                    <Link to="/?type=tv" className="hover:text-white transition-colors">TV Shows</Link>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {showSearch ? (
                    <form onSubmit={handleSearch} className="flex items-center gap-2 bg-black/80 border border-gray-600 rounded px-3 py-1">
                        <Search size={16} className="text-gray-400" />
                        <input
                            autoFocus
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onBlur={() => !query && setShowSearch(false)}
                            placeholder="Titles, people, genres"
                            className="bg-transparent text-white py-1 outline-none w-44 text-sm"
                        />
                    </form>
                ) : (
                    <button onClick={() => setShowSearch(true)}>
                        <Search size={20} className="text-gray-300 hover:text-white transition-colors" />
                    </button>
                )}

                <div className="flex items-center gap-3">
                    <img
                        src={user?.image || '/Avatar1.png'}
                        alt={user?.username}
                        className="w-8 h-8 rounded"
                    />
                    <button onClick={handleLogout} title="Logout" className="text-gray-300 hover:text-white transition-colors">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
