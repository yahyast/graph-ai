<template lang="pug">
    .management-twitter(v-bind:class="{'management-twitter--hidden' : MinimizeTwitter}")
        //- b-loading(v-if="status_list_topics.status === 'loading'" text="Menuat data")

        button.btn-toggle-twitter(@click="toggleTwitter()")
            template(v-if="!MinimizeTwitter")
                b-icon(name="chevrons-right")
            template(v-else)
                b-icon(name="chevrons-left")

        //- template(v-if="status_list_trend.status === 'loading'")
            b-loading.mt-10(text="Memuat data")
            .management-twitter__header
            .management-twitter__body.relative
            .detail-twitter(v-bind:class="{'detail-twitter--opened' : false}")
            .detail-twitter(v-bind:class="{'detail-twitter--opened' : false}")


        //- template(v-else)
        .management-twitter__header
            ul.tabs
                li: button.tab(:class="activeSectionTrending ? 'tab--active' : '' " @click="tabToggle('tabTrending')") Isu Teramai
                li: button.tab(:class="activeSectionTweets  ? 'tab--active' : '' " @click="tabToggle('tabTweet')") Tweets
        .management-twitter__body.relative
            //- template(v-if="status_list_trending.status === 'loading'")
            //-     b-loading(text="Loading")
            //- template(v-else)
            .box-popular(v-show="activeSectionTrending")
                template(v-if="status_list_trending.status === 'loading'")
                    b-loading(text="Memuat isu teramai..." kind="circular")

                .popular-issue(v-else-if="list_trending && list_trending.items && list_trending.items.length > 0")
                    //- button.popular-issue__item(v-for="item in list_trending.items" @click="detailBoxIssue = !detailBoxIssue")
                    button.popular-issue__item(v-for="item in list_trending.items" @click="getDetailBoxTrending(item.title)")
                        strong.block.mb-05 {{ item.title}}
                        span.block.mb-2 {{ numberWithDot(item.count) }}
                        .bar( :style="'width:' + item.count / maxCount * 100 + '%'")
                        //- .bar( :style="'width:' + ((item.count / maxCount * 95)+5) + '%'")
                .absolute.w-full.h-full.inset-0.flex.items-center.justify-center(v-else)
                    .block
                        b-icon.mb-4(name="info" size="2x")
                        p Isu Teramai tidak ditemukan.
            .box-tweets(v-show="activeSectionTweets")
                .tweets
                    //- button.tweets__item.account(v-for="item in list_data_tweet" @click="detailBoxAccount = !detailBoxAccount")
                    button.tweets__item.account(v-for="item in list_data_tweet" @click="getDetailBoxAccount(item.extra_author_attributes.username)")
                        PostTweet(
                            :photo="item.extra_author_attributes.photo"
                            :username="'@'+item.extra_author_attributes.username"
                            :date="datetimeFormat(item.created_at,'DD-MM-YYY HH:mm:ss', 'DD/MM/YY')"
                            :content="item.content"
                        )
                template(v-if="list_data_tweet.length > 0 || status_list_tweet.status == 'loading'")
                    .absolute.inset-0.w-full.h-full.flex.items-center.justify-center(v-if="status_list_tweet.status === 'loading'")
                        b-loading(text="Memuat tweets..." kind="circular")
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

                .absolute.w-full.h-full.inset-0.flex.items-center.justify-center(v-else)
                    .block
                        b-icon.mb-4(name="info" size="2x")
                        p Tweets tidak ditemukan.

        //-
        .detail-twitter(v-bind:class="{'detail-twitter--opened' : detailBoxAccount}")
            .detail-twitter__header
                .flex-grow
                    template(v-if="this.status_detail_profile.status === 'loading'")
                        .block.h-4.w-56.relative
                            b-loading(kind="skeleton")
                    template(v-else)
                        p @{{ detail_profile.username  }}

                b-button(icon_only="x" @click.native="detailBoxAccount = !detailBoxAccount")
            .detail-twitter__body.relative
                template(v-if="this.status_detail_profile.status === 'loading'")
                    b-loading(text="Memuat akun")
                template(v-else)
                    .hidden
                        snapShotAccount(
                            photo="https://pbs.twimg.com/profile_images/1341056153468354574/kcfQnHeI_400x400.jpg",
                            name="Pandji Pragiwaksono",
                            followers="2.5M",
                            location="Indonesia",
                            link="linktr.ee/pandji.pragiwaksono",
                            bday="18 juni"
                            bio="Stand-Up Comedian with 8 Special who is now running COMIKA, a company devoted to create the world a funnier place."
                        )
                        .box-acocunt-following.mt-4
                            .border-b.pb-2.mb-2
                                span Mengikuti <strong> 314 </strong> akun
                            ul
                                li.py-1.transition-all(v-for="item in following"): router-link.link.w-full( :to="item.url"): span {{ item.account }}

                    .box-account
                        template(v-if="status_detail_profile.status === 'loading'")
                            b-loading.b-loading-inherit(kind="circular")
                        template(v-else)
                            .box-account__cover
                                img(:src="detail_profile.photo?detail_profile.photo:getDefaultImage" @error="getErrorImage")
                            .box-account__info
                                strong.block.mb-1 @{{ detail_profile.username }}
                                span {{ detail_profile.name }}

                    .box-account-detail
                        .box-account-detail__header
                            ul.tabs
                                li: button.tab(:class="accountInfo ? 'tab--active' : '' " @click="accountToggle('information')") Informasi
                                li: button.tab(:class="accountfollowing ? 'tab--active' : '' " @click="accountToggle('following')") Mengikuti
                        .box-account-detail__body
                            .p-4(v-show="accountInfo")
                                template(v-if="status_detail_profile.status === 'loading'")
                                    b-loading.b-loading-inherit(kind="circular")
                                .snapshot.snapshot--align-left(v-else)
                                    figure.snapshot__account
                                        //- .followers
                                            strong(style="padding-right:4px") {{ nFormatter(detail_profile.followers_count) }}
                                            span Pengikut

                                    ul.snapshot__info
                                        li
                                            b-icon.mb-2.text-gray-400(name="map-pin")
                                            span {{ showString(detail_profile.location) }}
                                        li
                                            b-icon.mb-2.text-gray-400(name="link")
                                            span: a.link(:href="detail_profile.url" target="_blank") {{ detail_profile.url }}
                                            //- span {{ detail_profile.url }}
                                        //- li
                                            b-icon.mb-2.text-gray-400(name="gift")
                                            span 18 juni

                                    .snapshot__bio
                                        p.bio {{ detail_profile.description }}
                            .p-4(v-show="accountfollowing")
                                template(v-if="status_detail_following.status === 'loading'")
                                    b-loading.b-loading-inherit(kind="circular")
                                template(v-else)
                                    strong Mengikuti {{ detail_following.following_count }} akun
                                    ul
                                        li.py-1.transition-all(v-for="item in detail_following.list_following")
                                            a.link.w-full( :href="item.url" target="_blank"): span {{ item.name }}


        .detail-twitter(v-bind:class="{'detail-twitter--opened' : detailBoxIssue}")
            .detail-twitter__header.flex.items-center.justify-between.border-b.border-gray-100.px-4.py-3
                .flex-grow
                    template(v-if="this.status_list_tweet.status === 'loading'")
                        .block.h-4.w-56.relative
                            b-loading(kind="skeleton")
                    template(v-else)
                        p {{ selectedTrending }}

                b-button(icon_only="x" @click.native="detailBoxIssue = !detailBoxIssue")
            .detail-twitter__body.relative
                .tweets.pointer-events-none(v-if="list_data_tweet_trending.length > 0")
                    //- .tweets__item.pointer-events-none(v-for="item in relatedTweets" @click="detailBoxAccount = !detailBoxAccount")
                        PostTweet(
                            :photo="item.avatar"
                            :username="item.username"
                            :date="item.date"
                            :content="item.content"
                        )
                    .tweets__item.pointer-events-none(v-for="item in list_data_tweet_trending" @click="detailBoxAccount = !detailBoxAccount")
                        PostTweet(
                            :photo="item.extra_author_attributes.photo"
                            :username="'@'+item.extra_author_attributes.username"
                            :date="datetimeFormat(item.created_at,'DD-MM-YYY HH:mm:ss', 'DD/MM/YY')"
                            :content="item.content"
                        )
                template(v-if="list_data_tweet_trending.length > 0 || status_list_tweet.status == 'loading'")
                    .relative.mt-10(v-if="status_list_tweet.status === 'loading'")
                        b-loading(text="Memuat tweets..." kind="circular")
                    template(v-else)
                        .flex.items-center.justify-center.w-full.p-4
                            b-button(
                                kind="tertiary"
                                text="Muat Tweets Lainnya"
                                size="small"
                                v-if="list_data_tweet_trending.length < parseInt(list_tweet_trending.total_item)"
                                @click.native="loadMoreTweetTrending()"
                            )
                        .count-twitter Menampilkan 1 - {{ numberWithDot(list_data_tweet_trending.length) }} dari {{ numberWithDot(list_tweet_trending.total_item) }} Tweets

                .flex.items-center.justify-center.w-full.p-4(v-else)
                    span Tweets tidak ditemukan.

