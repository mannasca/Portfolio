import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js";
import Service from "./models/Service.js";

dotenv.config();

const seedData = async () => {
  try {
    console.log("🔄 Starting database seeding...");
    
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
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
      
      await Project.insertMany(defaultProjects);
      console.log("✅ Projects seeded: 3 projects added");
    } else {
      console.log(`⏭️  Projects already exist: ${projectCount} found, skipping`);
    }

    // Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
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
      
      await Service.insertMany(defaultServices);
      console.log("✅ Services seeded: 3 services added");
    } else {
      console.log(`⏭️  Services already exist: ${serviceCount} found, skipping`);
    }

    console.log("✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err.message);
    process.exit(1);
  }
};

seedData();
