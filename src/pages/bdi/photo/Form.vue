<template lang="pug">
    form.form-general.card-bg-theme.p-8.rounded#form-album(style="max-width:2000px" @submit.prevent="submit($event)")
        .form-general__header.w-full
            h2.text-2xl {{ id === 'create' ? 'Tambah' : 'Ubah' }} Foto
        .form-general__body.w-full
            //- .field
                b-checkbox(name="newAlbum" label="Buat Album baru" value="new Album" :itemChecked="newAlbum" v-model="ModelNewAlbum" @change="createNewAlbum()" )
            //- template(v-if="newAlbum")
                .field.field--icon-right.w-full
                    label.field-label Nama Album
                    input.field-style(type="text" placeholder="Tulis nama disini..." value="")
            //- template(v-else)
                .field.field--icon-right.w-full
                    label.field-label Pilih Album
                    select.field-style
                        option Album A
                        option Album B
                        option Album C
                    span.icon-field
                        b-icon(name="chevron-down")

            .field.field--icon-right.w-full
                label.field-label Judul Album
                input.field-style(type="text" placeholder="Tulis judul album disini..." v-model="model.title")

                span.field-message.text-red-500(v-if="$v.model.title.$error") This title is required &amp; max length is 255 char.

            .field.field--icon-right.w-full
                label.field-label Deskripsi Album
                textarea.field-style(
                    placeholder="Tulis Deskripsi album disini..."
                    style="padding-top:1rem; min-height:160px"
                    v-model="model.description"
                )

                //- span.field-message.text-red-500(v-if="$v.model.description.$error") This description is required.

            .field.field--icon-right.w-full
                label.field-label Unggah Foto
                .block.box-file-upload
                    UploadImages(
                        @changed="handleImages"
                    )
                span.field-message Ukuran maksimal setiap file 2 MB.

            .container-photo.field.field--icon-right.w-full.pt-7(v-if="id !== 'create'")
                label.field-label Foto Tersimpan
                ul.block-media(v-if="detail_album.image && detail_album.image.length > 0")
                    li(
                        v-for="(item, index) in detail_album.image"
                        :key="index"
                    )
                        img(
                            v-lazy="item.thumbnail"
                        )
                        .floating-action
                            b-button(icon_only="trash" kind="danger" size="small" @click.native="deletePhoto(item.id)" type="button")
                span(v-else) -

        .form-general__footer
            router-link(to="/bdi/foto/album")
                b-button(text="Batalkan" type="button")
            b-button(text="Simpan" kind="primary" type="submit")

</template>

<script>
import {mapState} from 'vuex';
import UploadImages from 'vue-upload-drop-images';
import {required, maxLength} from 'vuelidate/lib/validators';

