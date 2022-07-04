const data = [
  {
    name: "#1109",
    collection: "Stories from the crypto",
    price: (Math.random() * 10).toFixed(2),
    priceUSD: (Math.random() * 50).toFixed(2),
    image: `https://picsum.photos/seed/cripto/200/200`,
    status: "Auction",
  },
  {
    name: "#1122",
    collection: "Trashure",
    price: (Math.random() * 10).toFixed(2),
    priceUSD: (Math.random() * 50).toFixed(2),
    image: `https://picsum.photos/seed/stories/200/200`,
    status: "For Sale",
  },
  {
    name: "#1144",
    collection: "CoffeeDogs",
    price: (Math.random() * 10).toFixed(2),
    priceUSD: (Math.random() * 50).toFixed(2),
    image: `https://picsum.photos/seed/dog/200/200`,
    status: "For Sale",
  },
  {
    name: "#1109",
    collection: "Stories from the crypto",
    price: (Math.random() * 10).toFixed(2),
    priceUSD: (Math.random() * 50).toFixed(2),
    image: `https://picsum.photos/seed/cripto/200/200`,
    status: "Auction",
  },
  {
    name: "#1122",
    collection: "Trashure",
    price: (Math.random() * 10).toFixed(2),
    priceUSD: (Math.random() * 50).toFixed(2),
    image: `https://picsum.photos/seed/stories/200/200`,
    status: "For Sale",
  },
  {
    name: "#1144",
    collection: "CoffeeDogs",
    price: (Math.random() * 10).toFixed(2),
    priceUSD: (Math.random() * 50).toFixed(2),
    image: `https://picsum.photos/seed/dog/200/200`,
    status: "For Sale",
  },
];

const traits = [
  {
    name: "Background",
    types: [
      { name: "Red", qty: 100, rarity: "10%" },
      { name: "Blue", qty: 150, rarity: "15%" },
      { name: "Yellow", qty: 10, rarity: "1%" },
      { name: "Green", qty: 110, rarity: "11%" },
    ],
  },
  {
    name: "Face",
    types: [
      { name: "Dumb", qty: 100, rarity: "10%" },
      { name: "Laughing", qty: 150, rarity: "15%" },
      { name: "Angry", qty: 10, rarity: "1%" },
      { name: "Sleepy", qty: 110, rarity: "11%" },
    ],
  },
  {
    name: "Body",
    types: [
      { name: "Heman", qty: 100, rarity: "10%" },
      { name: "Conan", qty: 150, rarity: "15%" },
      { name: "Goku", qty: 10, rarity: "1%" },
      { name: "Piccolo", qty: 110, rarity: "11%" },
    ],
  },
];

const history = [
  {
    event: "Sold",
    price: "0,2",
    from: "0x90....2021",
    to: "0x90....2022",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Listed",
    price: "0,2",
    from: "0x90....2021",
    to: "",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Minted",
    price: "",
    from: "0x90....2020",
    to: "0x90....2021",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Sold",
    price: "0,2",
    from: "0x90....2021",
    to: "0x90....2022",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Listed",
    price: "0,2",
    from: "0x90....2021",
    to: "",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Minted",
    price: "",
    from: "0x90....2020",
    to: "0x90....2021",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Sold",
    price: "0,2",
    from: "0x90....2021",
    to: "0x90....2022",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Listed",
    price: "0,2",
    from: "0x90....2021",
    to: "",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Minted",
    price: "",
    from: "0x90....2020",
    to: "0x90....2021",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Sold",
    price: "0,2",
    from: "0x90....2021",
    to: "0x90....2022",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Listed",
    price: "0,2",
    from: "0x90....2021",
    to: "",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Minted",
    price: "",
    from: "0x90....2020",
    to: "0x90....2021",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Sold",
    price: "0,2",
    from: "0x90....2021",
    to: "0x90....2022",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Listed",
    price: "0,2",
    from: "0x90....2021",
    to: "",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Minted",
    price: "",
    from: "0x90....2020",
    to: "0x90....2021",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Sold",
    price: "0,2",
    from: "0x90....2021",
    to: "0x90....2022",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Listed",
    price: "0,2",
    from: "0x90....2021",
    to: "",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
  {
    event: "Minted",
    price: "",
    from: "0x90....2020",
    to: "0x90....2021",
    date: new Date(Date.now()).toDateString(),
    url: "https://iwiwiwiw.io/20020202",
  },
];

const properties = [
  { name: "Body", value: "Red", percentage: "10%" },
  { name: "Face", value: "Dumb", percentage: "30%" },
  { name: "Hat", value: "Donkey", percentage: "10%" },
  { name: "Accesory", value: "Sun Glasses", percentage: "1%" },
];

const details = {
  address: "0x8920...2020",
  ipfsJson: "https://ipfs.io/1020391240",
};

const dataC = [
  {
    name: "Stories from the crypto",
    banner: "https://picsum.photos/seed/stories/200/200",
    avatar: "https://picsum.photos/seed/storiesa/200/200",
    volume: "100,000",
  },
  {
    name: "CoffeeDogs",
    banner: "https://picsum.photos/seed/storiesss/200/200",
    avatar: "https://picsum.photos/seed/storiessa/200/200",
    volume: "120,000",
  },
  {
    name: "Trashure",
    banner: "https://picsum.photos/seed/storiesssss/200/200",
    avatar: "https://picsum.photos/seed/storiesssa/200/200",
    volume: "140,000",
  },
];


export { data, traits, history, details, properties, dataC };
