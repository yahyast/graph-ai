<template lang="pug">
    .graph-layouts__info(v-bind:class="{'is-opened' : openInfo, 'open-calendar' : openCalendarInfo}")

        //- .media.w-full.flex
            .media__cover.mr-8
                figure.w-32.h-32.overflow-hidden.rounded.bg-red.relative
                    b-loading(kind="skeleton")
            .media__content.flex-grow
                h1.text-2xl.mb-2.relative.h-8.w-full.block
                    b-loading(kind="skeleton")
                p.text-gray-400
                    span.w-full.relative.h-3.mb-2.block: b-loading(kind="skeleton")
                    span.w-full.relative.h-3.mb-2.block: b-loading(kind="skeleton")
                    span.w-full.relative.h-3.mb-2.block: b-loading(kind="skeleton")
                    span.w-full.relative.h-3.mb-2.block: b-loading(kind="skeleton")

        //- b-loading(kind="skeleton")

        //- .box-info-graph
            .box-info-graph__header
                .info-area
                    .info-area__header
                        //- span INDEX ANCAMAN WILAYAH
                        //- strong {{ location }}
                        b-loading(kind="skeleton")
                        b-loading(kind="skeleton")
                    .info-area__graph
                        b-loading(kind="skeleton")
                        //- span {{ label }}
                    .info-area__sources
                        .sources
                            .sources__item(v-for="item in sourcesReport" :key="item.id" :class="{'sources__item--opened' : item.stateOpen}")
                                .box-source
                                    b-loading(kind="skeleton")

                                    //- button.box-source__header(
                                        @click="item.stateOpen = !item.stateOpen"
                                    //- )
                                        //- span {{ item.title }}
                                        //- span.arrow ▲
                                    //- .box-source__body
                                        p {{ item.desc }}
                                        router-link.btn-read(:to="item.url").mt-2
                                            b-button(text='Baca sumber laporan' kind="tertiary" size="small")

            .box-info-graph__body
                .box-related
                    .box-related__header
                        //- h2 Organisasi Aktif
                        b-loading(kind="skeleton")
                    .box-related__body
                        //- router-link.btn-related(v-for="item in relatedOrganization" :key="item.id" :to="item.url")
                            b-button(:text="item.name" kind="secondary" size="small" width="full")
                        b-loading(kind="skeleton")

                .box-related
                    .box-related__header
                        //- h2 Aktor Penting
                        h2
                            b-loading(kind="skeleton")
                    .box-related__body
                        //- router-link.btn-related(v-for="item in relatedActor" :key="item.id" :to="item.url")
                            b-button(:text="item.name" kind="secondary" size="small" width="full")
                        span.w-full.relative.h-3.mb-2.block: b-loading(kind="skeleton")

        b-loading(v-if="status_detail_event.status === 'loading'" text="Memuat index ancaman wilayah..." kind="circular")

        //- ------------------------------------------------------------------------------------------------------------------------

        .box-info-graph(v-else)
            .box-info-graph__header
                .info-area
                    .info-area__header
                        span INDEX ANCAMAN WILAYAH
                        //- strong {{ location }}
                        strong {{ (detail_event.location && detail_event.location.sub_location && detail_event.location.sub_location.label && detail_event.location.sub_location.label.length > 0 ? detail_event.location.sub_location.label +' - ' : '') + (detail_event.location && detail_event.location.label && detail_event.location.label.length > 0 ? detail_event.location.label : '-') }}
                    .info-area__graph
                        //- strong.mb-2.font-bold.block {{ label }}
                        strong.mb-2.font-bold.block {{ detail_event.label && detail_event.label.length > 0 ? detail_event.label : '-' }}

                        .relative.p-10(v-if="status_detail_event_ian.status === 'loading'")
                            b-loading(text="Memuat data..." kind="")

                        //- DynamicsComponents(
                        //-     v-else
                        //-     title=""
                        //-     :chart-data="(detail_event_ian && detail_event_ian.length > 0) ? mapData(detail_event_ian) : []"
                        //- )
                        //- :chart-data="(detail_event.ian && detail_event.ian.length > 0) ? mapData(detail_event.ian) : []"

                        template(v-else)
                            .box-calendar.mb-4
                                b-icon(name="calendar")
                                date-range-picker(
                                    v-if="dateRange.startDate && dateRange.endDate"
                                    ref="picker"
                                    v-model="dateRange"
                                    @update="pickerUpdate($event)"
                                    :locale-data="{ firstDay: 1, format: 'dd mmmm yyyy', applyLabel: 'Terapkan', cancelLabel: 'Batalkan', }"
                                    :date-format="dateFormatPicker"
                                    opens="left"
                                    drops="up"
                                    :ranges="default_ranges"
                                    :autoApply="false"
                                    @toggle="logEvent($event)"

                                )
                                    template(slot="input" slot-scope="picker" style="min-width: 350px;") {{ picker.startDate | date }} - {{ picker.endDate | date }}

                            .box-chart-info
                                Chart( :options="chartOptions")

                    .info-area__sources
                        .relative.p-10.mt-5(v-if="status_detail_event_report.status === 'loading'")
                            b-loading(text="Memuat data..." kind="")


                        .sources(v-else-if="sourcesReport && sourcesReport.length > 0")
                            .sources__item(v-for="(item, index) in sourcesReport" :key="index" :class="{'sources__item--opened' : sourcesReport[index].stateOpen}")
                                .box-source
                                    button.box-source__header(
                                        @click="openCloseReport(index)"
                                        v-tooltip.bottom="item.title && item.title.length > 38 ? item.title : ''"
                                    )
                                        span {{ item.title && item.title.length > 0 ? item.title.substr(0, 38) +'...' : '-' }}
                                        span.arrow ▲
                                    .box-source__body

                                        template(v-if="item.short_content")
                                            p(v-if="item.stateLoadMoreContent === true") {{ item.content }}
                                            p(v-else) {{ item.short_content }}

                                        p(v-else) {{ item.content && item.content.length > 0 ? item.content : '-' }}

                                        .btn-read.mt-2(v-if="item.short_content")
                                            b-button(:text="item.stateLoadMoreContent === true ? 'Sembunyikan' : 'Selengkapnya'" kind="tertiary" size="small" @click.native="loadMoreReportContent(index)")

                                        //- router-link.btn-read(:to="item.url").mt-2
                                            b-button(text='Baca sumber laporan' kind="tertiary" size="small")

                            //- .sources__item(v-for="item in sourcesReport" :key="item.id" :class="{'sources__item--opened' : item.stateOpen}")
                                .box-source
                                    button.box-source__header(
                                        @click="item.stateOpen = !item.stateOpen"
                                    )
                                        span {{ item.title }}
                                        span.arrow ▲
                                    .box-source__body
                                        p {{ item.desc }}
                                        router-link.btn-read(:to="item.url").mt-2
                                            b-button(text='Baca sumber laporan' kind="tertiary" size="small")

                        .text-center.pt-10.pb-5(v-else)
                            span Tidak ada data laporan.

            .box-info-graph__body
                .box-related
                    .box-related__header
                        h2 Organisasi Aktif
                    .box-related__body
                        //- router-link.btn-related(v-for="item in relatedOrganization" :key="item.id" :to="item.url")
                            b-button(:text="item.name" kind="secondary" size="small" width="full")

                        //- template(v-if="detail_event.organisasi && detail_event.organisasi.length > 0")
                            router-link.btn-related(v-for="item in detail_event.organisasi" :key="item.id" :to="'/bdi/organisasi/'+ item.label")
                                b-button(:text="item.label" kind="secondary" size="small" width="full")

                        template(v-if="detail_event.graph && detail_event.graph.entities && detail_event.graph.entities.length > 0 && (filterData('org', detail_event.graph.entities)).length > 0")
                            router-link.btn-related(v-for="item in filterData('org', detail_event.graph.entities)" :key="item.id" :to="'/bdi/organisasi/'+ encodeURIComponent(item.label)")
                                b-button(:text="item.label && item.label.length > 17 ? item.label.substr(0, 17) +'...' : item.label" v-tooltip="item.label && item.label.length > 17 ? item.label : ''" kind="secondary" size="small" width="full")

                        span(v-else) -

                .box-related
                    .box-related__header
                        h2 Aktor Penting
                    .box-related__body
                        //- router-link.btn-related(v-for="item in relatedActor" :key="item.id" :to="item.url")
                            b-button(:text="item.name" kind="secondary" size="small" width="full")

                        //- template(v-if="detail_event.tokoh && detail_event.tokoh.length > 0")
                            router-link.btn-related(v-for="item in detail_event.tokoh" :key="item.id" :to="'/bdi/tokoh/'+ item.label")
                                b-button(:text="item.label" kind="secondary" size="small" width="full")

                        template(v-if="detail_event.graph && detail_event.graph.entities && detail_event.graph.entities.length > 0 && (filterData('figure', detail_event.graph.entities)).length > 0")
                            router-link.btn-related(v-for="item in filterData('figure', detail_event.graph.entities)" :key="item.id" :to="'/bdi/tokoh/'+ encodeURIComponent(item.label)")
                                b-button(:text="item.label && item.label.length > 17 ? item.label.substr(0, 17) +'...' : item.label" v-tooltip="item.label && item.label.length > 17 ? item.label : ''" kind="secondary" size="small" width="full")

                        span(v-else) -
