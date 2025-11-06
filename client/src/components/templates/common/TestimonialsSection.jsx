import React from 'react';

const TestimonialsSection = ({ testimonialData = [] }) => {
  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
      <div className="space-y-4">
        {(testimonialData || []).map((t, i) => (
          <blockquote key={i} className="bg-gray-800 p-4 rounded">
            <p className="text-gray-300">{t.quote || t.text}</p>
            <footer className="text-sm text-gray-400 mt-2">— {t.author || t.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
