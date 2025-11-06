import React from 'react';

const AboutSection = ({ aboutData = {} }) => {
  const { heading = 'About Me', content = '' } = aboutData;
  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
      <p className="text-gray-300">{content || 'Add some information about yourself.'}</p>
    </section>
  );
};

export default AboutSection;
