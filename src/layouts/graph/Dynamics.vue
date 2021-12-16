<template lang="pug">
    .graph-layouts__dynamics(v-bind:class="{'dynamics-disabled' : searchActive}" ref="dynamicsNationalThreatsSection")

        //- .popup-calendar(v-if=" openDynamic || openPopUpCalendar")
        .popup-calendar(v-if="openPopUpCalendar" ref="dynamicsNationalThreatsPopUpCalendar")
            .popup-calendar__header
                ul.tabs
                    li: button.tab(:class="group_by === 'date' ? 'tab--active' : '' " @click="calendarToggle('date')") Pilih Rentang Hari
                    li: button.tab(:class="group_by === 'month'  ? 'tab--active' : '' " @click="calendarToggle('month')") Pilih Rentang Bulan
            .popup-calendar__body
                //- template(v-if="calendarMonthly")
                template(v-if="group_by === 'month'")
                    .flex.gap-4.items-center
                        .field.field--icon-right.w-full
                            select.field-style(v-model="month_range_from_year")
                                option(v-for="item in list_years" :value="item") {{ item }}
                            span.icon-field
                                b-icon(name="chevron-down")

                        .field.field--icon-right.w-full
                            select.field-style(v-model="month_range_from_month")
                                option(v-for="item in list_months" :value="item.value") {{ item.label }}
                            span.icon-field
                                b-icon(name="chevron-down")


                        span Sampai

                        .field.field--icon-right.w-full
                            select.field-style(v-model="month_range_to_year")
                                option(v-for="item in list_years" :value="item") {{ item }}
                            span.icon-field
                                b-icon(name="chevron-down")

                        .field.field--icon-right.w-full
                            select.field-style(v-model="month_range_to_month")
                                option(v-for="item in list_months" :value="item.value") {{ item.label }}
                            span.icon-field
                                b-icon(name="chevron-down")


                //- template(v-if="calendarDaily")
                template(v-if="group_by === 'date'")
                    date-range-picker(
                        v-if="dateRange.startDate && dateRange.endDate"
                        ref="picker"
                        v-model="dateRange"
                        @update="pickerUpdate($event)"
                        :locale-data="{ firstDay: 1, format: 'dd mmmm yyyy' }"
                        :date-format="dateFormatPicker"
                        opens="inline"
                        :ranges="default_ranges"
                        :autoApply="true"
                    )
                        template(slot="input" slot-scope="picker") {{ picker.startDate | date }} - {{ picker.endDate | date }}
            .popup-calendar__footer
                b-button(text="Batalkan" @click.native="togglePopupCalendar(true)")
                b-button(text="Terapkan" kind="primary" @click.native="filter()")

        .box_dynamics(v-bind:class="{'box_dynamics--show' : graphDynamics}")
            .box_dynamics__body
                .main-dynamics
                    .main-dynamics__header
                        h2 Dinamika Ancaman Nasional
                        .block
                            button.field-style.flex.items-center( @click="togglePopupCalendar()")
                                b-icon.mr-2(name="calendar")
                                span.block.relative(style="top:2px") {{ from_date_formated }} - {{ to_date_formated }}

                    .main-dynamics__body
                        .relative.pt-10.pb-20(v-if="status_dynamics_national_threats.status === 'loading'")
                            b-loading(text="Memuat dinamika ancaman nasional")
                        Chart(v-else :options="chartOptions").main-chart

            button.box_dynamics__toggle(@click="toggleDynamics()" v-closable-dynamics-national-threats="{exclude: ['dynamicsNationalThreatsSection'], handler: 'closeDynamicsNationalThreats'}")
                template(v-if="!graphDynamics")
                    p Tampilkan Dinamika Ancaman Nasional
                    b-icon(name="chevron-up")
                template(v-else)
                    p Sembunyikan Dinamika Ancaman Nasional
                    b-icon(name="chevron-down")

</template>

<script>
// import DynamicsComponents from '@/components/Dynamics'
import {Chart} from 'highcharts-vue';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import moment from 'moment';
import {mapState} from 'vuex';
let handleOutsideClick;
// const labels = ['0', '1.5', '2.5', '3.5', '5'];

