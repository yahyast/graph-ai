<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadOrganization
        .content-bdi__body
            .grid.grid-cols-2.gap-8
                .block
                    .flex.items-center.justify-between
                        h2.subheading(style="padding-bottom:0px") Aktivitas
                        //- b-button(text="Tambah Aktivitas" text_icon_left="file-plus" kind="primary" @click.native="openActivity = !openActivity")
                        b-button(
                            v-if="status_detail != 'loading'"
                            text="Tambah Aktivitas"
                            text_icon_left="file-plus"
                            kind="primary"
                            @click.native="openModalActivity()"
                        )
                    .container-timeline(v-if="status_detail === 'loading'")
                        .p-20.relative.text-center.w-full.h-full
                            b-loading(text="Memuat data aktivitas")
                    .container-timeline.relative(v-else)
                        .box-timeline.scrollbox(v-if="detail.organization_activity && detail.organization_activity.length > 0")
                            .box-timeline__inner.scrollbox-container
                                .timeline(v-for="item in detail.organization_activity")
                                    .timeline__time: span {{ datetimeFormat(item.activity_date) }}
                                    .timeline__content: p {{ trimmedStr(item.notes) }}
                        .absolute.text-center.w-full.h-full.flex.items-center.justify-center(v-else)
                            .block
                                b-icon.mb-4(name="info" size="2x")
                                p Belum ada aktivitas
                    //- .border.mt-8.border-gray-300.rounded
                        .box-timeline.scrollbox
                            .box-timeline__inner.scrollbox-container
                                .timeline(v-for="item in timeline")
                                    .timeline__time: span {{ item.time }}
                                    .timeline__content: p {{ item.content }}
                .block
                    h2.subheading Tokoh &amp; Organisasi Terkait
                    .card-graph.mt-5
                        template(v-if="status_detail==='loading'")
                            b-loading.b-loading-inherit(
                                text="Memuat data"
                            )
                        .box-network(v-else)
                            network.box-network__canvas(
                                ref="network"
                                :nodes="nodes"
                                :edges="edges"
                                :options="options"
                            )

            .py-10
                template(v-if="status_list_trend.status != 'loading' && list_trend.doc && list_trend.doc.length == 0")
                    .card-bg-theme.p-4.rounded
                        .w-full.h-80.flex.items-center.justify-center
                            .block
                                b-icon.mb-4(name="info" size="2x")
                                p Belum ada Trend
                template(v-else)
                    h2.subheading Trend Terkait

                    .bdi-trend
                        //- sidebar list of trend founded
                        .bdi-trend__sidebar.scrollbox
                            .bdi-trend-sidebar.bdi-trend-sidebar--organization.scrollbox-container
                                //- loading the trends first
                                b-loading.b-loading-inherit.mt-2(
                                    v-if="status_list_trend.status === 'loading'"
                                    text="Memuat informasi trend"
                                    kind="circular"
                                )
                                //- trends loaded
                                template(v-else)
                                    .w-full(v-if="list_data_topic.length > 0")
                                        button.list-trend(
                                            v-for="(item, key) in list_data_topic"
                                            @click="selectTopic(item, key)"
                                            :class="key == active_topic? 'active':''"
                                            v-tooltip="item.label"
                                        ) {{ item.label }}

                                        //- show more trend
                                        template.w-full.py-6.text-center(v-if="list_data_topic.length > 0 || status_list_trend.status === 'loading'")
                                            .relative(v-if="status_list_trend.status === 'loading'")
                                                b-loading(text="Menampilkan trend lainnya")

                                            template(v-else)
                                                b-button(v-if="list_trend.pagination && list_trend.pagination.hasNext && list_trend.pagination.hasNext === true" text="Tampilkan trend lainnya" kind="tertiary" @click.native="loadMore()")

                        //- Content for media
                        .bdi-trend__content
                            .bdi-trend-content.bdi-trend-content--media-on-organization(
                                :class="{'bdi-trend-content--open-calendar' : floatingCalendar}"
                            )
                                TopicMedia

                        //- Content for tweets
                        .bdi-trend__sidebar
                            .bdi-trend-sidebar.bdi-trend-sidebar--twitter-on-organization
                                TopicTwitter

                    //- DECKY INI YANG SEBELUMNYA
                    //- .box-activity-topic
                        .box-activity-topic__sidebar
                            .links-topic.scrollbox
                                .sidebar-activity-topic.scrollbox-container
                                    b-loading.b-loading-inherit.mt-2(
                                        v-if="status_list_trend.status === 'loading'"
                                        text="Memuat data trend"

                                    )
                                    template(v-else)
                                        //- template(v-if="list_data_topic.length > 0")
                                        ul.box-topic(v-if="list_data_topic.length > 0")
                                            li(
                                                v-for="(item, key) in list_data_topic"
                                                @click="selectTopic(item, key)"
                                                :class="key == active_topic? 'active':''"
                                                v-tooltip="item.label"
                                            ) {{ item.label }}
                                            //- li.flex-grow.text-left.truncate(v-for="item in list_data_topic") {{ item.label }}
                                            //- routerLink(v-for="item in list_data_topic" :to="'/manajemen/isu/'+ item.id +'/'+ encodeDetailData(item)") {{ item.label }}
                                        .block.text-center.mt-5.mb-5(v-if="list_data_topic.length > 0 || status_list_trend.status === 'loading'")
                                            .relative(v-if="status_list_trend.status === 'loading'")
                                                b-loading(text="Memuat data" kind="")

                                            template(v-else)
                                                b-button(v-if="list_trend.pagination && list_trend.pagination.hasNext && list_trend.pagination.hasNext === true" text="Lainnya..." kind="tertiary" @click.native="loadMore()")
                                        //- .text-center.mt-5.mb-5(v-else)
                                        //-     span Trend tidak ditemukan.
                                        //- routerLink( v-for="item in topicActivity" :to="item.url") {{ item.name }}
                        .box-activity-topic__content
                            .organization-topic
                                .organization-topic__media
                                    TopicMedia
                                .organization-topic__tweet
                                    TopicTwitter

        //- open popup
        .modal(v-bind:class="{'modal--show' : openActivity}")
            .modal-overlay
            form.modal-container(@submit.prevent="submit($event)")
                .modal-container__header
                    h2 Tambah Aktivitas
                    b-button(icon_only="x" @click.native="openActivity = !openActivity" type="button")
                .modal-container__body
                    .p-4.pb-0
                        .field.mb-4
                            input.field-style(
                                type="date"
                                placeholder="Pilih Waktu"
                                v-model="model.activity_date"
                            )
                            span.field-message.text-red-500(v-if="$v.model.activity_date.$error") Tanggal dibutuhkan.
                            //- span.field-message.text-red-500(v-if="error_activity_date !== ''") {{ error_activity_date }}
                        .field.mb-4
                            textarea.field-style(
                                placeholder="Tulis Keterangan disini"
                                style="min-height:200px"
                                v-model="model.notes"
                            )
                            span.field-message.text-red-500(v-if="$v.model.notes.$error") Keterangan dibutuhkan.
                            //- span.field-message.text-red-500(v-if="error_notes !== ''") {{ error_notes }}
                .modal-container__footer
                    b-button(text="Simpan" kind="primary" type="submit")
        //- open popup
        //- .modal(v-bind:class="{'modal--show' : openActivity}")
            .modal-overlay
            .modal-container
                .modal-container__header
                    h2 Tambah Aktivitas
                    b-button(icon_only="x" @click.native="openActivity = !openActivity")
                .modal-container__body
                    .p-4.pb-0
                        .field.mb-4
                            input.field-style(type="date" value="")
                        .field.mb-4
                            textarea.field-style(placeholder="Tulis Keterangan disini" style="min-height:200px")
                .modal-container__footer
                    b-button(text="Simpan" kind="primary" @click.native="openActivity = !openActivity")

