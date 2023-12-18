document.addEventListener('DOMContentLoaded', async () => {
    const programDropdown = document.getElementById('program');
    const specializationDropdown = document.getElementById('specialization');
    const form = document.getElementById('downloadForm');
    const downloadLinksContainer = document.getElementById('downloadLinks');
  
    try {
        // Fetch programs and specializations from the server
        const programs = await fetchData('/api/programs');
        const specializations = [];
    
        // console.log(programs, specializations);
    
        // Populate dropdowns with options, including an initial "Select" option for programs
        populateDropdown(programDropdown, ['Select', ...programs]);
        populateDropdown(specializationDropdown, specializations);
      } catch (error) {
        console.error('Error fetching programs or specializations:', error.message);
        // Handle the error as appropriate, e.g., display an error message to the user.
      }

    programDropdown.addEventListener('change', async () => {
        console.log('Program dropdown changed!');
        
        const selectedProgram = programDropdown.value.toLowerCase();
        console.log('Selected program (client):', selectedProgram);
      
        if(selectedProgram !== 'select'){
            // Fetch available specializations based on the selected program
            const specializations = await fetchData(`/api/specializations?program=${selectedProgram}`);
        
            // Clear existing options
            specializationDropdown.innerHTML = '';
        
            // Add new options to the specialization dropdown
            specializations.forEach((specialization) => {
            const option = document.createElement('option');
            option.value = specialization.toLowerCase();
            option.text = specialization;
            specializationDropdown.appendChild(option);
            });
        }
      });
  
    // Handle form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Get selected program and specialization
      const selectedProgram = programDropdown.value.toLowerCase();
      const selectedSpecialization = specializationDropdown.value.toLowerCase();

      console.log('Selected program (client):', selectedProgram);
      console.log('Selected specialization (client):', selectedSpecialization);
  
      // Fetch download links based on user selection
      const downloadLinks = await fetchDownloadLinks(selectedProgram, selectedSpecialization);
  
      // Display download links
      displayDownloadLinks(downloadLinks);

      // Create tables for each semester
      createTables(downloadLinks);
    });
  });

  // Function to fetch available specializations based on the selected program
 // public/app.js
    async function fetchSpecializations(program) {
        try {
        const response = await fetch(`/api/specializations?program=${program}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const specializations = await response.json();
    
        // Ensure specializations is an array before using forEach
        if (!Array.isArray(specializations)) {
            throw new Error('Specializations data is not an array');
        }
    
        return specializations;
        } catch (error) {
        console.error('Error fetching specializations:', error.message);
        return []; // Return an empty array or handle the error as appropriate
        }
    }
  

  function createTables(downloadLinks) {
    const tablesContainer = document.getElementById('recordTables');
    tablesContainer.innerHTML = ''; // Clear existing tables
  
    // Assuming each link represents a record for a specific semester and material
    const semesters = Array.from(new Set(downloadLinks.map(link => link.semester)));
  
    semesters.forEach(semester => {
      // Create a container for the table and title
      const tableContainer = document.createElement('div');
      tableContainer.classList.add('table-container');
  
      // Add the title outside the table
      const title = document.createElement('h2');
      title.textContent = `Semester ${semester}`;
      tableContainer.appendChild(title);
  
      // Create the table
      const table = document.createElement('table');
      table.setAttribute('border', '1'); // Add border attribute
      const headerRow = document.createElement('tr');
      
      // Add header cells for file names and download buttons
      const fileNameHeaderCell = document.createElement('th');
      fileNameHeaderCell.textContent = 'File Name';
      headerRow.appendChild(fileNameHeaderCell);
  
      const downloadHeaderCell = document.createElement('th');
      downloadHeaderCell.textContent = 'Download';
      headerRow.appendChild(downloadHeaderCell);
  
      table.appendChild(headerRow);
  
      const semesterLinks = downloadLinks.filter(link => link.semester === semester);
  
      semesterLinks.forEach(link => {
        // Create a row for each PDF
        const row = document.createElement('tr');
  
        // Add cell for the file name
        const fileNameCell = document.createElement('td');
        fileNameCell.textContent = link.filename; // Use filename property
        row.appendChild(fileNameCell);
  
        // Add cell for the download button
        const downloadCell = document.createElement('td');
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.onclick = () => window.location.href = link.url; // Direct download on button click
        downloadCell.appendChild(downloadButton);
        row.appendChild(downloadCell);
  
        table.appendChild(row);
      });
  
      // Append the table to the container
      tableContainer.appendChild(table);
  
      // Append the container to the main container
      tablesContainer.appendChild(tableContainer);
    });
  }
  
  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  function populateDropdown(dropdown, options) {
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      dropdown.appendChild(optionElement);
    });
  }
  
  async function fetchDownloadLinks(program, specialization) {
    // Replace with your API endpoint for fetching download links based on program and specialization
    const response = await fetch(`/api/download-links?program=${program}&specialization=${specialization}`);
    const data = await response.json();
    return data;
  }
  
  function displayDownloadLinks(links) {
    console.log('Received download links:', links);

    const linksContainer = document.getElementById('downloadLinks');
    linksContainer.innerHTML = '';

  
    if (Array.isArray(links) && links.length > 0) {
      const semesters = Array.from(new Set(links.map(link => link.semester)));
      // Log the structure of downloadLinks
    console.log('downloadLinks:', links);
      
    // Iterate over the array of links and log each link
    links.forEach(link => {
      console.log('Link:', link);
      appendLink(link);
    });
    } else {
      console.error('Invalid or empty download links:', links);
    }
  
    function appendLink(link) {
      // Check if the link has the expected properties
      if (link && typeof link === 'object' && link.url && link.title && link.filename) {
        // Log the structure of the link
        console.log('Link structure:', link);
  
        // Create and append link elements
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.textContent = link.title;
        linkElement.download = link.filename;
  
        linksContainer.appendChild(linkElement);
      } else {
        console.error('Invalid link:', link);
      }
    }
  }  
  