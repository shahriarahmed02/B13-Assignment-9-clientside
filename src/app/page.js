import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16 my-8">
      {/* 🚀 Hero Section */}
      <div className="hero bg-base-200 rounded-3xl overflow-hidden p-6 md:p-12 min-h-[60vh]">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8 lg:gap-12">
          <div className="max-w-md bg-primary/10 p-8 rounded-2xl border-2 border-dashed border-primary text-center">
            {/* Placeholder for Banner Image/Illustration */}
            <span className="text-6xl">📚</span>
            <h3 className="text-xl font-bold mt-4 text-primary">Study Group Hub</h3>
            <p className="text-sm text-base-content/70 mt-2">Create assignments, grade your friends, and level up together!</p>
          </div>
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Learn Together, <br />
              <span className="text-primary">Achieve More</span> with StudyNook
            </h1>
            <p className="py-6 text-base md:text-lg text-base-content/80">
              Welcome to the ultimate collaborative study platform. Create assignments, connect with friends, share knowledge, and keep track of your group study goals effortlessly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/all-studies" className="btn btn-primary text-white px-6">
                Explore Assignments
              </Link>
              <Link href="/login" className="btn btn-outline btn-primary px-6">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 Features Section Quick Setup */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose StudyNook?</h2>
        <p className="text-base-content/70 max-w-lg mx-auto mb-8">Features built to make group study engaging, structured, and rewarding.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl border border-base-200 p-6 text-left">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="text-xl font-bold mb-2">Create Assignments</h3>
            <p className="text-sm text-base-content/75">Easily create and share custom assignments with difficulty levels.</p>
          </div>
          <div className="card bg-base-100 shadow-xl border border-base-200 p-6 text-left">
            <div className="text-3xl mb-2">🤝</div>
            <h3 className="text-xl font-bold mb-2">Friend Grading</h3>
            <p className="text-sm text-base-content/75">Examine and grade your friends' submitted assignments transparently.</p>
          </div>
          <div className="card bg-base-100 shadow-xl border border-base-200 p-6 text-left">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="text-xl font-bold mb-2">Secure JWT Auth</h3>
            <p className="text-sm text-base-content/75">Your data and submissions are always fully guarded and safe.</p>
          </div>
        </div>
      </div>
    </div>
  );
}