export default {
    name: 'BdiListOfPhotoForm',
    components: {
        UploadImages,
    },
    data() {
        return {
            ModelNewAlbum: [],
            newAlbum: true,

            // default_image: this.$store.getters['config/getDefaultImage'],

            model: {
                title: '',
                description: '',
                images: [],
            },
        };
    },
    validations: {
        model: {
            title: {
                required,
                maxLength: maxLength(255),
            },
            description: {
                // required,
            },
            images: {
                // required,
            },
        },
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        ...mapState('photo', [
            'detail_album',
        ]),
    },
    watch: {
        id() {},
        detail_album(newVal) {
            // console.log(newVal);
            this.model.title = (newVal.title ? newVal.title : '');
            this.model.description = (newVal.description ? newVal.description : '');
        },
        'model.images': function(newVal, oldVal) {
            this.checkMaxFileSize(newVal, oldVal);
        },
    },
    methods: {
        createNewAlbum() {
            this.newAlbum = !this.newAlbum;
        },
        // getDefaultImage(e) {
        //     e.target.src = this.default_image;
        // },
        handleImages(files) {
            // console.log(files)
            this.model.images = files;
            /*
            [
                {
                    "name": "Screenshot from 2021-02-23 12-36-33.png",
                    "size": 319775,
                    "type": "image/png",
                    "lastModified": 1614080193596
                    ...
                },
                ...
            ]
             */
        },
        async checkMaxFileSize(files, oldFiles) {
            let fsize = 0;
            const max_file_size_allowed = 2048; // 2mb
            let revert_files = false;
            let index_delete_file = null;
            // let index_delete_file = [];

            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    fsize = Math.round((files[i].size / 1024));
                    if (fsize > max_file_size_allowed) {
                        revert_files = true;
                        index_delete_file = i;
                        break;
                        
                        // index_delete_file.push(i);
                    }
                }
            }

            if (revert_files) {
            // if (index_delete_file.length > 0) {
                Event.$emit('showLoading', 'true');

                let check_element = document.querySelectorAll('.delete')[index_delete_file];
                var self = this;

                var intr = setInterval(function() {
                    if (document.querySelectorAll('.delete')[index_delete_file] !== undefined) {
                            check_element = document.querySelectorAll('.delete')[index_delete_file];
                            check_element.click();
                            self.model.images = oldFiles;
                            Event.$emit('error', 'Ukuran file lebih dari 2 Mb!');
                        }

                    if (check_element !== undefined) clearInterval(intr);
                }, 650)

                // -------------------------------------------

                // let check_element = document.querySelectorAll('.delete')[index_delete_file[0]];
                // var self = this;

                // console.log(index_delete_file)
                // console.log(check_element)
                // // console.log(k, (index_delete_file.length - 1));

                // for (var j = 0; j < index_delete_file.length; j++) {
                //     console.log(index_delete_file[j])
                //     console.log(document.querySelectorAll('.delete')[index_delete_file[j]])

                //     var intr = setInterval(function() {
                //         if (document.querySelectorAll('.delete')[index_delete_file[j]] !== undefined) {
                //             check_element = document.querySelectorAll('.delete')[index_delete_file[j]];
                //             check_element.click();
                //             self.model.images = oldFiles;

                //             console.log('ehe')
                //             console.log(j, (index_delete_file.length - 1));

                //             if (j === (index_delete_file.length - 1))
                //                 Event.$emit('error', 'Ukuran file lebih dari 2 Mb!');
                //         }

                //         if (check_element !== undefined) clearInterval(intr);
                //     }, 650);
                // }

            }
        },
        async getData(reset_images=true) {
            if (reset_images) {
                const clear_images = document.querySelector('.clearButton');
                if (clear_images) {
                    clear_images.click();
                }
            }

            if (this.id !== 'create') {
                Event.$emit('showLoading', true);

                await this.$store.dispatch('photo/getDetailAlbum', this.id)
                    .then((resp) => {
                        if (resp === 'success') {
                            Event.$emit('showLoading', false);
                        } else {
                            Event.$emit('error');
                        }
                    });
            } else {
                await this.$store.commit('photo/setDetailAlbum', {});
            }
        },
        setEmptyModel(all=true) {
            for (const key in Object.keys(this.model)) {
                if (all === true) {
                    this.model[Object.keys(this.model)[key]] = '';
                }
            }
            this.url = null;
        },
        // setErrors(empty=true, errors=null) {
        //     if (empty === true) {
        //         this.error_name = '';
        //         // this.error_status = '';

        //     } else if (empty !== true && errors !== null) {
        //         this.error_name = errors.name ? errors.name : '';
        //         // this.error_status = errors.status ? errors.status : '';
        //     }
        // },
        reset(direct=false) {
            // this.setEmptyModel(false);
            this.setEmptyModel(true);
            // reset vuelidate
            this.$nextTick(() => {
                this.$v.$reset();
            });
            // this.setErrors(true);
        },
        deletePhoto(id, name='') {
            this.$swal.fire({
                icon: 'warning',
                title: 'Konfirmasi Hapus foto',
                text: 'Apakah anda yakin ingin menghapus foto ini?',
                confirmButtonText: 'Hapus foto',
                cancelButtonText: 'Batalkan',
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
                                    // this.page = 0;
                                    this.getData(false);

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
        async submit(e) {
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
                // Event.$emit('error', 'Please fill the form correctly.');
                // Event.$emit('showLoading', false);
                window.scrollTo(0, 0);
                return;
            }

            // console.log(this.model);
            // return;

            Event.$emit('showLoading', true);
            // let model_data = Object.keys(this.model).map((key) => this.model[key]);
            const model_data = this.model;
            // console.log(model_data);

            if (model_data.images.length === 0) {
                delete model_data.images;
            }
            // return;

            if (this.id === 'create') {
                this.$store.dispatch('photo/createAlbum', model_data)
                    .then((resp) => {
                    // console.log(resp.data);
                        if (resp.result === 'success') {
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Data berhasil disimpan.',
                                // text: 'Data berhasil disimpan.',
                                confirmButtonText: 'Tetap dihalaman ini',
                                confirmButtonColor: '#5a80e7',
                                showCancelButton: true,
                                cancelButtonText: 'Kembali ke BDI',
                                allowOutsideClick: false,
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        this.$router.push({path: '/bdi/foto/form/'+ resp.data.id});
                                        this.getData();
                                    } else {
                                        this.$router.push({path: '/bdi/foto/album'});
                                    }

                                    Event.$emit('success', 'Data berhasil dibuat!');
                                });

                            // return;
                        } else {
                            Event.$emit('error');
                        }
                    });

            // update
            } else {
                this.$store.dispatch('photo/updateAlbum', [this.id, model_data])
                    .then((resp) => {
                        if (resp.result === 'success') {
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Data berhasil disimpan.',
                                // text: 'Data berhasil disimpan.',
                                confirmButtonText: 'Tetap dihalaman ini',
                                confirmButtonColor: '#5a80e7',
                                showCancelButton: true,
                                cancelButtonText: 'Kembali ke BDI',
                                allowOutsideClick: false,
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        this.getData();
                                    } else {
                                        this.$router.push({path: '/bdi/foto/album'});
                                    }

                                    Event.$emit('success', 'Data berhasil diperbarui!');
                                });
                        } else {
                            Event.$emit('error');
                        }
                    });
            }
        },
    },
    mounted() {
        // 
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            // console.log(to.name);
            if (to.name === 'BDI_ListOfPhotoForm') {
                vm.getData();
            }
        });
    },
};
</script>

