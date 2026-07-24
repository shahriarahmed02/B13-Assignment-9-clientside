'use client';
import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/providers/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out',
                    text: 'You have been logged out successfully.',
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch(error => console.error('Logout error:', error));
    };

    const navLinks = (
        <>
            <li><Link href="/" className="hover:text-primary font-medium">Home</Link></li>
            <li><Link href="/rooms" className="hover:text-primary font-medium">Rooms</Link></li>
            {user && (
                <>
                    <li><Link href="/add-room" className="hover:text-primary font-medium">Add Room</Link></li>
                    <li><Link href="/my-listings" className="hover:text-primary font-medium">My Listings</Link></li>
                    <li><Link href="/my-bookings" className="hover:text-primary font-medium">My Bookings</Link></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100/90 backdrop-blur-md shadow-sm px-4 md:px-12 sticky top-0 z-50 border-b border-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-200">
                        {navLinks}
                    </ul>
                </div>
                {/* Brand Logo */}
                <Link href="/" className="btn btn-ghost text-2xl font-extrabold tracking-tight text-primary">
                    📚 Study<span className="text-secondary">Nook</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end flex items-center gap-3">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2">
                            <div className="w-10 rounded-full">
                                <img
                                    src={user.photoURL || "https://i.ibb.co/mR4YfB7/user-placeholder.png"}
                                    alt="User Avatar"
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[1] mt-14 w-60 p-3 shadow-xl border border-base-200">
                            <li className="px-3 py-2 border-b border-base-200">
                                <p className="font-bold text-base text-base-content">{user.displayName || 'Guest Scholar'}</p>
                                <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                            </li>
                            <li className="mt-2"><Link href="/my-listings">My Listings</Link></li>
                            <li><Link href="/my-bookings">My Bookings</Link></li>
                            <li className="mt-1 pt-1 border-t border-base-200">
                                <button onClick={handleLogOut} className="text-error font-semibold hover:bg-error/10">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="btn btn-ghost font-semibold">
                            Login
                        </Link>
                        <Link href="/register" className="btn btn-primary text-white rounded-xl shadow-md px-6">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;