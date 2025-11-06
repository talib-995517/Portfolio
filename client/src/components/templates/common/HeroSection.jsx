import React from 'react';

const HeroSection = ({ heroData = {}, aboutData = {} }) => {
  const { name = 'Your Name', title = '', tagline = '', profileImage = '' } = heroData;
  return (
    <header className="py-12 px-6 bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
        {profileImage && (
          <div className="flex-shrink-0">
            <img src={profileImage} alt={name} className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-md" />
          </div>
        )}

        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{name}</h1>
          {title && <p className="text-lg md:text-xl text-gray-300 mt-1">{title}</p>}
          {tagline && <p className="mt-3 text-gray-400">{tagline}</p>}
          {aboutData?.short && <p className="mt-4 text-gray-400">{aboutData.short}</p>}
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
