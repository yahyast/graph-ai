<template lang="pug">
    form.form-general(@submit.prevent="submit($event)")
        .form-general__header.w-full
            h2.text-2xl Profil
        .form-general__body.w-full
            .grid.grid-cols-11.gap-8.mb-16
                .col-span-4.pr-12
                    h2.text-xl.font-bold.mb-2 Profil Organisasi
                    p.text-gray-400 Silakan pilih tokoh untuk dimasukan dalam organisasi ini.
                .col-span-7
                    .field
                        label.field-label Nama Organisasi
                        input.field-style(placeholder="Tulis nama organisasi" v-model="model.name")

                        span.field-message.text-red-500(v-if="$v.model.name.$error") This name is required &amp; max length is 255 char.

                    .field
                        .box-photo
                            .box-photo__cover
                                figure.photo-square
                                    img(:src="url ? url : getDefaultImage" @error="getErrorImage")
                            .box-photo__info
                                label.field-label Foto Organisasi
                                .cta-upload.mb-2
                                    input(ref="photoInput" type="file" @change="onFileChange" accept="image/png, image/jpeg")
                                    span Ganti Foto
                                p.text-gray-400 Silakan gunakan foto ukuran 1:1 dengan format png atau jpg. Pastikan gambar dibawah ukuran 2MB.

            .grid.grid-cols-11.gap-8.mb-16
                .col-span-4.pr-12
                    h2.text-xl.font-bold.mb-2 Deskripsi Organisasi
                    p.text-gray-400 Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.
                .col-span-7
                    .field
                        wysiwyg(v-model="model.profile")

                        span.field-message.text-red-500(v-if="$v.model.profile.$error") This profile is required.

            .grid.grid-cols-11.gap-8.mb-16
                .col-span-4.pr-12
                    h2.text-xl.font-bold.mb-2 Sosial Media
                    p.text-gray-400 Simpan Sosial media organisasi, utamakan simpan sosial media yang populer seperti Facebook, Twitter, Instagram dan YouTube.

                .col-span-7
                    strong.mb-4.block Sosail Media Populer
                    .block
                        .flex-grow.grid.grid-cols-3.gap-4
                            .field.field--icon-right.w-full
                                label.field-label Sosial Media
                                input.field-style(type="text" value="Facebook" disabled)
                            .field.field--icon-right.w-full.col-span-2
                                label.field-label Tautan
                                input.field-style(type="text" placeholder="Tulis tautan Facebook disini..." v-model="default_social_media.facebook")

                        .flex-grow.grid.grid-cols-3.gap-4
                            .field.field--icon-right.w-full
                                input.field-style(type="text" value="Twitter" disabled)
                            .field.field--icon-right.w-full.col-span-2
                                input.field-style(type="text" placeholder="Tulis tautan Twitter disini..." v-model="default_social_media.twitter")

                        .flex-grow.grid.grid-cols-3.gap-4
                            .field.field--icon-right.w-full
                                input.field-style(type="text" value="Instagram" disabled)
                            .field.field--icon-right.w-full.col-span-2
                                input.field-style(type="text" placeholder="Tulis tautan Instagram disini..." v-model="default_social_media.instagram")

                        .flex-grow.grid.grid-cols-3.gap-4
                            .field.field--icon-right.w-full
                                input.field-style(type="text" value="Youtube" disabled)
                            .field.field--icon-right.w-full.col-span-2
                                input.field-style(type="text" placeholder="Tulis tautan YouTube disini..." v-model="default_social_media.youtube")

                    template(v-if="data_social_media.length > 0")
                        .flex.items-center.gap-4(v-for="(item, index) in data_social_media")
                            .flex-grow.grid.grid-cols-3.gap-4
                                .field.field--icon-right.w-full
                                    input.field-style(type="text" :value="titleCase(item.media_type)" disabled="")

                                .flex.items-center.gap-4.flex-grow.col-span-2

                                    .field.field--icon-right.w-full.flex-grow
                                        //- label.field-label Tautan
                                        input.field-style(type="text" placeholder="Tulis tautan sosial media disini" v-model="data_social_media[index].username" @change="updateAllSocmed()")

                                    .field
                                        //- label.field-label.opacity-0 Action
                                        b-button(icon_only="trash" kind="danger" type="button" @click.native="removeSocmed(index)")

                    .flex.items-center.gap-4
                        .flex-grow.grid.grid-cols-3.gap-4
                            .field.field--icon-right.w-full
                                label.field-label Sosial Media Lainnya
                                select.field-style(v-model="socmed_type")
                                    option(value="") Pilih Sosial Media
                                    option.cursor-not-allowed(disabled) Facebook
                                    option.cursor-not-allowed(disabled) Twitter
                                    option.cursor-not-allowed(disabled) Instagram
                                    option.cursor-not-allowed(disabled) YouTube
                                    option(value="tiktok") TikTok
                                    option(value="vine") Vine
                                    option(value="bigo") Bigo
                                    //- option(value="tiner") Tiner
                                    option(value="vimeo") Vimeo
                                span.icon-field
                                    b-icon(name="chevron-down")
                            .field.field--icon-right.w-full.col-span-2
                                label.field-label Tautan
                                input.field-style(type="text" placeholder="Tulis tautan sosial media disini" v-model="socmed_username" @keydown.enter.prevent @keyup.enter="addSocmed()")
                        .field
                            label.field-label.opacity-0 Action
                            b-button(icon_only="plus" kind="tertiary" type="button" @click.native="addSocmed()")

        .form-general__footer
            router-link(to="/bdi/organisasi")
                b-button(text="Batalkan" type="button")
            b-button(text="Simpan" kind="primary" type="submit")

