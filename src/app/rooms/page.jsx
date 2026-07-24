'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchRooms = async (searchQuery = '') => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/rooms?search=${searchQuery}`);
            const data = await res.json();
            setRooms(data);
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRooms(search);
    };

    return (
        <div className="min-h-screen bg-base-100 py-10 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-extrabold text-base-content mb-3">
                    Available Study Rooms
                </h1>
                <p className="text-sm md:text-base text-base-content/70 max-w-2xl mx-auto">
                    Find and book the quietest space suited for your study sessions and collaborative work.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex justify-center items-center gap-2 mt-6 max-w-md mx-auto">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search rooms by name..."
                        className="input input-bordered w-full rounded-xl focus:input-primary"
                    />
                    <button type="submit" className="btn btn-primary rounded-xl text-white">
                        Search
                    </button>
                </form>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : rooms.length === 0 ? (
                /* Empty State */
                <div className="text-center py-16 bg-base-200/50 rounded-2xl border border-base-200">
                    <h3 className="text-xl font-bold text-base-content">No Study Rooms Found!</h3>
                    <p className="text-sm text-base-content/70 mt-1">
                        Try searching for something else or add a new study room.
                    </p>
                    <Link href="/add-room" className="btn btn-primary btn-sm mt-4 text-white rounded-lg">
                        Add a Room
                    </Link>
                </div>
            ) : (
                /* Rooms Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <div key={room._id} className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between">
                            <div>
                                <figure className="h-48 w-full overflow-hidden relative">
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                    <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                        ${room.hourlyRate}/hr
                                    </span>
                                </figure>

                                <div className="p-5">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-xl font-bold text-base-content line-clamp-1">{room.name}</h2>
                                    </div>
                                    <p className="text-xs text-primary font-semibold mt-0.5">{room.floor}</p>

                                    <p className="text-sm text-base-content/70 mt-2 line-clamp-2">
                                        {room.description}
                                    </p>

                                    {/* Amenities Badge */}
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        {room.amenities?.slice(0, 3).map((amenity, idx) => (
                                            <span key={idx} className="badge badge-sm badge-soft badge-primary font-medium">
                                                {amenity}
                                            </span>
                                        ))}
                                        {room.amenities?.length > 3 && (
                                            <span className="badge badge-sm badge-ghost">
                                                +{room.amenities.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="p-5 pt-0 mt-2">
                                <div className="flex justify-between items-center pt-3 border-t border-base-200">
                                    <span className="text-xs text-base-content/60 font-medium">
                                        Capacity: <strong className="text-base-content">{room.capacity} Seats</strong>
                                    </span>
                                    <Link href={`/rooms/${room._id}`} className="btn btn-primary btn-sm text-white rounded-lg px-4">
                                        See Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
