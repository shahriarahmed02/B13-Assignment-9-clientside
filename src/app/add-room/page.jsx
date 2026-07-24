'use client';
import { useContext, useState } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const amenityOptions = [
    'Whiteboard',
    'Projector',
    'Wi-Fi',
    'Power Outlets',
    'Quiet Zone',
    'Air Conditioning'
];

export default function AddRoom() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCheckboxChange = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    const handleAddRoom = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;

        const roomData = {
            name: form.name.value,
            description: form.description.value,
            image: form.image.value,
            floor: form.floor.value,
            capacity: Number(form.capacity.value),
            hourlyRate: Number(form.hourlyRate.value),
            amenities: selectedAmenities,
            bookingCount: 0,
            ownerEmail: user?.email,
            ownerName: user?.displayName || 'Unknown Owner',
            createdAt: new Date().toISOString(),
        };

        try {
            // Express Backend API Connect (POST /rooms)
            const res = await fetch('http://localhost:5000/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // JWT Cookie পাঠানোর জন্য
                body: JSON.stringify(roomData),
            });

            const data = await res.json();

            if (data.insertedId || data.acknowledged) {
                Swal.fire({
                    icon: 'success',
                    title: 'Room Added Successfully!',
                    text: 'Your study room is now stored in MongoDB and listed.',
                    confirmButtonColor: '#4F46E5',
                });
                form.reset();
                setSelectedAmenities([]);
                router.push('/rooms');
            } else {
                throw new Error(data.message || 'Failed to add room');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error Adding Room',
                text: error.message || 'Something went wrong. Please check if you are logged in.',
                confirmButtonColor: '#EF4444',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 py-10 px-4 md:px-8 max-w-4xl mx-auto">
            <div className="bg-base-100 border border-base-200 shadow-xl rounded-3xl p-6 md:p-10">
                <div className="text-center mb-8">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase">
                        List Your Space
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-base-content">
                        Add a New Study Room
                    </h1>
                    <p className="text-sm text-base-content/70 mt-1">
                        Fill out the details below to make your quiet room available for booking.
                    </p>
                </div>

                <form onSubmit={handleAddRoom} className="space-y-6">
                    {/* Room Name & Floor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label font-semibold text-base-content">Room Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g., Silent Focus Pod 3A"
                                className="input input-bordered w-full rounded-xl focus:input-primary"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold text-base-content">Floor Location</label>
                            <input
                                type="text"
                                name="floor"
                                placeholder="e.g., 3rd Floor, West Wing"
                                className="input input-bordered w-full rounded-xl focus:input-primary"
                                required
                            />
                        </div>
                    </div>

                    {/* Image URL & Hourly Rate & Capacity */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="form-control md:col-span-1">
                            <label className="label font-semibold text-base-content">Image URL</label>
                            <input
                                type="url"
                                name="image"
                                placeholder="https://..."
                                className="input input-bordered w-full rounded-xl focus:input-primary"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold text-base-content">Capacity (Seats)</label>
                            <input
                                type="number"
                                name="capacity"
                                min="1"
                                placeholder="e.g., 4"
                                className="input input-bordered w-full rounded-xl focus:input-primary"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold text-base-content">Hourly Rate ($)</label>
                            <input
                                type="number"
                                name="hourlyRate"
                                min="1"
                                placeholder="e.g., 10"
                                className="input input-bordered w-full rounded-xl focus:input-primary"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label font-semibold text-base-content">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Describe the atmosphere, equipment, or any specific guidelines..."
                            className="textarea textarea-bordered w-full rounded-xl focus:textarea-primary"
                            required
                        ></textarea>
                    </div>

                    {/* Amenities Checkboxes */}
                    <div>
                        <label className="label font-semibold text-base-content mb-2">Amenities</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-base-200/50 p-4 rounded-2xl border border-base-200">
                            {amenityOptions.map((amenity, index) => (
                                <label key={index} className="label cursor-pointer justify-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedAmenities.includes(amenity)}
                                        onChange={() => handleCheckboxChange(amenity)}
                                        className="checkbox checkbox-primary rounded-md"
                                    />
                                    <span className="label-text font-medium text-base-content">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn btn-primary btn-block text-white rounded-xl text-lg shadow-md"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Publish Study Room Listing'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}