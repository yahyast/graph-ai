<template lang="pug">
    //- .graph-layouts__search(ref="bigSearch")
    .graph-layouts__search()
        .search(:class="{'search--active' : searchBdi }")
            .search__cta(ref="bigSearchInput")
                template(v-if="!searchBdi")
                    input(
                        placeholder="Cari Isu terkait, Organisasi terkait, Aktor Penting"
                        @focus="searchFocus()"
                    )
                template(v-else)
                    input(
                        placeholder="Cari Isu terkait, Organisasi terkait, Aktor Penting"
                        v-model="bdiKeyword"
                        @keyup="findBdi"
                        v-closable-big-search="{exclude: ['bigSearchInput', 'bigSearchResult'], handler: 'clearSearch'}"
                    )
                    .btn-close
                        b-button(icon_only="x" size="small" @click.native="clearSearch()")
                        //- b-button(icon_only="x" size="small" @click.native="clearSearch()" v-closable-big-search="{exclude: ['bigSearch'], handler: 'clearSearch'}")

            .search__result(v-if="searchBdi" ref="bigSearchResult")
                template(v-if="bdiKeyword.length > 2")
                    .main-search-suggestion(v-if="!categoryBdiSelected")
                        button(@click="searchKeyBDI('all')") <span class="font-bold"> {{ bdiKeyword }} </span> di semua BDI
                        //- button(@click="searchKeyByAllBdi = true, categoryBdiSelected = true") <span class="font-bold"> {{ bdiKeyword }} </span> di semua BDI
                        button(@click="searchKeyBDI('tokoh')") <span class="font-bold"> {{ bdiKeyword }} </span> di Tokoh
                        button(@click="searchKeyBDI('organisasi')")  <span class="font-bold"> {{ bdiKeyword }} </span> di Organisasi
                        button(@click="searchKeyBDI('isu')")  <span class="font-bold"> {{ bdiKeyword }} </span> di Isu

                template(v-else)
                    p.pl-12.py-3.text-sm Silakan ketik minimal 3 karakter
                .main-search-by-bdi
                    .search-by-tokoh(v-show="searchKeyByTokoh")
                        strong.block.font-bold.mb-4.pt-2.px-4 {{ bdiKeyword }} Berdasarkan Tokoh
                        .result-list-by-bdi.scrollbox
                            .result-list-by-bdi__inner.scrollbox-container
                                .block(v-if="status_search_actor.status === 'loading'")
                                    b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                template(v-else-if="search_actor && search_actor.length > 0")
                                    template(v-for="item in search_actor")
                                        b-button.mb-2.mr-2(:text="item.name" kind="secondary" @click.native="fetchResult(item, 'tokoh')")
                                span(v-else) Tokoh tidak ditemukan.

                    .search-by-organisasi(v-show="searchKeyByOrganisasi")
                        strong.block.font-bold.mb-4.pt-2.px-4 {{ bdiKeyword }} Berdasarkan Organisasi
                        .result-list-by-bdi.scrollbox
                            .result-list-by-bdi__inner.scrollbox-container
                                .block(v-if="status_search_organization.status === 'loading'")
                                    b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                template(v-else-if="search_organization && search_organization.length > 0")
                                    template(v-for="item in search_organization")
                                        b-button.mb-2.mr-2(:text="item.name" kind="secondary" @click.native="fetchResult(item, 'organisasi')")
                                span(v-else) Organisasi tidak ditemukan.

                    .search-by-isu(v-show="searchKeyByIsu")
                        .block.font-bold.mb-4.pt-2.px-4 {{ bdiKeyword }} Berdasarkan Isu
                        .result-list-by-bdi.scrollbox
                            .result-list-by-bdi__inner.scrollbox-container
                                .block(v-if="status_search_issue.status === 'loading'")
                                    b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                template(v-else-if="search_issue && search_issue.data && search_issue.data.length > 0")
                                    template(v-for="item in search_issue.data")
                                        b-button.mb-2.mr-2(:text="item.title" kind="secondary" @click.native="fetchResult(item, 'isu')")
                                span(v-else) Isu tidak ditemukan.

                    .search-by-all-bdi(v-show="searchKeyByAllBdi")
                        .block.pt-2.px-4 Pencarian <span class="font-bold">{{  bdiKeyword }}</span>
                        .grid.grid-cols-3.gap-8
                            .search-by-tokoh
                                strong.block.font-bold.mb-4.pt-2.px-4 Berdasarkan Tokoh
                                .result-list.scrollbox
                                    .result-list__inner.scrollbox-container
                                        .block(v-if="status_search_actor.status === 'loading'")
                                            b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                        template(v-else-if="search_actor && search_actor.length > 0")
                                            template(v-for="item in search_actor")
                                                b-button.mb-2(:text="item.name" kind="secondary" @click.native="fetchResult(item, 'tokoh')")
                                        span(v-else) Tokoh tidak ditemukan.

                            .search-by-organisasi
                                strong.block.font-bold.mb-4.pt-2.px-4 Berdasarkan Organisasi
                                .result-list.scrollbox
                                    .result-list__inner.scrollbox-container
                                        .block(v-if="status_search_organization.status === 'loading'")
                                            b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                        template(v-else-if="search_organization && search_organization.length > 0")
                                            template(v-for="item in search_organization")
                                                b-button.mb-2(:text="item.name" kind="secondary" @click.native="fetchResult(item, 'organisasi')")
                                        span(v-else) Organisasi tidak ditemukan.

                            .search-by-isu
                                strong.block.font-bold.mb-4.pt-2.px-4 Berdasarkan Isu
                                .result-list.scrollbox
                                    .result-list__inner.scrollbox-container
                                        .block(v-if="status_search_issue.status === 'loading'")
                                            b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                        template(v-else-if="search_issue && search_issue.data && search_issue.data.length > 0")
                                            template(v-for="item in search_issue.data")
                                                b-button.mb-2(:text="item.title" kind="secondary" @click.native="fetchResult(item, 'isu')")
                                        span(v-else) Isu tidak ditemukan.


                .main-result(v-show="searchResult" :class="{'main-result--issue' : typeBdi == 'isu' }")
                    .main-result__main
                        //- .actor-result
                            .actor-result__photo
                                router-link(to="/")
                                    img(src="https://cdn-radar.jawapos.com/uploads/radarsurabaya/news/2020/12/16/ridwan-kamil-satu-dari-tujuh-gubernur-terbaik-di-asia_m_230610.jpg", alt="alt")
                            .actor-result__profile
                                .flex.items-center.justify-between.mb-2
                                    strong.text-xl Ridwan Kamil
                                    routerLink.link(to="tokoh/name/profil" target="_blank") Lihat di BDI
                                p Dr. (H.C.)[2] H. Mochamad Ridwan Kamil, S.T., M.U.D. (aksara Sunda: ᮙᮧᮎ᮪ᮠᮙᮓ᮪ ᮛᮤᮓ᮪ᮝᮔ᮪ ᮊᮙᮤᮜ᮪; lahir 4 Oktober 1971) adalah seorang arsitek dan politikus Indonesia yang menjabat sebagai Gubernur Jawa Barat
                        .actor-result(v-if="loadingDetailBdi")
                                b-loading.b-loading-inherit(kind="circular" text="" height="0")
                        .actor-result(v-else)
                            .actor-result__photo
                                router-link(:to="typeBdi+'/'+(detailBdi&&detailBdi.id?detailBdi.id:null)+'/detail/profil'" target="_blank")
                                    img(:src="detailBdi && detailBdi.photo? detailBdi.photo : (detailBdi.image?detailBdi.image:getDefaultImage)" @error="getErrorImage")
                            //- .actor-result__profile
                                .flex.items-center.justify-between.mb-2
                                    strong.text-xl {{ detailBdi && detailBdi.name? detailBdi.name : (detailBdi.title?detailBdi.title:'-') }}
                                    routerLink.link(:to="typeBdi+'/'+(detailBdi&&detailBdi.id?detailBdi.id:(detailBdi.id?detailBdi.id:null))+'/detail/profil'" target="_blank") Lihat di BDI
                                //- p.text-paragraph(v-html="detailBdi.profile ? detailBdi.profile : (detailBdi.description?detailBdi.description:'-')")
                                p.text-paragraph(v-html="detailBdi.profile ? trimmedStr(detailBdi.profile) : (detailBdi.description?trimmedStr(detailBdi.description):'-')")
                            .actor-result__profile.w-full
                                .flex.justify-between.mb-2
                                    h2.text-xl.font-bold.flex-grow.block {{ detailBdi && detailBdi.name? detailBdi.name : (detailBdi.title?detailBdi.title:'-') }}
                                    routerLink.link.relative.text-right(:to="typeBdi+'/'+(detailBdi&&detailBdi.id?detailBdi.id:(detailBdi.id?detailBdi.id:null))+'/detail/profil'" target="_blank" style="width:124px; top:5px") Lihat di BDI
                                p.text-paragraph(v-html="detailBdi.profile ? trimmedStr(detailBdi.profile, 225) : (detailBdi.description?trimmedStr(detailBdi.description, 225):'Deskripsi belum tersedia')")

                        .block
                            h5.small-heading.px-4 Berita Terkait
                            .box-source-media.scrollbox
                                .source.scrollbox-container
                                    ul
                                        li(v-for="item in list_berita")
                                            a(:href="item.url" target='_blank')
                                                p(v-html="item.title")
                                                span.text-xs {{ datetimeFormat(item.publishedAt, 'YYYY-MM-DD HH:mm:ss',('DD MMMM YYYY')) }}
                                    template(v-if="list_berita.length > 0 || status_list_news.status == 'loading'")
                                        .relative(v-if="status_list_news.status === 'loading'")
                                            b-loading(kind="circular")
                                        template(v-else-if="list_news.pagination && list_news.pagination.hasNext && list_news.pagination.hasNext === true")
                                            .flex.items-center.justify-center.w-full
                                                b-button(text="Tampilkan berita lainnya..." kind="tertiary" @click.native="loadMoreNews()")

                                        //- .block.text-center.mt-5.mb-5(v-if="list_news.pagination && list_news.pagination.hasNext && list_news.pagination.hasNext === true")
                                            b-button(text="Lainnya..." kind="tertiary" @click.native="loadMoreNews()")
                                    //- .block(v-if="status_list_news.status === 'loading'")
                                        b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                    .block.text-center.mt-5.mb-5(v-else)
                                        span Berita tidak ditemukan

                    aside.main-result__sidebar(v-if="typeBdi == 'tokoh' || typeBdi == 'organisasi'" )
                        .result-sidebar.scrollbox
                            .block.scrollbox-container

                                //- .mb-1.width-full(v-if="chartOptions.xAxis.categories.length > 0 && chartOptions.series[0].data.length > 0")
                                template(v-if="loadingIan")
                                    b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                .mb-8.width-full(v-else-if="chartOptions.xAxis.categories.length > 0 && chartOptions.series[0].data.length > 0")
                                    Chart( :options="chartOptions")

                                .mb-2
                                    h5.small-heading.block Sosial Media
                                    template(v-if="loadingDetailBdi")
                                        b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                    //- ul.social-media(v-if="detailBdi && detailBdi.social_media && detailBdi.social_media.length > 0")
                                    //-     template(v-for="item in detailBdi.social_media")
                                    //-         li(v-if="item.username && item.username.length > 0" v-tooltip="(item.media_type?capitalizeFirstLetter(item.media_type):'-')")
                                    //-             a(:href="item.username" target="_blank"): img(:src="item.media_type? '/images/socmed/'+item.media_type+'.png': getDefaultImage" @error="getErrorImage")

                                    template(v-else)
                                        ul.flex.items-center.gap-2.py-4.flex-wrap(v-if="detailBdi && detailBdi.social_media && detailBdi.social_media.length > 0")
                                            li.list-socmed(v-for="item in detailBdi.social_media" v-tooltip="(item.media_type?capitalizeFirstLetter(item.media_type):'-')")
                                                //- a(:href="item.username" target="_blank"): img(:src="item.media_type? '/images/socmed/'+item.media_type+'.png': getDefaultImage" @error="getErrorImage")
                                                template(v-if="item.media_type === 'facebook'")
                                                    a(:href="item.username && item.username.length > 0 ? item.username : ('https://www.google.com/search?q='+(detailBdi && detailBdi.name? detailBdi.name : (detailBdi.title?detailBdi.title:''))+' '+item.media_type )" target="blank")
                                                        b-button(:customIcon="true" :icon_only="facebook" kind="primary" size="small")

                                                template(v-else-if="item.media_type === 'twitter'")
                                                    a(:href="item.username && item.username.length > 0 ? item.username : ('https://www.google.com/search?q='+(detailBdi && detailBdi.name? detailBdi.name : (detailBdi.title?detailBdi.title:''))+' '+item.media_type )" target="blank")
                                                        b-button(:customIcon="true" :icon_only="twitter" kind="primary" size="small")

                                                template(v-else-if="item.media_type === 'instagram'")
                                                    a(:href="item.username && item.username.length > 0 ? item.username : ('https://www.google.com/search?q='+(detailBdi && detailBdi.name? detailBdi.name : (detailBdi.title?detailBdi.title:''))+' '+item.media_type )" target="blank")
                                                        b-button(:customIcon="true" :icon_only="instagram" kind="primary" size="small")

                                                template(v-else-if="item.media_type === 'youtube'")
                                                    a(:href="item.username && item.username.length > 0 ? item.username : ('https://www.google.com/search?q='+(detailBdi && detailBdi.name? detailBdi.name : (detailBdi.title?detailBdi.title:''))+' '+item.media_type )" target="blank")
                                                        b-button(:customIcon="true" :icon_only="youtube" kind="primary" size="small")

                                                template(v-else-if="item.media_type === 'tiktok'")
                                                    a(:href="item.username && item.username.length > 0 ? item.username : ('https://www.google.com/search?q='+(detailBdi && detailBdi.name? detailBdi.name : (detailBdi.title?detailBdi.title:''))+' '+item.media_type )" target="blank")
                                                        b-button(:customIcon="true" :icon_only="tiktok" kind="primary" size="small")

                                                template(v-else-if="item.media_type === 'vimeo'")
                                                    a(:href="item.username && item.username.length > 0 ? item.username : ('https://www.google.com/search?q='+(detailBdi && detailBdi.name? detailBdi.name : (detailBdi.title?detailBdi.title:''))+' '+item.media_type )" target="blank")
                                                        b-button(:customIcon="true" :icon_only="vimeo" kind="primary" size="small")

                                                template(v-else)
                                                    a(:href="item.username && item.username.length > 0 ? item.username : ('https://www.google.com/search?q='+(detailBdi && detailBdi.name? detailBdi.name : (detailBdi.title?detailBdi.title:''))+' '+item.media_type )" target="blank")
                                                        b-button( :text="item.media_type" kind="primary" size="small")
                                        .block.mt-1.mb-8(v-else)
                                            span Sosial media tidak ditemukan.
                                .mb-2
                                    h5.small-heading.mb-4.block Tokoh Terkait
                                    .block(v-if="status_related_figures.status === 'loading' || status_related_organizations.status === 'loading'")
                                        b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                    .box-related(v-else-if="relatedFigureData.length >0")
                                        template(v-for="item in relatedFigureData")
                                            router-link.btn-related(:to="'/bdi/tokoh/'+ encodeURIComponent(item.label)" target="_blank"): b-button(:text="item.label" kind="secondary" size="small")
                                            //- b-button.btn-related(:text="item.label" kind="secondary" size="small")
                                    .block.-mt-3.mb-8(v-else)
                                        span Tokoh tidak ditemukan.

                                .block
                                    h5.small-heading.mb-4.block Organisasi Terkait
                                    .block(v-if="status_related_figures.status === 'loading'|| status_related_organizations.status === 'loading'")
                                        b-loading.b-loading-inherit(kind="circular" text="" height="0")
                                    .box-related(v-else-if="relatedOrgData.length >0")
                                        template(v-for="item in relatedOrgData")
                                            router-link.btn-related(:to="'/bdi/organisasi/'+ encodeURIComponent(item.label)" target="_blank"): b-button(:text="item.label" kind="secondary" size="small")
                                            //- b-button.btn-related(:text="item.label" kind="secondary" size="small")
                                    .block.-mt-3.mb-8(v-else)
                                        span Organisasi tidak ditemukan.

