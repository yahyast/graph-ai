<template lang="pug">
    .box-photo.w-full
        //- form filter
        .main-menu
            .flex.items-center.gap-x-4
                ul.menu
                    li: routerLink(to="/bdi/foto") Semua Foto
                    li: routerLink(to="/bdi/foto/album") Album
            routerLink(to="/bdi/foto/form/create")
                b-button(text="Foto baru" text_icon_left="plus" kind="primary")

        .block.w-full
            .card-bg-theme.p-6.rounded.shadow.w-full(v-if="list_data.length > 0")
                table.main-table
                    thead
                        tr
                            th Album
                            //- th Foto
                            th diperbarui
                            th
                    tbody
                        tr(
                            v-for="item in list_data"
                        )
                            td
                                .flex.items-center
                                    .mr-4
                                        .h-24.w-24.grid.grid-cols-2.gap-1.grid-rows-2
                                            template(v-if="item.image.length > 0")
                                                img.w-full.h-full.object-cover(v-for="img in item.image.slice(0,4)" :src="img.thumbnail" alt="alt" @error="getErrorImage")
                                    .block-area
                                        routerLink.link(:to="'/bdi/foto/form/'+ item.id") {{ item.title && item.title.length > 0 ? item.title : '-' }}
                                        p {{ item.description && item.description.length > 0 ? item.description : '-' }}
                            //- td {{ item.photo }}
                            td
                                span.block.mb-1 {{ item.updated_by && item.updated_by.length > 0 ? item.updated_by : '-' }}
                                //- p.text-xs {{ item.updated_at && item.updated_at.length > 0 ? datetimeFormat(item.updated_at) : '-' }}
                                p.text-xs {{ item.updated_at && item.updated_at.length > 0 ? item.updated_at : '-' }}
                            td
                                .flex.items-center.justify-end
                                    //- router-link.mr-3(:to="'/bdi/foto/form/'+ item.id")
                                        b-button(icon_only="edit" kind="tertiary")
                                    b-button(icon_only="trash" kind="danger" @click.native="deleteData(item.id, item.title)")


            .text-center.mt-10.mb-10(v-if="list_data.length > 0 || status_list_album.status === 'loading'")
                .relative(v-if="status_list_album.status === 'loading'")
                    b-loading(text="Memuat data" kind="")

                template(v-else)
                    b-button(v-if="list_album.current_page && list_album.total_page && list_album.current_page < list_album.total_page" text="Lainnya..." kind="tertiary" @click.native="loadMore()")
                    //- span(v-else) Tidak ada data lain.

            .text-center.mt-10.mb-10(v-else)
                span Data tidak ditemukan.

            //- .bg-white.p-6.rounded.shadow.w-full
                table.main-table
                    thead
                        tr
                            th Album
                            //- th Foto
                            th diperbarui
                            th
                    tbody
                        tr(
                            v-for="item in dataAlbum"
                        )
                            td
                                .flex.items-center
                                    .mr-4
                                        .h-24.w-24.grid.grid-cols-2.gap-1.grid-rows-2
                                            img.w-full.h-full.object-cover(src="https://images.pexels.com/photos/9849842/pexels-photo-9849842.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500", alt="alt")
                                            //- img.w-full.h-full.object-cover(src="https://images.pexels.com/photos/9849842/pexels-photo-9849842.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500", alt="alt")
                                            //- img.w-full.h-full.object-cover(src="https://images.pexels.com/photos/9849842/pexels-photo-9849842.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500", alt="alt")
                                            //- img.w-full.h-full.object-cover(src="https://images.pexels.com/photos/9849842/pexels-photo-9849842.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500", alt="alt")
                                    .block-area
                                        routerLink.link(to="/bdi/foto/form") {{ item.name }}
                                        p {{ item.desc }}
                            //- td {{ item.photo }}
                            td
                                span.block.mb-1 {{ item.updatedBy }}
                                p.text-xs {{ item.updatedTime }}
                            td
                                .flex.items-center.justify-end
                                    b-button(icon_only="trash" kind="danger")

</template>

<script>
import {mapState} from 'vuex';
import moment from 'moment';

export default {
    name: 'BdiListOfPhotoAlbum',
    components: {

    },
    data() {
        return {
            // dataAlbum: [
            //     {
            //         name: 'Album',
            //         // desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
            //         desc: "Lorem Ipsum is ",
            //         photo: 40,
            //         updatedBy: 'Admin',
            //         updatedTime: '10 Agustus 2921 18:00 WIB',
            //     },
            //     {
            //         name: 'Album',
            //         desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
            //         photo: 40,
            //         updatedBy: 'Admin',
            //         updatedTime: '10 Agustus 2921 18:00 WIB',
            //     },
            // ],


            list_data: [],
            // limit: 10,
            limit: 20,
            page: 1,
            // orderShort: '',
            keyword: '',
            timeout: null,
        };
    },
    computed: {
        ...mapState('photo', [
            'status_list_album',
            'list_album',
        ]),
    },
    watch: {
        list_album(newVal) {
            // console.log(newVal);
            if (newVal.items && newVal.items.length > 0) {
                for (let i = 0; i < newVal.items.length; i++) {
                    this.list_data.push(newVal.items[i]);
                }
            }
        },
    },
    methods: {
        getData(reset=false) {
            if (reset) {
                this.list_data = [];
                this.page = 1;
            }
            this.$store.dispatch('photo/getListAlbum', [this.limit, this.page, this.keyword]);
        },
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
        deleteData(id, name) {
            this.$swal.fire({
                icon: 'warning',
                title: 'Konfirmasi Hapus Album',
                text: 'Apakah anda yakin akan menghapus album ' + name + '? Dengan menghapus album, semua foto didalam album akan terhapus.',
                confirmButtonText: 'Ya, hapus album',
                confirmButtonColor: '#DD6B55',
                cancelButtonText: 'Batalkan',
                showCancelButton: true,
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        Event.$emit('showLoading', true);

                        this.$store.dispatch('photo/deleteAlbum', id)
                            .then((resp) => {
                                if (resp === 'success') {
                                    this.page = 0;

                                    this.getData(true);

                                    this.$swal.fire({
                                        icon: 'success',
                                        title: 'Data berhasil dihapus!',
                                        timer: 3000,
                                    });
                                } else {
                                    if (resp.data && resp.data.message) {
                                        Event.$emit('error', resp.data.message);
                                    } else {
                                        Event.$emit('error');
                                    }
                                }
                            });
                    }
                });
        },
    },
    mounted() {
        // console.log('mounted list album');
        // console.log(this.$route.name);
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            // console.log(to.name);
            vm.$store.commit('photo/setListAlbum', {});
            if (to.name === 'BDI_ListOfPhotoAlbum') {
                vm.getData();
            }
        });
    },
};
</script>

<style lang="sass">
.block-area
    max-width: 400px
</style>
