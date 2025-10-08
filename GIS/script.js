// ======= Peta 1: Web Mercator (Default) =======
var map1 = L.map('map1').setView([-6.2, 106.8], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map1);

// ======= Peta 2: EPSG:4326 =======
var crs4326 = new L.Proj.CRS('EPSG:4326',
    '+proj=longlat +datum=WGS84 +no_defs',
    {
    resolutions: [
        0.703125, 0.3515625, 0.17578125,
        0.087890625, 0.0439453125, 0.02197265625
        ]
    }
);

var map2 = L.map('map2', { crs: crs4326 }).setView([-6.2, 106.8], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map2);

// ======= Fungsi untuk Memuat File GeoJSON =======
fetch('map.geojson')
    .then(response => response.json())
    .then(data => {
    // Tambahkan ke peta Web Mercator
    const layer1 = L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.name) {
            layer.bindPopup(`<b>${feature.properties.name}</b>`);
            }
        }
    }).addTo(map1);
    map1.fitBounds(layer1.getBounds());

    // Tambahkan ke peta EPSG:4326
    const layer2 = L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(`<b>${feature.properties.name}</b>`);
        }
        }
    }).addTo(map2);
    map2.fitBounds(layer2.getBounds());
    })
    .catch(error => console.error('Gagal memuat GeoJSON:', error));
