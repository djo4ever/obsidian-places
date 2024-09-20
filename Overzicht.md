---
cssclasses:
  - table-max
---


**Land**: `INPUT[inlineListSuggester(
	option(AL,Albanië),
	option(AM, Armenië),
	option(BE, Belgie),
	option(BG, Bulgarije),
	option(CY, Cyprus),
	option(DE, Duitsland),
	option(EG,Egypte),
	option(FR, Frankrijk),
	option(GE,Georgie),
	option(GR,Griekenland),
	option(HU, Hongarije),
	option(IE, Ierland),
	option(IS,Ijsland),
	option(IT, Italie),
	option(JO,Jordanië),
	option(HR, Kroatie),
	option(LT,Litouwen),
	option(ME,Montenegro),
	option(MK,Macedonië),
	option(NL, Nederland),
	option(NO,Noorwegen),
	option(AT, Oostenrijk),
	option(PL, Polen),
	option(PT, Portugal),
	option(RO, Roemenie),
	option(RU, Rusland),
	option(ES, Spanje),
	option(SI,Slovenië),
	option(SK, Slowakije),
	option(UA, Ukraine),
	option(GB, Verenigd Koninkrijk),
	 option(US, Verenigde Staten),
	 option(CH,Zwitserland),
	title(Landen)
):filters#countries]`



**Type:** `INPUT[inlineListSuggester(
	option(Urbex,--- Alle Urbex ---),
	option(Urbex Brug),
	option(Urbex Schip),
	option(Urbex Cafe),
	option(Urbex Discotheek),
	option(Urbex GhostTown),
	option(Urbex Hotel),
	option(Urbex Huis),
	option(Urbex Industrie),
	option(Urbex Kerk),
	option(Urbex Medisch),
	option(Urbex Pretpark),
	option(Urbex Restaurant),
	option(Urbex Theater),
	option(Urbex Vliegtuig),
	option(Architectuur),
	option(Adventure,Avontuur),
	option(Museum),
	option(Natuur),
	option(Stadje),
	option(Visited, -- Bezocht --),
	title(Types)
	):filters#tags]`


**Sorteer op**: `INPUT[inlineSelect(
title(Sorteer),option(name,Naam),option(country,Land),option(lkv,Laatste bezoek),option(changed,Gewijzigd)
):filters#sort]` **Locatie info:** `INPUT[inlineSelect(option(none,Geen),option(limited,Beperkt),
option(all,Volledig)
):filters#info]`

**Bezocht:** 
`INPUT[inlineSelect(
option(all,Alles tonen),
option(hide,Bezochte locaties verbergen),
option(visited,Alleen bezochte locaties tonen)
):filters#visited]` 

**RIP locaties:**
`INPUT[inlineSelect(
option(all,Alles tonen),
option(hide,RIP locaties verbergen),
option(rip,Alleen RIP locaties tonen)
):filters#rip]`



