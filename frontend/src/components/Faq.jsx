import React, { useState } from 'react';

const faqs = [
  {
    question: 'What is CropMate?',
    answer: 'CropMate is a smart farming assistant that helps diagnose crop diseases and provides personalized agricultural advice using image and voice input.',
  },
  {
    question: 'How does it identify crop diseases?',
    answer: 'You can upload a photo of your crop, and our AI model will analyze the image to detect diseases and suggest solutions.',
  },
  {
    question: 'Is CropMate free to use?',
    answer: 'Yes, CropMate will offer a free tier with essential features for all users.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#FFFDF5] py-16 px-6">
      <h3 className="text-3xl font-semibold text-center text-[#103713] mb-10">Frequently Asked Questions</h3>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-[#E2DBD0] rounded-xl p-5 cursor-pointer shadow-sm bg-white">
            <div
              className="flex justify-between items-center"
              onClick={() => toggle(index)}
            >
              <h4 className="text-lg font-medium text-[#103713]">{faq.question}</h4>
              <span className="text-[#628B35] text-xl">
                {openIndex === index ? '-' : '+'}
              </span>
            </div>
            {openIndex === index && (
              <p className="text-[#103713] mt-4 transition-all duration-200">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
