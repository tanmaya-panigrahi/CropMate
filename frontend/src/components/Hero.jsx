import React from 'react';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-background text-center py-28 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
        Welcome to <span className="text-secondary">CropMate</span>
      </h2>
      <p className="text-primary text-lg max-w-2xl mx-auto mb-6">
        Your smart farming assistant to diagnose crop diseases and get real-time personalized advice with just an image or voice.
      </p>
      <Link to="/signup">
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors duration-300">
          Get Started
        </button>
      </Link>
    </section>
  );
};

export default Hero;
