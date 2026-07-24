'use client';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    router.push('/login');
    return null;
};

export default PrivateRoute;