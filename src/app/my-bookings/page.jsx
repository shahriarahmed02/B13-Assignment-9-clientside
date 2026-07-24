'use client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function MyBookings() {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyBookings = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/my-bookings?email=${user.email}`);
            const data = await res.json();
            setBookings(data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchMyBookings();
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);

    const handleCancelBooking = (id) => {
        Swal.fire({
            title: 'Cancel Booking?',
            text: "Are you sure you want to cancel this booking?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:5000/bookings/${id}`, {
                        method: 'DELETE'
                    });
                    const data = await res.json();

                    if (data.deletedCount > 0) {
                        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
                        setBookings(bookings.filter(item => item._id !== id));
                    }
                } catch (error) {
                    Swal.fire('Error!', 'Failed to cancel booking.', 'error');
                }
            }
        });
    };

    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Please Login</h2>
                <p className="text-sm text-base-content/70 mt-1">Log in to view your bookings.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-10 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-base-content">My Bookings</h1>
                <p className="text-sm text-base-content/70 mt-1">View and manage your study room reservations.</p>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-16 bg-base-200/50 rounded-2xl border border-base-200">
                    <h3 className="text-xl font-bold">No Bookings Found!</h3>
                    <p className="text-sm text-base-content/70 mt-1">You haven't reserved any study room yet.</p>
                    <Link href="/rooms" className="btn btn-primary btn-sm text-white mt-4 rounded-lg">
                        Browse Rooms
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="card bg-base-100 border border-base-200 shadow-sm rounded-2xl overflow-hidden p-5 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={booking.roomImage} alt={booking.roomName} className="w-16 h-16 rounded-xl object-cover" />
                                    <div>
                                        <h3 className="font-bold text-lg line-clamp-1">{booking.roomName}</h3>
                                        <span className="badge badge-success text-white badge-sm mt-1">{booking.status || 'Confirmed'}</span>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm bg-base-200/40 p-3 rounded-xl border border-base-200">
                                    <div className="flex justify-between">
                                        <span className="text-base-content/70">Date:</span>
                                        <span className="font-semibold">{booking.bookingDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-base-content/70">Time Slot:</span>
                                        <span className="font-semibold">{booking.startTime} - {booking.endTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-base-content/70">Rate:</span>
                                        <span className="font-bold text-primary">${booking.hourlyRate}/hr</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleCancelBooking(booking._id)}
                                className="btn btn-outline btn-error btn-sm w-full mt-5 rounded-xl"
                            >
                                Cancel Reservation
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}