```dataviewjs





// Define filters, show everything if filter is empty
// Get data from filters.md frontmatter
const filters = dv.page("filters.md").file.frontmatter || ""
const filterCountries = filters.countries || [];
const filterTypes = filters.tags || ""
const sortOrder = filters.sort || "name"
const filterVisited = filters.visited || "all"
const filterRIP = filters.rip || "all"
const viewInfo = filters.info || "limited"


// Get all locations
const pages = dv.pages('"maps/EU" or "maps/Asia" or "maps/US" or "maps/Africa"');

//const pages = dv.pages('"maps/Asia"')


//Build table headers based on viewInfo
let tableHeaders = [];
if (viewInfo === "none") { 
	tableHeaders = ["Foto", "Naam", "Tags"]; 
} else if (viewInfo === "limited") { 
	tableHeaders = ["Foto", "Naam", "Tags", "Land", "LKV"]; 
} else if (viewInfo === "all") 
	{ tableHeaders = ["Foto", "Naam", "Tags", "Land", "LKV", "Coordinaten"];
}

// Function to create a table row based on viewInfo
const createTableRow = (page) => {
	const name = page.file.name
	const coords = page.location
	if (coords == undefined) {
		return "";
	}
	const coordsSplit = coords.split(",");
	const lat = parseFloat(coordsSplit[0]).toFixed(5);
	const lon = parseFloat(coordsSplit[1]).toFixed(5);
	const coordsF = lat + ", " + lon;
	const mapLink = "obsidian://mapview?do=open&centerLat=" + lat + "&centerLng=" + lon + "&chosenMapSource=0&linkColor=red&mapZoom=9"
	const gMapLink = "https://www.google.com/maps/place/" + lat + "," + lon + "/@" + lat + "," + lon + ",18z"
	const wazeLink = "https://waze.com/ul?ll=" + lat + "," + lon + "&navigate=yes"

	const today = new Date();
	const day = today.getDate();
	const month = today.getMonth() + 1
	const year = today.getFullYear();

	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);
	const tomorrowDay = tomorrow.getDate();
	const tomorrowMonth = tomorrow.getMonth() + 1; // Months are zero-indexed, so add 1
	const tomorrowYear = tomorrow.getFullYear();

	const bookingLink = "https://www.booking.com/searchresults.html?latitude=" + lat + "&longitude=" + lon + "&order=price&checkin_year=" + year + "&checkin_month=" + month + "&checkin_monthday=" + day + "&checkout_year=" + tomorrowYear + "&checkout_month=" + tomorrowMonth + "&checkout_monthday=" + tomorrowDay



	
	const country = page.country
	const img = page.file.outlinks[0]  || ""// Image (from first outlink)
	const lkv = page.lkv
	const lkvF = ("0" + (today.getMonth() + 1)).slice(-2) + "/" + today.getFullYear();

	const tags = page.tags

	
	
	if (img == "") {
		return "";
	}

	// Filter by country
	const nrOfCountries = filterCountries.length

	if (nrOfCountries > 0) {
		if (!filterCountries.includes(country)) {
			return "";
		}
	}


	// Filter by type
	const nrOfTypes = filterTypes.length
	if (nrOfTypes > 0) {
		let found = false;
		for (let type of filterTypes) {
			if (tags.includes(type)) {
				found = true;
				break;
			}
		}
		if (!found) {
			return "";
		}

	}

	//Filter based on visited
	if (filterVisited === "visited") {
		if (!page.tags.includes("Visited")) {
			return "";
		}
	} else if (filterVisited === "hide") {
		if (page.tags.includes("Visited")) {
			return "";
		}
	}

	//Filter based on RIP
	if (filterRIP === "hide") {
		if (page.tags.includes("Rip")) {
			return "";
		}
	} else if (filterRIP === "rip") {
		if (!page.tags.includes("Rip")) {
			return "";
		}
	}
		
	

		
	// Return info based on viewInfo
	if (viewInfo === "none") {
		//return ""
		return [dv.fileLink(page.file.outlinks[0]?.path, true, "display"), 
				page.file.link,
				tags]
	} else if (viewInfo === "limited") {
		return [dv.fileLink(page.file.outlinks[0]?.path, true, "display"),
				page.file.link,
				tags,
				country,
				lkv];
	} else if (viewInfo === "all") {
		// Create description
		
		return [
			dv.fileLink(page.file.outlinks[0]?.path, true, "display"),
			"**" + page.file.link + "**" +
				(page.description ? "\n" + page.description : "") +
				(page.website ? "\n" + page.website : ""),
			tags,
			country,
			//dv.paragraph(country + "\n" + "[Google Maps](<" + gMapLink + ">)"),
			dv.paragraph(lkvF + "\n" + "[Booking.com](<" + bookingLink + ">)"),
			//dv.paragraph("[**" + coordsF + "**](<" + mapLink + ">) " + "\n" + ("[Google Maps](<" + gMapLink + ">)" + "\n" + "[Waze](<" + wazeLink + ">)" + "\n" + "[Booking.com](<" + bookingLink + ">)"))
			dv.paragraph("[**" + coordsF + "**](<" + mapLink + ">) " + "\n" + ("[Google Maps](<" + gMapLink + ">)" + "\n" + "[Waze](<" + wazeLink + ">)"))

			//coordsF
			];
			} else {
				return "";
			}
	}

// Define a sorting function based on the sortOrder
const sortPages = (pages, sortOrder) => {
  switch (sortOrder) {
    case "name":
//		console.log(pages[1][1].path.toLowerCase().replace(/\.md$/, ""));
		return pages.sort(p => p[0].path.toLowerCase().replace(/\.md$/, ""));
    case "country":
      return pages.sort(p => p.country);
    case "lkv":
      return pages.sort(p => dv.date(p.lkv), "desc");
    case "changed":
      return pages.sort(p => p.mtime);
  }
};
let rows = [];


let nrOfPages = pages.length
for (let page of pages) {
	let row = createTableRow(page);
	if (row != "") {
		rows.push(row);
		//console.log(row);

	}
}


if (rows.length > 0) {
	rows = sortPages(rows, sortOrder);
}


dv.el("b", rows.length + " resultaten");
dv.table(tableHeaders, rows);
