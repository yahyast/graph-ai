<template lang="pug">
    form.form-general(@submit.prevent="submit($event)")
        .form-general__header.w-full
            h2.text-2xl Informasi Isu
        .form-general__body.w-full
            .grid.grid-cols-11.gap-8.mb-16
                .col-span-4.pr-12
                    h2.text-xl.font-bold.mb-2 Isu
                    p.text-gray-400 Nama isu baiknya tidak lebih dari 3 kata.
                .col-span-7
                    .field
                        label.field-label Nama Isu
                        input.field-style(placeholder="Tulis nama isu" v-model="model.title")

                        span.field-message.text-red-500(v-if="$v.model.title.$error") This title is required &amp; max length is 255 char.

                    .field
                        .box-photo
                            .box-photo__cover
                                figure.photo-square
                                    img(:src="url ? url : getDefaultImage" @error="getErrorImage")
                            .box-photo__info
                                label.field-label Foto Isu
                                .cta-upload.mb-2
                                    input(ref="photoInput" type="file" @change="onFileChange" accept="image/png, image/jpeg")
                                    span Ganti Foto
                                p.text-gray-400 Silakan gunakan foto ukuran 1:1 dengan format png atau jpg. Pastikan gambar dibawah ukuran 2MB.

                        span.field-message.text-red-500(v-if="$v.model.image.$error") This image is required &amp; max length is 255 char.

            .grid.grid-cols-11.gap-8.mb-16
                .col-span-4.pr-12
                    h2.text-xl.font-bold.mb-2 Keterangan Isu
                    p.text-gray-400 Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.
                .col-span-7
                    .field
                        wysiwyg(v-model="model.description")

                        //- span.field-message.text-red-500(v-if="$v.model.description.$error") This description is required.

            .grid.grid-cols-11.gap-8.mb-16
                .col-span-4.pr-12
                    h2.text-xl.font-bold.mb-2 Gatra Isu
                    p.text-gray-400 Pilih Gatra yang sesuai dengan isu, pastikan gatra yang dipilih sudah sesuai agar informasi tidak rancu.
                .col-span-7
                    .field
                        .relative.p-10(v-if="status_list_gatra.status === 'loading'")
                            b-loading(text="Memuat data")

                        template(v-else)
                            //- b-checkbox.mb-4(v-for="item in list_gatra" :value="item.label" :key="item.label" :label="item.name" v-model="choosenGatra")
                            template(v-if="list_gatra && list_gatra.length > 0")
                                b-checkbox.mb-4(v-for="item in list_gatra" :value="item.id" :key="item.id" :label="item.label" v-model="choosenGatra")
                            span(v-else) -

                        //- b-checkbox.mb-4(value="ekonomi" label="Ekonomi" v-model="choosenGatra")
                        //- b-checkbox.mb-4(value="politik" label="Politik" v-model="choosenGatra")
                        //- b-checkbox.mb-4(value="sosbud" label="Sosial Budaya" v-model="choosenGatra")
                        //- b-checkbox.mb-4(value="ideologi" label="Ideologi" v-model="choosenGatra")
                        //- b-checkbox.mb-4(value="hankam" label="Pertahanan & Keamanan" v-model="choosenGatra")

                        //- div
                            input.cursor-pointer(type="checkbox" id="ekonomi" value="Ekonomi" v-model="choosenGatra")
                            label.cursor-pointer.ml-2(for="ekonomi") Ekonomi

                        //- div
                            input.cursor-pointer(type="checkbox" id="politik" value="Politik" v-model="choosenGatra")
                            label.cursor-pointer.ml-2(for="politik") Politik

                        //- div
                            input.cursor-pointer(type="checkbox" id="sosbud" value="Sosial Budaya" v-model="choosenGatra")
                            label.cursor-pointer.ml-2(for="sosbud") Sosial Budaya

                        //- div
                            input.cursor-pointer(type="checkbox" id="ideologi" value="Ideologi" v-model="choosenGatra")
                            label.cursor-pointer.ml-2(for="ideologi") Ideologi

                        //- div
                            input.cursor-pointer(type="checkbox" id="hankam" value="Pertahanan & Keamanan" v-model="choosenGatra")
                            label.cursor-pointer.ml-2(for="hankam") Pertahanan & Keamanan

                        //- span.field-message.text-red-500(v-if="$v.model.description.$error") This description is required.

        .form-general__footer
            router-link(to="/bdi/isu")
                b-button(text="Batalkan" type="button")
            b-button(text="Simpan" kind="primary" type="submit")