</template>

<script>
import {mapState} from 'vuex';
import {required, maxLength} from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            // url: 'https://i.imgur.com/iq3nnEZ.jpg',
            myHTML: '',

            url: null,
            // default_image: '/images/no-image.png',
            // default_image: this.$store.getters['config/getDefaultImage'],
            photo: null,

            // data_social_media: [
            //     {
            //         media_type: 'facebook',
            //         username: '',
            //     },
            //     {
            //         media_type: 'twitter',
            //         username: '',
            //     },
            //     {
            //         media_type: 'instagram',
            //         username: '',
            //     },
            //     {
            //         media_type: 'youtube',
            //         username: '',
            //     },
            // ],

            default_social_media: {
                facebook: '',
                twitter: '',
                instagram: '',
                youtube: '',
            },
            data_social_media: [],
            socmed_type: '',
            socmed_username: '',

            model: {
                name: '',
                profile: '',
                social_media: [],
            },
        };
    },
    validations: {
        model: {
            name: {
                required,
                maxLength: maxLength(255),
            },
            profile: {
                required,
            },
            social_media: {
                // required,
            },
        },
    },
    props: ['id'],
    computed: {
        ...mapState('organization', [
            'detail',
        ]),
        route_query() {
            return this.$route.query;
        },
    },
    watch: {
        id() {},
        detail(newVal) {
            // console.log('watch detail', newVal);
            const param = this.route_query.name;
            if (param !== undefined && this.id == 'create') {
                this.model.name = param;
            } else {
                this.model.name = (newVal.name ? newVal.name : '');
            }
            this.model.profile = (newVal.profile ? newVal.profile : '');
            // this.model.profile = (newVal.profile ? newVal.profile : '');
            this.url = (newVal.photo ? newVal.photo : '');

            // social media
            for (const index in this.default_social_media) {
                this.default_social_media[index] = '';
            }

            this.data_social_media = [];

            if (newVal.social_media && newVal.social_media.length > 0) {
                for (let i = 0; i < newVal.social_media.length; i++) {
                    newVal.social_media[i];
                    if (i <= 3) {
                        this.default_social_media[newVal.social_media[i].media_type] = newVal.social_media[i].username;
                    } else {
                        this.data_social_media.push(newVal.social_media[i]);
                    }
                }

                this.model.social_media = newVal.social_media;
            }
        },
        'default_social_media.facebook': function(newVal) {
            this.updateAllSocmed();
        },
        'default_social_media.twitter': function(newVal) {
            this.updateAllSocmed();
        },
        'default_social_media.instagram': function(newVal) {
            this.updateAllSocmed();
        },
        'default_social_media.youtube': function(newVal) {
            this.updateAllSocmed();
        },
        data_social_media(newVal) {
            // console.log('watch data_social_media', newVal)
            this.updateAllSocmed();
        },
    },
    methods: {
        // getDefaultImage(e) {
        //     e.target.src = this.default_image;
        // },
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            // Event.$emit('showLoading', true);

            const file = files[0];
            // console.log(file)
            const fsize = Math.round((file.size / 1024));

            if (fsize > 2048) { // check if not more than 2mb
                Event.$emit('error', 'Ukuran file lebih dari 2 Mb!');
                // this.url = null;
                // this.photo = null;
                return;
            }

            this.url = URL.createObjectURL(file);
            this.photo = file;
        },
        titleCase(string) {
            const sentence = string.toLowerCase().split(' ');
            for (let i = 0; i< sentence.length; i++) {
                sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
            }
            // document.write(sentence.join(" "));
            return sentence.join(' ');
        },
        addSocmed() {
            if (this.socmed_type === '' || this.socmed_username === '') {
                Event.$emit('error', 'Jenis sosial media dan tautan wajib diisi!');
                return;
            }

            const socmed = {
                media_type: this.socmed_type,
                username: this.socmed_username,
            };

            if (this.data_social_media.length === 0) {
                this.data_social_media.push(socmed);
            } else {
                const check_data = this.data_social_media.filter(function(e) {
                    return e.media_type === socmed.media_type;
                });

                if (check_data.length > 0) {
                    Event.$emit('warning', 'Sosial media '+ socmed.media_type +' telah terdaftar!');
                    return;
                } else {
                    this.data_social_media.push(socmed);
                }
            }

            this.socmed_type = '';
            this.socmed_username = '';

            this.updateAllSocmed();
        },
        removeSocmed(index) {
            this.$swal.fire({
                icon: 'warning',
                title: 'Hapus sosial media '+ this.data_social_media[index].media_type +'?',
                // text: 'Data berhasil disimpan.',
                confirmButtonText: 'Ya',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                cancelButtonText: 'Tidak',
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.data_social_media.splice(index, 1);
                        this.updateAllSocmed();
                    }
                });
        },
        updateAllSocmed() {
            const data = [];

            for (const index in this.default_social_media) {
                data.push({
                    media_type: index,
                    username: this.default_social_media[index],
                });
            }

            this.model.social_media = [].concat(data, this.data_social_media);
        },
        setEmptyModel(all=true) {
            for (const key in Object.keys(this.model)) {
                if (all === true) {
                    this.model[Object.keys(this.model)[key]] = '';
                }
            }
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
            model_data.photo = this.photo;
            model_data.social_media = JSON.stringify(model_data.social_media);

            if (this.id === 'create') {
                // this.$store.dispatch('organization/create', [this.model, this.photo])
                this.$store.dispatch('organization/create', model_data)
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
                                        this.$router.push({path: '/organisasi/'+ resp.data.id + '/form/profile'});
                                        this.getData();
                                    } else {
                                        this.$router.push({path: '/bdi/organisasi'});
                                    }

                                    Event.$emit('success', 'Data berhasil dibuat!');
                                });
                        } else {
                            Event.$emit('error');
                        }
                    });

            // update
            } else {
                this.$store.dispatch('organization/update', [this.id, model_data, 'profile'])
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
                                        this.$router.push({path: '/bdi/organisasi'});
                                    }

                                    Event.$emit('success', 'Data berhasil diperbarui!');
                                });
                        } else {
                            Event.$emit('error');
                        }
                    });
            }
        },
        async getData() {
            await this.reset(true);
            Event.$emit('getDataOrganization');
        },
    },
    mounted() {
        const param = this.route_query.name;
        if (param !== undefined && this.id == 'create') {
            this.model.name = param;
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            console.log(to.name);
            if (to.name === 'FormOfOrganizationProfile') {
                vm.getData();
            }
        });
    },
};
</script>

<style lang="sass">

.box-photo
    @apply flex items-center
    &__cover
        @apply mr-8
.photo-square
    @apply w-40 h-40 rounded bg-gray-50 overflow-hidden
    img
        @apply w-full h-full object-cover

.cta-upload
    @apply px-4 py-2 border relative overflow-hidden rounded cursor-pointer inline-block
    border-color: var(--color-primary-500)
    color: var(--color-primary-500)
    input
        @apply absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer z-40

</style>
