<template lang="pug">
    .component-dynamics
        .component-dynamics__header
            span.dynamics-title {{ title }}
            .box-calendar
                b-icon(name="calendar")
                date-range-picker(
                    v-if="dateRange.startDate && dateRange.endDate"
                    ref="picker"
                    v-model="dateRange"
                    @update="pickerUpdate($event)"
                    :locale-data="{ firstDay: 1, format: 'dd mmmm yyyy' }"
                    :date-format="dateFormatPicker"
                    opens="left"
                    drops="up"
                    :ranges="default_ranges"
                    :autoApply="true"
                )
                    template(slot="input" slot-scope="picker" style="min-width: 350px;") {{ picker.startDate | date }} - {{ picker.endDate | date }}
        .component-dynamics__body
            Chart( :options="chartOptions").main-chart

</template>

<script>
import {Chart} from 'highcharts-vue';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import moment from 'moment';

export default {
    name: 'GraphDynamics',
    components: {
        Chart,
        DateRangePicker,
    },
    props: {
        title: {
            type: String,
            default: 'Dinamika Ancaman Nasional',
        },
        chartData: {
            type: Array,
            // default: []
        },
    },
    data() {
        return {
            dateRange: {
                startDate: moment().subtract(6, 'days').toDate(),
                endDate: moment().toDate(),
            },
            default_ranges: {
                'Today': [moment().toDate(), moment().toDate()],
                'Yesterday': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
                'Last 7 days': [moment().subtract(6, 'days').toDate(), moment().toDate()],
                'Last week': [moment().subtract(1, 'isoWeek').startOf('isoWeek').toDate(), moment().subtract(1, 'isoWeek').endOf('isoWeek').toDate()],
            },
            chartOptions: {
                title: {
                    text: null,
                },
                legend: {
                    enabled: false,
                },
                chart: {
                    height: '120px',
                    backgroundColor: 'transparent',
                    plotBackgroundColor: 'transparent',
                },
                xAxis: {
                    // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    categories: [],
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
                    plotBands: [
                        {
                            from: 0,
                            to: 1.5,
                            color: '#56db41',
                        },
                        {
                            from: 1.5,
                            to: 2.5,
                            color: '#f9f974',
                        },
                        {
                            from: 2.5,
                            to: 3.5,
                            color: '#fc9a31',
                        },
                        {
                            from: 3.5,
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
        };
    },
    watch: {
        // chartData: function(newVal, oldVal) { // watch it
        //     console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        // }
    },
    methods: {
        // updateDateRange(from_date, to_date) {
        //     if (this.module.length > 0) {
        //         // this.$store.commit(this.module + '/setFromDate', from_date);
        //         // this.$store.commit(this.module + '/setToDate', to_date);
        //     }
        // },
        async pickerUpdate(e) {
            // let ranges = moment(e.endDate.getTime()).diff(moment(e.startDate.getTime()), 'days') + 1;
            // let def = this.$store.getters['config/getDateRangeByRoute'](this.route_name)


            // // if (ranges > def) {
            // if (ranges > this.$store.getters['config/getValidateRange']) {
            //     const default_date = this.$store.getters['config/getDefaultDate'](def);
            //     this.updateDateRange(default_date.from_date, default_date.to_date);
            //     await this.dateChange();

            //     // Event.$emit('error', 'Date range is not more than ' + this.$store.getters['config/getValidateRange'] + ' days!');
            //     this.$swal.fire({
            //         icon: 'error',
            //         title: 'Date range is not more than ' + this.$store.getters['config/getValidateRange'] + ' days!',
            //         text: 'Your date range is ' + ranges + ' days.',
            //     });
            //     return;
            // }

            // this.updateDateRange(moment(this.dateRange.startDate).format('YYYY-MM-DD'), moment(this.dateRange.endDate).format('YYYY-MM-DD'));
        },
        updateChart() {
            const categories = [];
            const series = [];

            if (this.chartData && this.chartData.length > 0) {
                for (let i = 0; i < this.chartData.length; i++) {
                    categories.push(this.chartData[i].date);
                    series.push(this.chartData[i].score);
                }
            }

            this.chartOptions.xAxis.categories = categories;
            this.chartOptions.series[0].data = series;
        },
    },
    mounted() {
        this.updateChart();
    },
};
</script>

<style lang="sass">
.component-dynamics
    @apply w-full
    &__header
        @apply flex items-center justify-between
</style>
