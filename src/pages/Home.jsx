import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <section id="home" className="bg-blue-500 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold">Welcome to SkillSync Africa</h1>
            <p className="mt-4 text-xl">
              Connect, Learn, and Share Skills with Others
            </p>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">Features</h2>
            <p className="mt-4">
              Peer-to-peer skill sharing, real-time updates, scheduling, video
              calls, and more!
            </p>
          </div>
        </section>

        <section id="how-it-works" className="bg-gray-200 py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4">
              1. Sign Up. 2. Connect with others. 3. Share and learn skills.
            </p>
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">Testimonials</h2>
            <p className="mt-4">
              SkillSync has changed the way I learn! - Happy User
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 SkillSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
