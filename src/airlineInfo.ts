class canadian {
  constructor(
    public company: string,
    public numberOfModels: number,
    public models: string,
    public startYear: number
  ) {}
}

class american {
  constructor(
    public company: string,
    public numberOfModels: number,
    public models: string,
    public startYear: number
  ) {}
}

// Canadian Airlines
class airCanada extends canadian {}
class Westjet extends canadian {}
class Flair extends canadian {}
class airTransat extends canadian {}
class Porter extends canadian {}
class Sunwing extends canadian {}
class canadianNorth extends canadian {}

// American Airlines
class United extends american {}
class americanAirlines extends american {}
class Delta extends american {}
class Southwest extends american {}
class jetBlue extends american {}
class Hawaiian extends american {}
class Allegiant extends american {}
class Alaska extends american {}
class Spirit extends american {}
class Frontier extends american {}

// Canadian Airlines
const ac = new airCanada(
  "Air Canada",
  10,
  "Airbus A220, Airbus A320, Airbus A321, Boeing 737, Embraer E-175, Airbus A330, Boeing 767, Boeing 777, Boeing 787 Dreamliner",
  1937
);

const westjet = new Westjet(
  "WestJet",
  2,
  "Boeing 737, Boeing 787",
  1994
);

const flair = new Flair(
  "Flair Airlines",
  1,
  "Boeing 737",
  2005
);

const porter = new Porter(
  "Porter",
  1,
  "De Havilland Canada Dash 8, Embraer E-195",
  2006
);

const transat = new airTransat(
  "Air Transat",
  2,
  "Airbus A321, Airbus A330-300",
  1987
);

const north = new canadianNorth(
  "Canadian North",
  3,
  "Boeing 737, ATR-42, ATR-72",
  1989
);

const sunwing = new Sunwing(
  "Sunwing Airlines",
  1,
  "Boeing 737",
  2005
);

// American Airlines
const united = new United(
  "United Airlines",
  10,
  "Airbus A319, Airbus A320, Airbus A321, Boeing 737, Boeing 757, Boeing 767, Boeing 777, Boeing 787 Dreamliner, Embraer E-170, Embraer E-175",
  1926
);

const aa = new americanAirlines(
  "American Airlines",
  10,
  "Airbus A319, Airbus A320, Airbus A321, Boeing 737, Boeing 757, Boeing 767, Boeing 777, Boeing 787 Dreamliner, Embraer E-170, Embraer E-175",
  1930
);

const delta = new Delta(
  "Delta Air Lines",
  10,
  "Airbus A220, Airbus A319, Airbus A320, Airbus A321, Boeing 717, Boeing 737, Boeing 757, Boeing 767, Boeing 767, Boeing 787 Dreamliner",
  1928
);

const alaska = new Alaska(
  "Alaska Airlines",
  1,
  "Boeing 737",
  1932
);

const hawaii = new Hawaiian(
  "Hawaiian Airlines",
  4,
  "Airbus A321, Airbus A330, Boeing 717, Boeing 767, Boeing 787 Dreamliner",
  1929
);

const allegiant = new Allegiant(
  "Allegiant Air",
  4,
  "Airbus A319, Airbus A320, Boeing 737",
  1997
);

const jetblue = new jetBlue(
  "JetBlue Airways",
  3,
  "Airbus A320, Airbus A321, Embraer E-190",
  1998
);

const southwest = new Southwest(
  "Southwest Airlines",
  1,
  "Boeing 737",
  1966
);

const spirit = new Spirit(
  "Spirit Airlines",
  3,
  "Airbus A319, Airbus A320, Airbus A321",
  1992
);

const frontier = new Frontier(
  "Frontier Airlines",
  3,
  "Airbus A319, Airbus A320, Airbus A321",
  1994
);

const allAirlines = [
  // Canadian
  ac, westjet, flair, porter, transat, north, sunwing,
  // American
  united, aa, delta, alaska, hawaii, allegiant, jetblue, southwest, spirit, frontier
];

function highlightMatch(text: string, query: string): string {
  const regex = new RegExp(`(${query})`, 'gi'); 
  return text.replace(regex, '<mark>$1</mark>');
}

function getFlagEmoji(airline: canadian | american): string {
  if (airline instanceof canadian) return "🇨🇦";
  if (airline instanceof american) return "🇺🇸";
  return "";
}

function onEnterClick(): void {
  const input = document.getElementById("Airline") as HTMLInputElement;
  const output = document.getElementById("output")!;
  const userInput = input.value.trim();

  if (!userInput) {
    output.textContent = "Please enter an airline name.";
    return;
  }

  const lowerInput = userInput.toLowerCase();

  // Find all partial matches
  const matches = allAirlines.filter(a => a.company.toLowerCase().includes(lowerInput));

  if (matches.length === 1) {
    const found = matches[0];
    const flag = getFlagEmoji(found);
    const highlightedCompany = highlightMatch(found.company, userInput);

    output.innerHTML = `
      <strong>Company:</strong> ${flag} ${highlightedCompany}<br>
      <strong>Airplanes:</strong> ${found.models}<br>
      <strong>Models:</strong> ${found.numberOfModels}<br>
      <strong>Founded:</strong> ${found.startYear}
    `;
  } else if (matches.length > 1) {
    output.innerHTML = `<strong>Multiple airlines found. Which one do you want to look up?</strong><br>` +
      matches
        .map(a => {
          const flag = getFlagEmoji(a);
          return `- ${flag} ${highlightMatch(a.company, userInput)}`;
        })
        .join('<br>');
  } else {
    output.textContent = "Airline not found. Please enter a valid airline name.";
  }
}
