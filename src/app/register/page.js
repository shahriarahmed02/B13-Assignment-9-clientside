'use client';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/providers/AuthProvider';
import Swal from 'sweetalert2';

const RegisterPage = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const router = useRouter();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        // Password validation rule
        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be at least 6 characters long!',
            });
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photoURL)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful!',
                            text: `Welcome to StudyNook, ${name}!`,
                            timer: 2000,
                            showConfirmButton: false
                        });
                        form.reset();
                        router.push('/');
                    })
                    .catch(err => {
                        Swal.fire({ icon: 'error', title: 'Profile Update Error', text: err.message });
                    });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message,
                });
            });
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
                        <input type="text" name="name" placeholder="Enter your full name" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email Address</span>
                        </label>
                        <input type="email" name="email" placeholder="Enter your email" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Image URL</span>
                        </label>
                        <input type="url" name="photoURL" placeholder="Paste your profile picture link" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="Create a strong password" className="input input-bordered w-full" required />
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