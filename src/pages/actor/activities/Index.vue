<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadActor
        .content-bdi__body
            .grid.grid-cols-1.gap-8
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
                            b-loading(text="Memuat data")
                    .container-timeline.relative(v-else)
                        .box-timeline.scrollbox(v-if="detail.activity && detail.activity.length > 0")
                            .box-timeline__inner.scrollbox-container
                                .timeline(v-for="item in detail.activity")
                                    .timeline__time: span {{ datetimeFormat(item.activity_date) }}
                                    .timeline__content: p {{ trimmedStr(item.notes) }}
                        .absolute.text-center.w-full.h-full.flex.items-center.justify-center(v-else)
                            .block
                                b-icon.mb-4(name="info" size="2x")
                                p Belum ada aktivitas
                .block.hidden
                    h2.subheading Tokoh & Organisasi Terkait
                    .card-graph.mt-5
                        .box-network
                            network.box-network__canvas(
                                ref="network"
                                :nodes="nodes"
                                :edges="edges"
                                :options="options"
                            )

            .py-10
                h2.subheading Trend Terkait
                .box-activity-topic-actor
                    template(v-if="status_detail_profile.status === 'loading'")
                        b-loading.b-loading-inherit(kind="circular")
                    //- template(v-else-if="Object.keys(detail_following).length > 0")
                    .box-activity-topic-actor__snapshot(v-else-if="Object.keys(detail_following).length > 0")
                        snapShotAccount.snapshot--align-left(
                            :photo="detail_following.photo",
                            :name="detail_following.name",
                            :followers="detail_following.followers_count",
                            :location="detail_following.location",
                            :link="detail_following.url",
                            :bio="detail_following.description"
                        )
                    .flex.items-center.justify-center.w-full.p-4(v-else)
                        span Detail profile tidak ditemukan.
                    .box-activity-topic-actor__tweets
                        .account-tweet
                            .account-tweet__header.p-4(v-if="list_data_topic.length > 0")
                                //- .mr-4
                                    strong @Pandji
                                .field.field--icon-right.w-full
                                    select.field-style
                                        option(v-for="item in list_data_topic" @change="changeTopic(item.slug)") {{ item.label }}
                                    //-     option Topik B
                                    //-     option Topik C
                                    //-     option Topik D
                                    //-     option Topik E
                                    span.icon-field
                                        b-icon(name="chevron-down")
                                    //- v-select(
                                        :options="paginated"
                                        :filterable="false"
                                        @open="onOpen"
                                        @close="onClose"
                                        @search="(query) => (search = query)"
                                    //- ):
                                    //-     template#list-footer
                                    //-         li(v-show="hasNextPage" ref="load" class="loader") Loading more options...
                                    //- select.field-style()
                                    //-     option Nama TopiK ABC
                                    //-     option Topik B
                                    //-     option Topik C
                                    //-     option Topik D
                                    //-     option Topik E
                                    //- span.icon-field
                                    //-     b-icon(name="chevron-down")
                            .account-tweet__body.scrollbox(v-if="list_data_tweet.length > 0")
                                //- .actor-tweet.scrollbox-container
                                    PostTweet.w-full(
                                        v-for="item in relatedTweetsTopic"
                                        :photo="item.avatar"
                                        :key="item.username"
                                        :username="item.username"
                                        :date="item.date"
                                        :content="item.content"
                                    )
                                //- /
                                .actor-tweet.scrollbox-container(v-for="item in list_data_tweet" @click="getDetailBoxAccount(item.extra_author_attributes.username)")
                                    PostTweet(
                                        :photo="item.extra_author_attributes.photo"
                                        :username="'@'+item.extra_author_attributes.username"
                                        :date="datetimeFormat(item.created_at,'DD-MM-YYY HH:mm:ss', 'DD/MM/YY')"
                                        :content="item.content"
                                    )
                            template(v-if="list_data_tweet.length > 0 || status_list_tweet.status == 'loading'")
                                .relative.mt-10(v-if="status_list_tweet.status === 'loading'")
                                    b-loading(text="Memuat data..." kind="circular")
                                template(v-else)
                                    .flex.items-center.justify-center.w-full.p-4
                                        b-button(
                                            kind="tertiary"
                                            text="Muat Tweets Lainnya"
                                            size="small"
                                            v-if="list_data_tweet.length < parseInt(list_tweet.total_item)"
                                            @click.native="loadMoreTweet()"
                                        )
                                    .count-twitter Menampilkan 1 - {{ numberWithDot(list_data_tweet.length) }} dari {{ numberWithDot(list_tweet.total_item) }} Tweets

                            .flex.items-center.justify-center.w-full.p-4(v-else)
                                span Tweets tidak ditemukan.
                                //- /
                    .box-activity-topic-actor__following
                        .account-tweet.account-tweet--following
                            template(v-if="status_detail_following.status === 'loading'")
                                b-loading.b-loading-inherit(kind="circular")
                            template(v-else-if="Object.keys(detail_following).length > 0")
                                .account-tweet__header.p-4
                                    strong Mengikuti {{ detail_following.following_count }} akun
                                .account-tweet__body.scrollbox
                                    .actor-tweet.scrollbox-container
                                        ul.p-4.pb-0
                                            li.py-1.transition-all(v-for="item in detail_following.list_following")
                                                a.link.w-full( :href="item.url" target="_blank"): span {{ item.name }}
                            .flex.items-center.justify-center.w-full.p-4(v-else)
                                span Data Mengikuti tidak ditemukan.


        //- open popup
        .modal(v-bind:class="{'modal--show' : openActivity}")
            .modal-overlay
            form.modal-container(@submit.prevent="submit($event)")
                .modal-container__header
                    h2 Tambah Aktivitas
                    b-button(icon_only="x" @click.native="openActivity = !openActivity" type="button")
                .modal-container__body
                    .p-4.pb-0
                        //- .field.mb-4
                            //- .box-calendar
                            //-     date-range-picker(
                            //-         v-if="dateRange.startDate && dateRange.endDate"
                            //-         ref="picker"
                            //-         v-model="dateRange"
                            //-         @update="pickerUpdate($event)"
                            //-         :locale-data="{ firstDay: 1, format: 'DD MMM YYYY' }"
                            //-         :date-format="dateFormat"
                            //-         :ranges="default_ranges"
                            //-         :autoApply="true"
                            //-         drops="up"
                            //-     )
                            //-         //- opens="right"
                            //-         template(slot="input" slot-scope="picker" style="min-width: 350px;") {{ picker.startDate | date }} - {{ picker.endDate | date }}
                            //-     b-icon(name="calendar")

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

