'use client';
import { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthContext } from '@/providers/AuthProvider';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function RoomDetails() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    // Form States
    const [bookingDate, setBookingDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const res = await fetch(`http://localhost:5000/rooms/${id}`);
                const data = await res.json();
                setRoom(data);
            } catch (error) {
                console.error('Failed to fetch room details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchRoomDetails();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Login',
                text: 'You need to log in to book a study room.',
                confirmButtonColor: '#4F46E5',
            });
            return;
        }

        setBookingLoading(true);

        const bookingData = {
            roomId: room._id,
            roomName: room.name,
            roomImage: room.image,
            hourlyRate: room.hourlyRate,
            userEmail: user.email,
            userName: user.displayName || 'Anonymous',
            bookingDate,
            startTime,
            endTime,
            status: 'Confirmed',
            createdAt: new Date().toISOString()
        };

        try {
            const res = await fetch('http://localhost:5000/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });

            const data = await res.json();

            if (data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Confirmed!',
                    text: `You have successfully booked ${room.name}.`,
                    confirmButtonColor: '#4F46E5',
                });
                router.push('/my-bookings');
            } else {
                throw new Error(data.message || 'Failed to complete booking');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Booking Failed',
                text: error.message || 'Something went wrong. Please try again.',
                confirmButtonColor: '#EF4444',
            });
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-base-content">Room Not Found!</h2>
                <Link href="/rooms" className="btn btn-primary btn-sm mt-4 text-white">
                    Back to Rooms
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-10 px-4 md:px-8 max-w-6xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
                <Link href="/rooms" className="btn btn-ghost btn-sm gap-2 text-base-content">
                    ← Back to all rooms
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Room Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-3xl overflow-hidden border border-base-200 shadow-sm h-80 md:h-96 relative">
                        <img 
                            src={room.image} 
                            alt={room.name} 
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute top-4 right-4 bg-primary text-white text-sm font-bold px-4 py-1.5 rounded-full shadow">
                            ${room.hourlyRate} / hour
                        </span>
                    </div>

                    <div className="bg-base-100 border border-base-200 p-6 md:p-8 rounded-3xl shadow-sm">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                            {room.floor}
                        </span>
                        <h1 className="text-3xl font-extrabold text-base-content mt-1">
                            {room.name}
                        </h1>
                        <p className="text-sm text-base-content/60 mt-1">
                            Host/Owner: <span className="font-semibold text-base-content">{room.ownerName || room.ownerEmail}</span>
                        </p>

                        <hr className="my-5 border-base-200" />

                        <h3 className="text-lg font-bold text-base-content mb-2">About this space</h3>
                        <p className="text-base-content/80 leading-relaxed text-sm md:text-base">
                            {room.description}
                        </p>

                        <div className="mt-6">
                            <h3 className="text-lg font-bold text-base-content mb-3">Capacity & Specs</h3>
                            <div className="inline-block bg-base-200/50 px-4 py-2 rounded-xl border border-base-200 text-sm font-semibold">
                                🪑 Total Seats: {room.capacity} People
                            </div>
                        </div>

                        {/* Amenities */}
                        {room.amenities?.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-base-content mb-3">Available Amenities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {room.amenities.map((amenity, idx) => (
                                        <span key={idx} className="badge badge-primary badge-outline py-3 px-4 font-medium rounded-xl">
                                            ✓ {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Booking Form Card */}
                <div className="lg:col-span-1">
                    <div className="bg-base-100 border border-base-200 p-6 rounded-3xl shadow-xl sticky top-6">
                        <h2 className="text-2xl font-bold text-base-content mb-2">Book This Room</h2>
                        <p className="text-xs text-base-content/60 mb-6">Select your preferred date and time slots.</p>

                        <form onSubmit={handleBooking} className="space-y-4">
                            <div className="form-control">
                                <label className="label font-semibold text-sm">Date</label>
                                <input 
                                    type="date" 
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="input input-bordered rounded-xl w-full focus:input-primary"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="form-control">
                                    <label className="label font-semibold text-sm">Start Time</label>
                                    <input 
                                        type="time" 
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="input input-bordered rounded-xl w-full focus:input-primary"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label font-semibold text-sm">End Time</label>
                                    <input 
                                        type="time" 
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="input input-bordered rounded-xl w-full focus:input-primary"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="bg-base-200/50 p-4 rounded-2xl border border-base-200 my-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-base-content/70">Rate</span>
                                    <span className="font-semibold">${room.hourlyRate} / hour</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-base-content/70">Logged in as</span>
                                    <span className="font-semibold line-clamp-1">{user?.email || 'Guest'}</span>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={bookingLoading}
                                className="btn btn-primary btn-block text-white rounded-xl text-base shadow-md"
                            >
                                {bookingLoading ? <span className="loading loading-spinner"></span> : 'Confirm Booking'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}