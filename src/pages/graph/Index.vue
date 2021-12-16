<template lang="pug">
    .box-graph
        //- .pin
            .popup-pin( v-bind:class="{'is-show' : openPopup}")
                .popup-pin__header
                    h3 Ideologi
                    h3 Gerakan Radikal
                    h3 Omnibus Law
                    .pop-up-close(@click="closePopup()")
                        b-button(icon_only="x" size="small")
                .popup-pin__body
                    p.test-xs.text-gray-500 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                .popup-pin__footer
                    Strong Nilai IAN 3.5
                    .open-info( @click="openInfoCardIan()")
                        b-button(text="Index Ancaman" kind="primary" width="full")
            .dots( @click="openPopup = !openPopup")

        b-loading(v-if="status_search_event.status === 'loading'" text="Memuat tampilan peta..." kind="circular")

        //- <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=80.9033203125%2C-18.35452552912665%2C133.19824218750003%2C13.453737213419249&amp;layer=mapnik"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=5/-2.548/107.051">View Larger Map</a></small>

        template(v-else)
            l-map(v-if="mapLoaded" :id="idOsm" ref="mapRefOSM" :zoom="zoom" :center="center" :options="options" style="height: 100%; width: 100%;")
                l-tile-layer(:url="theme === 'light' ? url_light : url_dark" :attribution="theme === 'light' ? attribution_light : attribution_dark")
                l-marker(v-for="(location, index) in locations" :lat-lng="location.position" v-bind:key="index")
                    l-popup(:content="location.name")
                v-marker-cluster
                    l-marker(v-for="(location, index) in locations_cluster" :lat-lng="location.position" v-bind:key="index")
                        l-popup(:content="location.name")

</template>

<script>
import {mapState} from 'vuex';

import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {GestureHandling} from 'leaflet-gesture-handling';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';

