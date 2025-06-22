import React from 'react';

const features = [
  { title: '📷 Diagnose Crops', desc: 'Upload a photo and get instant diagnosis of crop diseases.' },
  { title: '🤖 Chatbot Support', desc: 'Talk to CropMate chatbot for quick advice on the go.' },
  { title: '📊 Personalized Insights', desc: 'Get tips tailored to your crop and region.' },
];

const Features = () => {
  return (

    
    <section className="bg-[#E2DBD0] py-16 px-6 text-center">
      <h3 className="text-3xl font-semibold text-[#103713] mb-10">Key Features</h3>
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="bg-[#FFFDF5] p-6 rounded-2xl shadow-md">
            <h4 className="text-xl font-bold mb-2">{f.title}</h4>
            <p className="text-[#103713]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
