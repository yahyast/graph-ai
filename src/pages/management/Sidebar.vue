<template lang="pug">
    .block
        .management-sidebar
            router-link(to="/").management-sidebar__logo.logo-ai
            .px-4
                .mb-4
                    b-button(
                        text="Trend Baru"
                        text_icon_left="plus"
                        kind="primary" width="full"
                        @click.native="openModalTrend = !openModalTrend"
                    )
                //- .field.field--icon-right.w-full
                    select.field-style()
                        option Trend aktif
                        option Trend terarsip
                    span.icon-field
                        b-icon(name="chevron-down")


            .management-sidebar__content
                .box-target.scrollbox(tabindex="0")
                    .scrollbox-container
                        .box-target__header.p-4
                            .field.field--icon-left.w-full
                                input.field-style(
                                    placeholder="Cari Trend"
                                    v-model="keyword"
                                    @keyup="searchKeyword"
                                )
                                span.icon-field
                                    b-icon(name="search")
                        .box-target__body
                            .collection-target
                                //- b-loading(
                                //-     v-if="status_list_trend.status === 'loading'"
                                //-     text="Memuat data"
                                //- )

                                //- template(v-else)
                                //- template(v-if="list_data.length > 0")
                                .collection-target__item.collection-crawling(v-for="item in list_data")
                                    .loading-crawling(v-if="item.status")
                                        b-icon(name="refresh-cw" size="small")
                                    routerLink(:to="'/manajemen/isu/'+ item.id +'/'+ encodeDetailData(item)").flex-grow.text-left.truncate {{ item.label }}
                                    //- routerLink(:to="'/manajemen/isu/'+ item.id +'/'+ encodeDetailData(item)").flex-grow.text-left.truncate(v-tooltip.right-start="item.label") {{ item.label }}
                                .block.text-center.mt-6.mb-6(v-if="list_data.length > 0 || status_list_trend.status === 'loading'")
                                    .relative(v-if="status_list_trend.status === 'loading'")
                                        b-loading(text="Memuat data..." kind="circular")
                                    .px-4(v-else)
                                        b-button.w-full(size="small" v-if="list_trend.pagination && list_trend.pagination.hasNext && list_trend.pagination.hasNext === true" text="Muat Label Lainnya..." kind="tertiary" @click.native="loadMore()")

                                .text-center.mt-5.mb-5(v-else)
                                    span Trend tidak ditemukan.


            .floating-more(@click="toggleMore()" v-closable-menu-sidebar-general-management="{exclude: ['menuSidebarGeneralActiveManagement'], handler: 'closeMenuGeneralSidebar'}")
                b-button(text="Menu Lainnya" text_icon_left="more-horizontal" kind="tertiary")

        .card-menu-popup.card-menu-popup--more(:class="{'card-menu-popup--show' : openMore}" ref="menuSidebarGeneralActiveManagement")
            MenuSidebarGeneral

        //- open popup
        .modal(v-bind:class="{'modal--show' : openModalTrend}")
            .modal-overlay
            form.modal-container(@submit="submit($event)")
                //- .h-20(v-if="loading_form")
                //-     b-loading(text="simpan")

                //- template(v-else)
                .modal-container__header
                    h2 Tambah Trend
                    b-button(icon_only="x" @click.native="openModalTrend = !openModalTrend" type="button")
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
                                v-model="model.limit_word"
                                :options="optionsLimitWord"
                                :multiple="true"
                                group-values="opt"
                                group-label="type"
                                :group-select="true"
                                open-direction="bottom"
                                placeholder="Tulis keyword disini (minimal 3 karakter)"
                                track-by="name"
                                label="name"
                                :loading="loadingLimitWord"
                                :searchable="true"
                                :internal-search="false"
                                :clear-on-select="false"
                                :close-on-select="false"
                                :options-limit="300"
                                :max-height="600"
                                :show-no-results="true"
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


                    //- .p-4
                        .field
                            label.label-field.mb-2.block.font-bold Status <sup>*</sup>
                            .grid.grid-cols-2.gap-2
                                b-radio(label="Aktif" name="status" :value="1" v-model="model.status")
                                b-radio(label="Arsip" name="status" :value="0" v-model="model.status")

                            span.field-message.text-red-500(v-if="$v.model.status.$error") This status is required.
                            span.field-message.text-red-500(v-if="error_status !== ''") {{ error_status }}

                .modal-container__footer
                    //- b-button(text="Simpan" kind="primary" @click.native="openModalTrend = !openModalTrend")
                    b-button(text="Simpan" kind="primary" type="submit")

</template>

<script>
import {mapState} from 'vuex';
import {required, maxLength, minLength} from 'vuelidate/lib/validators';
import MenuSidebarGeneral from '@/components/MenuSidebarGeneral';
import Multiselect from 'vue-multiselect';
let handleOutsideClick;

