
// Karte erstellen
var karte = L.map('karte').setView([52.473, 13.403], 14);

// OpenStreetMap als Hintergrundkarte einbinden
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(karte);

// Kartengröße bei Änderung der Fenstergröße anpassen
window.addEventListener('resize', function () {
    karte.invalidateSize();
});

// GeoJSON-Datei laden und Polygon anzeigen
fetch('tempelhofer_feld.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('GeoJSON-Datei konnte nicht geladen werden.');
        }
        return response.json();
    })
    .then(data => {
        var polygon = L.geoJSON(data, {
            style: {
                color: '#263746',
                fillColor: '#c5b7f5',
                fillOpacity: 0.5,
                weight: 3
            }
        }).addTo(karte);

        // Kartenausschnitt automatisch an das Polygon anpassen
        karte.fitBounds(polygon.getBounds());

        // Popup zum Tempelhofer Feld hinzufügen
        polygon.bindPopup(
            "<div class='popup-inhalt'>" +
            "<p class='popup-label'>BERLIN</p>" +
            "<h2>TEMPELHOFER FELD</h2>" +
            "<p>Das Tempelhofer Feld ist das ehemalige Gelände des Flughafens Tempelhof. " +
            "Seit 2010 ist es öffentlich zugänglich und bietet auf über 300 Hektar Platz für Freizeit, Sport und Erholung.</p>" +
            "<a href='https://www.tempelhoferfeld.de/' target='_blank' rel='noopener noreferrer'>MEHR ERFAHREN →</a>" +
            "</div>"
        );
    })
