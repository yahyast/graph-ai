<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadActor
        .content-bdi__body
            .grid.grid-cols-10.gap-8
                .col-span-6
                    .heading-submenu
                        h2.subheading Profil Ringkas
                        routerLink(:to="'/tokoh/'+ id +'/form/profile'" v-tooltip="'Sunting'")
                            b-button(kind='tertiary' icon_only="edit-2")

                    .relative.text-center.m-5.p-5(v-if="status_detail === 'loading'")
                        b-loading(text="Memuat data")
                    p.text-paragraph(v-else v-html="detail.profile && detail.profile.length > 0 ? detail.profile : '-'")

                    .heading-submenu
                        h2.subheading Biografi Singkat
                        routerLink(:to="'/tokoh/'+ id +'/form/profile'" v-tooltip="'Sunting'")
                            b-button(kind='tertiary' icon_only="edit-2")
                    .relative.text-center.m-5.p-5.w-full(v-if="status_detail === 'loading'")
                        b-loading(text="Memuat data")
                    p.text-paragraph(v-else v-html="detail.biographic && detail.biographic.length > 0 ? detail.biographic : '-'")

                    .heading-submenu.mt-2
                        h2.subheading Sosial Media
                        routerLink(:to="'/tokoh/'+ id +'/form/profile'" v-tooltip="'Sunting'")
                            b-button(kind='tertiary' icon_only="edit-2")
                    .relative.text-center.m-5.p-5.w-full(v-if="status_detail === 'loading'")
                        b-loading(text="Memuat data")
                    //- ul(v-else-if="detail.social_media && detail.social_media.length > 0")
                    //-     li.w-full.flex.items-center.mb-2(v-for="item in detail.social_media")
                    //-         span.block(class="w-1/2") {{ item.media_type }}
                    //-         Strong.block(class="w-1/2") {{ item.username && item.username.length > 0 ? item.username : '-' }}

                    ul.flex.items-center.gap-2(v-else-if="detail.social_media && detail.social_media.length > 0")
                        li.list-socmed(v-for="item in detail.social_media")

                            template(v-if="item.media_type === 'facebook'")
                                a(:href="item.username && item.username.length > 0 ? item.username : '#'" target="blank" v-tooltip="'Facebook'")
                                    b-button(:customIcon="true" :icon_only="facebook" kind="primary")

                            template(v-else-if="item.media_type === 'twitter'")
                                a(:href="item.username && item.username.length > 0 ? item.username : '#'" target="blank" v-tooltip="'Twitter'")
                                    b-button(:customIcon="true" :icon_only="twitter" kind="primary")

                            template(v-else-if="item.media_type === 'instagram'")
                                a(:href="item.username && item.username.length > 0 ? item.username : '#'" target="blank" v-tooltip="'Instagram'")
                                    b-button(:customIcon="true" :icon_only="instagram" kind="primary")

                            template(v-else-if="item.media_type === 'youtube'")
                                a(:href="item.username && item.username.length > 0 ? item.username : '#'" target="blank" v-tooltip="'YouTube'")
                                    b-button(:customIcon="true" :icon_only="youtube" kind="primary")

                            template(v-else-if="item.media_type === 'youtube'")
                                a(:href="item.username && item.username.length > 0 ? item.username : '#'" target="blank" v-tooltip="'YouTube'")
                                    b-button(:customIcon="true" :icon_only="youtube" kind="primary")

                            template(v-else-if="item.media_type === 'tiktok'")
                                a(:href="item.username && item.username.length > 0 ? item.username : '#'" target="blank" v-tooltip="'TikTok'")
                                    b-button(:customIcon="true" :icon_only="tiktok" kind="primary")

                            template(v-else-if="item.media_type === 'vimeo'")
                                a(:href="item.username && item.username.length > 0 ? item.username : '#'" target="blank" v-tooltip="'Vimeo'")
                                    b-button(:customIcon="true" :icon_only="vimeo" kind="primary")

                            template(v-else)
                                a(:href="item.username && item.username.length > 0 ? item.username : '#'" target="blank")
                                    b-button( :text="item.media_type" kind="primary")

                            

                    span(v-else) -

                .col-span-4
                    .block
                        .card
                            .card__body
                                .mb-4
                                    h3.h3.pb-2 Pendidikan
                                    .relative.text-center.m-5.p-5.w-full(v-if="status_detail === 'loading'")
                                        b-loading(text="Memuat data pendidikan")
                                    p.text-paragraph(v-else v-html="detail.education && detail.education.length > 0 ? detail.education : '-'")

                                    //- ul.bdi-list
                                        li SD YPK I Serui, Papua (1957-1963)
                                        li SMP YPK I Serui, Papua (1963-1966)
                                        li SMA YPK Biak, Papua (1967-1970)
                                        li Kursus Bahasa &amp; Manajemen Perminyakan, Inggris (1973)

                                .mb-4
                                    h3.h3.pb-2 Perjalanan Karier
                                    .relative.text-center.m-5.p-5.w-full(v-if="status_detail === 'loading'")
                                        b-loading(text="Memuat data karier")
                                    p.text-paragraph(v-else v-html="detail.career && detail.career.length > 0 ? detail.career : '-'")
                                    //- ul.bdi-list
                                        li Manajer Cabang - Philip Petroleum, Sorong, Papua 1971 - 2014
                                        li Ketua Pengawas - Induk Koperasi Perisai Bangsa
                                        li Presiden komisaris - PT Tiga Mitra Prima
                                        li Anggota MPR RI Partai Golkar 1997-1999
                                        li Anggota DPR RI Partai Golkar 2004-2009
                                        li Anggota Komisi I DPR RI 2009-2014
                                        li Anggota Komisi DPR RI 2014-2019
                                        li Anggota DPD RI Papua 2019-2024

        .content-bdi__footer
                //- p Terakhir disunting pada <router-Link class="link" to="/tokoh/name/profil/log/detail" style="font-weight: normal !important"> 10 November 2021 10:00 WIB </router-link> oleh Admin. <router-Link class="link" to="/tokoh/name/profil/log" style="font-weight: normal !important"> Lihat semua riwayat perubahan </router-link>
                p Terakhir disunting pada <router-Link class="link" :to="'/tokoh/'+ id +'/detail/profil/log'" style="font-weight: normal !important"> {{ detail.updated_at && detail.updated_at.length > 0 ? datetimeFormat(detail.updated_at) : '-' }} </router-link> oleh {{ detail.updated_by && detail.updated_by.length > 0 ? detail.updated_by : '-' }}. <router-Link class="link" :to="'/tokoh/'+ id +'/detail/profil/log'" style="font-weight: normal !important"> Lihat semua riwayat perubahan </router-link>