<style lang="sass">
.box-file-upload
    .container
        @apply rounded border p-4
        background-color: var(--bg-field-theme) !important
        border-color: var(--color-primary-500) !important

    .mainMessage
        display: none !important

    .clearButton
        color: rgb(255, 255, 255, 0) !important
        &::after
            content: 'Hapus Semua Foto'
            // position: absolute
            color: var(--text-theme)  !important
        
    .imgsPreview
        @apply grid grid-cols-4 gap-4 pt-10
        padding-right: 100px
        
        .imageHolder
            @apply border p-1 rounded w-full
            aspect-ratio: 1/1
            height: unset
            background-color: var(--bg-card) !important
            border-color: var(--border-theme-darkness) !important
            img
                @apply object-contain
            .delete
                @apply rounded border-red-500
                background-color: var(--bg-card) !important
                color: red !important

            .plus
                @apply rounded flex items-center justify-center border-blue-500 text-blue-500
                background-color: var(--bg-field-theme) !important
                left: calc(100% + 1rem)
                top: calc(50% - 40px)
                width: 80px
                height: 80px
                &:hover
                    @apply bg-blue-50

            // &:nth-last-child(1)
            //     background: green
            // &:nth-last-child(2)
            //     background: blue
            // &:nth-last-child(3)
            //     background: purple
            // &:nth-last-child(4)
            //     background: red


            // &:nth-last-:nth-child(1)
            //     background-color: red
            //     margin-bottom: 400px
            //     .plus
            //         top: calc( 100% + 2rem )
            //         left: calc( (-100% * 3) - 4rem )
</style>