</template>

<script>

import HeadOrganization from '@/pages/organization/HeadOrganization';
import TopicMedia from '@/pages/management/Media';
import TopicTwitter from '@/pages/management/Twitter';
import {mapState} from 'vuex';
import {required} from 'vuelidate/lib/validators';

export default {
    name: 'BehaviorOfOrganization',
    components: {
        HeadOrganization,
        TopicMedia,
        TopicTwitter,
    },
    data() {
        return {
            openActivity: false,
            floatingCalendar: false,
            timeline: [
                {
                    time: '16 Juni 20201',
                    content: 'Test Update 2',
                },
                {
                    time: '29-30 Maret 2021',
                    content: 'Bentrok fisik antara Angkatan Muda Partai Golkar (AMPG) kubu Yorrys dan kubu Aburizal Bakrie',
                },
                {
                    time: '29-30 Maret 2021',
                    content: 'Bentrok fisik antara Angkatan Muda Partai Golkar (AMPG) kubu Yorrys dan kubu Aburizal Bakrie',
                },
                {
                    time: '29-30 Maret 2021',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                },
                {
                    time: '29-30 Maret 2021',
                    content: 'Bentrok fisik antara Angkatan Muda Partai Golkar (AMPG) kubu Yorrys dan kubu Aburizal Bakrie',
                },
            ],
            // nodes: [
            //     {
            //         id: 1,
            //         label: 'Tokoh 1',
            //         shape: 'circle',
            //         color: 'rgb(21, 91, 240)',
            //         font: {color: 'white', size: 12},
            //     },
            //     {
            //         id: 2,
            //         label: 'Tokoh 2',
            //         shape: 'circle',
            //         color: 'rgb(21, 91, 240)',
            //         font: {color: 'white', size: 12},
            //     },
            //     {
            //         id: 3,
            //         label: 'Tokoh 3',
            //         shape: 'circle',
            //         color: 'rgb(21, 91, 240)',
            //         font: {color: 'white', size: 12},
            //     },
            //     {
            //         id: 4,
            //         label: 'Tokoh 4',
            //         shape: 'circle',
            //         color: 'rgb(21, 91, 240)',
            //         font: {color: 'white', size: 12},
            //     },
            //     {
            //         id: 5,
            //         label: 'Tokoh 5',
            //         shape: 'circle',
            //         color: 'rgb(21, 91, 240)',
            //         font: {color: 'white', size: 12},
            //     },
            //     {
            //         id: 6,
            //         label: 'Tokoh 6',
            //         shape: 'circle',
            //         color: 'rgb(21, 91, 240)',
            //         font: {color: 'white', size: 12},
            //     },
            // ],
            nodes: [],
            // edges: [
            //     {from: 1, to: 4},
            //     {from: 2, to: 4},
            //     {from: 3, to: 4},
            //     {from: 5, to: 4},
            //     {from: 5, to: 6},
            // ],
            edges: [],
            options: {
                nodes: {
                    borderWidth: 0,
                    widthConstraint: {
                        maximum: 150,
                    },
                },
                edges: {
                    color: 'rgb(21, 91, 240)',
                },
            },
            model: {
                activity_date: null,
                notes: null,
            },
            list_data_topic: [],
            limit: 100,
            page: 1,
            keyword: '',
            timeout: null,

            active_topic: null,
        };
    },
    validations: {
        model: {
            activity_date: {
                required,
            },
            notes: {
                required,
            },
        },
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        ...mapState('organization', [
            'status_detail',
            'detail',
            'status_related_organizations',
            'related_organizations',
        ]),
        ...mapState('trend', [
            'status_list_trend',
            'list_trend',
        ]),
        // ...mapState('actor', {
        //     related_figures: 'related_figures',
        //     status_related_figures: 'status_related_figures',
        // }),
    },
    watch: {
        detail(newVal) {
            // if (this.nodes.id < 1) {
            try {
                const nodesTmp = {
                    id: 0,
                    label: newVal.name,
                    shape: 'circle',
                    color: '#dc2626',
                    font: {color: 'white', size: 12},
                };
                this.nodes.push(nodesTmp);
            } catch (error) {
                console.log(error);
            }
            // }
        },
        status_detail(newVal, oldVal) {
            if (newVal !== 'loading' && oldVal === 'loading') {
                // this.getData();
                // get Related ORG
                this.$store.dispatch('organization/getRelatedOrganizations', [(this.detail.name?this.detail.name:null)]);
            }
        },
        related_organizations(newVal) {
            if (newVal.length > 0) {
                for (let i = 0; i < newVal.length; i++) {
                    const clr = 'rgb(21, 91, 240)';
                    if (newVal[i].class === 'ORG') {
                        clr= 'rgb(17, 159, 161)';
                    }
                    const nodesLength = this.nodes.length;
                    const nodesTmp = {
                        id: nodesLength+1,
                        label: newVal[i].label,
                        shape: 'circle',
                        color: clr,
                        font: {color: 'white', size: 12},
                    };
                    const edgesTmp = {
                        from: nodesLength+1,
                        to: 0,
                    };
                    this.nodes.push(nodesTmp);
                    this.edges.push(edgesTmp);
                }
            }
        },

        list_trend(newVal) {
            if (newVal && newVal.doc && newVal.doc.length > 0) {
                for (let i = 0; i < newVal.doc.length; i++) {
                    this.list_data_topic.push(newVal.doc[i]);
                }
                if (this.page == 1) {
                    this.active_topic=0;
                    Event.$emit('getMediaOnDetail', this.encodeDetailData(newVal.doc[0]));
                }
            }
        },
    },
    methods: {
        selectTopic(data, key) {
            if (key !== this.active_topic) {
                this.active_topic=key;
                Event.$emit('getMediaOnDetail', this.encodeDetailData(data));
            }
        },
        setEmptyModel(all=true) {
            this.model = {
                activity_date: null,
                notes: null,
            };
            // for (let key in Object.keys(this.model)) {
            //     if (all === true)
            //         this.model[Object.keys(this.model)[key]] = '';
            // }
        },
        openModalActivity() {
            this.openActivity = !this.openActivity;
            this.setEmptyModel(true);
        },
        reset(direct=false) {
            this.openActivity = false;
            // this.setEmptyModel(false);
            this.setEmptyModel(true);
            // reset vuelidate
            // this.$nextTick(() => { this.$v.$reset(); });
            // this.setErrors(true);
        },
        loadMore() {
            this.page += 1;
            this.getData();
        },
        async getData(reset=false) {
            if (this.status_detail !== 'loading') {
                await this.reset(true);
            }
            Event.$emit('getDataActor');
            if (reset) {
                this.list_data_topic = [];
                this.page = 1;
            }
            const stateNews = {
                status: 'loading',
                cancel: null,
                code: null,
            };
            this.$store.commit('news/setStatusListNews', stateNews);
            this.$store.dispatch('trend/getListTrend', [this.limit, this.page, '', this.id])
                .catch((resp) => {
                    stateNews.status = false;
                    this.$store.commit('news/setStatusListNews', stateNews);
                });
        },
        submit(e) {
            e.preventDefault();
            this.$v.$touch();

            if (this.$v.model.$invalid) {
                for (const key in Object.keys(this.$v.model)) {
                    const input = Object.keys(this.$v.model)[key];
                    if (input.includes('$')) return false;
                    if (this.$v.model[input].$error) {
                        break;
                    }
                }
                return;
            }
            Event.$emit('showLoading', true);

            const modelData = {organization_activity: this.detail.organization_activity};
            modelData.organization_activity.unshift(this.model);
            modelData.organization_activity = JSON.stringify(modelData.organization_activity);

            // update only
            this.$store.dispatch('organization/update', [this.id, modelData, 'activities'])
                .then((resp) => {
                    if (resp.result === 'success') {
                        this.$swal.fire({
                            icon: 'success',
                            // title: 'Tetap dihalaman ini?',
                            title: 'Data berhasil disimpan.',
                            confirmButtonText: 'Kembali',
                            // confirmButtonColor: '#DD6B55',
                            confirmButtonColor: '#5a80e7',
                            showCancelButton: false,
                            // cancelButtonText: 'Tidak',
                            allowOutsideClick: false,
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    this.getData(true);
                                } else {
                                    this.$router.push({path: '/bdi/tokoh'});
                                }

                                Event.$emit('success', 'Data berhasil diperbarui!');
                            });
                    } else {
                        Event.$emit('error');
                    }
                });
        },
    },
    mounted() {
        // if (this.status_detail === 'loading') {
        //     let status_related_figures = this.status_related_figures;
        //     status_related_figures.status = 'loading';
        //     await this.$store.commit('actor/setStatusRelatedFigures', status_related_figures);
        // }
        this.getData();
        if (this.status_detail !== 'loading') {
            if (this.nodes.length < 1) {
                const nodesTmp = {
                    id: 0,
                    label: this.detail.name,
                    shape: 'circle',
                    color: '#dc2626',
                    font: {color: 'white', size: 12},
                };
                this.nodes.push(nodesTmp);
            }
            // get Related ORG
            this.$store.dispatch('organization/getRelatedOrganizations', [(this.detail.name?this.detail.name:null)]);
        }
    },
    created() {
        Event.$on('openFloatingCalendar', () => {
            this.floatingCalendar = !this.floatingCalendar;
        });
    },
};
</script>

<style lang="sass">

</style>