</template>

<script>
import {mapState} from 'vuex';
import DynamicsComponents from '@/components/Dynamics';
import {Chart} from 'highcharts-vue';
let handleOutsideClick;

export default {
    name: 'GraphSearch',
    components: {
        DynamicsComponents,
        Chart,
    },
    directives: {
        'closable-big-search': {
            bind(el, binding, vnode) {
                handleOutsideClick = (e) => {
                    e.stopPropagation();
                    const {handler, exclude} = binding.value;
                    let clickedOnExcludedEl = false;
                    console.log('exclude');
                    console.log(exclude);
                    exclude.forEach((refName) => {
                        if (!clickedOnExcludedEl) {
                            const excludedEl = vnode.context.$refs[refName];
                            
                            console.log('refName', refName);
                            console.log('excludedEl', excludedEl);
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
            bdiKeyword: '',
            searchBdi: false,
            categoryBdiSelected: false,
            searchSuggestion: false,
            from_bdi_search_section: false,

            searchKeyByAllBdi: false,
            searchKeyByOrganisasi: false,
            searchKeyByTokoh: false,
            searchKeyByIsu: false,

            searchResult: false,

            selectedBdi: null,
            typeBdi: null,
            detailBdi: {},

            list_berita: [],
            limit_berita: 10,
            page_berita: 1,

            loadingDetailBdi: false,
            loadingIan: false,

            chartOptions: {
                title: {
                    text: null,
                },
                legend: {
                    enabled: false,
                },
                chart: {
                    type: 'area',
                    polar: true,
                    height: '200px',
                },
                xAxis: {
                    categories: ['ekonomi', 'hankam', 'ideologi', 'misc', 'politik', 'sosbud'],
                    // categories: [],
                },
                series: [{
                    type: 'area',
                    name: 'Area',
                    data: [0, 0, 0, 0, 0, 0],
                    // data: [],
                }],
            },

            relatedFigureData: [],
            relatedOrgData: [],

            facebook: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Facebook</title><path d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z" fill-rule="evenodd" fill="white"/></svg>',
            instagram: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Instagram</title><path fill="white" d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"/><path fill="white" d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"/></svg>',
            twitter: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Twitter</title><path fill="white" d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z"/></svg>',
            youtube: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Youtube</title><path d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z"/></svg>',
            tiktok: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Tiktok</title><path d="M412.19 118.66a109.27 109.27 0 01-9.45-5.5 132.87 132.87 0 01-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14 23.9 350 16 350.13 16h-82.44v318.78c0 4.28 0 8.51-.18 12.69 0 .52-.05 1-.08 1.56 0 .23 0 .47-.05.71v.18a70 70 0 01-35.22 55.56 68.8 68.8 0 01-34.11 9c-38.41 0-69.54-31.32-69.54-70s31.13-70 69.54-70a68.9 68.9 0 0121.41 3.39l.1-83.94a153.14 153.14 0 00-118 34.52 161.79 161.79 0 00-35.3 43.53c-3.48 6-16.61 30.11-18.2 69.24-1 22.21 5.67 45.22 8.85 54.73v.2c2 5.6 9.75 24.71 22.38 40.82A167.53 167.53 0 00115 470.66v-.2l.2.2c39.91 27.12 84.16 25.34 84.16 25.34 7.66-.31 33.32 0 62.46-13.81 32.32-15.31 50.72-38.12 50.72-38.12a158.46 158.46 0 0027.64-45.93c7.46-19.61 9.95-43.13 9.95-52.53V176.49c1 .6 14.32 9.41 14.32 9.41s19.19 12.3 49.13 20.31c21.48 5.7 50.42 6.9 50.42 6.9v-81.84c-10.14 1.1-30.73-2.1-51.81-12.61z"/></svg>',
            vimeo: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Vimeo</title><path d="M476.9 114c-5-23.39-17.51-38.78-40.61-46.27s-64.92-4.5-94.12 16.79c-26.79 19.51-46.26 54.42-54 78.28a4 4 0 005.13 5c10.77-3.8 21.72-7.1 34-6.45 15 .8 24.51 12 24.91 25.29.3 9.79-.2 18.69-3.6 27.68-10.74 28.68-27.61 56.46-47.55 80.75a72.49 72.49 0 01-10 9.89c-10.21 8.29-18.81 6.1-25.41-5.2-5.4-9.29-9-18.88-12.2-29.08-12.4-39.67-16.81-80.84-23.81-121.52-3.3-19.48-7-39.77-18-56.86-11.6-17.79-28.61-24.58-50-22-14.7 1.8-36.91 17.49-47.81 26.39 0 0-56 46.87-81.82 71.35l21.2 27s17.91-12.49 27.51-18.29c5.7-3.39 12.4-4.09 17.2.2 4.51 3.9 9.61 9 12.31 14.1 5.7 10.69 11.2 21.88 14.7 33.37 13.2 44.27 25.51 88.64 37.81 133.22 6.3 22.78 13.9 44.17 28 63.55 19.31 26.59 39.61 32.68 70.92 21.49 25.41-9.09 46.61-26.18 66-43.87 33.11-30.18 59.12-65.36 85.52-101.14 20.41-27.67 37.31-55.67 51.41-86.95C478.5 179.74 484 147.26 476.9 114z"/></svg>',
        };
    },
    computed: {
        ...mapState('organization', {
            status_search_organization: 'status_search_organization',
            search_organization: 'search_organization',
            status_detail_organization: 'status_detail',
            detail_organization: 'detail',
            ian_organization: 'ian_organization',
            status_ian_organization: 'status_ian_organization',
            related_organizations: 'related_organizations',
            status_related_organizations: 'status_related_organizations',
        }),
        ...mapState('actor', {
            status_search_actor: 'status_search_actor',
            search_actor: 'search_actor',
            status_detail_actor: 'status_detail',
            detail_actor: 'detail',
            ian_figure: 'ian_figure',
            status_ian_figure: 'status_ian_figure',
            related_figures: 'related_figures',
            status_related_figures: 'status_related_figures',
        }),
        ...mapState('issue', {
            status_search_issue: 'status_search_issue',
            search_issue: 'search_issue',
            status_detail_issue: 'status_detail',
            detail_issue: 'detail',
        }),
        ...mapState('news', [
            'status_list_news',
            'list_news',
        ]),
    },
    watch: {
        related_figures(newVal) {
            if (newVal && newVal.length >0) {
                const dataFigure = newVal.filter(function(el) {
                    return el.class == 'PER';
                });
                const dataOrg = newVal.filter(function(el) {
                    return el.class == 'ORG';
                });
                this.relatedFigureData = dataFigure;
                this.relatedOrgData = dataOrg;
            }
        },
        related_organizations(newVal) {
            if (newVal && newVal.length >0) {
                const dataFigure = newVal.filter(function(el) {
                    return el.class == 'PER';
                });
                const dataOrg = newVal.filter(function(el) {
                    return el.class == 'ORG';
                });
                this.relatedFigureData = dataFigure;
                this.relatedOrgData = dataOrg;
            }
        },
        list_news(newVal) {
            if (newVal.doc && newVal.doc.length > 0) {
                for (let i = 0; i < newVal.doc.length; i++) {
                    this.list_berita.push(newVal.doc[i]);
                }
            }
        },
        bdiKeyword(newVal, oldVal) {
            console.log('bdiKeyword watch');
            if (this.categoryBdiSelected || this.searchSuggestion || this.searchKeyByAllBdi || this.searchKeyByOrganisasi || this.searchKeyByTokoh || this.searchKeyByIsu || this.searchResult) {
                console.log('bdiKeyword watch clear');
                this.clearSearch(false);
            }
        },
        detail_organization(newVal) {
            this.detailBdi = newVal;
            this.loadingDetailBdi = false;
        },
        detail_actor(newVal) {
            this.detailBdi = newVal;
            this.loadingDetailBdi = false;
        },
        detail_issue(newVal) {
            this.detailBdi = newVal;
            this.loadingDetailBdi = false;
        },
        ian_organization(newVal) {
            if (newVal && Object.keys(newVal).length > 0) {
                this.updateChartIan(newVal);
            }
        },
        ian_figure(newVal) {
            if (newVal && Object.keys(newVal).length > 0) {
                this.updateChartIan(newVal);
            }
        },
    },
    methods: {
        loadMoreNews() {
            this.from_bdi_search_section = true;
            this.page_berita += 1;
            this.getNews();
        },
        getNews(reset) {
            if (reset) {
                this.list_berita = [];
                this.page_berita = 1;
            }
            const searchData = {
                // 'limit_word': [
                //     {
                //         'id': (this.selectedBdi.id?this.selectedBdi.id:null),
                //         'name': this.selectedBdi.title?this.selectedBdi.title:(this.selectedBdi.name?this.selectedBdi.name:null),
                //     },
                // ],
                'related_news': this.selectedBdi.title?this.selectedBdi.title:(this.selectedBdi.name?this.selectedBdi.name:null),
            };

            this.$store.dispatch('news/getListNews', [10, this.page_berita, searchData] );
        },
        searchKeyBDI(type) {
            this.categoryBdiSelected = true;
            this.from_bdi_search_section = true;

            if (type == 'organisasi') {
                this.searchKeyByOrganisasi = true;
                this.getDataOrganisasi();
            } else if (type == 'tokoh') {
                this.searchKeyByTokoh = true;
                this.getDataTokoh();
            } else if (type == 'isu') {
                this.searchKeyByIsu = true;
                this.getDataIssue();
            } else {
                this.searchKeyByAllBdi = true;
                this.getDataOrganisasi();
                this.getDataTokoh();
                this.getDataIssue();
            }
        },
        async fetchResult(item, type) {
            this.selectedBdi = item;
            this.typeBdi = type;
            this.searchResult = true;
            this.searchKeyByAllBdi = false;
            this.searchKeyByOrganisasi = false;
            this.searchKeyByTokoh = false;
            this.searchKeyByIsu = false;
            this.detailBdi = {};
            this.loadingDetailBdi = true;
            this.relatedFigureData= [];
            this.relatedOrgData= [];
            this.chartOptions.xAxis.categories = ['ekonomi', 'hankam', 'ideologi', 'misc', 'politik', 'sosbud'];
            this.chartOptions.series[0].data = [0, 0, 0, 0, 0, 0];
            this.from_bdi_search_section = true;
            await this.$store.commit('actor/setRelatedFigures', {});
            await this.$store.commit('organization/setRelatedOrganizations', {});

            let module = null;
            switch (type) {
            case 'organisasi':
                module = 'organization';
                break;
            case 'tokoh':
                module = 'actor';
                break;
            case 'isu':
                module = 'issue';
                break;
            default:
                break;
            }
            // get detail bdi
            this.$store.dispatch(module+'/getDetail', (item.id?item.id:item.id))
                .then((resp) => {
                    if (resp === 'success') {

                    } else {
                        // Event.$emit('error');
                    }
                });

            // get News
            this.getNews(true);

            // get IAN
            if (type === 'tokoh') {
                this.loadingIan=true;
                this.$store.dispatch('actor/getIanFigure', [(item.name?item.name:null)])
                    .then((resp) => {
                        this.loadingIan=false;
                    });
            } else if (type === 'organisasi') {
                this.loadingIan=true;
                this.$store.dispatch('organization/getIanOrganization', [(item.name?item.name:null)])
                    .then((resp) => {
                        this.loadingIan=false;
                    });
            }
            if (type === 'tokoh') {
                // get Related Figure
                this.$store.dispatch('actor/getRelatedFigures', [(item.name?item.name:null)]);
            } else if (type === 'organisasi') {
                // get Related ORG
                this.$store.dispatch('organization/getRelatedOrganizations', [(item.name?item.name:null)]);
            }
        },
        getDataOrganisasi() {
            const limit=10;
            const page=1;
            this.$store.dispatch('organization/getSearchOrganization', [limit, page, this.bdiKeyword]);
        },
        getDataTokoh() {
            const limit=10;
            const page=1;
            this.$store.dispatch('actor/getSearchActor', [limit, page, this.bdiKeyword]);
        },
        getDataIssue() {
            const limit=10;
            const page=1;
            this.$store.dispatch('issue/getSearchIssue', [limit, page, this.bdiKeyword]);
        },
        findBdi() {
            if (this.bdiKeyword.length > 2) {
                // this.clearSearch();
            }
        },
        hide() {
            this.searchResulta = false;
        },
        searchFocus() {
            Event.$emit('disabledDynamic');
            Event.$emit('openIfoIan', false);
            
            this.searchBdi = !this.searchBdi;
            if (this.searchBdi === true) {
                this.searchSuggestion === true;
            }
        },
        clearSearch(clearKeyword=true) {
            Event.$emit('openIfoIan', false);

            if (this.from_bdi_search_section === false) {
                Event.$emit('openDynamic');
                if (clearKeyword) {
                    this.bdiKeyword = '';
                    this.searchBdi = false;
                }
                this.typeBdi = null;
                this.categoryBdiSelected = false;
                this.searchSuggestion = false;
                this.searchKeyByAllBdi = false;
                this.searchKeyByOrganisasi = false;
                this.searchKeyByTokoh = false;
                this.searchKeyByIsu = false;
                this.searchResult = false;

            } else {
                this.from_bdi_search_section = false;
            }
        },
        getData(reset=false, type='all') {
            if (reset) {
                // reset data commit
                this.list_data = [];
                this.page = 1;
            }
            this.$store.dispatch('actor/getListActor', [this.limit, this.page, this.keyword, this.orderShort]);
        },
        updateChartIan(data) {
            const categories = [];
            const series = [];

            for (const [key, value] of Object.entries(data)) {
                if (key != 'average') {
                    categories.push(key);
                    series.push(value);
                }
            }

            this.chartOptions.xAxis.categories = categories;
            this.chartOptions.series[0].data = series;
        },
    },
};
</script>

<style lang="sass">
    .social-media
        @apply flex items-center gap-4 py-4
        a
            @apply block
        img
            @apply w-6

    .main-search-suggestion
        z-index: 1000
        @apply pl-6 pb-0
        button
            @apply block px-4 py-3
            &:hover
                color: var(--text-link)
                @apply underline
</style>
