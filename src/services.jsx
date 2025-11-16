import React from 'react';

const services = [
  {
    id: 1,
    title: 'Web Development',
    desc:
      'I design and develop responsive, high-performance websites using React, Node.js, and modern frameworks. My approach focuses on creating clean user interfaces, intuitive navigation, and dynamic functionality — ensuring seamless experiences across all devices. From portfolios to complex web applications, I prioritize scalability, maintainability, and best coding practices to deliver professional-grade web solutions.',
    img: '/images/img1.png',
  },
  {
    id: 2,
    title: 'API Integration',
    desc:
      'I specialize in connecting applications to reliable data sources and third-party services using RESTful and GraphQL APIs. This includes building secure endpoints, managing authentication, and ensuring efficient data flow between front-end and back-end systems. My goal is to make applications smarter and more connected — integrating payment gateways, cloud services, or AI-based APIs with precision and performance.',
    img: '/images/img2.png',
  },
  {
    id: 3,
    title: 'Performance Optimization',
    desc:
      'I analyze and enhance web applications to achieve faster load times, smoother interactions, and higher search-engine visibility. Through techniques like code refactoring, lazy loading, caching strategies, and accessibility audits, I ensure both users and search engines experience top performance. Every optimization step is data-driven, improving usability, SEO ranking, and overall site reliability.',
    img: '/images/img3.png',
  },
];

export default function Services() {
  return (
    <section>
      <h2>Services</h2>
      <ul>
        {services.map((s) => (
          <li
            key={s.id}
            style={{
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            <h3>{s.title}</h3>

            {/* Float image right with text wrapping */}
            <img
              src={s.img}
              alt={s.title}
              style={{
                float: 'right',
                width: '150px',
                height: '150px',
                margin: '0 0 10px 16px',
                objectFit: 'contain',
                shapeOutside: 'inset(0 round 10px)',
              }}
            />

            <p>{s.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
