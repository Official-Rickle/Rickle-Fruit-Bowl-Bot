const fs = require('fs');
const path = require('path');
const Teams = [
  {
    founder: "",
    sponsor: "Not Sponsored.",
    coach: "Not Selected",
    name: "🍒The Cherries🍒",
    slogan: "The cute Cherries",
    role: "🍒Cherries",
    color: "#FF0004",
    wins: 0,
    losses: 0,
    ties: 0,
    championships: 0,
    members: []
  },
  {
    founder: "",
    sponsor: "Not Sponsored.",
    coach: "Not Selected",
    name: "🥥The Coconuts",
    slogan: "The tough Coconuts",
    role: "🥥Coconuts",
    color: "#E8E7E7",
    wins: 0,
    losses: 0,
    ties: 0,
    championships: 0,
    members: []
  },
  {
    founder: "",
    sponsor: "Not Sponsored.",
    coach: "Not Selected",
    name: "🍉The Melons🍉",
    slogan: "The watery Melons",
    role: "🍉Melons",
    color: "#02BB00",
    wins: 0,
    losses: 0,
    ties: 0,
    championships: 0,
    members: []
  },
  {
    founder: "",
    sponsor: "Not Sponsored.",
    coach: "Not Selected",
    name: "🍍The Pineapples🍍",
    slogan: "The hard Pineapples",
    role: "🍍Pineapples",
    color: "#DBFF0A",
    wins: 0,
    losses: 0,
    ties: 0,
    championships: 0,
    members: []
  },
  {
    founder: "",
    sponsor: "Not Sponsored.",
    coach: "Not Selected",
    name: "🥝The Kiwi's🥝",
    slogan: "The cant think Kiwis",
    role: "🥝Kiwi",
    color: "#A46500",
    wins: 0,
    losses: 0,
    ties: 0,
    championships: 0,
    members: []
  },
  {
    founder: "",
    sponsor: "Not Sponsored.",
    coach: "Not Selected",
    name: "🍌The Banana's🍌",
    slogan: "The potassium rich Bananas",
    role: "🍌Banana",
    color: "#DAFF00",
    wins: 0,
    losses: 0,
    ties: 0,
    championships: 0,
    members: []
  },
  {
    founder: "",
    sponsor: "Not Sponsored.",
    coach: "Not Selected",
    name: "🍊The Tangerines🍊",
    slogan: "The tangy Tangarines",
    role: "🍊Tangerines",
    color: "#FF9200",
    wins: 0,
    losses: 0,
    ties: 0,
    championships: 0,
    members: []
  },
  {
    founder: "",
    sponsor: "Not Sponsored.",
    coach: "Not Selected",
    name: "🫐The Blueberries🫐",
    slogan: "The colorful Blueberries",
    role: "🫐Blueberries",
    color: "#2A00FF",
    wins: 0,
    losses: 0,
    ties: 0,
    championships: 0,
    members: []
  }
];
Teams.save = function save(param) {
  /**
   * write this to file..
   */
  const fileData = JSON.stringify(JSON.parse(JSON.stringify(this)), false, 2);
  console.log("File Data to Save", fileData);
  fs.writeFileSync(path.resolve(__dirname, 'Teams.json'), fileData);
  console.log(param, this);
}

function onchange(obj) {
  /**
   * if changed, write to file.
   */
}
/**
 * handle change event.
 */
exports.Teams = Teams;
