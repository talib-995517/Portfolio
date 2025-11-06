import React from 'react';

const PortfolioSection = ({ projectData = [] }) => {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(projectData || []).map((p, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded">
            <h3 className="font-semibold">{p.title || `Project ${i+1}`}</h3>
            {p.description && <p className="text-gray-400 mt-2">{p.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
