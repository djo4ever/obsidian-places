// Using obsidian
import * as obsidian from 'obsidian';

// this plugin
const runJS = this;



const leaf = this.app.workspace.getLeaf();
const vault = this.app.vault;
this.app.workspace.setActiveLeaf(leaf);

const fr_location = "location";
const fr_country = "country";

// Check if the current file is a map
let path = app.workspace.getActiveFile().path.toString()



if (! path.includes("maps")) {
  console.log("Not a map");
  return;
}
// Get country from frontMatter
await app.fileManager.processFrontMatter(app.workspace.getActiveFile(), (frontMatter) => { country = frontMatter.country; coords = frontMatter.location });


if (country != null) {
  // new Notice("Country already set: " + country);
  return;
}

// Check if location is set
if (coords != null) {
  //
} else {
  // new Notice("Location not set");
  return;
}


// Check if country is already set
if ((country != null) && (country != undefined)) {
  // new Notice("Country already set: " + country);
  return;
}




coords = coords.split(",");

let lat = coords[0];
let lng = coords[1];
let username = "djo4ever"
let url = "http://api.geonames.org/countryCode?lat=" + lat + "&lng=" + lng + "&username=" + username;




result = await fetchData();
result = result.trim();


app.fileManager.processFrontMatter(app.workspace.getActiveFile(), (frontMatter) => { frontMatter.country = result});
new Notice("Country set to " + result);


async function fetchData() {
  try {
    const response = await fetch(url);
    const result = await response.text(); // Or use response.json()
    return result;
  } catch (error) {
    console.error("ERROR getting country: ", error);
    throw error; // Rethrow the error for proper handling
  }
}