export default {
    name: 'ManagementSidebar',
    components: {
        MenuSidebarGeneral,
        Multiselect,
    },
    directives: {
        'closable-menu-sidebar-general-management': {
            bind(el, binding, vnode) {
                handleOutsideClick = (e) => {
                    e.stopPropagation();
                    const {handler, exclude} = binding.value;
                    let clickedOnExcludedEl = false;

                    exclude.forEach((refName) => {
                        if (!clickedOnExcludedEl) {
                            const excludedEl = vnode.context.$refs[refName];
                            if (excludedEl) {
                                clickedOnExcludedEl = excludedEl.contains(e.target);
                            }
                        }
                    });

                    if (!el.contains(e.target) && !clickedOnExcludedEl) {
                        vnode.context[handler]();
                    }
                };
                document.addEventListener('click', handleOutsideClick);
                document.addEventListener('touchstart', handleOutsideClick);
            },
            unbind() {
                document.removeEventListener('click', handleOutsideClick);
                document.removeEventListener('touchstart', handleOutsideClick);
            },
        },
    },
    data() {
        return {
            openMore: false,
            openModalTrend: false,
            nudingScroll: false,

            model: {
                gatra: null,
                must_word: [],
                exclude_word: [],
                limit_word: [],
                label: null,
            },

            // error message
            // error_name: '',
            // error_status: '',

            tmpMustWord: null,
            tmpExcludeWord: null,
            tmpLimitWord: null,

            optionsLimitWord: [],

            loadingLimitWord: false,
            // countLimitWord: 0,

            list_data: [],
            limit: 10,
            page: 1,
            keyword: '',
            timeout: null,

            redirectId: null,
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
                // required,
                // minLength: minLength(1),
                // maxLength: maxLength(5),
            },
            label: {
                required,
            },
        },
    },
    computed: {
        ...mapState('trend', [
            'status_list_trend',
            'list_trend',
        ]),
        ...mapState('graph', [
            'status_list_gatra',
            'list_gatra',
        ]),
        ...mapState('issue', [
            'status_find_suggestion',
            'find_suggestion',
        ]),
        id() {
            return this.$route.params.id;
        },
    },
    watch: {
        list_trend(newVal) {
            // console.log(newVal)
            if (newVal && newVal.doc && newVal.doc.length > 0) {
                let key = 0;
                for (let i = 0; i < newVal.doc.length; i++) {
                    this.list_data.push(newVal.doc[i]);
                    if (this.redirectId != null) {
                        if (newVal.doc[i].id == this.redirectId) {
                            key = i;
                            this.redirectId == null;
                        }
                    }
                }
                if (this.page == 1) {
                    this.$router.push({
                        name: 'IssueOfActor',
                        params: {
                            id: newVal.doc[key].id,
                            data: this.encodeDetailData(newVal.doc[key]),
                        },
                    }).catch(()=>{});
                }
            } else {
                const stateNews = {
                    status: 'false',
                    cancel: null,
                    code: null,
                };
                this.$store.commit('news/setStatusListNews', stateNews);
            }
        },
        id(newVal, oldVal) {
            if (oldVal !== undefined) {
            // this.getData();
                // Event.$emit('loadingIssue');
            }
        },
        openModalTrend(newVal) {
            if (newVal === true) {
                this.reset();
            }
        },
        list_gatra(newData) {
            let opsiGatra = [];

            if (newData && newData.length > 0) {
                opsiGatra = newData;

                Object.keys(opsiGatra).map(function(key, index) {
                    opsiGatra[index]['selected'] = false;
                });
            }

            // console.log(opsiGatra);

            this.opsiGatra = opsiGatra;
        },
        // list_organization(newVal) {
        //     const tmpOpt = [];
        //     if (newVal.doc && newVal.doc.length > 0) {
        //         for (let i = 0; i < newVal.doc.length; i++) {
        //             tmpOpt.push({
        //                 'id': newVal.doc[i].id,
        //                 'name': newVal.doc[i].name,
        //             });
        //         }
        //         const tmpList = {
        //             type: 'Organisasi',
        //             opt: tmpOpt,
        //         };
        //         this.optionsLimitWord.push(tmpList);
        //     }
        // },
        // list_actor(newVal) {
        //     const tmpOpt = [];
        //     if (newVal.doc && newVal.doc.length > 0) {
        //         for (let i = 0; i < newVal.doc.length; i++) {
        //             tmpOpt.push({
        //                 'id': newVal.doc[i].id,
        //                 'name': newVal.doc[i].name,
        //             });
        //         }
        //         const tmpList = {
        //             type: 'Aktor',
        //             opt: tmpOpt,
        //         };
        //         this.optionsLimitWord.push(tmpList);
        //     }
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
    },
    methods: {
        // arrayToString(data, key = null) {
        //     if (key != null) {
        //         // objectToArray
        //         data = data.map(function(item) {
        //             return item[key];
        //         });
        //     }
        //     try {
        //         return data.join(', ');
        //     } catch (error) {
        //         return '-';
        //     }
        // },
        loadMore() {
            this.page += 1;
            this.getData();
        },
        searchKeyword() {
            clearTimeout(this.timeout);
            const self = this;
            this.timeout = setTimeout(function() {
                self.getData(true);
            }, 650);
        },
        toggleMore() {
            this.openMore = !this.openMore;
        },
        closeMenuGeneralSidebar() {
            this.openMore = false;
        },
        limitText(count) {
            return `dan ${count} lainnya`;
        },
        async asyncFind(query) {
            if (query.length > 2) {
                this.loadingLimitWord = true;
                // this.countLimitWord = 0;
                this.optionsLimitWord = [];
                await this.getDataLimitWord(query);
            }
        },
        clearAll() {
            this.selectedCountries = [];
        },
        getData(reset=false, fromEmit=false) {
            let limit = this.limit;
            if (fromEmit) {
                limit = this.limit * this.page;
            }
            if (reset) {
                this.list_data = [];
                this.page = 1;
            }
            const stateNews = {
                status: 'loading',
                cancel: null,
                code: null,
            };
            this.$store.commit('news/setStatusListNews', stateNews);
            this.$store.dispatch('trend/getListTrend', [limit, this.page, this.keyword])
                .catch((resp) => {
                    stateNews.status = false;
                    this.$store.commit('news/setStatusListNews', stateNews);
                });
        },
        getListGatra() {
            // for dispatch get data
            this.$store.dispatch('graph/getListGatra');
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
        setErrors(empty=true, errors=null) {
            if (empty === true) {
                this.error_name = '';
                // this.error_status = '';
            } else if (empty !== true && errors !== null) {
                this.error_name = errors.name ? errors.name : '';
                // this.error_status = errors.status ? errors.status : '';
            }
        },
        reset(direct=false) {
            // this.setEmptyModel(false);
            this.setEmptyModel(true);
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
            await this.$store.dispatch('trend/create', this.model)
                .then((resp) => {
                    if (resp.result === 'success') {
                        this.openModalTrend = false;

                        this.$router.push({path: '/manajemen/isu'});
                        this.getData(true);

                        Event.$emit('success', 'Data berhasil ditambahkan!');
                    } else {
                        // if (resp.data.message && resp.data.message.errors) {
                        //     this.setErrors(false, resp.data.message.errors);
                        //     // Event.$emit('error', null, resp.data.message.errors);
                        //     Event.$emit('showLoading', false);
                        //     window.scrollTo(0,0);
                        // } else {
                        Event.$emit('error');
                        // }
                    }
                });
        },

        handleScroll() {
            this.nudingScroll = true;
        },
    },
    mounted() {
    // console.log('mounted sidebar issue')
        this.getData(true);
        this.getListGatra();
    },
    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //         console.log(to.name);
    //         // vm.route_name = to.name;
    //         // if (to.name === 'GeneralRolesCreate' || to.name === 'GeneralRolesEdit')
    //         //     vm.getData();
    //     })
    // },
    created() {
        Event.$on('getDataTrend', (status=true, id=null) => {
            // this.$router.push({path: '/manajemen/isu'});
            this.getData(status, true);
            this.redirectId=id;
        });
    },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="sass">
    .box-form-target
        height: calc( 100vh - (94px + 42px + 42px + 24px + 24px + 164px ))
        @apply p-4 overflow-x-hidden overflow-y-auto relative

        .nuding-scroll
            @apply flex items-center justify-center text-xs py-2 px-4 rounded-full border text-center absolute z-50 bg-white text-gray-600 bottom-4 shadow-lg transition-all
            left: 50%
            transform: translateX(-50%)
            .b-icon
                @apply mr-2
                transform: translateY(-4px)
                opacity: 1
                animation: nuding-scroll 2s infinite
            &--hide
                @apply opacity-0 bottom-0

    .box-added
        @apply flex pt-3 gap-2 flex-wrap items-center
        .btn--modifier
            @apply rounded
            background-color: var(--bg-card--hover)
            &:hover
                @apply text-red-500


    .field-adding-keywords
        @apply relative overflow-hidden rounded
        .btn--modifier
            @apply absolute right-0 top-0 rounded-none bg-transparent border-4 h-full border-transparent
            border-left: 1px solid var(--color-primary-500)

    .box-target
        height: calc(100vh - (64px + 47px + 42px + 42px + 24px + 24px))
        overflow: auto


    .cta-target
        width: 100%
        display: flex
        align-items: center
        justify-content: center
        button
            width: 173.17px

    @keyframes nuding-scroll
        from
            transform: translateY(-4px)
            opacity: 1
        to
            transform: translateY(4px)
            opacity: 0

    @keyframes spin
        from
            transform: rotate(0deg)
        to
            transform: rotate(360deg)

    .collection-target
        &__item
            @apply relative
            a
                @apply py-2 px-4 block
                &.router-link-exact-active
                    @apply font-bold
                    color: var(--color-primary-500)

            .btn-more-target
                @apply hidden

            &.collection-crawling
                .loading-crawling
                    @apply absolute right-0 top-0 flex items-center justify-center h-full w-10
                    .b-icon
                        animation: spin 2s infinite
                a
                    max-width: calc( 100% - 40px )
                    @apply pr-0
            &:hover
                background-color: var(--bg-card--hover)

    .summary
        @apply list-disc pl-4
        li
            @apply mb-2
        .highlight
            display: inline
            @apply bg-blue-600 text-yellow-100
            margin: 2px

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