</template>

<script>
import {mapState} from 'vuex';
import HeadActor from '@/pages/actor/HeadActor';

export default {
    name: 'ProfileOfActor',
    components: {
        HeadActor,
    },
    props: ['id'],
    data() {
        return {
            facebook: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Facebook</title><path d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z" fill-rule="evenodd" fill="white"/></svg>',
            instagram: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Instagram</title><path fill="white" d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"/><path fill="white" d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"/></svg>',
            twitter: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Twitter</title><path fill="white" d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z"/></svg>',
            youtube: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Youtube</title><path d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z"/></svg>',
            tiktok: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Tiktok</title><path d="M412.19 118.66a109.27 109.27 0 01-9.45-5.5 132.87 132.87 0 01-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14 23.9 350 16 350.13 16h-82.44v318.78c0 4.28 0 8.51-.18 12.69 0 .52-.05 1-.08 1.56 0 .23 0 .47-.05.71v.18a70 70 0 01-35.22 55.56 68.8 68.8 0 01-34.11 9c-38.41 0-69.54-31.32-69.54-70s31.13-70 69.54-70a68.9 68.9 0 0121.41 3.39l.1-83.94a153.14 153.14 0 00-118 34.52 161.79 161.79 0 00-35.3 43.53c-3.48 6-16.61 30.11-18.2 69.24-1 22.21 5.67 45.22 8.85 54.73v.2c2 5.6 9.75 24.71 22.38 40.82A167.53 167.53 0 00115 470.66v-.2l.2.2c39.91 27.12 84.16 25.34 84.16 25.34 7.66-.31 33.32 0 62.46-13.81 32.32-15.31 50.72-38.12 50.72-38.12a158.46 158.46 0 0027.64-45.93c7.46-19.61 9.95-43.13 9.95-52.53V176.49c1 .6 14.32 9.41 14.32 9.41s19.19 12.3 49.13 20.31c21.48 5.7 50.42 6.9 50.42 6.9v-81.84c-10.14 1.1-30.73-2.1-51.81-12.61z"/></svg>',
            vimeo: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Vimeo</title><path d="M476.9 114c-5-23.39-17.51-38.78-40.61-46.27s-64.92-4.5-94.12 16.79c-26.79 19.51-46.26 54.42-54 78.28a4 4 0 005.13 5c10.77-3.8 21.72-7.1 34-6.45 15 .8 24.51 12 24.91 25.29.3 9.79-.2 18.69-3.6 27.68-10.74 28.68-27.61 56.46-47.55 80.75a72.49 72.49 0 01-10 9.89c-10.21 8.29-18.81 6.1-25.41-5.2-5.4-9.29-9-18.88-12.2-29.08-12.4-39.67-16.81-80.84-23.81-121.52-3.3-19.48-7-39.77-18-56.86-11.6-17.79-28.61-24.58-50-22-14.7 1.8-36.91 17.49-47.81 26.39 0 0-56 46.87-81.82 71.35l21.2 27s17.91-12.49 27.51-18.29c5.7-3.39 12.4-4.09 17.2.2 4.51 3.9 9.61 9 12.31 14.1 5.7 10.69 11.2 21.88 14.7 33.37 13.2 44.27 25.51 88.64 37.81 133.22 6.3 22.78 13.9 44.17 28 63.55 19.31 26.59 39.61 32.68 70.92 21.49 25.41-9.09 46.61-26.18 66-43.87 33.11-30.18 59.12-65.36 85.52-101.14 20.41-27.67 37.31-55.67 51.41-86.95C478.5 179.74 484 147.26 476.9 114z"/></svg>',
        }
    },
    computed: {
        ...mapState('actor', [
            'status_detail',
            'detail',
        ]),
    },
    methods: {
    },
};
</script>

<style lang="sass">

</style>
