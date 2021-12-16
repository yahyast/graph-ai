<template lang="pug">
    .w-full
        //- form filter
        .main-menu
            .flex.items-center.gap-x-4
                ul.menu
                    li: routerLink(to="/bdi/foto") Semua Foto
                    li: routerLink(to="/bdi/foto/album") Album
            routerLink(to="/bdi/foto/form/create")
                b-button(text="Foto baru" text_icon_left="plus" kind="primary")

        .container-photo
            .block.mb-12

                ul.block-media(v-if="list_data.length > 0")
                    li(
                        v-for="(item, index) in list_data"
                        :key="index"
                    )
                        img(
                            v-lazy="item.image"
                            @click="openGallery(index)"
                        )
                        .floating-action
                            b-button(icon_only="trash" kind="danger" size="small" @click.native="deleteData(item.id)")


                .text-center.mt-10.mb-10(v-if="list_data.length > 0 || status_list_photo.status === 'loading'")
                    .relative(v-if="status_list_photo.status === 'loading'")
                        b-loading(text="Memuat data" kind="")

                    template(v-else)
                        b-button(v-if="list_photo.current_page && list_photo.total_page && list_photo.current_page < list_photo.total_page" text="Lainnya..." kind="tertiary" @click.native="loadMore()")
                        //- span(v-else) Tidak ada data lain.

                .text-center.mt-10.mb-10(v-else)
                    span Data tidak ditemukan.

                //- ul.block-media
                    li(
                        v-for="(image, index) in media"
                        :key="index"
                    )
                        img(
                            v-lazy="image.src || image.thumb"
                            @click="openGallery(index)"
                        )
                        .floating-action
                            b-button(icon_only="trash" kind="danger" size="small")

            .block(v-if="media.length > 0")
                LightBox(
                    ref="lightbox"
                    :media="media"
                    :showCaption="true"
                    :showLightBox="false"
                    :siteLoading="default_image"
                )

            //- .block
                LightBox(
                    ref="lightbox"
                    :media="media"
                    :showCaption="true"
                    :showLightBox="false"
                    )


</template>

<script>
import {mapState} from 'vuex';
import LightBox from 'vue-image-lightbox';

