'use client';
import Link from 'next/link';

const LoginPage = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        // Firebase login logic will go here
    };

    const handleGoogleSignIn = () => {
        // Firebase Google Sign-In logic will go here
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-base-100 px-4">
            <div className="card w-full max-w-md shadow-2xl bg-base-200 border border-base-300 p-6 md:p-8 rounded-3xl">
                <h2 className="text-3xl font-extrabold text-center text-primary mb-2">Welcome Back</h2>
                <p className="text-sm text-center text-base-content/70 mb-6">Login to access your study nook</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email Address</span>
                        </label>
                        <input type="email" placeholder="Enter your email" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type="password" placeholder="Enter your password" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-primary text-white w-full">Login</button>
                    </div>
                </form>

                <div className="divider my-6 text-sm text-base-content/50">OR</div>

                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-secondary w-full flex items-center justify-center gap-2 rounded-xl">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Sign in with Google
                </button>

                <p className="text-sm text-center text-base-content/70 mt-6">
                    New to StudyNook?{' '}
                    <Link href="/register" className="text-primary font-bold hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;