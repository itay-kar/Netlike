import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const SignupPage = () => {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup({ email, username, password });
            toast.success('Account created!');
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className='h-screen w-full hero-bg'>
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
                <Link to={'/'}>
                    <img src='/netflix-logo.png' alt='logo' className='w-52' />
                </Link>
            </header>

            <div className="flex justify-center items-center mt-20 mx-3">
                <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                    <h1 className="text-center text-white text-2xl font-bold mb-4">Sign Up</h1>

                    <form className="space-y-4" onSubmit={handleSignUp}>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="you@example.com"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="username" className="text-sm font-medium text-gray-300 block">Username</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="johndoe"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-300 block">Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="••••••••"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="text-center text-gray-400 text-base mt-2">
                        Already a member?{' '}
                        <Link to="/login" className="text-red-500 hover:underline">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
