import Service from "../models/Service.js";

// Default services to seed on first load
const defaultServices = [
  {
    title: 'Web Development',
    desc: 'I design and develop responsive, high-performance websites using React, Node.js, and modern frameworks. My approach focuses on creating clean user interfaces, intuitive navigation, and dynamic functionality.',
    fullDesc: 'From portfolios to complex web applications, I prioritize scalability, maintainability, and best coding practices to deliver professional-grade web solutions that engage users and drive results.',
    img: '/images/img1.png',
    features: ['React & Modern Frameworks', 'Responsive Design', 'Performance Optimization', 'SEO-Friendly Development'],
  },
  {
    title: 'API Integration',
    desc: 'I specialize in connecting applications to reliable data sources and third-party services using RESTful and GraphQL APIs. This includes building secure endpoints and managing authentication.',
    fullDesc: 'My goal is to make applications smarter and more connected — integrating payment gateways, cloud services, or AI-based APIs with precision and performance for seamless data flow.',
    img: '/images/img2.png',
    features: ['RESTful APIs', 'GraphQL APIs', 'Secure Authentication', 'Payment Gateway Integration'],
  },
  {
    title: 'Performance Optimization',
    desc: 'I analyze and enhance web applications to achieve faster load times, smoother interactions, and higher search-engine visibility.',
    fullDesc: 'Through techniques like code refactoring, lazy loading, caching strategies, and accessibility audits, I ensure both users and search engines experience top performance with improved usability and SEO ranking.',
    img: '/images/img3.png',
    features: ['Code Optimization', 'Caching Strategies', 'SEO Enhancement', 'Accessibility Audit'],
  },
];

// Seed database with default services if empty
export const seedServices = async () => {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(defaultServices);
      console.log('Services seeded successfully');
    }
  } catch (e) {
    console.error('Error seeding services:', e.message);
  }
};

export const getAll = async (_req, res) => {
  try { res.json(await Service.find()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

export const getById = async (req, res) => {
  try { res.json(await Service.findById(req.params.id)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

export const createOne = async (req, res) => {
  try { res.status(201).json(await Service.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

export const updateById = async (req, res) => {
  try { res.json(await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

export const removeById = async (req, res) => {
  try { res.json(await Service.findByIdAndDelete(req.params.id)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

export const removeAll = async (_req, res) => {
  try { res.json(await Service.deleteMany()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