import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import '@/assets/css/MarkerCluster.css';
import '@/assets/css/MarkerCluster.Default.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.imagePath = '';
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name: 'openMapsStreet',
    components: {
        LMap,
        GestureHandling,
        LTileLayer,
        LMarker,
        LPopup,
        'v-marker-cluster': Vue2LeafletMarkerCluster,
    },
    data() {
        return {
            openPopup: false,

            mapLoaded: false,

            zoom: 5,
            center: {
                lat: -1.712668,
                lng: 118.959779,
            },
            markers: [],

            options: {
                zoomControl: false,
                // mapTypeControl: true,
                // scaleControl: true,
                // streetViewControl: true,
                // rotateControl: true,
                // fullscreenControl: false,
                // disableDefaultUi: false
                // scrollwheel: false,
                gestureHandling: 'cooperative',
            },

            // url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',

            // url_light: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
            // attribution_light: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',

            // url_dark: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
            // attribution_dark: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',


            url_light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            attribution_light: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',

            // url_dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            // attribution_dark: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',

            url_dark: 'https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token='+ this.getOsmDarkModeAccessToken(),
            attribution_dark: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

            // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            locations: [],
            locations_cluster: [],
            idOsm: 'openstreetmap-graph',
            // newLoc: '',
            // newLt : 0,
            // newLng : 0,
            icon: L.icon({iconUrl: 'null'}),
        };
    },
    computed: {
        ...mapState('graph', [
            'status_search_event',
            'search_event',
        ]),
        ...mapState('config', [
            'theme',
        ]),
    },
    watch: {
        status_search_event(newData, oldData) {
            if (oldData.status === 'loading' && newData.status !== 'loading') {
                this.startMap();
            }
        },
        theme() {
            this.startMap();
        },
    },
    methods: {
        async openInfoCardIan(isOpen=true, id=null, location='', label='', location_id='') {
            Event.$emit('openIfoIan', isOpen, id, location, label, location_id);
            if (isOpen) {
                await this.$store.dispatch('graph/getDetailEvent', id);
                this.$store.dispatch('graph/getDetailEventIan', [location_id]);
                this.$store.dispatch('graph/getDetailEventReport', id);
            }
        },
        // closePopup() {
        //     Event.$emit('closeIfoIan')
        //     this.openPopup = !this.openPopup
        // },
        getData() {
            this.$store.dispatch('graph/getSearchEvent', []);
        },
        startMap() {
            const self = this;

            // osm
            self.locations = [];
            self.locations_cluster = [];
            // var result = location.features[0];

            // var lng = parseFloat(result.geometry.coordinates[0] ? result.geometry.coordinates[0] : 0);
            // var lat = parseFloat(result.geometry.coordinates[1] ? result.geometry.coordinates[1] : 0);

            // var lat = self.center.lat;
            // var lng = self.center.lng;

            this.mapLoaded = true;
            // console.log(this.search_event)

            const check_coordinates = [];
            const check_coordinates_cluster = [];
            const check_coordinates_duplicate = [];
            const locations = [];
            const locations_cluster = [];

            if (this.search_event.length > 0) {
                for (let i = 0; i < this.search_event.length; i++) {
                    // this.search_event[i]

                    // var contentString = '<div id="content">'+
                    // var contentString =
                    //     '<div class="pin">'+
                    //         '<div class="popup-pin is-show">'+
                    //             '<div class="popup-pin__header">'+
                    //                 '<h3>Ideologi</h3>'+
                    //                 '<h3>Gerakan Radikal</h3>'+
                    //                 '<h3>Omnibus Law</h3>' +

                    //                 // <div class="pop-up-close">
                    //                 //     <button class="btn btn--small btn--icon-only btn--skin btn--modifier"><i class="b-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></i></button>
                    //                 // </div>

                    //             '</div>'+
                    //             '<div class="popup-pin__body">'+
                    //                 '<p class="test-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'+
                    //             '</div>'+
                    //             '<div class="popup-pin__footer">'+
                    //                 '<strong>Nilai IAN 3.5</strong>'+
                    //                 '<div class="open-info">'+
                    //                     '<button class="btn btn--normal  btn--primary btn--modifier btn--full"><span>Index Ancaman</span></button>'+
                    //                 '</div>'+
                    //             '</div>'+
                    //         '</div>'+
                    //         // <div class="dots"></div>
                    //     // '</div>'+
                    // '</div>';

                    // ----------------------------------------------------------------------------------------------------------------------------------
                    // let contentString = '<div id="content">'+
                    //     '<div id="bodyContent">';

                    // // if (this.search_event[i].gatra && this.search_event[i].gatra.length > 0) {
                    // //     for (var j = 0; j < this.search_event[i].gatra.length; j++) {
                    // //         contentString += '<h3>'+ this.search_event[i].gatra[j].id +' ('+ this.search_event[i].gatra[j].proba +')</h3>';
                    // //     }
                    // // }

                    // contentString +=
                    //         // '<div class="lineIan"></div>'+
                    //         '<p class="test-sm">'+ this.search_event[i].label +'</p>'+

                    //         '<a class="btn btn--primary w-full text-center btn-open-index" data-id="'+ this.search_event[i].id +'" data-location="'+ this.search_event[i].location.label +'" data-label="'+ this.search_event[i].label +'">Nilai Ancaman '+ (this.search_event[i].ian.score.average ? this.search_event[i].ian.score.average : (this.search_event[i].ian.score ? this.search_event[i].ian.score : '-')) +'</a>'+

                    //         // '<strong>Nilai IAN 3.5</strong>'+
                    //         // '<div class="open-info">'+
                    //         //     '<button class="btn btn--normal btn--primary btn--modifier btn--full btn-open-index" data-id="'+ this.search_event[i].id +'" data-location="'+ this.search_event[i].location.label +'" data-label="'+ this.search_event[i].label +'"><span>Index Ancaman</span></button>'+
                    //         // '</div>'+

                    //     '</div>'+
                    // '</div>';

                    // ----------------------------------------------------------------------------------------------------------------------------------

                    // var contentString = '<div id="content">'+
                    //   '<div id="bodyContent">'+

                    //     '<div class="pin">'+
                    //         '<div class="popup-pin is-show">'+
                    //             '<div class="popup-pin__header">';
                    //                 // '<h3>Gerakan Radikal</h3>'+
                    //                 // '<h3>Omnibus Law</h3>' +


                    //                 if (this.search_event[i].gatra && this.search_event[i].gatra.length > 0) {
                    //                     for (var j = 0; j < this.search_event[i].gatra.length; j++) {
                    //                         contentString += '<h3>'+ this.search_event[i].gatra[j].id +' ('+ this.search_event[i].gatra[j].proba +')</h3>';
                    //                     }
                    //                 }

                    //                 // <div class="pop-up-close">
                    //                 //     <button class="btn btn--small btn--icon-only btn--skin btn--modifier"><i class="b-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></i></button>
                    //                 // </div>

                    //     contentString +=
                    //             '</div>'+
                    //             '<div class="popup-pin__body">'+
                    //                 '<p class="test-xs text-gray-500">'+ this.search_event[i].label +'</p>'+
                    //             '</div>'+
                    //             '<div class="popup-pin__footer">'+
                    //                 '<strong>Nilai IAN 3.5</strong>'+
                    //                 '<div class="open-info">'+
                    //                     '<button class="btn btn--normal btn--primary btn--modifier btn--full btn-open-index"><span>Index Ancaman</span></button>'+
                    //                 '</div>'+
                    //             '</div>'+
                    //         '</div>'+
                    //         // <div class="dots"></div>
                    //     '</div>'+

                    //     // '<table>'+
                    //     //   '<tr>'+
                    //     //     '<td>Link Location</td>'+
                    //     //     '<td>:</td>'+
                    //     //     '<td><a target="_blank" href="https://www.google.com/maps?q='+lat+','+lng+'" style="color: #43ea92;">'+'Google Maps</a> '+
                    //     //     '</td>'+
                    //     //   '</tr>'+
                    //     // '</table>'+
                    //     '</div>'+
                    // '</div>';

                    // let centerTmp = [self.center['lat'], self.center['lng']];


                    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


                    // let centerTmp = [this.search_event[i].location.coordinate.latitude, this.search_event[i].location.coordinate.longtitude];

                    // if (this.search_event[i].location.sub_location && this.search_event[i].location.sub_location.coordinate && this.search_event[i].location.sub_location.coordinate.latitude && this.search_event[i].location.sub_location.coordinate.longtitude) {
                    //     centerTmp = [this.search_event[i].location.sub_location.coordinate.latitude, this.search_event[i].location.sub_location.coordinate.longtitude];
                    // }

                    // self.locations.push({
                    //     name: contentString,
                    //     position: centerTmp,
                    // });

                    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                    let centerTmp = [];
                    let location_id = '';

                    if (this.search_event[i].location && this.search_event[i].location.sub_location && this.search_event[i].location.sub_location.coordinate && this.search_event[i].location.sub_location.coordinate.latitude && this.search_event[i].location.sub_location.coordinate.longtitude) {
                        centerTmp = [this.search_event[i].location.sub_location.coordinate.latitude, this.search_event[i].location.sub_location.coordinate.longtitude];
                        location_id = this.search_event[i].location.sub_location.id;
                    } else if (this.search_event[i] && this.search_event[i].location && this.search_event[i].location.coordinate && this.search_event[i].location.coordinate.latitude && this.search_event[i].location.coordinate.longtitude) {
                        centerTmp = [this.search_event[i].location.coordinate.latitude, this.search_event[i].location.coordinate.longtitude];
                        location_id = this.search_event[i].location.id;
                    }


                    if (centerTmp.length > 0) {
                        let contentString = '<div id="content">'+
                        '<div id="bodyContent">';

                        // if (this.search_event[i].gatra && this.search_event[i].gatra.length > 0) {
                        //     for (var j = 0; j < this.search_event[i].gatra.length; j++) {
                        //         contentString += '<h3>'+ this.search_event[i].gatra[j].id +' ('+ this.search_event[i].gatra[j].proba +')</h3>';
                        //     }
                        // }

                        contentString +=
                                // '<div class="lineIan"></div>'+
                                '<p class="test-sm">'+ this.search_event[i].label +'</p>'+

                                '<a class="btn btn--primary w-full text-center btn-open-index" data-id="'+ this.search_event[i].id +'" data-location="'+ this.search_event[i].location.label +'" data-location-id="'+ location_id +'" data-label="'+ this.search_event[i].label +'">Nilai Ancaman '+ (this.search_event[i].ian.score.average ? this.search_event[i].ian.score.average.toFixed(2) : (this.search_event[i].ian.score ? this.search_event[i].ian.score.toFixed(2) : '-')) +'</a>'+

                                // '<strong>Nilai IAN 3.5</strong>'+
                                // '<div class="open-info">'+
                                //     '<button class="btn btn--normal btn--primary btn--modifier btn--full btn-open-index" data-id="'+ this.search_event[i].id +'" data-location="'+ this.search_event[i].location.label +'" data-label="'+ this.search_event[i].label +'"><span>Index Ancaman</span></button>'+
                                // '</div>'+

                            '</div>'+
                        '</div>';

                        if (check_coordinates.includes(centerTmp.toString())) {
                            if (check_coordinates_duplicate.includes(centerTmp.toString()) === false) {
                                check_coordinates_duplicate .push(centerTmp.toString());
                            }
                            check_coordinates_cluster.push(centerTmp.toString());

                            // self.locations_cluster.push({
                            locations_cluster.push({
                                name: contentString,
                                position: centerTmp,
                            });
                        } else {
                            check_coordinates.push(centerTmp.toString());

                            // self.locations.push({
                            locations.push({
                                name: contentString,
                                position: centerTmp,
                            });
                        }
                    }
                }

                // console.log('locations')
                // console.log(locations.length)
                // console.log(locations_cluster.length)
                // console.log('check_coordinates')
                // console.log(check_coordinates.length)
                // console.log(check_coordinates_cluster.length)
                // console.log('duplicate')
                // console.log(check_coordinates_duplicate.length)

                if (check_coordinates.length > 0 || check_coordinates_cluster.length > 0) {
                    const delete_location_index = [];

                    for (var i = 0; i < check_coordinates.length; i++) {
                        for (let j = 0; j < check_coordinates_duplicate.length; j++) {
                            if (check_coordinates[i] === check_coordinates_duplicate[j]) {
                                locations_cluster.push(locations[i]);
                                delete_location_index.push(i);
                            }
                        }
                    }

                    if (delete_location_index.length > 0) {
                        for (var i = 0; i < delete_location_index.length; i++) {
                            locations.splice(delete_location_index[i], 1);
                        }
                    }
                    self.locations = locations;
                    self.locations_cluster = locations_cluster;
                }

                if (self.locations.length > 0 || self.locations_cluster.length > 0) {
                    self.$nextTick(() => {
                        self.$nextTick(() => {
                            const map = self.$refs.mapRefOSM.mapObject;

                            map.on('popupclose', function(e) {
                                self.openInfoCardIan(false);
                            });

                            map.on('popupopen', function(e) {
                                // var marker = e.popup._source;
                                const elements = document.getElementsByClassName('btn-open-index');

                                const myFunction = function() {
                                    const id = this.getAttribute('data-id');
                                    const location = this.getAttribute('data-location');
                                    const label = this.getAttribute('data-label');
                                    const location_id = this.getAttribute('data-location-id');

                                    // console.log([id, label]);
                                    // alert(attribute);

                                    // console.log('from pop up');
                                    // console.log(e.popup._latlng);
                                    self.openInfoCardIan(true, id, location, label, location_id);
                                };

                                for (let i = 0; i < elements.length; i++) {
                                    elements[i].addEventListener('click', myFunction, false);
                                }
                            });
                        });
                    });
                }
            }
        },
    },
    mounted() {
        // console.log('mounted on index graph')
        this.getData();
    },
};
</script>

<style lang="sass">
    .box-graph
        width: 100%
        height: 100vh
        position: relative
        iframe
            width: 100%
            height: 100%

        .pin
            position: absolute
            top: 60%
            left: 50%
            cursor: pointer
            .popup-pin
                @apply bg-white rounded shadow-xl p-4 w-56 absolute
                font-size: 13px
                bottom: 24px
                left: -112px
                display: none
                &.is-show
                    display: block
                &::after
                    content: ''
                    position: absolute
                    left: 50%
                    bottom: -6px
                    background-color: #fff
                    width: 16px
                    height: 16px
                    margin-left: -8px
                    transform: rotate(45deg)
                    border-radius: 4px

                &__header
                    @apply mb-4 pb-4 border-b border-gray-200
                    h3
                        font-weight: 700
                &__body
                    @apply mb-4 pb-4 border-b border-gray-200

                &__footer
                    @apply text-center
                    strong
                        font-size: 1rem
                        margin-bottom: 1rem
                        display: block

                .pop-up-close
                    @apply right-2 top-2 absolute

            .dots
                width: 16px
                height: 16px
                border-radius: 100%
                background-color: red
                margin-left: -8px
</style>
