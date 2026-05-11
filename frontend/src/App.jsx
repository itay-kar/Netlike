import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/home/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { useAuthStore } from './store/authStore';

function App() {
    const { user, checkAuth, isLoading } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
                Loading...
            </div>
        );
    }

    return (
        <>
            <Toaster position="bottom-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
                <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to='/' />} />
            </Routes>
        </>
    );
}

export default App;
