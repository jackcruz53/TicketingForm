import './App.css';
import BandForm from './BandForm';

//place band meta data here
const band = {
  "name": "The Flaming Potatoes",
  "id": "flaming-potatoes",
  "date": 1683644012000,
  "location": "Groove, 125 MacDougal St, New York, NY 10012",
  "description_blurb": "<p>We're the Flaming Potatoes, and once you come to this awesome small club performance, you'll be our Best Spuds!</p>.",
  "imgUrl": "https://via.placeholder.com/600/51aa97",
  "ticketTypes": [
    {
      "type": "vip",
      "name": "VIP",
      "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "cost": 15000
    },
    {
      "type": "meet-and-greet",
      "name": "VIP + Meet and Greet",
      "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "cost": 30000
    }
  ]
}

function App() {
  return (
    <BandForm band={band}/>
  )
}

export default App
