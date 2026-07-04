'use client';
import Link from 'next/link';

const RegisterPage = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        // Firebase registration logic will go here
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-base-100 px-4 my-6">
            <div className="card w-full max-w-md shadow-2xl bg-base-200 border border-base-300 p-6 md:p-8 rounded-3xl">
                <h2 className="text-3xl font-extrabold text-center text-primary mb-2">Create Account</h2>
                <p className="text-sm text-center text-base-content/70 mb-6">Join StudyNook and start learning together</p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Full Name</span>
                        </label>
                        <input type="text" placeholder="Enter your full name" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email Address</span>
                        </label>
                        <input type="email" placeholder="Enter your email" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Image URL</span>
                        </label>
                        <input type="url" placeholder="Paste your profile picture link" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type="password" placeholder="Create a strong password" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-primary text-white w-full">Register</button>
                    </div>
                </form>

                <p className="text-sm text-center text-base-content/70 mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary font-bold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;