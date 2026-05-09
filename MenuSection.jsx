import React from 'react';
import './MenuSection.css';

const categories = [
  { title: "Mother's", image: '/images/mothers.jpg' },
  { title: 'Classic', image: '/images/classic.jpg' },
  { title: 'Gourmet', image: '/images/gourmet.jpg' },
  { title: 'Designer', image: '/images/designer.jpg' },
  { title: 'Desserts', image: '/images/desserts.jpg' },
];

const MenuSection = () => {
  return (
    <section className="bg-[#f7e7eb] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-600">Menu</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            What will you wish for?
          </h2>
        </div>

        <div
          className="menu-section-scroll -mx-4 overflow-x-auto pb-2 px-4 sm:mx-0 sm:px-0"
          style={{ WebkitOverflowScrolling: 'touch' }}
          aria-label="Menu categories scroll"
        >
          <div className="flex gap-4 sm:gap-6">
            {categories.map((category) => (
              <article
                key={category.title}
                className="min-w-[220px] flex-1 rounded-[28px] bg-white shadow-[0_20px_60px_rgba(165,95,136,0.12)] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-105"
              >
                <div className="overflow-hidden rounded-t-[28px]">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-5 py-6 text-center">
                  <h3 className="text-lg font-semibold text-slate-900">{category.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
