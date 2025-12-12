import Project from "../models/Project.js";

// Default projects to seed on first load
const defaultProjects = [
  {
    title: 'Task Manager App',
    description: 'A React + Node.js app to manage tasks with authentication and CRUD operations.',
    role: 'Full Stack Developer',
    outcome: 'Built a secure task management tool with login/logout and real-time updates.',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
    status: 'Completed',
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio built with React.',
    role: 'Frontend Developer',
    outcome: 'Designed a responsive, modern portfolio showcasing my work and skills.',
    tech: ['React', 'Vite', 'CSS3', 'Responsive Design'],
    status: 'In Progress',
  },
  {
    title: 'Weather Dashboard',
    description: 'An app that shows live weather data using a public API and charts.',
    role: 'Frontend Developer',
    outcome: 'Integrated OpenWeather API and Chart.js for interactive visualizations.',
    tech: ['React', 'OpenWeather API', 'Chart.js', 'Axios'],
    status: 'Completed',
  },
];

// Seed database with default projects if empty
export const seedProjects = async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(defaultProjects);
      console.log('Projects seeded successfully');
    }
  } catch (e) {
    console.error('Error seeding projects:', e.message);
  }
};

export const getAll = async (_req, res) => {
  try { res.json(await Project.find()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
export const getById = async (req, res) => {
  try { res.json(await Project.findById(req.params.id)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const createOne = async (req, res) => {
  try { res.status(201).json(await Project.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const updateById = async (req, res) => {
  try { res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const removeById = async (req, res) => {
  try { res.json(await Project.findByIdAndDelete(req.params.id)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const removeAll = async (_req, res) => {
  try { res.json(await Project.deleteMany()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
