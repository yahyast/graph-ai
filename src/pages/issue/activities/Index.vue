<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadIssue
        .content-bdi__body
            .grid.grid-cols-2.gap-8.hidden
                .block
                    .flex.items-center.justify-between
                        h2.subheading(style="padding-bottom:0px") Aktivitas
                        b-button(text="Tambah Aktivitas" text_icon_left="file-plus" kind="primary" @click.native="openActivity = !openActivity")

                    .container-timeline
                        .box-timeline.scrollbox
                            .box-timeline__inner.scrollbox-container
                                .timeline(v-for="item in timeline")
                                    .timeline__time: span {{ item.time }}
                                    .timeline__content: p {{ item.content }}
                .block
                    h2.subheading Jejaring Sosial
                    .card-graph.mt-5
                        .box-network
                            network.box-network__canvas(
                                ref="network"
                                :nodes="nodes"
                                :edges="edges"
                                :options="options"
                            )

            .pb-10
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
                            .bdi-trend-sidebar.p-2.scrollbox-container
                                template(v-if="list_data_topic.length > 0")
                                    .w-full(v-if="list_data_topic.length > 0")
                                        button.list-trend(
                                            v-for="(item, key) in list_data_topic"
                                            @click="selectTopic(item, key)"
                                            :class="key == active_topic? 'active':''"
                                            v-tooltip="item.label"
                                        ) {{ item.label }}

                        //- content
                        .bdi-trend__content
                            //- all twwets
                            .bdi-trend-content
                                .trend-based-issue
                                    .trend-based-issue__header
                                        strong Tweets
                                    .trend-based-issue__body.scrollbox
                                        .issue-tweets.scrollbox-container
                                            PostTweet.w-full(
                                                v-for="item in list_data_tweet"
                                                :photo="item.extra_author_attributes.photo"
                                                :username="'@'+item.extra_author_attributes.username"
                                                :date="datetimeFormat(item.created_at,'DD-MM-YYY HH:mm:ss', 'DD/MM/YY')"
                                                :content="item.content"
                                                :key="item.username"
                                            )

                                        template(v-if="list_data_tweet.length > 0 || status_list_tweet.status == 'loading'")
                                            .relative.mt-10(v-if="status_list_tweet.status === 'loading'")
                                                b-loading(text="Memuat tweets lainnya..." kind="circular")
                                            template(v-else)
                                                .flex.items-center.justify-center.w-full.py-4.pt-0.pb-4
                                                    b-button(
                                                        kind="tertiary"
                                                        text="Muat tweets lainnya"
                                                        size="small"
                                                        v-if="list_data_tweet.length < parseInt(list_tweet.total_item)"
                                                        @click.native="loadMoreTweet()"
                                                    )
                                        .absolute.w-full.h-full.inset-0.flex.items-center.justify-center(v-else)
                                            .block
                                                b-icon.mb-4(name="info" size="2x")
                                                p Tweets tidak ditemukan.

                                    .trend-based-issue__footer
                                        | Menampilkan 1 - {{ list_data_tweet.length }} dari {{ list_tweet.total_item }} Tweets

                        //- count the tweets
                        .bdi-trend__sidebar
                            .bdi-trend-sidebar
                                .trend-based-issue
                                    .trend-based-issue__header
                                        strong Isu Teramai
                                    .trend-based-issue__body.scrollbox
                                        .issue-tweets.scrollbox-container
                                            template(v-if="status_list_trending.status === 'loading'")
                                                b-loading.b-loading-inherit(text="Memuat isu teramai..." kind="circular")
                                            .popular-issue(v-else-if="list_trending && list_trending.items && list_trending.items.length > 0")
                                                button.popular-issue__item(v-for="item in list_trending.items" @click="getDetailBoxTrending(item.title)")
                                                    strong.block.mb-05 {{ item.title}}
                                                    span.block.mb-2 {{ numberWithDot(item.count) }}
                                                    .bar( :style="'width:' + item.count / maxCount * 100 + '%'")
                                                    //- .bar( :style="'width:' + ((item.count / maxCount * 95)+5) + '%'")
                                                //- .flex.items-center.justify-center.w-full.py-4.pt-0.pb-4
                                                    b-button(kind="tertiary" text="Muat Cutian Lainnya" size="small")
                                            .absolute.w-full.h-full.inset-0.flex.items-center.justify-center(v-else)
                                                .block
                                                    b-icon.mb-4(name="info" size="2x")
                                                    p Isu Teramai tidak ditemukan.

            //-  DECKY INI FILE LAMA
            //- .pb-10.hidden
                h2.subheading Trend Terkait
                .box-activity-topic
                    .box-activity-topic__sidebar
                        .links-topic.scrollbox
                            .sidebar-activity-topic.scrollbox-container

                                //- routerLink( v-for="item in topicActivity" :to="item.url") {{ item.name }}
                                template(v-if="list_data_topic.length > 0")
                                    ul.box-topic(v-if="list_data_topic.length > 0")
                                        li(
                                            v-for="(item, key) in list_data_topic"
                                            @click="selectTopic(item, key)"
                                            :class="key == active_topic? 'active':''"
                                            v-tooltip="item.label"
                                        ) {{ item.label }}
                    .box-activity-topic__content
                        .topic-issue
                            .topic-issue__tweet
                                .topic-issue-content
                                    .topic-issue-content__header.flex.items-center.justify-between
                                        strong Tweets
                                        span.text-xs Menampilkan 1 - {{ numberWithDot(list_data_tweet.length) }} dari {{ numberWithDot(list_tweet.total_item) }} Tweets
                                    .topic-issue-content__body.scrollbox
                                        .issue-content.scrollbox-container
                                            PostTweet.w-full(
                                                v-for="item in list_data_tweet"
                                                :photo="item.extra_author_attributes.photo"
                                                :username="'@'+item.extra_author_attributes.username"
                                                :date="datetimeFormat(item.created_at,'DD-MM-YYY HH:mm:ss', 'DD/MM/YY')"
                                                :content="item.content"
                                                :key="item.username"
                                            )
                                            //- .flex.items-center.justify-center.w-full.py-4.pt-0.pb-4
                                                b-button(kind="tertiary" text="Muat Cutian Lainnya" size="small")

                                        template(v-if="list_data_tweet.length > 0 || status_list_tweet.status == 'loading'")
                                            .relative.mt-10(v-if="status_list_tweet.status === 'loading'")
                                                b-loading(text="Memuat data..." kind="circular")
                                            template(v-else)
                                                .flex.items-center.justify-center.w-full.py-4.pt-0.pb-4
                                                    b-button(
                                                        kind="tertiary"
                                                        text="Muat Tweets Lainnya"
                                                        size="small"
                                                        v-if="list_data_tweet.length < parseInt(list_tweet.total_item)"
                                                        @click.native="loadMoreTweet()"
                                                    )
                                                //- .count-twitter Menampilkan 1 - {{ numberWithDot(list_data_tweet.length) }} dari {{ numberWithDot(list_tweet.total_item) }} Tweets
                                        .absolute.w-full.h-full.inset-0.flex.items-center.justify-center(v-else)
                                            .block
                                                b-icon.mb-4(name="info" size="2x")
                                                p Tweets tidak ditemukan.
                            .topic-issue__trending.relative
                                .topic-issue-content
                                    .topic-issue-content__header
                                        strong Isu Teramai
                                    .topic-issue-content__body.scrollbox
                                        .issue-content.scrollbox-container
                                            template(v-if="status_list_trending.status === 'loading'")
                                                b-loading.b-loading-inherit(text="Memuat data..." kind="circular")
                                            .popular-issue(v-else-if="list_trending && list_trending.items && list_trending.items.length > 0")
                                                button.popular-issue__item(v-for="item in list_trending.items" @click="getDetailBoxTrending(item.title)")
                                                    strong.block.mb-05 {{ item.title}}
                                                    span.block.mb-2 {{ numberWithDot(item.count) }}
                                                    .bar( :style="'width:' + item.count / maxCount * 100 + '%'")
                                                    //- .bar( :style="'width:' + ((item.count / maxCount * 95)+5) + '%'")
                                                .flex.items-center.justify-center.w-full.py-4.pt-0.pb-4
                                                    b-button(kind="tertiary" text="Muat Cutian Lainnya" size="small")
                                            .absolute.w-full.h-full.inset-0.flex.items-center.justify-center(v-else)
                                                .block
                                                    b-icon.mb-4(name="info" size="2x")
                                                    p Isu Teramai tidak ditemukan.
                            //- .topic-issue__detail
                                p helo

        //- open popup
        .modal(v-bind:class="{'modal--show' : openActivity}")
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

