setWindyMap = (lat, lon) => {
    let options = {
        // Required: API key
        key: 'hriK4muC7NmEkP3Abw6QdX8Hc8o2Q4gP',

        // Put additional console output
        verbose: false,

        // Optional: Initial state of the map
        lat: lat,
        lon: lon,
        zoom: 10,
    };

    // Initialize Windy API
    windyInit(options, windyAPI => {
        // windyAPI is ready, and contain 'map', 'store',
        // 'picker' and other usefull stuff

        const { map, store, broadcast, overlays } = windyAPI;

        // Set the
        store.set('overlay', 'temp')
        // .map is instance of Leaflet map

        // L.popup()
        //     .setLatLng([50.4, 14.3])
        //     .setContent('Hello World')
        //     .openOn(map);
    });

}