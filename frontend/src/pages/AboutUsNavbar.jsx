import { useNavigate } from "react-router-dom";
import React from 'react';
import { IoArrowBack } from "react-icons/io5";

function AboutUsNavbar() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen text-white  p-4 flex justify-center shadow-2xl">
            <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-3xl border-4 border-amber-400">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 p-3 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md mb-6"
                >
                    <IoArrowBack />
                    <span>Back</span>
                </button>

                {/* Header */}
                <h1 className="text-4xl font-extrabold text-center text-amber-500 flex items-center justify-center gap-2">
                    ✨ About Us ✨
                </h1>

                {/* Content Section */}
                <section className="mt-6 text-lg text-gray-700 p-5 rounded-lg shadow-md bg-gray-50">
                    <p className="mb-4">
                        Welcome to <span className="font-bold">Ace Pickleball Club</span> 🎾, Bhopal's premier pickleball destination! We're passionate about creating a vibrant community where players of all levels can come together to play, learn, and socialize.
                    </p>
                </section>

                <section className="mt-6 text-lg text-gray-700 p-5 rounded-lg shadow-md bg-gray-50">
                    <p className="mb-4">
                        🏐 Located in the heart of Bhopal, our state-of-the-art facility features four professional-grade pickleball courts, modern amenities, and a stadium-like atmosphere that's perfect for competitive play and socializing.
                    </p>
                </section>

                <section className="mt-6 text-lg text-gray-700 p-5 rounded-lg shadow-md bg-gray-50">
                    <p className="mb-4">
                        🏆 At <span className="font-bold">Ace Pickleball Club</span>, we provide a unique experience that's fun, social, and competitive. Whether you're a seasoned player or just starting out, our club is the perfect place to meet new people, make friends, and be part of a dynamic community.
                    </p>
                </section>

                <section className="mt-6 text-lg text-gray-700 p-5 rounded-lg shadow-md bg-gray-50">
                    <p>
                        ✨ Our mission is simple: to create a welcoming and supportive environment that fosters a love for pickleball, promotes healthy lifestyles, and builds lasting relationships. Join us today and experience the ultimate pickleball destination in Bhopal! ✨
                    </p>
                </section>
            </div>
        </div>
    );
}

export default AboutUsNavbar;
