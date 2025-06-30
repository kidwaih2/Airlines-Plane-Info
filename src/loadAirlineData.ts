// Canadian class
class Canadian {
  constructor(
    public company: string,
    public numberOfModels: number,
    public models: string,
    public startYear: number,
    public founders: string,
    public description: string
  ) {}
}

// American class
class American {
  constructor(
    public company: string,
    public numberOfModels: number,
    public models: string,
    public startYear: number,
    public founders: string,
    public description: string
  ) {}
}

// Type Airline can only be Canadian or American
type Airline = Canadian | American;

const allAirlines: Airline[] = [];

// Returns Canadian airline
function createAirline(data: any): Airline {
  if (data.country === "Canada") {
    return new Canadian(
      data.company,
      data.numberOfModels,
      data.models,
      data.startYear,
      data.founders,
      data.description
    );
    // Returns American airline
  } else {
    return new American(
      data.company,
      data.numberOfModels,
      data.models,
      data.startYear,
      data.founders,
      data.description
    );
  }
}

/* Highlight partial search match
   Fix: *** If search up correct name 
   for airline, dont highlight */
function highlightMatch(text: string, query: string): string {
  const regex = new RegExp(`(${query})`, "gi");   // g - global(match all occurences) |
  return text.replace(regex, "<mark>$1</mark>"); //  i - match if lowercase*/
}

// Flag emoji - works on ipad/iphone
function getFlagEmoji(airline: Airline): string { // Will return airline
  if (airline instanceof Canadian) return "🇨🇦"; // Instanceof checks actual class of object
  if (airline instanceof American) return "🇺🇸";
  return "";
}

// Loading airline info from public/airlines.json
async function loadAirlines() { 
  try {
    const response = await fetch("public/airlines.json"); // Waiting to fetch the airline info from airlines.json
    const data = await response.json(); // Variable for response of json file loading

    allAirlines.length = 0; // Clear existing airlines to avoid duplicates(strange error)
    data.forEach((item: any) => { // Data (airline info) gets each airline's info - item is any type
      allAirlines.push(createAirline(item)); // Creates new airline when searched up
    });
  } catch (error) { // else
    console.error("Failed to load airlines.json", error); // Self explanatory
  }
}

async function onEnterClick(): Promise<void> { /* Asynchronous function - handle 
  operations that might take time to complete without blocking the main thread 
  of execution | Promise<void> - doesn't return any value explicitly but returns a
  Promise<void> */
  const input = document.getElementById("Airline") as HTMLInputElement; // When user inputs airline
  const output = document.getElementById("output")!; // Output
  const userInput = input.value.trim(); // Ignores whitespace

  if (!userInput) {
    output.textContent = "Airline not valid. Please enter an airline name.";
    return; // If unvalid airline name entered, re-enter airline
  }

  const lowerInput = userInput.toLowerCase(); // If airline is typed in caps it doesnt matter

  const matches = allAirlines.filter((a) => // Loops through each airline and keeps only the ones that pass the test inside.
    a.company.toLowerCase().includes(lowerInput) // Airine.company.makes it lowercase
  ); // includes the lowerInput which converts userInput to lowercase

  if (matches.length === 1) {
    const found = matches[0];
    const flag = getFlagEmoji(found); // Display flag emoji (american/canadian)
    const highlightedCompany = highlightMatch(found.company, userInput); //  *** Highlight company 

    /* Outputs info of each category neatly
       <strong> = bold text | <br> = line break (\n) */
    output.innerHTML = `
      <strong>Company:</strong> ${flag} ${highlightedCompany}<br> 
      <strong>Airplanes:</strong> ${found.models}<br>
      <strong>Models:</strong> ${found.numberOfModels}<br>
      <strong>Founded:</strong> ${found.startYear}<br>
      <strong>Founders:</strong> ${found.founders}<br>
      <strong>Description:</strong> ${found.description}<br>
    `;
  } else if (matches.length > 1) { // If search up "air" will show multiple airlines with "air" inside
    output.innerHTML =
      `<strong>Multiple matches found. Please enter the full name:</strong><br>` + 
      matches // Plus sign ↑ because it adds the matches found to display options to user
        .map((a) => { // For each match - 🇨🇦 <mark>Air</mark> Canada
          const flag = getFlagEmoji(a); // Gets flag emoji
          return `- ${flag} ${highlightMatch(a.company, userInput)}`; // Glowing
        })
        .join("<br>"); // Creates new line
  } else {
    // If airline is totally not found
    output.textContent = "Airline not found. Please enter a valid airline name.";
  }
}

// Load airlines once when page loads
window.onload = () => {
  loadAirlines();
};
