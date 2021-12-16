<template lang="pug">
    .management-media.scrollbox(tabindex="0")
        .scrollbox-container
            b-loading(v-if="status_list_news.status === 'loading' && list_data.length == 0" text="Memuat informasi media..." kind="circular")


            //- template(v-else)
            .management-media__header.relative.z-10(v-if="id")
                header.header-page
                    h1.truncate {{ data.label?data.label:'' }}
                    //- h1 Dummy
                    .relative.flex.items-center
                        .box-calendar.mr-4
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
                                autoApply=false
                                @toggle="showCalendar()"
                            )
                                template(slot="input" slot-scope="picker" style="min-width: 350px;") {{ picker.startDate | date }} - {{ picker.endDate | date }}
                        .cta-crawling.flex-grow
                            //- template(v-if="!updatingCrawling")
                            template(v-if="data.status")
                                b-button(icon_only="refresh-cw" text="Berhenti Ambil Data" kind="danger" @click.native="updateCrawling(false)"  v-tooltip="'Berhenti Mengambil Data'")
                            template(v-else)
                                b-button(icon_only="download-cloud" text="Perbarui Data" kind="tertiary" @click.native="updateCrawling(true)"  v-tooltip="'Perbarui Data'")
                        b-button( :customIcon="true" :icon_only="iconinfo" :kind="kindbutton" text="Informasi Trend" @click.native="toggleSettingTrend()"  v-tooltip="'Informasi Trend'")
                        .absolute.right-0.z-50(style="top: 100%")
                            .card.p-0.mt-2(style="width: 450px; padding:1rem" v-show="settingTrend")
                                .block
                                    .bg-blue-500.p-4.text-white.rounded.mb-4
                                        strong.mb-2.block.text-xl Informasi Trend
                                        ul.summary
                                            //- li Cari <span class="highlight"> Politik</span> dengan <em>keywords</em> dari <span class="highlight"> Permendikbud dan PPKS </span>
                                            //- li Hindari <em>keywords</em> dari <span class="highlight"> PKS dan PKS Sejahtra</span>
                                            //- li Batasi <em>keywords</em> dari <span class="highlight">Muhammadiyah dan Pendidikan dan Yaqud</span>
                                            li Cari <span class="highlight"> {{ data.gatra ? data.gatra : '-' }}</span> dengan <em>keywords</em> dari <span class="highlight"> {{ (data.must_word && data.must_word.length > 0) ? arrayToString(data.must_word) : '-'}} </span>
                                            li Hindari <em>keywords</em> dari <span class="highlight">{{ (data.exclude_word && data.exclude_word.length > 0) ? arrayToString(data.exclude_word) : "-" }}</span>
                                            li Batasi <em>keywords</em> dari <span class="highlight">{{ (data.limit_word && data.limit_word.length > 0)?arrayToString(data.limit_word, 'name') : "-"}}</span>
                                    .grid.grid-cols-2.gap-4
                                        b-button(text="Ubah Trend" text_icon_left="info" @click.native="btnModalnews()")
                                        //- b-button.mb-3(text="Ubah topik" text_icon_left="edit" @click.native="btnModalnews()")
                                        b-button(v-if="data.status === true" text="Arsipkan" text_icon_left="download-cloud" @click.native="changeStatus(data.label, false)")
                                        b-button(v-else text="Aktifkan" text_icon_left="check-circle" @click.native="changeStatus(data.label, true)")
            .management-media__body(v-if="list_data.length > 0")
                h2.heading.text-xl.font-bold.mb-2 {{ numberWithDot(list_news.pagination.total) }} berita ditemukan

                .box-media
                    article.media(v-for="item in list_data")
                        .media__type
                            b-icon(name="link")
                        //- .media__type
                            template(v-if="item.type === 'media'")
                                b-icon(name="link")
                            template(v-else)
                                b-icon(name="file")

                        .media__cover
                            a(:href="item.url" target='_blank')
                                figure.media__cover
                                    img(v-bind:src="item.urlToImage ? item.urlToImage : getDefaultImage" @error="getErrorImage")
                        .media__content
                            .mb-2
                                .label.label--gray.text-xs.font-bold.mb-1 {{ item.source}}
                                a.link-media.mb-2.block(:href="item.url" target='_blank' v-html="item.title")
                                //- p.text-gray-500.mb-2 {{ item.description }}
                                p.mb-2(v-html="trimmedStr(item.content)")
                                span.text-xs.text-gray-500 {{ datetimeFormat(item.publishedAt, 'YYYY-MM-DD HH:mm:ss',('dddd, DD MMMM YYYY')) }}
            .block.text-center.mt-5.mb-5(v-if="list_data.length > 0 || status_list_news.status === 'loading'")
                .relative(v-if="status_list_news.status === 'loading'")
                    b-loading(text="Memuat data" kind="" v-if="list_data.length > 0").mt-5

                template(v-else)
                    b-button(v-if="list_news.pagination && list_news.pagination.hasNext && list_news.pagination.hasNext === true" text="Lainnya..." kind="tertiary" @click.native="loadMore()")
            .management-media__body(v-else)
                .management-media__center Berita tidak ditemukan

                //- .text-center.mt-20.mb-20
                //-     span Berita tidak ditemukan.

        //- open popup
        .modal(v-bind:class="{'modal--show' : openModalUpdateTrend}")
            .modal-overlay
            form.modal-container(@submit="submit($event)")
                .modal-container__header
                    h2 Ubah Trend
                    b-button(icon_only="x" @click.native="openModalUpdateTrend = !openModalUpdateTrend" type="button")
                .modal-container__body
                    //- .p-4.pb-0
                    .box-form-target( v-on:scroll.passive="handleScroll()")
                        .nuding-scroll( :class="{'nuding-scroll--show' : !nudingScroll, 'nuding-scroll--hide' : nudingScroll }")
                            b-icon(name="chevrons-down")
                            span Gulir untuk mengisi data lainnya
                        //-.field.mb-8
                            label.label-field.mb-2.block.font-bold Label
                            input.field-style(placeholder="Tulis label trend disini..." v-model="model.name")
                            span.field-message.text-red-500(v-if="$v.model.name.$error") This name is required &amp; max length is 255 char.
                            span.field-message.text-red-500(v-if="error_name !== ''") {{ error_name }}
                        .field.mb-8
                            label.label-field.mb-2.block.font-bold.font-bold Pilih Gatra<sup>*</sup>
                            .grid.grid-cols-3.gap-4
                                //- template(v-for="item in list_gatra")
                                //-     b-radio(:label="item.label" :name="item.id")
                                .ui-radio(v-for="item in list_gatra")
                                    input(type="radio" name="gatra" :value="item.id" v-model="model.gatra")
                                    .ui-radio-style
                                        .box-radio.box-radio--default
                                            span
                                        label {{ item.label }}
                            span.text-xs.text-red-500.block.pt-2(v-if="$v.model.gatra.$error && !$v.model.gatra.required") Gatra dibutuhkan

                        .field.mb-8
                            label.label-field.mb-2.block.font-bold Temukan Trend di <em>keywords</em><sup>*</sup>:
                            //- p.text-sm.mb-2 Masukan <em>keywords</em> yang akan dikelola ke dalam sistem
                            .field-adding-keywords
                                input.field-style(placeholder="Tulis keyword disini..." v-model="tmpMustWord")
                                b-button(kind="tertiary" text="Tambahkan" @click.native="addMustWord()")
                            //- v-for
                            .box-added
                                template(v-for="(item, index) in model.must_word")
                                    b-button( size="small" text_icon_right="x" :text="item" @click.native="removeMustWord(item)")
                                    span.text-xs(v-if="index != (model.must_word.length - 1)") dan
                                    //- b-button( size="small" text_icon_right="x" text="PPKS")
                            template(v-if="$v.model.must_word.$error")
                                span.text-xs.text-red-500.block(v-if="!$v.model.must_word.required") Minimal 1 keyword
                                span.text-xs.text-red-500.block(v-if="!$v.model.must_word.maxLength") Batas maksimal 5 keyword


                        .field.mb-8
                            label.label-field.mb-2.block.font-bold Hindari Trend <em>keywords</em><sup>*</sup>:
                            //- p.text-sm.mb-2 Agar informasi lebih relevan, masukan <em>keywords</em> yang tidak perlu disimpan
                            .field-adding-keywords
                                input.field-style(placeholder="Tulis keyword disini..." v-model="tmpExcludeWord")
                                //- input.field-style.field-disabled(placeholder="Tulis keyword disini...")
                                b-button(kind="tertiary" text="Tambahkan" @click.native="addExcludeWord()")
                                //- b-button(kind="skin" text="Tambahkan" @click.native="addExcludeWord()")
                            //- v-for
                            .box-added
                                template(v-for="(item, index) in model.exclude_word")
                                    b-button( size="small" text_icon_right="x" :text="item" @click.native="removeExcludeWord(item)")
                                    span.text-xs(v-if="index != (model.exclude_word.length - 1)") dan

                            template(v-if="$v.model.exclude_word.$error")
                                span.text-xs.text-red-500.block(v-if="!$v.model.exclude_word.required") Minimal 1 keyword
                                span.text-xs.text-red-500.block(v-if="!$v.model.exclude_word.maxLength") Batas maksimal 5 keyword


                        //- vue multiple
                        .field.mb-8
                            label.label-field.mb-2.block.font-bold Batasi Trend dari <em>keywords</em>:
                            p.text-sm.mb-2 <em>Keywords</em> berdasakan organisasi, tokoh dan isu
                            //- .field-adding-keywords
                            //-     input.field-style(placeholder="Tulis keyword disini...")
                            //-     b-button(kind="tertiary" text="Tambahkan")
                            //- .box-added
                            //-     b-button( size="small" text_icon_right="x" text="Muhammadiyah")
                            //-     span.text-xs dan
                            //-     b-button( size="small" text_icon_right="x" text="Yaqud")
                            //-     span.text-xs dan
                            //-     b-button( size="small" text_icon_right="x" text="Pendidikan")
                            multiselect(
                                v-model="model.limit_word",
                                :options="optionsLimitWord",
                                :multiple="true",
                                group-values="opt",
                                group-label="type",
                                :group-select="true",
                                open-direction="bottom",
                                placeholder="Tulis keyword disini (minimal 3 karakter)",
                                track-by="name",
                                label="name",
                                :loading="loadingLimitWord"
                                :searchable="true",
                                :internal-search="false",
                                :clear-on-select="false",
                                :close-on-select="false",
                                :options-limit="300",
                                :max-height="600",
                                :show-no-results="true",
                                :hide-selected="false"
                                @search-change="asyncFind"
                            )
                                //- :limit="3",
                                //- :limit-text="limitText",
                                span(slot="noResult") keywords yang dicari tidak ditemukan.

                            template(v-if="$v.model.limit_word.$error")
                                span.text-xs.text-red-500.block(v-if="!$v.model.limit_word.required") Minimal 1 keyword
                                span.text-xs.text-red-500.block(v-if="!$v.model.limit_word.maxLength") Batas maksimal 5 keyword
                        .field.mb-8
                            label.label-field.mb-2.block.font-bold Labeli Trend<sup>*</sup>
                            p.text-sm.mb-2 Agar memudahkan penggunaan trend, silakan beri label untuk trend ini, misal <strong> "Isu Presiden 2024" </strong>
                            input.field-style(placeholder="Tulis tanda disini..." v-model="model.label")
                            span.text-xs.text-red-500.block.pt-2(v-if="$v.model.label.$error && !$v.model.label.required") Label dibutuhkan


                        .bg-blue-500.p-4.text-white.rounded
                            strong.mb-2.block Ringkasan Trend
                            ul.summary
                                li Cari <span class="highlight"> {{ model.gatra ? model.gatra : '-' }}</span> dengan <em>keywords</em> dari <span class="highlight"> {{ (model.must_word && model.must_word.length > 0) ? arrayToString(model.must_word) : '-'}} </span>
                                li Hindari <em>keywords</em> dari <span class="highlight">{{ (model.exclude_word && model.exclude_word.length > 0) ? arrayToString(model.exclude_word) : "-" }}</span>
                                li Batasi <em>keywords</em> dari <span class="highlight">{{ (model.limit_word && model.limit_word.length > 0)?arrayToString(model.limit_word, 'name') : "-"}}</span>

                .modal-container__footer
                    b-button(text="Simpan" kind="primary" type="submit")