import {mapState} from 'vuex';
import HeadIssue from '@/pages/issue/HeadIssue';
import snapShotAccount from '@/components/SnapShot';
import PostTweet from '@/components/PostTweet';

export default {
    name: 'ActivitiesOfIssue',
    components: {
        HeadIssue,
        snapShotAccount,
        PostTweet,
    },
    data() {
        return {
            openActivity: false,
            loadingTweeter: false,
            maxCount: 700,
            activeSectionIssue: false,
            boxPopularIssue: false,
            activeSectionTweets: true,
            boxTweets: true,

            // detail account
            detailBoxAccount: true,
            accountLoaded: true,

            // detail Issue
            detailBoxIssue: false,

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
            topicActivity: [
                {
                    name: 'Nama Topik ABC',
                    url: '/organisasi/name/aktivitas/isu-1',
                },
                {
                    name: 'Topik Related 1',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 2',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 3',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 4',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 5',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 6',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 7',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 8',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 9',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 10',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 11',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 12',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 13',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 14',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 15',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 16',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 17',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 18',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 19',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 20',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 21',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 22',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
                {
                    name: 'Topik Related 23',
                    url: '/organisasi/name/aktivitas/isu-2',
                },
                {
                    name: 'Topik Related 24',
                    url: '/organisasi/name/aktivitas/isu-3',
                },
            ],
            relatedTweetsTopic: [
                {
                    username: '@pandji',
                    content: 'Rasanya gue ga pernah liat polisi minta maaf seperti ini sebelumnya. Gestur yg baik. Gotta give credit when credit is due.',
                    date: '11/12/21',
                    avatar: 'https://pbs.twimg.com/profile_images/1341056153468354574/kcfQnHeI_400x400.jpg',
                },
                {
                    username: '@Jennings',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
                },
                {
                    username: '@Bishop',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                },
                {
                    username: '@Jackson',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
                },
                {
                    username: '@Stanley',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
                },
                {
                    username: '@Jennings',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
                },
                {
                    username: '@Bishop',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                },
                {
                    username: '@Jackson',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
                },
                {
                    username: '@Stanley',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
                },
                {
                    username: '@Jennings',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
                },
                {
                    username: '@Bishop',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                },
                {
                    username: '@Jackson',
                    content: 'Want to create your own customized data generator for your application? Check out our other service RandomAPI!',
                    date: '11/12/21',
                    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
                },
            ],
            popularIssue: [
                {
                    keyword: 'Putri KW',
                    count: 700,
                },
                {
                    keyword: '#KuotaSultanHargaTeman',
                    count: 550,
                },
                {
                    keyword: 'Ginting',
                    count: 400,
                },
                {
                    keyword: 'Cardi B',
                    count: 350,
                },
                {
                    keyword: '#PSSday',
                    count: 200,
                },
                {
                    keyword: 'Messi',
                    count: 150,
                },
                {
                    keyword: 'PSG',
                    count: 120,
                },
                {
                    keyword: 'Real Madrid',
                    count: 110,
                },
                {
                    keyword: '#WhatIf',
                    count: 100,
                },
                {
                    keyword: 'Sheriff',
                    count: 90,
                },
                {
                    keyword: 'Zidane',
                    count: 20,
                },
                {
                    keyword: 'Benzema',
                    count: 20,
                },
            ],
            following: [
                {
                    url: 'tw.com/@ernestprakasa',
                    account: '@ernestprakasa',
                },
                {
                    url: 'tw.com/@Adriandhy',
                    account: '@Adriandhy',
                },
                {
                    url: 'tw.com/@Arie_Kriting',
                    account: '@Arie_Kriting',
                },
                {
                    url: 'tw.com/@adjisdoaibu',
                    account: '@adjisdoaibu',
                },
                {
                    url: 'tw.com/@adjisdoaibu',
                    account: '@adjisdoaibu',
                },
                {
                    url: 'tw.com/@solehsolihin',
                    account: '@solehsolihin',
                },
                {
                    url: 'tw.com/@anggasasongko',
                    account: '@anggasasongko',
                },
                {
                    url: 'tw.com/@gilbhas',
                    account: '@gilbhas',
                },
                {
                    url: 'tw.com/@MuhadklyAcho',
                    account: '@MuhadklyAcho',
                },
                {
                    url: 'tw.com/@aparatmati',
                    account: '@aparatmati',
                },
                {
                    url: 'tw.com/@_BangFu',
                    account: '@_BangFu',
                },
                {
                    url: 'tw.com/@vngnc',
                    account: '@vngnc',
                },
                {
                    url: 'tw.com/@davidbayu',
                    account: '@davidbayu',
                },
                {
                    url: 'tw.com/@jokoanwar',
                    account: '@jokoanwar',
                },
                {
                    url: 'tw.com/@aniesbaswedan',
                    account: '@aniesbaswedan',
                },
                {
                    url: 'tw.com/@jokowi',
                    account: '@jokowi',
                },
                {
                    url: 'tw.com/@prabowo',
                    account: '@prabowo',
                },
                {
                    url: 'tw.com/@RidwanKamil',
                    account: '@RidwanKamil',
                },
                {
                    url: 'tw.com/@radityaDika',
                    account: '@radityaDika',
                },
                {
                    url: 'tw.com/@abandaHerrman',
                    account: '@abandaHerrman',
                },
                {
                    url: 'tw.com/@testingBotPandji',
                    account: '@testingBotPandji',
                },
                {
                    url: 'tw.com/@babecabita',
                    account: '@babecabita',
                },
                {
                    url: 'tw.com/@PeduliLundungi',
                    account: '@PeduliLundungi',
                },
            ],
            list_data_topic: [],
            limit: 9,
            page: 1,
            keyword: '',
            timeout: null,

            active_topic: null,

            list_data_tweet: [],
            limit_tweet: 20,
            page_tweet: 1,

        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        ...mapState('trend', [
            'status_list_trend',
            'list_trend',
        ]),
        ...mapState('medsos', [
            'status_list_trending',
            'status_list_tweet',
            'list_trending',
            'list_tweet',
        ]),
    },
    methods: {
        selectTopic(data, key) {
            // if (key !== this.active_topic) {
            this.active_topic=key;
            this.slugTopic = data.slug;
            this.getDataTweet(this.slugTopic, true);
            this.getDataTrending();
            // }
        },
        loadMoreTweet() {
            this.page_tweet += 1;
            this.getDataTweet(this.slugTopic);
        },
        getDataTweet(slug, reset=false) {
            if (reset) {
                this.list_data_tweet = [];
                this.page_tweet = 1;
            }
            // get list tweet
            this.$store.dispatch('medsos/getListTweet', [this.limit_tweet, this.page_tweet, '', '', slug] );
        },
        getDataTrending() {
            // get trending
            this.$store.dispatch('medsos/getListTrending', []);
        },
        getData(reset=false) {
            if (reset) {
                this.list_data_topic = [];
                this.page = 1;
            }
            this.$store.dispatch('trend/getListTrend', [this.limit, this.page, '', this.id]);
        },
    },
    watch: {
        list_trend(newVal) {
            // console.log(newVal)
            if (newVal && newVal.doc && newVal.doc.length > 0) {
                for (let i = 0; i < newVal.doc.length; i++) {
                    this.list_data_topic.push(newVal.doc[i]);
                }
                if (this.page == 1) {
                    this.active_topic=0;
                    this.slugTopic = newVal.doc[0].slug;
                    this.getDataTweet(this.slugTopic, true);
                    this.getDataTrending();
                }
            }
        },
        list_trending(newVal) {
            if (newVal.items && newVal.items.length > 0) {
                this.maxCount = newVal.items[0].count;
            }
        },
        list_tweet(newVal) {
            if (newVal.items && newVal.items.length > 0) {
                for (let i = 0; i < newVal.items.length; i++) {
                    this.list_data_tweet.push(newVal.items[i]);
                }
            }
        },
    },
    mounted() {
        this.getData();
    },
};
</script>

<style lang="sass">
    .topic-issue
        @apply grid grid-cols-5 w-full relative
        &__tweet
            @apply col-span-3 border-r
            border-color: var(--border-theme-darkness)
        &__trending
            @apply col-span-2

        .topic-issue-content
            &__header
                @apply p-4
            &__body
                height: 70vh
                @apply overflow-auto

        &__detail
            @apply absolute inset-0 w-full h-full bg-white z-10 hidden
</style>
