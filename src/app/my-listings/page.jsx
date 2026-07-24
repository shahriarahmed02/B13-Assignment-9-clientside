'use client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function MyListings() {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyRooms = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/my-rooms?email=${user.email}`);
            const data = await res.json();
            setRooms(data);
        } catch (error) {
            console.error('Failed to fetch user rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchMyRooms();
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this listing!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:5000/rooms/${id}`, {
                        method: 'DELETE'
                    });
                    const data = await res.json();

                    if (data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Your study room has been deleted.', 'success');
                        setRooms(rooms.filter(room => room._id !== id));
                    }
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete room.', 'error');
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
                <p className="text-sm text-base-content/70 mt-1">Log in to view your room listings.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-10 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-base-content">My Room Listings</h1>
                    <p className="text-sm text-base-content/70 mt-1">Manage the study rooms you have published.</p>
                </div>
                <Link href="/add-room" className="btn btn-primary text-white rounded-xl">
                    + Add New Room
                </Link>
            </div>

            {rooms.length === 0 ? (
                <div className="text-center py-16 bg-base-200/50 rounded-2xl border border-base-200">
                    <h3 className="text-xl font-bold">No Listings Found!</h3>
                    <p className="text-sm text-base-content/70 mt-1">You haven't added any study rooms yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-2xl shadow-sm">
                    <table className="table w-full">
                        <thead className="bg-base-200/50">
                            <tr>
                                <th>Room Info</th>
                                <th>Floor Location</th>
                                <th>Hourly Rate</th>
                                <th>Capacity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room._id} className="hover">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={room.image} alt={room.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{room.name}</div>
                                                <div className="text-xs text-base-content/60 line-clamp-1">{room.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-medium text-sm">{room.floor}</td>
                                    <td className="font-semibold text-primary">${room.hourlyRate}/hr</td>
                                    <td>{room.capacity} Seats</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Link href={`/rooms/${room._id}`} className="btn btn-ghost btn-xs text-info">
                                                View
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(room._id)} 
                                                className="btn btn-ghost btn-xs text-error"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}