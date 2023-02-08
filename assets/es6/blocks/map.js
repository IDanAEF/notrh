const map = () => {
    try {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uYmlnb3RlIiwiYSI6Im1zaWFMajQifQ.esvQBm0Rouqn9YxsNxsW4A';
        var map = new mapboxgl.Map({
            style: 'mapbox://styles/mapbox/light-v9',
            center: [-93.26332797891618, 44.984743126654166],
            zoom: 9,
            pitch: 45,
            bearing: -17.6,
            container: 'map'
        });

        map.on('load', function() {
            map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill',
                'minzoom': 15,
                'paint': {
                    'fill-color': '#aaa',
                    'fill-extrude-height': {
                        'type': 'identity',
                        'property': 'height'
                    },
                    'fill-extrude-base': {
                        'type': 'identity',
                        'property': 'min_height'
                    },
                    'fill-opacity': .6
                }
            });
        });

        const geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.2638, 44.98]
                    },
                    properties: {
                        id: 'point-1',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.2427, 44.6497]
                    },
                    properties: {
                        id: 'point-2',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.4708, 44.8547]
                    },
                    properties: {
                        id: 'point-3',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.4627300, 44.9249600]
                    },
                    properties: {
                        id: 'point-4',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.0596, 44.8246]
                    },
                    properties: {
                        id: 'point-5',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.63552, 45.05469]
                    },
                    properties: {
                        id: 'point-6',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.4558, 45.0725]
                    },
                    properties: {
                        id: 'point-7',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.6647, 45.0121]
                    },
                    properties: {
                        id: 'point-8',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.5033, 44.9133]
                    },
                    properties: {
                        id: 'point-9',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.3995, 45.1178]
                    },
                    properties: {
                        id: 'point-10',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.0933, 44.9444]
                    },
                    properties: {
                        id: 'point-11',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-93.0405, 44.888]
                    },
                    properties: {
                        id: 'point-12',
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-92.8304, 45.0586]
                    },
                    properties: {
                        id: 'point-13',
                    }
                },
            ]
        };

        const btns = document.querySelectorAll('.main__map-left ul li');

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(it => it.classList.remove('check'));
            
                btn.classList.add('check');

                for (const feature of geojson.features) {
                    if (feature.properties.id == btn.getAttribute('data-point')) {
                        map.flyTo({
                            center: feature.geometry.coordinates,
                            zoom: 13,
                        });
                    }
                }
            });
        });

        for (const feature of geojson.features) {
            const el = document.createElement('div');
            el.className = 'marker';
            
            new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);

            el.addEventListener('click', () => {
                map.flyTo({
                    center: feature.geometry.coordinates,
                    zoom: 13,
                });

                btns.forEach(it => it.classList.remove('check'));

                document.querySelector(`[data-point="${feature.properties.id}"]`).classList.add('check');
            });
        }
    } catch (e) {
        console.log(e.stack);
    }
}

export default map;