import React from 'react';

const ServicesSection = ({ servicesData = [] }) => {
  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(servicesData || []).map((s, i) => (
          <div key={i} className="p-4 bg-gray-800 rounded">
            <h3 className="font-semibold">{s.title || s.name || `Service ${i+1}`}</h3>
            {s.description && <p className="text-gray-400 mt-2">{s.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