</template>

<script>
import HeadActor from '@/pages/actor/HeadActor';
import snapShotAccount from '@/components/SnapShot';
import PostTweet from '@/components/PostTweet';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import moment from 'moment';
import {mapState} from 'vuex';
import {required} from 'vuelidate/lib/validators';
export default {
    name: 'ActivitiesOfActor',
    components: {
        HeadActor,
        snapShotAccount,
        PostTweet,
        DateRangePicker,
    },
    props: ['id'],
    data() {
        return {
            openActivity: false,
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
                    content: 'Bentrok fisik antara Angkatan Muda Partai Golkar (AMPG) kubu Yorrys dan kubu Aburizal Bakrie',
                },
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
            ],
            nodes: [
                {
                    id: 1,
                    label: 'Tokoh 1',
                    shape: 'circle',
                    color: 'rgb(21, 91, 240)',
                    font: {color: 'white', size: 12},
                },
                {
                    id: 2,
                    label: 'Tokoh 2',
                    shape: 'circle',
                    color: 'rgb(21, 91, 240)',
                    font: {color: 'white', size: 12},
                },
                {
                    id: 3,
                    label: 'Tokoh 3',
                    shape: 'circle',
                    color: 'rgb(21, 91, 240)',
                    font: {color: 'white', size: 12},
                },
                {
                    id: 4,
                    label: 'Tokoh 4',
                    shape: 'circle',
                    color: 'rgb(21, 91, 240)',
                    font: {color: 'white', size: 12},
                },
                {
                    id: 5,
                    label: 'Tokoh 5',
                    shape: 'circle',
                    color: 'rgb(21, 91, 240)',
                    font: {color: 'white', size: 12},
                },
                {
                    id: 6,
                    label: 'Tokoh 6',
                    shape: 'circle',
                    color: 'rgb(21, 91, 240)',
                    font: {color: 'white', size: 12},
                },
            ],
            edges: [
                {from: 1, to: 4},
                {from: 2, to: 4},
                {from: 3, to: 4},
                {from: 5, to: 4},
                {from: 5, to: 6},
            ],
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

            // dateRange: {
            //     // startDate: moment().subtract(6, 'days').toDate(),
            //     startDate: moment().toDate(),
            //     endDate: moment().toDate(),
            // },
            // default_ranges: {
            //     'Today': [moment().toDate(), moment().toDate()],
            //     'Yesterday': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
            //     'Last 7 days': [moment().subtract(6, 'days').toDate(), moment().toDate()],
            //     'Last week': [moment().subtract(1, 'isoWeek').startOf('isoWeek').toDate(), moment().subtract(1, 'isoWeek').endOf('isoWeek').toDate()],
            // },

            model: {
                activity_date: null,
                notes: null,
            },

            list_data_topic: [],
            limit: 100,
            page: 1,
            keyword: '',
            timeout: null,

            list_data_tweet: [],
            limit_tweet: 20,
            page_tweet: 1,

            slugTopic: '',
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
        ...mapState('actor', [
            'status_detail',
            'detail',
        ]),
        ...mapState('trend', [
            'status_list_trend',
            'list_trend',
        ]),
        ...mapState('medsos', [
            'status_list_tweet',
            'status_detail_following',
            'status_detail_profile',
            'list_tweet',
            'detail_following',
            'detail_profile',
        ]),
        // filtered() {
        //     return countries.filter((country) => country.includes(this.search));
        // },
        // paginated() {
        //     return this.filtered.slice(0, this.limit);
        // },
        // hasNextPage() {
        //     return this.paginated.length < this.filtered.length;
        // },
    },
    watch: {
        list_trend(newVal) {
            // console.log(newVal)
            if (newVal && newVal.doc && newVal.doc.length > 0) {
                for (let i = 0; i < newVal.doc.length; i++) {
                    this.list_data_topic.push(newVal.doc[i]);
                }
                // Event.$emit('getMediaOnDetail', this.encodeDetailData(newVal.doc[0]));
                if (this.page_tweet == 1) {
                    this.slugTopic = newVal.doc[0].slug;
                    this.getDataTweet(this.slugTopic);
                }
            }
        },
        list_tweet(newVal) {
            if (newVal.items && newVal.items.length > 0) {
                for (let i = 0; i < newVal.items.length; i++) {
                    this.list_data_tweet.push(newVal.items[i]);
                }
            }
        },
        status_detail(newVal, oldVal) {
            if (newVal !== 'loading' && oldVal === 'loading') {
                const twitter = this.detail.social_media.find((o) => o.media_type === 'twitter');
                const username = this.getUsernameSosmed(twitter.username);
                if (username !== '') {
                    this.getRelatedTopic(username);
                }
            }
        },
    },
    methods: {
        changeTopic(slug) {
            this.slugTopic = slug;
            this.getDataTweet(this.slugTopic, true);
        },
        loadMoreTweet() {
            this.page_tweet += 1;
            this.getDataTweet(this.slugTopic);
        },
        getRelatedTopic(username) {
            if (username.length>0) {
                this.getDataProfile(username);
                this.getDataFollowing(username);
            }
        },
        getDataTweet(slug, reset=false) {
            if (reset) {
                this.list_data_tweet = [];
                this.page_tweet = 1;
            }
            // get list tweet
            this.$store.dispatch('medsos/getListTweet', [this.limit_tweet, this.page_tweet, '', '', slug] );
        },
        getDataProfile(username) {
            // get trending
            this.$store.dispatch('medsos/getDetailProfile', [username] );
        },
        getDataFollowing(username) {
            // get trending
            this.$store.dispatch('medsos/getListFollowing', [username] );
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
        async getData(reset=false) {
            await this.reset(true);
            Event.$emit('getDataActor');
            if (reset) {
                this.list_data_topic = [];
                this.page = 1;
            }
            this.$store.dispatch('trend/getListTrend', [this.limit, this.page, '', this.id]);

            // const username = this.detail.social_media;
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

            const modelData = {activity: this.detail.activity};
            modelData.activity.unshift(this.model);
            modelData.activity = JSON.stringify(modelData.activity);

            // update only
            this.$store.dispatch('actor/update', [this.id, modelData, 'activities'])
                .then((resp) => {
                    if (resp.result === 'success') {
                        this.$swal.fire({
                            icon: 'warning',
                            title: 'Tetap dihalaman ini?',
                            text: 'Data berhasil disimpan.',
                            confirmButtonText: 'Ya',
                            // confirmButtonColor: '#DD6B55',
                            showCancelButton: true,
                            cancelButtonText: 'Tidak',
                            allowOutsideClick: false,
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    this.getData();
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
        this.getData();
        if (this.status_detail !== 'loading') {
            const twitter = this.detail.social_media.find((o) => o.media_type === 'twitter');
            const username = this.getUsernameSosmed(twitter.username);
            if (username !== '') {
                this.getRelatedTopic(username);
            }
        }
    },
    // filters: {
    //     date: function(date) {
    //         return moment(date).locale('id').format('DD MMM YYYY');
    //     },
    // },
    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //         console.log(to);
    //         console.log(from);
    //         console.log(next);
    //         console.log(to.name);
    //         if (to.name === 'ActivitiesOfActor') {
    //             vm.getData();
    //         }
    //     });
    // },
};
</script>

<style lang="sass">

</style>
