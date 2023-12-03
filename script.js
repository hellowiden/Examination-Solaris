// Overlay functionality
const openOverlay = (overlayId) => {
  const overlay = document.getElementById(overlayId);
  overlay.style.display = 'flex';
};

const closeOverlay = (overlayId) => {
  const overlay = document.getElementById(overlayId);
  overlay.style.display = 'none';
};

// API

// Function to fetch API key
const getApiKey = async () => {
  try {
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch API key. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Retrieved API key:', data.key);

    return data.key;
  } catch (error) {
    console.error('Error fetching API key:', error.message);
  }
};

// Function to make a GET request using the provided key
const fetchDataWithKey = async (dataEndpoint, key, callback) => {
  try {
    const response = await fetch(dataEndpoint, { method: 'GET', headers: { 'x-zocom': `${key}` } });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    callback(data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

// Function to open overlay and display data
const openOverlayAndDisplayData = async (overlayId) => {
  try {
    const apiKey = await getApiKey();

    if (apiKey) {
      const data = await fetchDataWithKey('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', apiKey, processData);

      console.log('Fetched data:', data);

      if (data && typeof data === 'object') {
        openOverlay(overlayId);
        const filterByIdResult = filterById(data, overlayId);
        displayDataInOverlay(filterByIdResult, overlayId);
      } else {
        console.error('Invalid data format:', data);
      }
    } else {
      console.error('API key is not available');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to process and print the fetched data
const processData = (data) => {
  if (Array.isArray(data)) {
    for (const item of data) {
      console.log('Data item:', item);
    }
  } else {
    console.log('Data:', data);
  }
};

// Initiates the process by calling the getApiKey function
getApiKey();

// Function to display data in the overlay
const displayDataInOverlay = (data, overlayId) => {
  const overlay = document.getElementById(overlayId);

  if (data && typeof data === 'object') {
    overlay.innerHTML = createHTMLFromData(data, overlayId);
  } else {
    console.error('Invalid data format:', data);
  }
};

// Function to filter data by ID
const filterById = (data, id) => {
  const dataZ = data.bodies.find(dataZ => dataZ.id === id);
  console.log(dataZ);

  console.log(data.bodies);
  console.log(data.bodies[0]);

  return data.bodies[id];
};

// Function to create HTML content from the fetched data
const createHTMLFromData = (data, overlayId) => `
  <div class="overlay-content">
    <div class="container">
      <div class="card">
        <h1>${data.name}</h1>
        <h2>${data.latinName}</h2>
        <p>${data.desc}</p>

        <div class="brake"></div>

        <div class="group group1">
          <h3>OMKRETS</h3>
          <p>${data.circumference} km</p>
        </div>
        <div class="group group2">
          <h3>KM FRÅN SOLEN</h3>
          <p>${data.distance} km</p>
        </div>
        <div class="group group3">
          <h3>MAX TEMPERATUR</h3>
          <p>${data.temp ? `${data.temp.day}°C` : 'N/A'}</p>
        </div>
        <div class="group group4">
          <h3>MIN TEMPERATUR</h3>
          <p>${data.temp ? `${data.temp.night}°C` : 'N/A'}</p>
        </div>

        <div class="brake-2"></div>

        <div class="group group5">
          <h3>MÅNAR</h3>
          <p>${data.moons && data.moons.length > 0 ? data.moons.join(', ') : 'No moons'}</p>
        </div>
      </div>
    </div>
  </div>
  <span class="close-btn" onclick="closeOverlay('${overlayId}')">&times;</span>
`;