</template>

<script>
import {mapState} from 'vuex';
// import DynamicsComponents from '@/components/Dynamics';
import {Chart} from 'highcharts-vue';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import moment from 'moment';

export default {
    name: 'graphInfo',
    components: {
        // DynamicsComponents
        Chart,
        DateRangePicker,
    },
    data() {
        return {
            openInfo: false,
            openCalendarInfo: false,
            chartOptions: {
                title: {
                    text: null,
                },
                legend: {
                    enabled: false,
                },
                chart: {
                    height: '160px',
                    backgroundColor: 'transparent',
                    plotBackgroundColor: 'transparent',
                },
                xAxis: {
                    // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    categories: [],
                    className: 'graph-color-theme',
                },
                series: [{
                    name: 'Point',
                    // data: [1, 2, 3, 4, 1.5, 2.5, 1.5, 3.5, 2, 3, 2, 1],
                    data: [],
                    type: 'spline',
                    turboThreshold: 5,
                    visible: true,
                }],
                plotOptions: {
                    series: {
                        color: 'white',
                        lineColor: 'blue',
                    },
                },
                yAxis: {
                    min: 0,
                    max: 5,
                    tickInterval: 1.25,
                    className: 'graph-color-theme',
                    plotBands: [
                        {
                            from: 0,
                            to: 1.25,
                            color: '#56db41',
                        },
                        {
                            from: 1.25,
                            to: 2.5,
                            color: '#f9f974',
                        },
                        {
                            from: 2.5,
                            to: 3.75,
                            color: '#fc9a31',
                        },
                        {
                            from: 3.75,
                            to: 5,
                            color: '#d83c3d',
                        },
                    ],
                    title: {
                        text: '',
                    },
                    labels: {
                        // format: []
                    },
                },
            },

            dateRange: {
                startDate: moment().subtract(1, 'months').toDate(),
                endDate: moment().toDate(),
            },
            default_ranges: {
                'Hari ini': [moment().toDate(), moment().toDate()],
                'Kemarin': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
                '7 hari lalu': [moment().subtract(6, 'days').toDate(), moment().toDate()],
                'Minggu lalu': [moment().subtract(1, 'isoWeek').startOf('isoWeek').toDate(), moment().subtract(1, 'isoWeek').endOf('isoWeek').toDate()],
            },

            sourcesReport: [],
            // sourcesReport: [
            //     {
            //         title: 'Sumber laporan #1',
            //         desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            //         url: '',
            //         stateOpen: false,
            //     },
            //     {
            //         title: 'Sumber laporan #2',
            //         desc: 'Tristique risus ut dictumst ut pharetra velit tincidunt tellus. Lectus vitae et, neque, tristique neque egestas odio.',
            //         url: '',
            //         stateOpen: false,
            //     },
            //     {
            //         title: 'Sumber laporan #3',
            //         desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            //         url: '',
            //         stateOpen: false,
            //     },
            //     {
            //         title: 'Sumber laporan #4',
            //         desc: 'Tristique risus ut dictumst ut pharetra velit tincidunt tellus. Lectus vitae et, neque, tristique neque egestas odio.',
            //         url: '',
            //         stateOpen: false,
            //     },
            // ],
            relatedOrganization: [
                {
                    name: 'KSPSI',
                    url: '#',
                },
                {
                    name: 'KSPSI',
                    url: '#',
                },
            ],
            relatedActor: [
                {
                    name: 'Yorrys Raweyai',
                    url: '#',
                },
                {
                    name: 'Nining Elitos',
                    url: '#',
                },
                {
                    name: 'Said Iqbal',
                    url: '#',
                },
                {
                    name: 'Andi Gani Nena Wea',
                    url: '#',
                },
                {
                    name: 'Merah Ismail',
                    url: '#',
                },
                {
                    name: 'Airlangga Hartarto',
                    url: '#',
                },
                {
                    name: 'Puan Maharani',
                    url: '#',
                },
                {
                    name: 'Rosan Perkasa',
                    url: '#',
                },
                {
                    name: 'Pandu Patria Sjahrir',
                    url: '#',
                },
                {
                    name: 'Erwin Aksa',
                    url: '#',
                },
                {
                    name: 'Bobby Gafur Umar',
                    url: '#',
                },
                {
                    name: 'Raden Pardede',
                    url: '#',
                },
                {
                    name: 'Benny Soetrisno',
                    url: '#',
                },
                {
                    name: 'Azis Syamsudin',
                    url: '#',
                },
                {
                    name: 'Arteria Dahlan',
                    url: '#',
                },
                {
                    name: 'Lamhot Sinaga',
                    url: '#',
                },
                {
                    name: 'Arsjad Rasjid',
                    url: '#',
                },
            ],

            id: '',
            location: '',
            label: '',
            location_id: '',
        };
    },
    computed: {
        ...mapState('graph', [
            'status_detail_event',
            'detail_event',
            'status_detail_event_ian',
            'detail_event_ian',
            'status_detail_event_report',
            'detail_event_report',
        ]),
    },
    watch: {
        status_detail_event(newData, oldData) {
            if (oldData.status === 'loading' && newData.status !== 'loading') {
                this.$store.commit('graph/setDetailEventIan', this.detail_event_ian);
            }
        },
        // openInfo(newData) {
        //     if (newData === false) {
        //         this.location = '';
        //         this.label = '';
        //     }
        // },
        detail_event_ian(newData) {
            // (newData && newData.length > 0) ? this.mapData(newData) : []

            if (newData && newData.length > 0) {
                const chartData = this.mapData(newData);

                const categories = [];
                const series = [];

                if (chartData && chartData.length > 0) {
                    for (let i = 0; i < chartData.length; i++) {
                        categories.push(chartData[i].date);
                        series.push(chartData[i].score);
                    }
                }

                this.chartOptions.xAxis.categories = categories;
                this.chartOptions.series[0].data = series;
            } else {
                this.chartOptions.xAxis.categories = [];
                this.chartOptions.series[0].data = [];
            }
        },
        detail_event_report(newData) {
            this.sourcesReport = [];

            if (newData.length > 0) {
                let sourcesReport = newData;

                // sourcesReport[0].content = 'Buruh yang terlibat dalam Konfederasi Serikat Pekerja Indonesia (KSPI) terbuka untuk menurunkan kenaikan upah';

                sourcesReport = sourcesReport.map(function(item) {
                    item.stateOpen = false;
                    if (item.content && item.content.length > 110) {
                        item.stateLoadMoreContent = false;
                        item.short_content = item.content.substr(0, 110) +'...';
                    }

                    return item;
                });

                this.sourcesReport = sourcesReport;
            }
        },
    },
    methods: {
        mapData(data) {
            return data.map(function(item) {
                item.date = moment(item.date, 'YYYY-MM-DD').locale('id').format('DD MMM YY');
                return item;
            });
        },
        filterData(type, data) {
            return data.filter(function(item) {
                return item.class === (type === 'org' ? 'ORG' : 'PER');
            });
        },

        toggleCalendarInfo() {
            this.openCalendarInfo = !this.openCalendarInfo;
        },

        logEvent(e) {
            if (e === false) {
                this.openCalendarInfo = false;
            } else {
                this.openCalendarInfo = true;
            }
        },

        pickerUpdate(e) {
            // console.log(e);

            // moment(this.dateRange.endDate).format('YYYY-MM-DD');

            this.$store.dispatch('graph/getDetailEventIan', [this.location_id, moment(this.dateRange.startDate).format('YYYY-MM-DD'), moment(this.dateRange.endDate).format('YYYY-MM-DD')]);

            // if(e === false) {
            this.openCalendarInfo = false;
            // }
        },
        openCloseReport(index) {
            const source = this.sourcesReport[index];
            source.stateOpen = !source.stateOpen;
            this.$set(this.sourcesReport, index, source);
        },
        loadMoreReportContent(index) {
            const source = this.sourcesReport[index];
            source.stateLoadMoreContent = !source.stateLoadMoreContent;
            this.$set(this.sourcesReport, index, source);
        },

    },
    created() {
        Event.$on('openIfoIan', (isOpen=true, id='', location='', label='', location_id='') => {
            // console.log('info graph', [id, label])
            // this.openInfo = true;
            this.openInfo = isOpen;
            this.id = id;
            this.location = location;
            this.label = label;
            this.location_id = location_id;

            this.dateRange.startDate = moment().subtract(1, 'months').toDate();
            this.dateRange.endDate = moment().toDate();
        });

        // Event.$on('closeIfoIan', () => {
        //     this.openInfo = false;
        // });
    },
};
</script>
