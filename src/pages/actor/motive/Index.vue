<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadActor
        .content-bdi__body
            .block
                h2.subheading Motif &amp; Agenda
                .card-graph
                    .relative.p-40(v-if="status_motive_agenda.status === 'loading'")
                        b-loading(text="Memuat data")

                    Chart(v-if="motive_agenda && Object.keys(motive_agenda).length > 0 && start_chart" :options="chartOptions").main-chart
                    
                    .text-center.p-40(v-else)
                        span Data tidak ditemukan.
</template>

<script>
import HeadActor from '@/pages/actor/HeadActor';
import {Chart} from 'highcharts-vue';
import { mapState } from 'vuex';

export default {
    name: 'MotiveOfActor',
    components: {
        HeadActor,
        Chart
    },
    data() {
        return {
            start_chart: false,
            
            chartOptions: {
                title:{
                    text: null
                },
                legend: {
                    enabled: false
                },
                chart: {
                    type: 'area',
                    polar: true
                },
                xAxis: {
                    // categories: ['sosbud', 'hankam', 'ideologi', 'ekonomi', 'politik']
                    categories: []
                },
                series: [{
                    type: 'area',
                    name: 'Area',
                    // data: [1.5, 3.3, 2.7, 4.1, 3]
                    data: []
                }],
            },
        }
    },
    computed: {
        ...mapState('actor', [
            'status_detail',
            // 'detail',
            'status_motive_agenda',
            'motive_agenda',
        ]),
    },
    watch: {
        status_detail(newVal, oldVal) {
            if (newVal !== 'loading' && oldVal === 'loading') {
                this.getData();
            }
        },
        motive_agenda(newVal) {
            if (newVal && Object.keys(newVal).length > 0)
                this.startChart();
        },
    },
    methods: {
        getData() {
            if (this.status_detail !== 'loading')
                this.$store.dispatch('actor/getMotiveAgenda');
        },
        startChart() {
            let data_chart = this.motive_agenda;
            delete data_chart.average;

            let categories = [];
            let series = [];

            for (const index in data_chart) {
                categories.push(index);
                series.push(data_chart[index]);
            }

            this.chartOptions.xAxis.categories = categories;
            this.chartOptions.series[0].data = series;

            this.start_chart = true;
        },
    },
    async mounted() {
        if (this.status_detail === 'loading') {
            let status_motive_agenda = this.status_motive_agenda;
            status_motive_agenda.status = 'loading';
            await this.$store.commit('actor/setStatusMotiveAgenda', status_motive_agenda);
        }

        this.getData();
    },
}
</script>