<template lang="pug">
    .layout-general
        form.form-general.card-bg-theme.p-6.rounded.shadow(@submit="submit($event)")
            .form-general__header
                h2 {{ page_title }}
                router-link(to="/roles")
                    b-button(text="Kembali" text_icon_left="chevron-left" type="button")
            .form-general__body
            .grid.grid-cols-11.gap-8.mb-16
                    .col-span-4.pr-12
                        h2.text-xl.font-bold.mb-2 Role
                        p.text-gray-400 Pastikan Informasi role diisi sesuai dengan kebutuhan peran.
                    .col-span-7
                        .field
                            label.field-label Nama Role
                            input.field-style(placeholder="Nama Role" type="text" v-model="model.name")
                            span.field-message.text-red-500(v-if="$v.model.name.$error") Nama role wajib diisi &amp; maksimal 255 karakter.
                            span.field-message.text-red-500(v-if="error_name !== ''") {{ error_name }}

                        .field
                            label.field-label Label
                            input.field-style(placeholder="Tulis label" type="text" v-model="model.label")
                            span.field-message.text-red-500(v-if="$v.model.label.$error") Label wajib diisi &amp; maksimal 255 karakter.
                            span.field-message.text-red-500(v-if="error_label !== ''") {{ error_label }}

                        .field
                            label.field-label Deskripsi
                            textarea.field-style(placeholder="Tulis Deskripsi" type="text" v-model="model.description" rows="5")
                            span.field-message.text-red-500(v-if="$v.model.description.$error") Deskripsi maksimal 255 karakter.
                            span.field-message.text-red-500(v-if="error_description !== ''") {{ error_description }}

            .form-general__footer
                b-button(text="Reset" type="button" @click.native="reset()")
                b-button(text="Simpan" kind="primary" type="submit")


</template>

<script>
import {mapState} from 'vuex';
import {required, maxLength} from 'vuelidate/lib/validators';

export default {
    name: 'GeneralRolesForm',
    data() {
        return {
            route_name: '',

            model: {
                name: '',
                label: '',
                // status: '',
                description: '',
            },

            // error message
            error_name: '',
            error_label: '',
            // error_status: '',
            error_description: '',
        };
    },
    validations: {
        model: {
            name: {
                required,
                maxLength: maxLength(255),
            },
            label: {
                required,
                maxLength: maxLength(255)
            },
            // status: {
            //     required,
            // },
            description: {
                maxLength: maxLength(255)
            },
        },
    },
    computed: {
        ...mapState('roles', ['detail']),
        id() {
            return this.$route.params.id;
        },
        data() {
            return this.$route.params.data;
        },
        page_title() {
            let title = 'Ubah Role';
            if (this.route_name === 'GeneralRolesCreate') {
                title = 'Tambah Role';
            }
            return title;
        },
    },
    watch: {
        id() {},
        page_title() {},
        // form data
        detail(newData) {
            console.log(newData);
            this.model.name = (newData.name ? newData.name : '');
            this.model.label = (newData.label ? newData.label : '');
            // this.model.status = (newData.status ? (newData.status.toLowerCase() === 'active' ? '1' : '0') : '');
            this.model.description = (newData.description ? newData.description : '');
        },
        'model.label': function(newData) {
            if (newData !== '' && newData !== null)
                this.model.label = newData.replace(/\s+/g, '-').toLowerCase();
        },
    },
    methods: {
        setEmptyModel(all=true) {
            for (const key in Object.keys(this.model)) {
                if (all === true) {
                    this.model[Object.keys(this.model)[key]] = '';
                }
            }
        },
        setErrors(empty=true, errors=null) {
            if (empty === true) {
                this.error_name = '';
            } else if (empty !== true && errors !== null) {
                this.error_name = errors.name ? errors.name : '';
            }
        },
        async reset(direct=false) {
            if (direct === true) {
                // this.setEmptyModel(false);
                this.setEmptyModel(true);
                // reset vuelidate
                this.$nextTick(() => {
                    this.$v.$reset();
                });
                this.setErrors(true);
                // window.scrollTo(0,0);
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            } else {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Reset form?',
                    // text: id,
                    confirmButtonText: 'Ya!',
                    confirmButtonColor: '#DD6B55',
                    showCancelButton: true,
                    cancelButtonText: 'Tidak',
                    allowOutsideClick: false,
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                        // if (this.route_name === 'GeneralProfilePage') {
                        //     this.setEmptyModel(false);
                        //     // reset vuelidate
                        //     this.$nextTick(() => { this.$v.$reset(); });
                        //     this.setErrors(true);
                        //     window.scrollTo(0,0);
                        // } else {
                            this.getData();
                        // }
                        }
                    });
            }
        },
        getData(update=false) {
            this.reset(true);

            if (this.route_name === 'GeneralRolesEdit') {
                Event.$emit('showLoading', true);

                // this.$store.commit('roles/setDetail', this.decodeDetailData(this.data));
                // // temp
                // Event.$emit('showLoading', false);

                this.$store.dispatch('roles/getDetail', this.id)
                .then((resp) => {
                    if (resp === 'success') {
                        Event.$emit('showLoading', false);
                    } else {
                        Event.$emit('error');
                    }
                });
            } else {
                // if (this.route_name === 'pageRolesCreate')
                this.$store.commit('roles/setDetail', {});
            }

            console.log(this.detail);
        },
        submit(e, save_continue=false) {
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

            Event.$emit('showLoading', true);
            let model_data = Object.keys(this.model).map((key) => this.model[key]);

            if (this.route_name === 'GeneralRolesCreate') {
                this.$store.dispatch('roles/create', model_data)
                    .then((resp) => {
                        if (resp.result === 'success') {
                            if (save_continue === false) {
                                this.$router.push('/roles');
                            } else {
                                this.$router.push('/roles/'+ resp.data.data.id +'/edit');
                            }

                            this.$swal.fire({
                                icon: 'success',
                                title: 'Data successfully created!',
                                timer: 3000,
                            });
                        } else {
                            if (resp.data.message && resp.data.message.errors) {
                                this.setErrors(false, resp.data.message.errors);
                                // Event.$emit('error', null, resp.data.message.errors);
                                Event.$emit('showLoading', false);
                                window.scrollTo(0, 0);
                            } else {
                                Event.$emit('error');
                            }
                        }
                    });

            // pageRolesEdit
            } else {
                model_data = [this.id].concat(model_data);

                this.$store.dispatch('roles/update', model_data)
                    .then((resp) => {
                        if (resp.result === 'success') {
                            if (save_continue === false) {
                                this.$router.push('/roles');
                            }

                            this.$swal.fire({
                                icon: 'success',
                                title: 'Data berhasil diperbarui',
                                timer: 3000,
                            });
                        } else {
                            if (resp.data.message && resp.data.message.errors) {
                                this.setErrors(false, resp.data.message.errors);
                                // Event.$emit('error', null, resp.data.message.errors);
                                Event.$emit('showLoading', false);
                                window.scrollTo(0, 0);
                            } else {
                                Event.$emit('error');
                            }
                        }
                    });
            }
        },
    },
    created() {
        //
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.route_name = to.name;
            if (to.name === 'GeneralRolesCreate' || to.name === 'GeneralRolesEdit') {
                vm.getData();
            }
        });
    },
    beforeRouteLeave(to, from, next) {
        this.route_name = '';
        this.$store.commit('roles/setDetail', {});
        next();
    },
    mounted() {
        // this.getData();
    },
};
</script>
