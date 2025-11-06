import React from 'react';

const Footer = ({ basicData = {}, socialsData = [] }) => {
  // normalize socialsData to an array of { platform, url, name }
  let normalizedSocials = [];
  try {
    if (Array.isArray(socialsData)) {
      normalizedSocials = socialsData;
    } else if (socialsData && typeof socialsData === 'object') {
      // If it's a single social object
      if ('platform' in socialsData || 'url' in socialsData || 'name' in socialsData) {
        normalizedSocials = [socialsData];
      } else {
        // convert values of the object to array
        normalizedSocials = Object.values(socialsData).map((v) => (typeof v === 'string' ? { platform: v, url: v } : v));
      }
    } else if (typeof socialsData === 'string') {
      normalizedSocials = [{ platform: socialsData, url: socialsData }];
    }
  } catch (e) {
    // fallback
    console.warn('Footer: failed to normalize socialsData', socialsData, e);
    normalizedSocials = [];
  }

  return (
    <footer className="py-6 px-6 mt-12 bg-gray-800 text-gray-400">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>{basicData?.copyright || `© ${new Date().getFullYear()} Your Name`}</div>
        <div className="flex gap-3 mt-2 md:mt-0">
          {Array.isArray(normalizedSocials) && normalizedSocials.length > 0 ? (
            normalizedSocials.map((s, i) => (
              <a key={i} href={s?.url || '#'} className="text-gray-300 hover:text-white">{s?.platform || s?.name || s?.url || 'Link'}</a>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
