/*

// Function to fetch API key
async function getAipKey() {
  // Fetch API key from the specified URL using a POST request
  const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
    method: 'POST'
  });

  // Extract JSON data from the response
  const data = await response.json();
  
  // Log the retrieved data
  console.log(data);

  // Call the getApi function and pass the retrieved key
  getApi(data.key);
}

// Function to make a GET request using the provided key
async function getApi(data) {
  // Fetch data from the specified URL using a GET request
  let resp = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
    method: 'GET',
    headers: { 'x-zocom': `${data}` }
  });

  // Log the response object
  console.log(resp);
}

// Initiates the process by calling the getAipKey function
getAipKey();

*/



const PlanetaryOverlayModule = (function () {
    // Function to create a planet overlay with provided data
    function createPlanetOverlay(planetData) {
      // Creating the main overlay container
      const planetOverlay = document.createElement("div");
      planetOverlay.classList.add("planet-overlay");
      planetOverlay.id = `${planetData.name.toLowerCase()}-overlay`;
  
      // Creating the content container within the overlay
      const overlayContent = document.createElement("div");
      overlayContent.classList.add("overlay-content");
  
      // Creating a container for the planet details
      const container = document.createElement("div");
      container.classList.add("container");
  
      // Creating the card element to hold the planet information
      const card = document.createElement("div");
      card.classList.add("card");
  
      // Creating and populating title, subtitle, and description elements
      const title = document.createElement("h1");
      title.textContent = planetData.name;
  
      const subtitle = document.createElement("h2");
      subtitle.textContent = planetData.latinName;
  
      const description = document.createElement("p");
      description.textContent = planetData.desc;
  
      overlayContent.appendChild(title);
      overlayContent.appendChild(subtitle);
      overlayContent.appendChild(description);
  
      // Creating and populating the planet details section
  
      const planetDetails = [
        // Array containing planet details as objects
        // Each object has a title and corresponding value
        // Iterating through the details and creating HTML elements
  
        { title: "ROTATION (days)", value: planetData.rotation },
        { title: "CIRCUMFERENCE (km)", value: planetData.circumference },
        { title: "DAY TEMPERATURE (°C)", value: planetData.temp.day },
        { title: "NIGHT TEMPERATURE (°C)", value: planetData.temp.night },
        { title: "DISTANCE FROM SUN (km)", value: planetData.distance },
        { title: "ORBITAL PERIOD (days)", value: planetData.orbitalPeriod },
        { title: "MOONS", value: planetData.moons.join(", ") || "None" }
      ];
  
      planetDetails.forEach((detail) => {
        // Creating a div for each detail
        const detailDiv = document.createElement("div");
        detailDiv.classList.add("detail");
  
        // Creating heading and paragraph elements for each detail
        const heading3 = document.createElement("h3");
        heading3.textContent = detail.title;
  
        const paragraph = document.createElement("p");
        paragraph.textContent = detail.value;
  
        // Appending heading and paragraph to the detail div
        detailDiv.appendChild(heading3);
        detailDiv.appendChild(paragraph);
  
        // Appending the detail div to the card
        card.appendChild(detailDiv);
      });
  
      // Creating a close button for the overlay
      const closeBtn = document.createElement("span");
      closeBtn.classList.add("close-btn");
      closeBtn.textContent = "×";
      closeBtn.onclick = () =>
        closeOverlay(`${planetData.name.toLowerCase()}-overlay`);
  
      // Appending elements to the overlay structure
      planetOverlay.appendChild(overlayContent);
      overlayContent.appendChild(container);
      container.appendChild(card);
      planetOverlay.appendChild(closeBtn);
  
      // Returning the completed planet overlay
      return planetOverlay;
    }
  
    // Function to open an overlay based on its ID
    function openOverlay(overlayId) {
      const overlay = document.getElementById(overlayId);
      overlay.style.display = "block";
    }
  
    // Function to close an overlay based on its ID
    function closeOverlay(overlayId) {
      const overlay = document.getElementById(overlayId);
      overlay.style.display = "none";
    }
  
    // Exposing functions to the outside world
    return {
        createPlanetOverlay,
        openOverlay,
        closeOverlay
    };
  })();
  
  // Usage of the PlanetaryOverlayModule
  document.addEventListener("DOMContentLoaded", () => {
    // Selecting all elements with the class 'planet'.
    const planetButtons = document.querySelectorAll(".planet");
  
    // Array containing data for each planet
    const planetsData = [
      {
        id: 0,
        type: "star",
        name: "Solen",
        latinName: "Solis",
        rotation: 83950000000,
        circumference: 4379000,
        temp: {
          day: 6000,
          night: 6000
        },
        distance: 0,
        orbitalPeriod: 0,
        desc:
          "Solen är stjärnan i solsystemet och det är runt den som de övriga delarna i solsystemet kretsar. Dess stora massa på 332 830 jordmassor ge…",
        moons: []
      },
  
      {
        id: 1,
        type: "planet",
        name: "Merkurius",
        latinName: "Mercurialis",
        rotation: 58,
        circumference: 15329,
        temp: {
          day: 430,
          night: -173
        },
        distance: 57910000,
        orbitalPeriod: 88,
        desc:
          "Solen är stjärnan i solsystemet och det är runt den som de övriga delarna i solsystemet kretsar. Dess stora massa på 332 830 jordmassor ge…",
        moons: []
      },
  
      {
        id: 2,
        type: "planet",
        name: "Venus",
        latinName: "Venus",
        rotation: 116,
        circumference: 38025,
        temp: {
          day: 430,
          night: -173
        },
        distance: 10820000,
        orbitalPeriod: 225,
        desc:
          "Venus har nästan samma storlek som jorden (0,815 jordmassor). Venus är även på många andra sätt lik jorden då den har en tjoc…",
        moons: []
      },
  
      {
        id: 3,
        type: "planet",
        name: "Jorden",
        latinName: "Tellus",
        rotation: 1,
        circumference: 40075,
        temp: {
          day: 30,
          night: -10
        },
        distance: 149600000,
        orbitalPeriod: 365,
        desc:
          "Jorden är den största och mest kompakta av de inre planeterna. Jorden är den enda av planeterna som konstaterats ha geologisk aktivitet oc…",
        moons: ["Månen"]
      },
  
      {
        id: 4,
        type: "planet",
        name: "Mars",
        latinName: "Mars",
        rotation: 1,
        circumference: 21344,
        temp: {
          day: -60,
          night: -140
        },
        distance: 55758006,
        orbitalPeriod: 687,
        desc:
          "Mars är den fjärde planeten från solen och solsystemets näst minsta planet. Den har fått sitt namn efter den romerska krigsguden Mars oc…",
        moons: ["Phobos", "Deiomos"]
      },
  
      {
        id: 5,
        type: "planet",
        name: "Jupiter",
        latinName: "Lovis",
        rotation: 0.4,
        circumference: 439264,
        temp: {
          day: -140,
          night: -140
        },
        distance: 750290000,
        orbitalPeriod: 4324,
        desc:
          "Jupiter är den femte planeten från solen och är med stor marginal solsystemets största planet. Dess massa är 2,5 gånger så stor som alla d…",
        moons: ["Europa", "Ganymedes", "Io", "Callisto", "Amalthea", "Himalia"]
      },
  
      {
        id: 6,
        type: "planet",
        name: "Saturnus",
        latinName: "Saturnus",
        rotation: 0.4,
        circumference: 378675,
        temp: {
          day: -178,
          night: -178
        },
        distance: 1400000000,
        orbitalPeriod: 10585,
        desc:
          "Saturnus är den sjätte planeten från solen och den näst största i solsystemet. Den är en gasjätte, känd sedan förhistorisk tid. Galile…",
        moons: [
          "Tethys",
          "Titan",
          "Aegir",
          "Titan",
          "Bergelmir",
          "Bestla",
          "Calypso",
          "Daphnis",
          "Dione",
          "Enceladus",
          "Epimetheus",
          "Fenrir",
          "Fornjot",
          "Greip",
          "Helene",
          "Hyperion",
          "Hyrrokkin",
          "Janus",
          "Jarnsaxa",
          "Kari",
          "Loge",
          "Mimas",
          "Pan",
          "Pandora",
          "Phoebe",
          "Prometheus",
          "Rhea",
          "Skoll",
          "Tarqeq",
          "Tethys",
          "Titan"
        ]
      },
  
      {
        id: 7,
        type: "planet",
        name: "Uranus",
        latinName: "Uranus",
        rotation: 0.7,
        circumference: 378675,
        temp: {
          day: -205,
          night: -225
        },
        distance: 1400000000,
        orbitalPeriod: 30660,
        desc:
          "Uranus är den sjunde planeten från solen. Uranus är en av solsystemets fyra jätteplaneter - Jupiter, Saturnus, Uranus och Neptunus - och ä…",
        moons: [
          "Titania",
          "Umbriel",
          "Miranda",
          "Oberon",
          "Ariel",
          "Desdemona",
          "Puck"
        ]
      },
  
      {
        id: 8,
        type: "planet",
        name: "Neptunus",
        latinName: "Neptunus",
        rotation: 0.7,
        circumference: 155600,
        temp: {
          day: -193,
          night: -193
        },
        distance: 4495000000,
        orbitalPeriod: 60225,
        desc:
          "Neptunus är den åttonde planeten från solen. Neptunus är en så kallad gasjätte, och har fått sitt namn efter havsguden Neptunus i romers…",
        moons: [
          "Triton",
          "Sao",
          "Hippocamp",
          "Proteus",
          "Despina",
          "Nereid",
          "Thalassa",
          "Galatea",
          "Neso",
          "Halimede",
          "Larissa",
          "Psamathe",
          "Naiad",
          "Laomedeia"
        ]
      }
    ];
  
    // Attaching click event listeners to planet buttons
    planetButtons.forEach((planetButton, index) => {
      planetButton.addEventListener("click", () => {
        // Creating and displaying the planet overlay when a button is clicked
        const planetData = planetsData[index];
        const planetOverlay = PlanetaryOverlayModule.createPlanetOverlay(
          planetData
        );
        document.body.appendChild(planetOverlay);
        PlanetaryOverlayModule.openOverlay(
          `${planetData.name.toLowerCase()}-overlay`
        );
      });
    });
  
    const closeBtn = document.querySelector(".close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        const activeOverlay = document.querySelector(
          '.planet-overlay[style*="display: block"]'
        );
        const overlayId = activeOverlay ? activeOverlay.id : null;
        if (overlayId) {
          PlanetaryOverlayModule.closeOverlay(overlayId);
        }
      });
    }
  });
  