export default {
    name: 'BdiListOfPhotoIndex',
    components: {
        LightBox,
    },
    data() {
        return {
            media: [],
            // media: [
            //     {
            //         thumb: 'https://images.pexels.com/photos/9749269/pexels-photo-9749269.jpeg',
            //         src: 'https://images.pexels.com/photos/9749269/pexels-photo-9749269.jpeg',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9749269/pexels-photo-9749269.jpeg' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9893996/pexels-photo-9893996.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9940225/pexels-photo-9940225.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9940225/pexels-photo-9940225.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9893996/pexels-photo-9893996.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9893996/pexels-photo-9893996.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9893996/pexels-photo-9893996.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9056891/pexels-photo-9056891.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9056891/pexels-photo-9056891.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9056891/pexels-photo-9056891.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/10012544/pexels-photo-10012544.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/10012544/pexels-photo-10012544.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/10012544/pexels-photo-10012544.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/6038385/pexels-photo-6038385.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/6038385/pexels-photo-6038385.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/6038385/pexels-photo-6038385.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9715403/pexels-photo-9715403.png?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9715403/pexels-photo-9715403.png?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9715403/pexels-photo-9715403.png?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9794899/pexels-photo-9794899.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9794899/pexels-photo-9794899.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9794899/pexels-photo-9794899.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9645569/pexels-photo-9645569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9645569/pexels-photo-9645569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9645569/pexels-photo-9645569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9906562/pexels-photo-9906562.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9906562/pexels-photo-9906562.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9906562/pexels-photo-9906562.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/10012544/pexels-photo-10012544.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/10012544/pexels-photo-10012544.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/10012544/pexels-photo-10012544.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/6038385/pexels-photo-6038385.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/6038385/pexels-photo-6038385.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/6038385/pexels-photo-6038385.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9715403/pexels-photo-9715403.png?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9715403/pexels-photo-9715403.png?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9715403/pexels-photo-9715403.png?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9794899/pexels-photo-9794899.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9794899/pexels-photo-9794899.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9794899/pexels-photo-9794899.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9645569/pexels-photo-9645569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9645569/pexels-photo-9645569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9645569/pexels-photo-9645569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9906562/pexels-photo-9906562.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9906562/pexels-photo-9906562.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9906562/pexels-photo-9906562.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/10012544/pexels-photo-10012544.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/10012544/pexels-photo-10012544.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/10012544/pexels-photo-10012544.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/6038385/pexels-photo-6038385.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/6038385/pexels-photo-6038385.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/6038385/pexels-photo-6038385.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9715403/pexels-photo-9715403.png?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9715403/pexels-photo-9715403.png?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9715403/pexels-photo-9715403.png?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9794899/pexels-photo-9794899.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9794899/pexels-photo-9794899.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9794899/pexels-photo-9794899.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9645569/pexels-photo-9645569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9645569/pexels-photo-9645569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9645569/pexels-photo-9645569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            //     {
            //         thumb: 'https://images.pexels.com/photos/9906562/pexels-photo-9906562.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         src: 'https://images.pexels.com/photos/9906562/pexels-photo-9906562.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            //         caption: 'Album name', // Optional
            //         srcset: 'https://images.pexels.com/photos/9906562/pexels-photo-9906562.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' // Optional for displaying responsive images
            //     },
            // ],

            // default_image: this.$store.getters['config/getDefaultImage'],

            list_data: [],
            // limit: 12,
            limit: 20,
            page: 1,
            // orderShort: '',
            keyword: '',
            timeout: null,

            default_image: this.getDefaultImage(),
        };
    },
    computed: {
        ...mapState('photo', [
            'status_list_photo',
            'list_photo',
        ]),
    },
    watch: {
        list_photo(newVal) {
            // console.log(newVal)
            if (newVal.items && newVal.items.length > 0) {
                for (let i = 0; i < newVal.items.length; i++) {
                    this.list_data.push(newVal.items[i]);

                    // const img = newVal.items[i].image && newVal.items[i].image.length > 0 && (this.checkImage(newVal.items[i].image) === true) ? newVal.items[i].image : this.getDefaultImage();
                    // const img = newVal.items[i].thumbnail && newVal.items[i].thumbnail.length > 0 && (this.checkImage(newVal.items[i].thumbnail) === true) ? newVal.items[i].thumbnail : this.getDefaultImage();

                    let img = this.default_image;
                    let thumb = this.default_image;

                    if (newVal.items[i].thumbnail && newVal.items[i].thumbnail.length > 0 && (this.checkImage(newVal.items[i].thumbnail) === true)) {
                        img = newVal.items[i].image;
                        thumb = newVal.items[i].thumbnail;
                    }

                    this.media.push({
                        thumb: thumb,
                        src: img,
                        // caption: '',
                        // srcset: img,
                        // siteLoading: this.default_image,
                    });
                }
            }
        },
    },
    methods: {
        checkImage(url) {
            try {
                const request = new XMLHttpRequest();
                // request.open("GET", url, true);
                request.open('GET', url, false);
                request.send();

                if (request.status === 200) {
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                return false;
            }
        },
        // getDefaultImage(e) {
        //     e.target.src = this.default_image;
        // },
        openGallery(index) {
            this.$refs.lightbox.showImage(index);
        },
        getData(reset=false) {
            if (reset) {
                this.media = [];
                this.list_data = [];
                this.page = 1;
            }
            this.$store.dispatch('photo/getListPhoto', [this.limit, this.page, this.keyword]);
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
        deleteData(id, name='') {
            this.$swal.fire({
                icon: 'warning',
                title: 'Hapus foto?',
                // text: 'Role : ' + name,
                confirmButtonText: 'Ya',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        Event.$emit('showLoading', true);

                        this.$store.dispatch('photo/deletePhoto', id)
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
        // console.log('mounted list photo');
        // console.log(this.$route.name);
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            // console.log(to.name);
            vm.$store.commit('photo/setListPhoto', {});
            if (to.name === 'BDI_ListOfPhotoIndex') {
                vm.getData();
            }
        });
    },

};
</script>

<style lang="sass">

</style>