</template>

<script>
import {mapState} from 'vuex';
import snapShotAccount from '@/components/SnapShot';
import PostTweet from '@/components/PostTweet';

export default {
    name: 'ManagementTwitter',
    components: {
        snapShotAccount,
        PostTweet,
    },
    data() {
        return {
            // loadingTweeter: false,
            maxCount: 700,
            activeSectionTrending: false,
            activeSectionTweets: true,

            // detail account
            detailBoxAccount: false,

            // detail Issue
            detailBoxIssue: false,

            // twitter
            MinimizeTwitter: false,

            // akun detail
            accountInfo: true,
            accountfollowing: false,

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

            startDate: '',
            endDate: '',

            loading_issue: false,
            list_data_tweet: [],
            limit_tweet: 20,
            page_tweet: 1,
            timeout: null,

            list_data_tweet_trending: [],
            limit_tweet_trending: 20,
            page_tweet_trending: 1,

            selectedTrending: '',

            dataOnDetail: false,
        };
    },
    computed: {
        ...mapState('trend', [
            'status_list_trend',
        ]),
        ...mapState('medsos', [
            'status_list_trending',
            'status_list_tweet',
            'status_detail_following',
            'status_detail_profile',
            'list_trending',
            'list_tweet',
            'list_tweet_trending',
            'detail_following',
            'detail_profile',
        ]),
        // id() {
        //     return this.$route.params.id;
        // },
        data: {
            get() {
                if (this.dataOnDetail) {
                    return this.dataOnDetail;
                } else {
                    let dataTmp = {};
                    try {
                        dataTmp = this.decodeDetailData(this.$route.params.data);
                        this.setModel(dataTmp);
                    } catch (error) {
                        console.log(error);
                    }
                    return dataTmp;
                }
            },
            set: function(newValue) {
                return newValue;
            },
        },
    },
    watch: {
        // id(newVal) {
        //     if (newVal !== undefined) {
        //         this.getData(true);
        //     }
        // },
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
        list_tweet_trending(newVal) {
            if (newVal.items && newVal.items.length > 0) {
                for (let i = 0; i < newVal.items.length; i++) {
                    this.list_data_tweet_trending.push(newVal.items[i]);
                }
            }
        },
    },
    methods: {
        detailProfileToogle() {
            this.detailBoxIssue = !this.detailBoxIssue;
            // get API Profile
        },
        tabToggle(tabName) {
            if (tabName == 'tabTrending') {
                this.activeSectionTrending = true;
                this.activeSectionTweets = false;
            } else {
                this.activeSectionTrending = false;
                this.activeSectionTweets = true;
            }
        },

        accountToggle(tabName) {
            if (tabName == 'information') {
                this.accountInfo = true;
                this.accountfollowing = false;
            } else {
                this.accountInfo = false;
                this.accountfollowing = true;
            }
        },

        getDetailBoxTrending(title) {
            this.selectedTrending = title;
            this.detailBoxIssue = !this.detailBoxIssue;
            this.list_data_tweet_trending = [];
            this.page_tweet_trending= 1;

            // this.getDataTweet('law', true, false);
            this.getDataTweet(this.selectedTrending, true, false);
        },
        getDetailBoxAccount(username) {
            this.detailBoxAccount = !this.detailBoxAccount;
            this.getDataFollowing(username);
            this.getDataProfile(username);
        },

        // loadingIssue() {
        //     const self = this;
        //     this.loading_issue = true;
        //     setTimeout(function() {
        //         self.loading_issue = false;
        //     }, 800);
        // },

        toggleTwitter() {
            Event.$emit('ctaTwitterHidden');
            this.MinimizeTwitter = !this.MinimizeTwitter;
        },
        loadMoreTweet() {
            this.page_tweet += 1;
            this.getDataTweet();
        },
        loadMoreTweetTrending() {
            this.page_tweet_trending += 1;
            // this.getDataTweet('law', true, false);
            this.getDataTweet(this.selectedTrending, true, false);
        },
        getDataTweet(title='', fromTrending = false, withSlug=true) {
            // get list tweet
            let slug = '';
            if (withSlug) {
                slug = this.data.slug;
                // slug = 'omnibus-law';
            }
            this.$store.dispatch('medsos/getListTweet', [this.limit_tweet, this.page_tweet, this.startDate, this.endDate, slug, title, fromTrending] );
        },
        getDataTrending() {
            // get trending
            this.$store.dispatch('medsos/getListTrending', [this.startDate, this.endDate] );
        },
        getDataProfile(username) {
            // get trending
            this.$store.dispatch('medsos/getDetailProfile', [username] );
        },
        getDataFollowing(username) {
            // get trending
            this.$store.dispatch('medsos/getListFollowing', [username] );
        },
        getData(reset=false) {
            if (reset) {
                this.list_data_tweet = [];
                this.page_tweet = 1;
            }
            this.getDataTweet();
            this.getDataTrending();
        },
    },
    created() {
        Event.$on('getDataTwitter', (data, status, startDate='', endDate='') => {
            this.dataOnDetail = data;
            this.startDate = startDate;
            this.endDate = endDate;
            this.getData(status);
        });
    },
};
</script>

<style lang="sass">
</style>
