import Link from "next/link";
import RoomCard from "@/components/RoomCard";

// Sample initial data (Later fetch from Express backend API: GET /api/rooms?limit=6)
const latestRooms = [
  {
    _id: "1",
    title: "Quiet Pod 3A",
    description: "A small, soundproof pod perfect for solo study sessions or focused interview prep.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800",
    price: 5,
    location: "Floor 3",
    seats: 2,
    category: "Quiet Zone"
  },
  {
    _id: "2",
    title: "Group Studio West",
    description: "Bright corner studio with a large whiteboard wall, ideal for project teams.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800",
    price: 12,
    location: "Floor 2",
    seats: 6,
    category: "Group Study"
  },
  {
    _id: "3",
    title: "Media & Tech Lab",
    description: "Equipped with a dual-monitor setup and high-speed fiber internet for tech projects.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
    price: 15,
    location: "Floor 1",
    seats: 4,
    category: "Tech Room"
  }
];

export default function Home() {
  return (
    <div className="space-y-20 my-8 px-4 md:px-12 max-w-7xl mx-auto">
      
      {/* 🚀 Hero Section */}
      <div className="hero bg-base-200/60 rounded-3xl overflow-hidden p-6 md:p-12 min-h-[65vh] border border-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8 lg:gap-12">
          
          {/* Banner Image */}
          <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-xl border border-base-300">
            <img 
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200" 
              alt="Library Study Room" 
              className="w-full h-80 md:h-[400px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Hero Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Quiet rooms, on demand
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mt-4 text-base-content">
              Find Your Perfect <br />
              <span className="text-primary">Study Room</span>
            </h1>
            <p className="py-6 text-base md:text-lg text-base-content/80">
              Browse and book quiet, private study rooms in your library by the hour. List your own room and earn — without the scheduling headaches.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/rooms" className="btn btn-primary text-white px-8 rounded-xl shadow-md">
                Explore Rooms →
              </Link>
              <Link href="/login" className="btn btn-outline btn-primary px-8 rounded-xl">
                Get Started
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 🌟 Available Study Rooms (Dynamic Grid Section) */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-base-content">Available Study Rooms</h2>
            <p className="text-base-content/70 mt-1">Hand-picked rooms recently added to StudyNook.</p>
          </div>
          <Link href="/rooms" className="btn btn-ghost text-primary font-bold hover:bg-primary/10">
            View all rooms →
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>

      {/* 💡 Feature Section 1: Why Choose StudyNook? */}
      <div className="text-center bg-base-200/40 p-10 rounded-3xl border border-base-200">
        <h2 className="text-3xl font-extrabold mb-3 text-base-content">Why StudyNook?</h2>
        <p className="text-base-content/70 max-w-xl mx-auto mb-10">
          Built around the way real students study — quiet, focused, and on your schedule.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-200 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
              📅
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
            <p className="text-sm text-base-content/70">
              Pick a date, choose an hour slot, see the cost — done. No back-and-forth emails.
            </p>
          </div>

          <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-200 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
              🛡️
            </div>
            <h3 className="text-xl font-bold mb-2">Conflict-Free Scheduling</h3>
            <p className="text-sm text-base-content/70">
              Smart overlap detection prevents double-bookings, so the room you reserve is guaranteed.
            </p>
          </div>

          <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-200 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
              🔑
            </div>
            <h3 className="text-xl font-bold mb-2">Manage Your Listings</h3>
            <p className="text-sm text-base-content/70">
              Own a room? List it, set your hourly rate, and keep full control from your personal dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* 🚀 Feature Section 2: How It Works */}
      <div className="text-center py-6">
        <h2 className="text-3xl font-extrabold mb-3 text-base-content">How It Works</h2>
        <p className="text-base-content/70 max-w-lg mx-auto mb-10">From browsing to booked in under a minute.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-base-100 border border-base-200 shadow-sm">
            <span className="text-4xl font-black text-primary/30">01</span>
            <h4 className="text-lg font-bold mt-2">Find a Space</h4>
            <p className="text-xs text-base-content/70 mt-1">Filter by amenities, capacity, and floor location.</p>
          </div>
          <div className="p-6 rounded-2xl bg-base-100 border border-base-200 shadow-sm">
            <span className="text-4xl font-black text-primary/30">02</span>
            <h4 className="text-lg font-bold mt-2">Select Time Slot</h4>
            <p className="text-xs text-base-content/70 mt-1">Choose your preferred date and duration easily.</p>
          </div>
          <div className="p-6 rounded-2xl bg-base-100 border border-base-200 shadow-sm">
            <span className="text-4xl font-black text-primary/30">03</span>
            <h4 className="text-lg font-bold mt-2">Confirm & Study</h4>
            <p className="text-xs text-base-content/70 mt-1">Get instant confirmation and head to your private room.</p>
          </div>
        </div>
      </div>

    </div>
  );
}