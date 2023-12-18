// src/routes/index.js
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI;
const dbName = 'ja_blogs';
const collectionName = 'upload';

// Add a flag to track if the application has started
let applicationStarted = false;

async function startApplication() {
  // Check if the application has already started
  if (applicationStarted) {
    console.log('Application already started. Exiting...');
    return;
  }

  console.log('startApplication called');
  applicationStarted = true;

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Query all documents from the 'update' collection
    const allUpdates = await collection.find().toArray();

    // Log the retrieved data
    console.log('All Updates:', allUpdates);

    // Your further application logic here
  } catch (error) {
    console.error('Error querying updates:', error.message);
  } finally {
    await client.close();
  }
}

startApplication();

startApplication();

// Route to get programs
router.get('/api/programs', (req, res) => {
  const programs = ['Degree', 'Diploma']; // Replace with your actual programs
  res.json(programs);
});

const availableSpecializations = {
    degree: ['Computer', 'Civil'],
    diploma: ['Electrical', 'Mechanical'],
    // Add more specializations as needed
  };
  
router.get('/api/specializations', (req, res) => {
    try {
      const { program } = req.query;
  
      console.log('Received program (server):', program);
  
      if (!program) {
        console.error('Error: Program not specified in the request query.');
        throw new Error('Program not specified in the request query.');
      }
  
      const normalizedProgram = program.toLowerCase(); // Convert to lowercase
      const specializations = availableSpecializations[normalizedProgram] || [];
  
      res.json(specializations);
    } catch (error) {
      console.error('Error in /api/specializations endpoint:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

// Route to get download links based on program and specialization
router.get('/api/download-links', (req, res) => {
    const { program, specialization } = req.query;
  
    // Replace with your logic to generate download links based on user selection
    const downloadLinks = generateDownloadLinks(program, specialization);
  
    res.json(downloadLinks);
  });
  
  async function generateDownloadLinks(program, specialization) {
    const client = new MongoClient(url);
  
    try {
      await client.connect();
      console.log('Connected to MongoDB');
  
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
  
      // Log the program and specialization being queried
      console.log('Querying for:', program, '>', specialization);
  
      // Query the document matching the provided program and specialization
      const document = await collection.findOne({
        name: { $regex: new RegExp(`^${program}$`, 'i') },
        'specializations.name': { $regex: new RegExp(`^${specialization}$`, 'i') },
      });
  
      console.log('Document:', document);
  
      if (!document) {
        console.log('Document not found');
        return [];
      }
  
      // Flatten the specializations array
      const specializations = document.specializations.flat();
      console.log('Specializations:', specializations);
  
      // Find the specialization data
      const specializationData = specializations.find((spec) => {
        console.log('Comparison:', spec.name.toLowerCase(), specialization.toLowerCase());
        return spec.name.toLowerCase() === specialization.toLowerCase();
      });
  
      console.log('Specialization Data:', specializationData);
  
      if (!specializationData) {
        console.log('Specialization not found');
        return [];
      }
  
      // Map the items to the required format
      const downloadLinks = specializationData.items.map(item => ({
        title: item.material || '', // Modify based on the actual structure
        filename: item.filename,
        url: item.url,
      }));
  
      return downloadLinks;
    } catch (error) {
      console.error('Error generating download links:', error.message);
      return [];
    } finally {
      await client.close();
    }
  }
  

module.exports = router;



/*
// Example data structure with semesters, materials, and different data for each program/specialization
    const dataByProgramSpecialization = {
        degree: {
          computer: [
            { filename: 'pps.pdf', url: '/uploads/pps.pdf', semester: 1, material: 'pps' },
            { filename: 'math.pdf', url: '/uploads/math.pdf', semester: 1, material: 'math' },
            { filename: 'algo.pdf', url: '/uploads/algo.pdf', semester: 2, material: 'algo' },
          ],
          civil: [
            { filename: 'pps.pdf', url: '/uploads/pps.pdf', semester: 1, material: 'pps' },
            { filename: 'math.pdf', url: '/uploads/math.pdf', semester: 2, material: 'math' },
            { filename: 'algo.pdf', url: '/uploads/algo.pdf', semester: 2, material: 'algo' },
          ],
        },
        diploma: {
          electrical: [
            { filename: 'pps.pdf', url: '/uploads/pps.pdf', semester: 3, material: 'pps' },
            { filename: 'math.pdf', url: '/uploads/math.pdf', semester: 2, material: 'math' },
            { filename: 'algo.pdf', url: '/uploads/algo.pdf', semester: 6, material: 'algo' },
          ],
          mechanical: [
            { filename: 'pps.pdf', url: '/uploads/pps.pdf', semester: 5, material: 'pps' },
            { filename: 'math.pdf', url: '/uploads/math.pdf', semester: 5, material: 'math' },
            { filename: 'algo.pdf', url: '/uploads/algo.pdf', semester: 5, material: 'algo' },
          ],
        },
        // Add more programs if needed
      };
      
  
    // Retrieve data based on the user's selection
    const selectedData = dataByProgramSpecialization[program]?.[specialization] || [];

    console.log(program, specialization);
    console.log('Generated download links:', selectedData);
  
    return selectedData;
*/