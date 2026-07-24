import Link from 'next/link';

const RoomCard = ({ room }) => {
    const { _id, title, image, price, location, seats, category } = room;

    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 rounded-2xl overflow-hidden group">
            {/* Room Image */}
            <figure className="relative h-52 overflow-hidden">
                <img
                    src={image || "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800"}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {category || "Study Pod"}
                </span>
            </figure>

            {/* Room Details */}
            <div className="card-body p-5">
                <h2 className="card-title text-xl font-bold text-base-content line-clamp-1 group-hover:text-primary transition-colors">
                    {title}
                </h2>
                
                <p className="text-sm text-base-content/70 flex items-center gap-1 mt-1">
                    📍 {location || "Library Building, Floor 2"}
                </p>

                <div className="flex justify-between items-center my-3 text-sm font-medium border-y border-base-200 py-2">
                    <span className="text-base-content/80">
                        👥 Capacity: <strong className="text-base-content">{seats} Seats</strong>
                    </span>
                    <span className="text-lg font-extrabold text-primary">
                        ${price}<span className="text-xs font-normal text-base-content/60">/hr</span>
                    </span>
                </div>

                {/* Action Button */}
                <div className="card-actions mt-2">
                    <Link
                        href={`/rooms/${_id}`}
                        className="btn btn-primary btn-block text-white rounded-xl font-semibold shadow-sm hover:shadow-md"
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;