</template>

<script>
import {mapState} from 'vuex';
import {Chart} from 'highcharts-vue';
// import DynamicsComponents from '@/components/Dynamics';
import {required, maxLength, minLength} from 'vuelidate/lib/validators';

import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import moment from 'moment';
import Multiselect from 'vue-multiselect';


export default {
    name: 'ManagementMedia',
    components: {
        Chart,
        // DynamicsComponents,
        DateRangePicker,
        Multiselect,
    },
    data() {
        return {
            settingTrend: false,
            openModalUpdateTrend: false,
            updatingCrawling: false,
            kindbutton: 'tertiary',
            iconbutton: 'info',

            iconinfo: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Alert</title><path d="M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 008 8h0a8 8 0 008-8l8-216c.58-8.64-7.34-16-16-16z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="256" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>',

            dateRange: {
                startDate: moment().subtract(1, 'month').toDate(),
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
                    height: '200px',
                    backgroundColor: 'transparent',
                    plotBackgroundColor: 'transparent',
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                },
                series: [{
                    name: 'Point',
                    data: [1, 2, 3, 4, 1.5, 2.5, 1.5, 3.5, 2, 3, 2, 1],
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
                    labels: {
                        // format: []
                    },
                },
            },

            // route_name: null,
            loading_issue: false,

            list_data: [],
            limit: 10,
            page: 1,
            keyword: '',
            timeout: null,
            // model: {
            // name: '',
            // status: '',
            // },

            // error message
            // error_name: '',
            // error_status: '',
            // default_image: this.$store.getters['config/getDefaultImage'],
            // default_profile: '/images/no-image-profile.jpg',

            // ubah trend
            nudingScroll: false,

            tmpMustWord: null,
            tmpExcludeWord: null,
            tmpLimitWord: null,

            optionsLimitWord: [],
            loadingLimitWord: false,

            model: {
                gatra: null,
                must_word: [],
                exclude_word: [],
                limit_word: [],
                label: null,
            },

            dataOnDetail: false,
        };
    },
    validations: {
        model: {
            gatra: {
                required,
            },
            must_word: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(5),
            },
            exclude_word: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(5),
            },
            limit_word: {
            //     required,
            //     minLength: minLength(1),
            //     maxLength: maxLength(5),
            },
            label: {
                required,
            },
        },
    },
    computed: {
        ...mapState('news', [
            'status_list_news',
            'list_news',
            // 'detail_news',
        ]),
        ...mapState('graph', [
            'status_list_gatra',
            'list_gatra',
        ]),
        ...mapState('auth', [
            'profile',
        ]),
        ...mapState('issue', [
            'status_find_suggestion',
            'find_suggestion',
        ]),
        route_name() {
            return this.$route.name;
        },
        id() {
            return this.$route.params.id;
        },
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
        filterStartDate() {
            return moment(this.dateRange.startDate).format('YYYY-MM-DD');
        },
        filterEndDate() {
            return moment(this.dateRange.endDate).format('YYYY-MM-DD');
        },

    },
    watch: {
        // route_name(newVal) {
        //     console.log(newVal);
        // },
        find_suggestion(newVal) {
            if (newVal) {
                if (newVal.organisations && newVal.organisations.length > 0) {
                    const optOrg = newVal.organisations.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                        };
                    });
                    const tmpListOrganisasi = {
                        type: 'Organisasi',
                        opt: optOrg,
                    };
                    this.optionsLimitWord.push(tmpListOrganisasi);
                }
                if (newVal.figures && newVal.figures.length > 0) {
                    const optFigure = newVal.figures.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                        };
                    });
                    const tmpListTokoh = {
                        type: 'Tokoh',
                        opt: optFigure,
                    };
                    this.optionsLimitWord.push(tmpListTokoh);
                }
                if (newVal.issues && newVal.issues.length > 0) {
                    const optIssue = newVal.issues.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                        };
                    });
                    const tmpListIsu = {
                        type: 'Isu',
                        opt: optIssue,
                    };
                    this.optionsLimitWord.push(tmpListIsu);
                }
            }
        },
        openModalUpdateTrend(newVal) {
            if (newVal === true) {
                // this.reset();
                // this.getData();
            } else {
                // this.$store.commit('news/setDetailnews', {});
            }
        },
        id(newVal, oldVal) {
            // if (oldVal === undefined && newVal !== undefined) {
            if (newVal !== undefined) {
                this.getData(true);

                Event.$emit('getDataTwitter', this.data, true, this.filterStartDate, this.filterEndDate);
            }
        },
        detail_news(newVal) {
            this.model.name = (newVal.name ? newVal.name : '');
            this.model.status = (newVal.status ? '1' : '0');
        },
        list_news(newVal) {
            if (newVal.doc && newVal.doc.length > 0) {
                for (let i = 0; i < newVal.doc.length; i++) {
                    this.list_data.push(newVal.doc[i]);
                }
            }
        },
    },
    methods: {
        setModel(data) {
            for (const key in this.model) {
                if (Object.prototype.hasOwnProperty.call(this.model, key)) {
                    this.model[key] = data[key];
                }
            }
        },
        loadMore() {
            this.page += 1;
            this.getData();
        },
        // getDefaultImage(e) {
        //     let img = this.default_image;

        //     if (this.default_image === 'profile') {
        //         img = this.default_profile;
        //     }

        //     e.target.src = img;
        // },
        toggleSettingTrend() {
            this.settingTrend = !this.settingTrend;
            if (this.settingTrend) {
                this.kindbutton = 'primary';
                this.iconbutton = 'x';
            } else {
                this.kindbutton = 'tertiary';
                this.iconbutton = 'info';
            }
        },
        btnModalnews() {
            this.settingTrend = false;
            this.openModalUpdateTrend = true;
            this.kindbutton = 'tertiary';
            this.kindbutton = 'info';
        },
        // loadingIssue() {
        //     const self = this;
        //     this.loading_issue = true;
        //     this.getData();
        //     setTimeout(function() {
        //         self.loading_issue = false;
        //     }, 800);
        // },
        getData(reset=false, data) {
            // this.reset(true);
            if (reset) {
                this.list_data = [];
                this.page = 1;
            }

            if (this.id !== undefined && this.data !== undefined) {
                // if (this.route_name === 'GeneralUsersEdit') {
                // Event.$emit('showLoading', true);
                let tmpData = this.data;
                if (data) {
                    tmpData = data;
                } else {
                    tmpData = this.data;
                }
                const searchData = {};
                searchData.must_word=tmpData.must_word;
                searchData.exclude_word=tmpData.exclude_word;
                searchData.limit_word=tmpData.limit_word;
                // const searchData = {
                //     'search': {
                //         'must_word': this.data.must_word,
                //         'exclude_word': this.data.exclude_word,
                //         '': this.data.limit_word,
                //     },
                // };
                this.$store.dispatch('news/getListNews', [this.limit, this.page, searchData, this.filterStartDate, this.filterEndDate] );

                // temp
                // Event.$emit('showLoading', false);

                // this.$store.dispatch('users/getDetail', this.id)
                // .then((resp) => {
                //     if (resp === 'success') {
                //         Event.$emit('showLoading', false);
                //     } else {
                //         Event.$emit('error');
                //     }
                // });
            // } else {
            //     // if (this.route_name === 'GeneralUsersCreate')
            //     this.$store.commit('users/setDetail', {});
            // }
            }
        },
        setErrors(empty=true, errors=null) {
            // if (empty === true) {
            //     this.error_name = '';
            //     // this.error_status = '';
            // } else if (empty !== true && errors !== null) {
            //     this.error_name = errors.name ? errors.name : '';
            //     // this.error_status = errors.status ? errors.status : '';
            // }
        },
        reset(direct=false) {
            // this.setEmptyModel(true);
            // reset vuelidate
            this.$nextTick(() => {
                this.$v.$reset();
            });
            this.setErrors(true);
        },
        async submit(e) {
            e.preventDefault();
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            Event.$emit('showLoading', true);
            this.$store.dispatch('trend/update', [this.id, this.model])
                .then((resp) => {
                    if (resp.result === 'success') {
                        this.openModalUpdateTrend = false;

                        Event.$emit('getDataTrend', true, this.id);

                        Event.$emit('getDataTwitter', this.data, true, this.filterStartDate, this.filterEndDate);
                        // this.$router.push({
                        //     name: 'IssueOfActor',
                        //     params: {
                        //         id: this.id,
                        //         data: this.encodeDetailData(modelData),
                        //     },
                        // });

                        // this.getData();
                        // this.$store.dispatch('news/getListnews');

                        Event.$emit('success', 'Data berhasil diubah!');
                    } else {
                        Event.$emit('error');
                    }
                });
        },
        changeStatus(name, status) {
            this.$swal.fire({
                icon: 'warning',
                title: 'Ubah status ke '+ (status ? 'aktif' : 'arsip') +'?',
                text: 'Trend : ' + name,
                confirmButtonText: 'Ya!',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        Event.$emit('showLoading', true);

                        this.$store.dispatch('trend/changeStatus', [this.id, status])
                            .then((resp) => {
                                // Event.$emit('showLoading', false);
                                Event.$emit('getDataTrend', true, this.id);
                                if (status) {
                                    Event.$emit('getDataTwitter', this.data, true, this.filterStartDate, this.filterEndDate);
                                }
                                Event.$emit('success', 'Data berhasil di'+ (status ? 'aktif' : 'arsip') +'kan');
                            })
                            .catch((resp) => {
                                // Event.$emit('showLoading', false);
                                Event.$emit('error');
                            });
                        // const modelData = this.detail_news;

                        // modelData.status = (status === 1 ? true : false);
                        // modelData.updated_by = this.profile.name;
                        // delete modelData.id;

                        // this.settingTrend = false;

                        // this.processSubmit(modelData);
                    }
                });
        },
        updateCrawling(status) {
            const title = status ? 'Perbarui Crawling Informasi' : 'Hentikan Crawling Informasi';
            this.$swal.fire({
                icon: 'warning',
                title: title,
                text: 'Trend : ' + this.data.label,
                confirmButtonText: 'Ya!',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        Event.$emit('showLoading', true);
                        if (status == false) {
                            this.$store.dispatch('trend/changeStatus', [this.id, status])
                                .then((resp) => {
                                // Event.$emit('showLoading', false);
                                    Event.$emit('getDataTrend', true, this.id);
                                    if (status) {
                                        Event.$emit('getDataTwitter', this.data, true, this.filterStartDate, this.filterEndDate);
                                    }
                                    Event.$emit('success', 'Crawling informasi berhasil dihentikan!');
                                })
                                .catch((resp) => {
                                // Event.$emit('showLoading', false);
                                    Event.$emit('error');
                                });
                        } else {
                            this.$store.dispatch('trend/refreshTrend', [this.id])
                                .then((resp) => {
                                    if (resp.result == 'failed') {
                                        Event.$emit('error', (resp.data && resp.data.errors?resp.data.errors[0].message:'Gagal'));
                                    } else {
                                        Event.$emit('getDataTrend', true, this.id);
                                        if (status) {
                                            Event.$emit('getDataTwitter', this.data, true, this.filterStartDate, this.filterEndDate);
                                        }
                                        Event.$emit('success', 'Sukses! Proses crawling berlangsung 15-30 menit.');
                                    }
                                    // Event.$emit('showLoading', false);
                                })
                                .catch((resp) => {
                                // Event.$emit('showLoading', false);
                                    Event.$emit('error');
                                });
                        }
                    }
                });
        },

        async asyncFind(query) {
            if (query.length > 2) {
                this.loadingLimitWord = true;
                // this.countLimitWord = 0;
                this.optionsLimitWord = [];
                await this.getDataLimitWord(query);
            }
        },
        getDataLimitWord(query) {
            // const limit=10;
            // const page=1;
            // this.$store.dispatch('organization/getListOrganization', [limit, page, query])
            //     .then((resp) => {
            //         this.countLimitWord++;
            //     });
            // this.$store.dispatch('actor/getListActor', [limit, page, query])
            //     .then((resp) => {
            //         this.countLimitWord++;
            //     });
            // this.$store.dispatch('issue/getList', [limit, page, query, this.model.gatra])
            //     .then((resp) => {
            //         this.countLimitWord++;
            //     });

            this.$store.dispatch('issue/getFindSuggestion', [query])
                .then((resp) => {
                    this.loadingLimitWord = false;
                });
        },
        addMustWord() {
            if (this.tmpMustWord != null) {
                this.model.must_word.push(this.tmpMustWord);
                this.tmpMustWord = null;
            }
        },
        removeMustWord(string) {
            const index = this.model.must_word.indexOf(string);
            if (index !== -1) {
                this.model.must_word.splice(index, 1);
            }
        },
        addExcludeWord() {
            if (this.tmpExcludeWord != null) {
                this.model.exclude_word.push(this.tmpExcludeWord);
                this.tmpExcludeWord = null;
            }
        },
        removeExcludeWord(string) {
            const index = this.model.exclude_word.indexOf(string);
            if (index !== -1) {
                this.model.exclude_word.splice(index, 1);
            }
        },
        setEmptyModel(all=true) {
            this.model = {
                gatra: null,
                must_word: [],
                exclude_word: [],
                limit_word: [],
                label: null,
            };
        },
        handleScroll() {
            this.nudingScroll = true;
        },

        async pickerUpdate(e) {
            this.getData(true);

            Event.$emit('getDataTwitter', this.data, true, this.filterStartDate, this.filterEndDate);
        },
        onReload: function handler(event) {
            if (this.route_name == 'IssueOfActor') {
                this.$router.push('/manajemen/isu');
            }
        },

        showCalendar() {
            console.log('hello');
            Event.$emit('openFloatingCalendar');
        },
    },
    created() {
        // Event.$on('loadingIssue', () => {
        // this.loadingIssue();
        // });
        Event.$on('getMediaOnDetail', (data) => {
            this.dataOnDetail = this.decodeDetailData(data);
            this.getData(true, this.dataOnDetail);
            Event.$emit('getDataTwitter', this.dataOnDetail, true, this.filterStartDate, this.filterEndDate);
        });
        window.addEventListener('load', this.onReload);
    },

    filters: {
        date: function(date) {
            return moment(date).locale('id').format('DD MMM YYYY');
        },
    },

    mounted() {
        // if (['IssueOfActor', 'ActivitiesOfOrganization'].includes(this.route_name)) {
        //     console.log('mounted Mediaaa');
        //     Event.$emit('getDataTwitter', this.data, true, this.filterStartDate, this.filterEndDate);
        // }
        // this.getData();
    },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="sass">
    .menu-popup__blank
        @apply w-full flex items-center justify-center absolute p-12 text-center
        height: calc( 100% - 0.75rem )
    .management-media__center
        display: flex
        align-items: center
        justify-content: center
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0

    .multiselect
        border-color: var(--color-primary-500)
        border-width: 1px
    .multiselect__tag
        color: var(--btn-text-skin)
        --tw-bg-opacity: 1
        background-color: rgba(243, 244, 246, var(--tw-bg-opacity))
    .multiselect__option--highlight
        --tw-bg-opacity: 1
        background-color: rgba(59, 130, 246, var(--tw-bg-opacity))
        &::after
            background-color: rgba(59, 130, 246, var(--tw-bg-opacity))
    .multiselect__tag-icon:focus, .multiselect__tag-icon:hover
        --tw-text-opacity: 1
        background: rgba(239, 68, 68, 1)
</style>