</template>

<script>
import {mapState} from 'vuex';
import {required, requiredIf, maxLength} from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            // url: 'https://i.imgur.com/iq3nnEZ.jpg',
            // myHTML: '',

            url: null,
            // default_image: '/images/no-image.jpg',
            // default_image: this.$store.getters['config/getDefaultImage'],

            choosenGatra: [],

            model: {
                title: '',
                // image: '',
                image: null,
                description: '',
                // gatra: [],
                gatra: '',
            },
        };
    },
    validations: {
        model: {
            title: {
                required,
                maxLength: maxLength(255),
            },
            image: {
                // required,
                // required: requiredIf(function() {
                //     return this.id === 'create';
                // }),
            },
            description: {
                // required,
            },
            gatra: {
                // required,
            },
        },
    },
    props: ['id'],
    computed: {
        ...mapState('issue', [
            'detail',
        ]),
        // ...mapState('config', [
        //     'list_gatra',
        // ]),
        ...mapState('graph', [
            'status_list_gatra',
            'list_gatra',
        ]),
        route_query() {
            return this.$route.query;
        },
    },
    watch: {
        id() {},
        detail(newVal) {
            const param = this.route_query.title;
            if (param !== undefined && this.id == 'create') {
                this.model.title = param;
            } else {
                this.model.title = (newVal.title ? newVal.title : '');
            }
            this.model.description = (newVal.description ? newVal.description : '');
            this.url = (newVal.image ? (newVal.image.substr(0, 4) === 'http' ? newVal.image : 'http://'+ newVal.image) : null);
            this.choosenGatra = (newVal.gatra && newVal.gatra.length > 0 ? newVal.gatra.map(function(item) {
                return item.label;
            }) : []);
            // console.log(this.choosenGatra);
            // console.log(this.model.gatra);
        },
        // model(newVal) {
        //     console.log('watch model', newVal);
        // }
        choosenGatra(newVal) {
            // console.log(newVal);
            // if (newVal.length > 0)
            this.model.gatra = newVal.join();
        },
        'model.gatra': function(newVal) {
            console.log(newVal);
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
            const fsize = Math.round((file.size / 1024));

            if (fsize > 2048) { // check if not more than 2mb
                Event.$emit('error', 'Ukuran file lebih dari 2 Mb!');
                // this.url = null;
                // this.model.image = null;
                return;
            }

            this.url = URL.createObjectURL(file);
            this.model.image = file;
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

            console.log(model_data);
            // return;

            if (this.id === 'create') {
                this.$store.dispatch('issue/create', this.model)
                    .then((resp) => {
                    // console.log(resp.data);
                        if (resp.result === 'success') {
                            this.$swal.fire({
                                icon: 'warning',
                                title: 'Tetap dihalaman ini?',
                                text: 'Data berhasil disimpan.',
                                confirmButtonText: 'Ya',
                                // confirmButtonColor: '#DD6B55',
                                showCancelButton: true,
                                cancelButtonText: 'Tidak',
                                allowOutsideClick: false,
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        this.$router.push({path: '/isu/'+ resp.data.id + '/form/profil'});
                                        this.getData();
                                    } else {
                                        this.$router.push({path: '/bdi/isu'});
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
                this.$store.dispatch('issue/update', [this.id, this.model])
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
                                        this.$router.push({path: '/bdi/isu'});
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
            this.$store.dispatch('graph/getListGatra');
            Event.$emit('getDataIssue');
        },
    },
    mounted() {
        const param = this.route_query.title;
        if (param !== undefined && this.id == 'create') {
            this.model.title = param;
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            console.log(to.name);
            if (to.name === 'IssueOfFormprofile') {
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