export default {
    name: 'GraphDynamics',
    components: {
        // DynamicsComponents
        Chart,
        DateRangePicker,
    },
    directives: {
        'closable-dynamics-national-threats': {
            bind (el, binding, vnode) {
                handleOutsideClick = (e) => {
                    e.stopPropagation();
                    const { handler, exclude } = binding.value;
                    let clickedOnExcludedEl = false;

                    exclude.forEach(refName => {
                        if (!clickedOnExcludedEl) {
                            const excludedEl = vnode.context.$refs[refName];
                            if (excludedEl)
                                clickedOnExcludedEl = excludedEl.contains(e.target);
                        }
                    })

                    if (!el.contains(e.target) && !clickedOnExcludedEl) {
                        vnode.context[handler]();
                    }
                }
                document.addEventListener('click', handleOutsideClick);
                document.addEventListener('touchstart', handleOutsideClick);
            },
            unbind () {
                document.removeEventListener('click', handleOutsideClick);
                document.removeEventListener('touchstart', handleOutsideClick);
            }
        },
    },
    data() {
        return {
            graphDynamics: false,
            searchActive: false,

            // openDynamic: false,
            from_cancel_or_submit_filter: false,

            openPopUpCalendar: false,
            calendarMonthly: false,
            calendarDaily: true,

            month_range_from_year: moment().year(),
            month_range_from_month: moment().format('MM'),

            month_range_to_year: moment().year(),
            month_range_to_month: moment().format('MM'),

            // --------------------------------------------------------------------------------------------

            date_from: moment().subtract(6, 'days').format('YYYY-MM-DD'),
            date_to: moment().format('YYYY-MM-DD'),
            group_by: 'date',

            dateRange: {
                startDate: moment().subtract(6, 'days').toDate(),
                endDate: moment().toDate(),
            },
            default_ranges: {
                'Hari ini': [moment().toDate(), moment().toDate()],
                'Kemarin': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
                '7 hari lalu': [moment().subtract(6, 'days').toDate(), moment().toDate()],
                'Minggu lalu': [moment().subtract(1, 'isoWeek').startOf('isoWeek').toDate(), moment().subtract(1, 'isoWeek').endOf('isoWeek').toDate()],
            },

            chartOptions: {
                title: {
                    text: null,
                },
                legend: {
                    enabled: false,
                },
                chart: {
                    height: '180px',
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
                    tickInterval: 1.25,
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

        };
    },
    computed: {
        ...mapState('graph', [
            'status_dynamics_national_threats',
            'dynamics_national_threats',
        ]),
        from_date_formated() {
            let format = 'DD MMM YY';
            if (this.group_by === 'month') {
                format = 'MMM YY';
            }

            return moment(this.date_from, 'YYYY-MM-DD').locale('id').format(format);
        },
        to_date_formated() {
            let format = 'DD MMM YY';
            if (this.group_by === 'month') {
                format = 'MMM YY';
            }

            return moment(this.date_to, 'YYYY-MM-DD').locale('id').format(format);
        },
        list_months() {
            const months = [];
            const m = moment().locale('id');

            for (let i = 0; i < 12; i++) {
                months.push({
                    label: m.month(i).format('MMMM'),
                    value: m.month(i).format('MM'),
                });
            }

            return months;
        },
        list_years() {
            const years = [];
            const m = moment();

            for (let i = 10; i >= 1; i--) {
                years.push(m.year());
                m.subtract(1, 'years');
            }

            return years;
        },
    },
    watch: {
        graphDynamics(newVal) {
            if (newVal === true) {
                this.getData();
            }
        },
        dynamics_national_threats(newVal) {
            if (newVal && newVal.length > 0) {
                const categories = [];
                const series = [];

                const chart_data = this.formatChartData(newVal);

                for (let i = 0; i < chart_data.length; i++) {
                    categories.push(chart_data[i].date);
                    series.push(chart_data[i].score);
                }

                this.chartOptions.xAxis.categories = categories;
                this.chartOptions.series[0].data = series;
            }
        },
        month_range_from_year(newVal, oldVal) {
            this.checkMonthRange('from_year', oldVal);
        },
        month_range_from_month(newVal, oldVal) {
            this.checkMonthRange('from_month', oldVal);
        },
        month_range_to_year(newVal, oldVal) {
            this.checkMonthRange('to_year', oldVal);
        },
        month_range_to_month(newVal, oldVal) {
            this.checkMonthRange('to_month', oldVal);
        },
    },
    methods: {
        togglePopupCalendar(from_cancel_or_submit_filter=false) {
            if (from_cancel_or_submit_filter === true)
                this.from_cancel_or_submit_filter = true;

            this.openPopUpCalendar = !this.openPopUpCalendar;
        },
        filter() {
            this.getData();
            this.togglePopupCalendar(true);
        },
        calendarToggle(group_by) {
            // this.calendarMonthly = !this.calendarMonthly;
            // this.calendarDaily = !this.calendarDaily;
            this.group_by = group_by;
        },
        toggleDynamics() {
            this.graphDynamics = !this.graphDynamics;
            this.openPopUpCalendar = false;
            Event.$emit('openIfoIan', false);
        },
        closeDynamicsNationalThreats() {
            if (this.from_cancel_or_submit_filter === false) {
                this.openPopUpCalendar = false;
                this.graphDynamics = false;

            } else {

                this.from_cancel_or_submit_filter = false;
            }
        },
        // updateDateRange(from_date, to_date) {
        //     if (this.module.length > 0) {
        //         // this.$store.commit(this.module + '/setFromDate', from_date);
        //         // this.$store.commit(this.module + '/setToDate', to_date);
        //     }
        // },
        async pickerUpdate(e) {
            // let ranges = moment(e.endDate.getTime()).diff(moment(e.startDate.getTime()), 'days') + 1;

            // this.date_from = moment(this.dateRange.startDate).format('YYYY-MM-DD');
            // this.date_to = moment(this.dateRange.endDate).format('YYYY-MM-DD');
        },
        checkMonthRange(type, oldVal) {
            if ((this.month_range_from_year +'-'+ this.month_range_from_month) > (this.month_range_to_year +'-'+ this.month_range_to_month)) {
                Event.$emit('error', 'Tahun dan bulan awal tidak boleh lebih dari tahun dan bulan akhir. Serta tahun dan bulan akhir tidak boleh kurang dari tahun dan bulan awal', null, 'Tanggal atau bulan tidak sesuai!');

                this['month_range_'+ type] = oldVal;
            }
        },
        formatChartData(data) {
            const group_by = this.group_by;
            return data.map(function(item) {
                let format = 'DD MMM YY';

                if (group_by === 'month') {
                    format = 'MMM YY';
                }

                item.date = moment(item.date, 'YYYY-MM-DD').locale('id').format(format);
                return item;
            });
        },
        processDateMonthRange() {
            if (this.group_by === 'date') {
                this.date_from = moment(this.dateRange.startDate).format('YYYY-MM-DD');
                this.date_to = moment(this.dateRange.endDate).format('YYYY-MM-DD');
            } else {
                this.date_from = moment(this.month_range_from_year +'-'+ this.month_range_from_month, 'YYYY-MM').startOf('month').format('YYYY-MM-DD');
                this.date_to = moment(this.month_range_to_year +'-'+ this.month_range_to_month, 'YYYY-MM').endOf('month').format('YYYY-MM-DD');
            }
        },
        async getData() {
            await this.processDateMonthRange();

            this.$store.dispatch('graph/getDynamicsNationalThreats', [this.date_from, this.date_to, this.group_by]);
        },
    },
    mounted() {
        //
    },
    created() {
        Event.$on('disabledDynamic', () => {
            this.searchActive = true;
            this.graphDynamics = false;
            this.openPopUpCalendar = false;
        });
        Event.$on('openDynamic', () => {
            this.searchActive = false;
        });
    },
};
</script>

<style lang="sass">
    .box-chart-graph
        height: 400px
        position: relative
        .main-chart
            position: relative
            z-index: 2
        .barcolor
            position: absolute
            width: 100%
            height: 100%
            background-color: red
            left: 0
            top: 0
            z-index: 1
            display: none

    .highcharts-alternate-grid
        fill: purple

</style>
