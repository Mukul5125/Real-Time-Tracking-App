if (typeof io !== 'undefined') {
  const socket = io();

  // rest of your code
  if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{
        const {latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
        },
        (error)=>{
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

// Initialize the map
const map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Create a marker variable (initially null)
let userMarker = null;

// Start watching device location
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Center the map
      map.setView([latitude, longitude], 16);

      // Add or move the marker
      if (userMarker) {
        userMarker.setLatLng([latitude, longitude]);
      } else {
        userMarker = L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup("You are here")
          .openPopup();
      }
    },
    (error) => {
      console.error("Geolocation error:", error.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000
    }
  );
} else {
  alert("Geolocation is not supported by your browser.");
}

// document.addEventListener("DOMContentLoaded", function () {
//     if (typeof L !== 'undefined') {
//         const map = L.map("map").setView([0, 0], 10);

//         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//         }).addTo(map);
//     } else {
//         console.error("Leaflet failed to load");
//     }
// });
// }
// const markers = {};

// socket.on("receive-location", (data) => {
//     const { id, latitude, longitude } = data;
    
//     if (!id || latitude == null || longitude == null) {
//         console.warn("Invalid location data received:", data);
//         return;
//     }

//     const lat = parseFloat(latitude);
//     const lng = parseFloat(longitude);

//     map.setView([lat, lng], 16);

//     if (markers[id]) {
//         markers[id].setLatLng([lat, lng]);
//     } else {
//         markers[id] = L.marker([lat, lng]).addTo(map);
//     }
// });
}
