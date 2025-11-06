import React from 'react';

const ContactSection = ({ contactData = {} }) => {
  const phone = contactData.phone || contactData.mobile || contactData.phoneNumber;

  return (
    <section className="py-12 px-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <p className="text-gray-300">{contactData.description || 'Get in touch via email or social links.'}</p>
      {contactData.email && (
        <p className="mt-2">Email: <a className="text-blue-400" href={`mailto:${contactData.email}`}>{contactData.email}</a></p>
      )}

      {phone && (
        <p className="mt-2">Phone: <a className="text-blue-400" href={`tel:${phone}`}>{phone}</a></p>
      )}
    </section>
  );
};

export default ContactSection;
