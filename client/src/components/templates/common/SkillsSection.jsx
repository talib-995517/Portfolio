import React from 'react';

const SkillsSection = ({ skillsData = [] }) => {
  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {(skillsData || []).map((s, i) => (
          <span key={i} className="px-3 py-1 bg-gray-700 rounded text-sm">{s.name || s}</span>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
