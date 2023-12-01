// Overlay functionality
function openOverlay(overlayId) {
  var overlay = document.getElementById(overlayId);
  overlay.style.display = 'flex';
}

function closeOverlay(overlayId) {
  var overlay = document.getElementById(overlayId);
  overlay.style.display = 'none';
}

// API

// Function to fetch API key
async function getApiKey() {
  try {
    // Fetch API key from the specified URL using a POST request
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
      method: 'POST'
    });

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch API key. Status: ${response.status}`);
    }

    // Extract JSON data from the response
    const data = await response.json();

    // Log the retrieved data
    console.log('Retrieved API key:', data.key);

    // Call the fetchDataWithKey function and pass the retrieved key
    return data.key;

  } catch (error) {
    // Handle errors during the API key fetching process
    console.error('Error fetching API key:', error.message);
  }
}

// Function to make a GET request using the provided key
async function fetchDataWithKey(dataEndpoint, key, callback) {
  try {
    // Fetch data from the specified URL using a GET request with the provided key in the header
    const response = await fetch(dataEndpoint, { method: 'GET', headers: { 'x-zocom': `${key}` } });

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    // Log the response object
    const data = await response.json();

    // Call the callback function with the fetched data
    callback(data);

    return data;

  } catch (error) {
    // Handle errors during the data fetching process
    console.error('Error fetching data:', error.message);
  }
}

// Function to open overlay and display data
async function openOverlayAndDisplayData(overlayId) {
  try {
    // Fetch data from the API
    const apiKey = await getApiKey();

    // Check if the API key is available
    if (apiKey) {
      // Fetch data using the retrieved API key
      const data = await fetchDataWithKey('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', apiKey, processData);

      // Log the fetched data if needed
      console.log('Fetched data:', data);

      // Check if the data is available and has the expected structure
      if (data && typeof data === 'object') {
        // Open the overlay
        openOverlay(overlayId);

        // Display data in the overlay
        displayDataInOverlay(data, overlayId);
      } else {
        // Handle the case where the data is not as expected
        console.error('Invalid data format:', data);
      }
    } else {
      // Handle the case where the API key is not available
      console.error('API key is not available');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to process and print the fetched data
function processData(data) {
  // Check if the data is an array
  if (Array.isArray(data)) {
    // Loop through the data and print each item
    for (const item of data) {
      console.log('Data item:', item);
    }
  } else {
    console.log('Data:', data);
  }
}

// Initiates the process by calling the getApiKey function
getApiKey();

// Function to display data in the overlay
function displayDataInOverlay(data, overlayId) {
  const overlay = document.getElementById(overlayId);

  // Check if the data is available and has the expected structure
  if (data && typeof data === 'object') {
    // Replace the content of the overlay with the dynamically generated HTML
    overlay.innerHTML = createHTMLFromData(data, overlayId);
  } else {
    // Handle the case where the data is not as expected
    console.error('Invalid data format:', data);
  }
}

// Function to create HTML content from the fetched data
function createHTMLFromData(data, overlayId) {
  return `
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
}
