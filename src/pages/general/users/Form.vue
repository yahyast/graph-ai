<template lang="pug">
    .layout-general
        form.form-general.card-bg-theme.p-6.rounded.shadow(@submit="submit($event)")
            .form-general__header
                h2 {{ page_title }}
                router-link(to="/users")
                    b-button(text="Kembali" text_icon_left="chevron-left" type="button")
            .form-general__body
                .grid.grid-cols-11.gap-8.mb-16
                    .col-span-4.pr-12
                        h2.text-xl.font-bold.mb-2 Pengguna
                        p.text-gray-400 Pastikan Informasi pengguna diisi sesuai dengan kebutuhan peran.
                    .col-span-7
                        .field
                            label.field-label Nama Pengguna
                            input.field-style(placeholder="Nama Pengguna" type="text" v-model="model.name")
                            span.field-message.text-red-500(v-if="$v.model.name.$error") Nama Pengguna wajib diisi &amp; maksimal 255 karakter.
                            span.field-message.text-red-500(v-if="error_name !== ''") {{ error_name }}

                        .field
                            label.field-label Username
                            input.field-style(placeholder="Username" type="text" v-model="model.username")
                            span.field-message.text-red-500(v-if="$v.model.username.$error") Username wajib diisi &amp; maksimal 255 karakter.
                            span.field-message.text-red-500(v-if="error_username !== ''") {{ error_username }}

                        .field
                            label.field-label Alamat Email
                            input.field-style(placeholder="Email" type="email" v-model="model.email")
                            span.field-message.text-red-500(v-if="$v.model.email.$error") Email wajib diisi, format email, &amp; maksimal 255 karakter.
                            span.field-message.text-red-500(v-if="error_email !== ''") {{ error_email }}

                        .field
                            label.field-label Role
                             //- field loading
                            .field-style.field-style--loading(v-if="status_list.status === 'loading'")
                                b-loading(kind="circular")

                            .relative(v-else)
                                select.field-style(v-model="model.role_id")
                                    option(value="") - Pilih Role -
                                    //- template(v-if="list.items && list.items.length > 0")
                                    template(v-if="list && list.length > 0")
                                        option(v-for="(role,index) in list" :key="role.id" :value="role.id") {{ role.name }}
                                .field-icon
                                    b-button(icon_only="chevron-down")
                            span.field-message.text-red-500(v-if="$v.model.role_id.$error") Role wajib diisi.
                            span.field-message.text-red-500(v-if="error_role_id !== ''") {{ error_role_id }}


                        .field(v-if="role_label === 'analis'")
                            label.field-label Kasus
                            //- input-tag.field-style.field-style--case(placeholder="Tulis Kasus" v-model="input_assign_to_case")
                            //- span.field-message.text-gray-500 Pisah kasus dengan klik "enter"

                            multiselect(
                                v-model="input_assign_to_case"
                                :options="optionsCases"
                                :multiple="true"
                                open-direction="bottom"
                                placeholder="Tulis keyword disini (minimal 3 karakter)"
                                track-by="name"
                                label="name"
                                :loading="loadingCases"
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

                            span.field-message.text-red-500(v-if="$v.model.assign_to_case.$error") Kasus wajib diisi.
                            span.field-message.text-red-500(v-if="error_assign_to_case !== ''") {{ error_assign_to_case }}

                        .field(v-if="role_label === 'analis' || role_label === 'kepala-tim'")
                            label.field-label Atasan <sup>*</sup>
                             //- field loading
                            .field-style.field-style--loading(v-if="opsi_upline_status_list.status === 'loading'")
                                b-loading(kind="circular")
                            .relative(v-else)
                                select.field-style(v-model="model.upline_id")
                                    option(value="") - Pilih Atasan -
                                    template(v-if="opsi_upline_list && opsi_upline_list.items && opsi_upline_list.items.length > 0")
                                        option(v-for="(item,index) in opsi_upline_list.items" :key="item.id" :value="item.id") {{ item.name }}
                                .field-icon
                                    b-button(icon_only="chevron-down")
                            span.field-message.text-red-500(v-if="$v.model.upline_id.$error") Atasan wajib diisi.
                            span.field-message.text-red-500(v-if="error_upline_id !== ''") {{ error_upline_id }}

                template(v-if="route_name === 'GeneralUsersEdit'")
                    .grid.grid-cols-11.gap-8.mb-16
                        .col-span-4.pr-12
                            h2.text-xl.font-bold.mb-2 Kata Sandi
                            p.text-gray-400 Silakan perbaharui kata sandi bila perlu.
                        .col-span-7
                            .field
                                label.field-label Kata sandi
                                input.field-style(placeholder="Password" type="password" v-model="model.password")
                                span.field-message.text-red-500(v-if="$v.model.password.$error") Kata sandi minimal 6 karakter &amp; maksimal 255 karakter.
                                span.field-message.text-red-500(v-if="error_password !== ''") {{ error_password }}

                            .field
                                label.field-label Ulangi kata sandi
                                input.field-style(placeholder="Repeat Password" type="password" v-model="model.repeat_password")
                                span.field-message.text-red-500(v-if="$v.model.repeat_password.$error") Kata sandi harus sama
                                span.field-message.text-red-500(v-if="error_repeat_password !== ''") {{ error_repeat_password }}

            .form-general__footer
                b-button(text="Reset" type="button" @click.native="reset()")
                b-button(text="Simpan" kind="primary" type="submit")

</template>

<script>
import {mapState} from 'vuex';
import {required, requiredIf, minLength, maxLength, email, sameAs} from 'vuelidate/lib/validators';
// import InputTag from 'vue-input-tag';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
    name: 'GeneralUsersForm',
    components: {
        // InputTag,
        Multiselect,
    },
    data() {
        return {
            route_name: '',
            first_load_page: false,

            role_label: '',

            input_assign_to_case: [],

            optionsCases: [],
            loadingCases: false,
            timeout: null,

            model: {
                // photo: '',
                name: '',
                username: '',
                email: '',
                role_id: '',
                // assign_to_case: [],
                assign_to_case: '',
                upline_id: '',
                // status: '',
                password: '',
                repeat_password: '',
            },


            // // error field
            // error_photo: '',
            error_name: '',
            error_username: '',
            error_email: '',
            error_role_id: '',
            error_assign_to_case: '',
            error_upline_id: '',
            // error_status: '',
            error_password: '',
            error_repeat_password: '',
        };
    },
    validations: {
        model: {
            name: {
                required,
                maxLength: maxLength(255),
            },
            username: {
                required,
                maxLength: maxLength(255),
            },
            email: {
                required,
                maxLength: maxLength(255),
                email,
            },
            role_id: {
                required,
            },
            assign_to_case: {
                // required: requiredIf(function() {
                //     return this.role_label.toLowerCase() === 'analis';
                // }),
            },
            upline_id: {
                required: requiredIf(function() {
                    // return (this.role_label.toLowerCase() === 'analis' || this.role_label.toLowerCase() === 'kepala-tim');
                    return (this.role_label === 'analis' || this.role_label === 'kepala-tim');
                }),
            },
            // status: {
            //     required,
            // },
            password: {
                // required: requiredIf(function() {
                //     return this.route_name === 'GeneralUsersCreate';
                // }),
                minLength: minLength(6),
                // goodPassword: (password) => { //a custom validator!
                //     return password.length >= 6
                //     // /[a-z]/.test(password) &&
                //     // /[A-Z]/.test(password) &&
                //     // /[0-9]/.test(password)
                // },
            },
            repeat_password: {
                // required: requiredIf(function() {
                //     return this.route_name === 'GeneralUsersCreate';
                // }),
                minLength: minLength(6),
                sameAsPassword: sameAs('password'),
            },
        },
    },
    computed: {
        ...mapState('users', ['detail']),
        ...mapState('users', {
            opsi_upline_status_list: (state) => state.status_list,
            opsi_upline_list: (state) => state.list,
        }),
        ...mapState('roles', [
            'status_list',
            'list',
        ]),
        ...mapState('cases', {
            cases_status_list: (state) => state.status_list,
            cases_list: (state) => state.list,
        }),
        id() {
            return this.$route.params.id;
        },
        data() {
            return this.$route.params.data;
        },
        page_title() {
            let title = 'Ubah Pengguna';
            if (this.route_name === 'GeneralUsersCreate') {
                title = 'Tambah Pengguna';
            }
            return title;
        },
    },
    watch: {
        id() {},
        page_title() {},
        // form data
        detail(newData) {
            this.model.name = (newData.name ? newData.name : '');
            this.model.username = (newData.username ? newData.username : '');
            this.model.email = (newData.email ? newData.email : '');
            this.model.role_id = (newData.role_id ? newData.role_id : '');

            // this.model.assign_to_case = (newData.assign_to_case ? newData.assign_to_case : '');
            // this.input_assign_to_case = (newData.assign_to_case ? newData.assign_to_case : []);
            // this.input_assign_to_case = (newData.role && newData.role.label && newData.role.label === 'analis' && newData.assign_to_case ? newData.assign_to_case : []);
            if (newData.role && newData.role.label && newData.role.label === 'analis' && newData.assign_to_case) {
                this.input_assign_to_case = newData.assign_to_case.map(function(item) {
                    return {
                        name: item,
                        id: item,
                    };
                });
            }

            this.model.upline_id = (newData.upline_id ? newData.upline_id : '');

            // this.model.status = (newData.status ? (newData.status.toLowerCase() === 'active' ? '1' : '0') : '');
        },
        'model.username': function(newData) {
            if (newData !== '' && newData !== null) {
                this.model.username = newData.replace(/\s+/g, '_');
            }
        },
        'model.role_id': function(newData) {
            this.setRoleLabel();
        },
        // 'model.assign_to_case': function(newData) {
        //     console.log(newData);
        // },
        input_assign_to_case(newData) {
            // console.log('watch input_assign_to_case', newData)
            // this.model.assign_to_case = newData.join(',');

            let data_cases = newData;
            data_cases = data_cases.map(function(item) {
                return item.id;
            });
            data_cases = data_cases.join(',');
            this.model.assign_to_case = data_cases;
        },
        list() {
            this.setRoleLabel();
        },
        role_label(newData) {
            this.getUserRoleCustom();
        },
        cases_status_list(newData) {
            if (newData.status === 'loading') {
                this.loadingCases = true;
            } else {
                this.loadingCases = false;
            }
        },
        cases_list(newData) {
            if (newData.doc && newData.doc.length > 0) {
                // const tmpListIsu = {
                //     type: 'Isu',
                //     opt: newData.issues,
                // };
                // this.optionsLimitWord.push(tmpListIsu);

                this.optionsCases = newData.doc;
            }

            console.log(this.optionsCases);
        },
    },
    methods: {
        setRoleLabel() {
            let label = this.model.role_id;

            if (this.model.role_id !== '' && this.list && this.list.length > 0) {
                label = this.list.filter(function(e) {
                    return e.id === label;
                })[0].label;
            }

            if (label !== 'analis' && this.list && this.list.length > 0) {
                this.input_assign_to_case = [];
            }

            this.role_label = label;
        },
        async getUserRoleCustom() {
            // console.log(this.role_label)
            // console.log(this.model.upline_id)
            // console.log(this.first_load_page)

            // if (this.first_load_page === false && this.detail.upline_id !== '') {
            if (this.first_load_page === false) {
                this.model.upline_id = '';
            }

            if (this.first_load_page === true) {
                this.first_load_page = false;
            }

            await this.$store.commit('users/setList', {});

            if (this.role_label === 'analis' || this.role_label === 'kepala-tim') {
                let upline_role_id = '';
                let filter_role = [];

                if (this.role_label === 'analis') {
                    filter_role = this.list.filter(function(e) {
                        return e.label === 'kepala-tim';
                    });

                    // this.$store.dispatch('cases/getList', [100, 1]);
                } else {
                    filter_role = this.list.filter(function(e) {
                        return e.label === 'kasubdit';
                    });
                }

                if (filter_role.length > 0) {
                    upline_role_id = filter_role[0].id;
                }

                if (upline_role_id !== '') {
                    this.$store.dispatch('users/getList', [100, 1, upline_role_id]);
                }
            }
        },
        async asyncFind(query) {
            if (query.length > 2) {
                // this.loadingCases = true;
                // // this.countLimitWord = 0;
                // this.optionsCases = [];
                // // await this.getDataLimitWord(query);

                clearTimeout(this.timeout);
                const self = this;
                this.timeout = setTimeout(function() {
                    self.loadingCases = true;
                    self.optionsCases = [];
                    self.$store.dispatch('cases/getList', [100, 1, query]);
                }, 650);
            }
        },
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
                this.error_username = '';
                this.error_email = '';
                this.error_role_id = '';
                this.error_assign_to_case = '';
                this.error_upline_id = '';
                // this.error_status = '';
                this.error_password = '';
                this.error_repeat_password = '';
            } else if (empty !== true && errors !== null) {
                this.error_name = errors.name ? errors.name : '';
                this.error_username = errors.username ? errors.username : '';
                this.error_email = errors.email ? errors.email : '';
                this.error_role_id = errors.role_id ? errors.role_id : '';
                this.error_assign_to_case = errors.assign_to_case ? errors.assign_to_case : '';
                this.error_upline_id = errors.upline_id ? errors.upline_id : '';
                // this.error_status = errors.status ? errors.status : '';
                this.error_password = errors.password ? errors.password : '';
                this.error_repeat_password = errors.repeat_password ? errors.repeat_password : '';
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
                    title: 'Are you sure you want to reset form?',
                    // text: id,
                    confirmButtonText: 'Yes!',
                    confirmButtonColor: '#DD6B55',
                    showCancelButton: true,
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
        async getData(update=false) {
            this.reset(true);
            if (this.route_name === 'GeneralUsersEdit') {
                Event.$emit('showLoading', true);
            }

            await this.$store.dispatch('roles/getList', [100, 1]);

            if (this.route_name === 'GeneralUsersEdit') {
                // Event.$emit('showLoading', true);

                // this.$store.commit('users/setDetail', this.decodeDetailData(this.data));
                // // temp
                // Event.$emit('showLoading', false);

                this.$store.dispatch('users/getDetail', this.id)
                    .then((resp) => {
                        if (resp === 'success') {
                            Event.$emit('showLoading', false);
                        } else {
                            Event.$emit('error');
                        }
                    });
            } else {
                // if (this.route_name === 'GeneralUsersCreate')
                this.$store.commit('users/setDetail', {});
            }
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

            // Event.$emit('showLoading', true);

            let model_data = this.model;
            console.log(model_data);
            // model_data.assign_to_case = Array.isArray(model_data.assign_to_case) ? model_data.assign_to_case.join(',') : model_data.assign_to_case;

            model_data = Object.keys(model_data).map((key) => model_data[key]);

            console.log(model_data);
            // return;

            if (this.route_name === 'GeneralUsersCreate') {
                this.$store.dispatch('users/create', model_data)
                    .then((resp) => {
                        if (resp.result === 'success') {
                            if (save_continue === false) {
                                this.$router.push('/users');
                            } else {
                                this.$router.push('/users/'+ resp.data.data.id +'/edit');
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

            // GeneralUsersEdit
            } else {
                model_data = [this.id].concat(model_data);

                this.$store.dispatch('users/update', model_data)
                    .then((resp) => {
                        if (resp.result === 'success') {
                            if (save_continue === false) {
                                this.$router.push('/users');
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
            if (to.name === 'GeneralUsersCreate' || to.name === 'GeneralUsersEdit') {
                vm.getData();

                if (to.name === 'GeneralUsersEdit') {
                    vm.first_load_page = true;
                }
            }
        });
    },
    beforeRouteLeave(to, from, next) {
        this.route_name = '';
        this.$store.commit('users/setDetail', {});
        next();
    },
    mounted() {
        // this.getData();
        // console.log('mounted')
        // console.log(this.model)
    },
};
</script>

<style lang="sass">
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
