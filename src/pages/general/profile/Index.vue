<template lang="pug">
    .bdi-layouts
        GeneralSidebar
        .bdi-layouts__content
            //- header page
            HeaderPage(title="Profile")
            .layout-general
                .mb-12
                    form.form-general.card-bg-theme.p-6.rounded.shadow(@submit="submit($event)")
                        .form-general__body
                            .grid.grid-cols-11.gap-8.mb-16
                                .col-span-4.pr-12
                                    h2.text-xl.font-bold.mb-2 Informasi Akun
                                    p.text-gray-400 Pastikan Informasi akun diisi sesuai dengan informasi yang terbaru.
                                .col-span-7
                                    .field
                                        label.field-label Name <sup>*</sup>
                                        input.field-style(placeholder="Name" type="text" v-model="model.name")
                                        span.field-message.text-red-500(v-if="$v.model.name.$error") This name is required &amp; max length is 255 char.
                                        span.field-message.text-red-500(v-if="error_name !== ''") {{ error_name }}

                                    .field
                                        //- label.field-label Username <sup>*</sup>
                                        label.field-label Username
                                        input.field-style.field-disabled(placeholder="Username" type="text" v-model="model.username" readonly)
                                        span.field-message.text-red-500(v-if="$v.model.username.$error") This username is required &amp; max length is 255 char.
                                        span.field-message.text-red-500(v-if="error_username !== ''") {{ error_username }}

                                    .field
                                        //- label.field-label Email <sup>*</sup>
                                        label.field-label Email
                                        input.field-style.field-disabled(placeholder="Email" type="email" v-model="model.email" readonly)
                                        span.field-message.text-red-500(v-if="$v.model.email.$error") This email is required &amp; max length is 255 char.
                                        span.field-message.text-red-500(v-if="error_email !== ''") {{ error_email }}

                                    .field
                                        label.field-label Role
                                        input.field-style.field-disabled(placeholder="Role" type="text" v-model="model.role_id" readonly)

                            //- .field
                                label.field-label Role
                                .relative
                                    select.field-style
                                        option Role A
                                        option Role B
                                        option Role C
                                        option Role D
                                        option Role E
                                    .field-icon
                                        b-button(icon_only="chevron-down")
                                span.field-message text message
                            
                            .grid.grid-cols-11.gap-8.mb-16
                                .col-span-4.pr-12
                                    h2.text-xl.font-bold.mb-2 Kata Sandi
                                    p.text-gray-400 Silakan perbaharui kata sandi bila perlu. <br> Lupa kata sandi saat ini? Silakan hubungi admin untuk melakukan perubahan.
                                .col-span-7
                                    .field
                                        label.field-label Password
                                        input.field-style(placeholder="Password" type="password" v-model="model.password")
                                        span.field-message.text-red-500(v-if="$v.model.password.$error") This password minimum 6 characters &amp; max length is 255 char.
                                        span.field-message.text-red-500(v-if="error_password !== ''") {{ error_password }}

                                    .field
                                        label.field-label Repeat Password
                                        input.field-style(placeholder="Repeat Password" type="password" v-model="model.repeat_password")
                                        span.field-message.text-red-500(v-if="$v.model.repeat_password.$error") This repeat password must be same as password.
                                        span.field-message.text-red-500(v-if="error_repeat_password !== ''") {{ error_repeat_password }}

                        .form-general__footer
                            b-button(text="Reset" type="button" @click.native="reset()")
                            b-button(text="Save" kind="primary" type="submit")
                
                //- .mb-12
                    .form-general.bg-white.p-6.rounded.shadow
                        .form-general__header
                            h2 Ganti Password
                        .form-general__body
                            .field
                                label.field-label Password saat ini
                                input.field-style(placeholder="Tulis password sekarang" type="text")
                                span.field-message text message
                            .field
                                label.field-label Tulis Password baru
                                input.field-style(placeholder="Tulis password baru" type="text")
                                span.field-message text message
                        
                            .field
                                label.field-label Konfirmasi password baru
                                input.field-style(placeholder="Tulis ulang password baru" type="text")
                                span.field-message text message
                        
                        .form-general__footer
                            b-button(text="Batalkan")
                            b-button(text="Simpan" kind="primary")
</template>

<script>

import GeneralSidebar from '@/pages/general/Sidebar';
import HeaderPage from '@/components/sections/HeaderPage';
import { mapState } from 'vuex';
import { required, requiredIf, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";

export default {
    name: 'Generalprofile',
    components: {
        GeneralSidebar,
        HeaderPage
    },
    data() {
        return {
            // route_name: '',
            // page_active: false,

            model: {
                // photo: '',
                name: '',
                username: '',
                email: '',
                role_id: '',
                password: '',
                repeat_password: '',
            },

            // error_photo: '',
            error_name: '',
            error_username: '',
            error_email: '',
            error_role_id: '',
            error_password: '',
            error_repeat_password: '',
        };
    },
    validations: {
        model: {
            name: {
                required,
                maxLength: maxLength(255)
            },
            username: {
                // required,
                // maxLength: maxLength(255)
            },
            email: {
                // required,
                // maxLength: maxLength(255),
                // email
            },
            role_id: {
                // required,
            },
            password: {
                // required: requiredIf(function() {
                //     return this.route_name === 'GeneralProfilePage';
                // }),
                minLength: minLength(6),
                maxLength: maxLength(255),

                // goodPassword: (password) => { //a custom validator!
                //     return password.length >= 6
                //     // /[a-z]/.test(password) &&
                //     // /[A-Z]/.test(password) &&
                //     // /[0-9]/.test(password)
                // },
            },
            repeat_password: {
                required: requiredIf(function() {
                    return this.model.password.length > 0;
                }),
                minLength: minLength(6),
                maxLength: maxLength(255),
                sameAsPassword: sameAs('password')
            },
        },
    },
    computed: {
        // ...mapState('auth', ['user','profile']),
        ...mapState('auth', ['profile']),
        // route_name() {
        //     return this.$route.name;
        // },
    },
    watch: {
        // route_name() {
        //     this.getData();
        // },
        // page_active(newData) {
        //     if (newData === true)
        //         this.getData();
        // },
        // form data
        profile(newData) {
            this.model.name = (newData.name ? newData.name : '');
            this.model.username = (newData.user_name ? newData.user_name : '');
            this.model.email = (newData.email ? newData.email : '');
            // this.model.photo = (newData.photo ? newData.photo : '');
            this.model.role_id = (newData.role && newData.role.name ? newData.role.name : '');
            // this.status = (newData.status ? newData.status : '');
            // this.password = (newData.password ? newData.password : '');
        },
    },
    methods: {
        setEmptyModel(all=true) {
            for (let key in Object.keys(this.model)) {
                if (all === true)
                    this.model[Object.keys(this.model)[key]] = '';
            }
        },
        setErrors(empty=true, errors=null) {
            if (empty === true) {
                this.error_name = '';
                this.error_username = '';
                this.error_email = '';
                this.error_role_id = '';
                this.error_password = '';
                this.error_repeat_password = '';

            } else if (empty !== true && errors !== null) {
                this.error_name = errors.name ? errors.name : '';
                this.error_username = errors.username ? errors.username : '';
                this.error_email = errors.email ? errors.email : '';
                this.error_role_id = errors.role_id ? errors.role_id : '';
                this.error_password = errors.password ? errors.password : '';
                // this.error_repeat_password = errors.repeat_password ? errors.repeat_password : '';
            }
        },
        getData(update=false) {
            this.reset(true);

            // if (this.route_name === 'GeneralProfilePage') {
                
                if (!update) 
                    Event.$emit('showLoading', true);

                this.$store.dispatch('auth/getProfile')
                .then((resp) => {
                    if (resp === 'success') {
                        // Event.$emit('showLoading', false);

                        if (!update) {
                            Event.$emit('showLoading', false);
                        } else {
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Data successfully updated!',
                                timer: 3000,
                            });
                        }

                    } else {
                        Event.$emit('error');
                        // alert('error !');
                    }
                });
            // }
        },
        async reset(direct=false) {
            if (direct === true) {
                // this.setEmptyModel(false);
                this.setEmptyModel(true);
                // reset vuelidate
                this.$nextTick(() => { this.$v.$reset(); });
                this.setErrors(true);
                // window.scrollTo(0,0);
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                // document.body.scrollTop = 0;
                // document.getElementById('app').scrollIntoView();

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
        scrollToTop() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
        submit(e, save_continue=false) {
            e.preventDefault();
            this.$v.$touch();

            if (this.$v.model.$invalid) {
                for (let key in Object.keys(this.$v.model)) {
                    const input = Object.keys(this.$v.model)[key];
                    if (input.includes("$")) return false;
                    if (this.$v.model[input].$error) {
                        break;
                    }
                }
                // Event.$emit('error', 'Please fill the form correctly.');
                // Event.$emit('showLoading', false);
                // window.scrollTo(0,0);
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                return;
            }

            Event.$emit('showLoading', true);
            let model_data = Object.keys(this.model).filter((item) => { return (item !== 'username' && item !== 'email' && item !== 'role_id'); }).map((key) => this.model[key]);

            // console.log(model_data);
            // return;

            this.$store.dispatch('auth/updateProfile', model_data)
            .then((resp) => {
                if (resp.result === 'success') {                        
                    // if (save_continue === false)
                    //     this.$router.push('/users');
                    
                    this.getData(true);

                    // this.$swal.fire({
                    //     icon: 'success',
                    //     title: 'Data successfully updated!',
                    //     timer: 3000,
                    // });
                } else {
                    if (resp.data.message && resp.data.message.errors) {
                        this.setErrors(false, resp.data.message.errors);
                        // Event.$emit('error', null, resp.data.message.errors);
                        Event.$emit('showLoading', false);
                        // window.scrollTo(0,0);
                    } else {
                        Event.$emit('error');
                    }
                    
                    // alert('error !');
                }
            });
        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // access to component instance via `vm`
            // console.log('beforeRouteEnter')
            // console.log(to, from)
            // console.log(to.name)
            // console.log(vm)
            // if (to.name == 'GeneralProfilePage')
                // vm.route_name = to.name;
                // vm.page_active = true;
                // vm.$swal.fire({
                //     icon: 'success',
                //     title: 'Loading...',
                //     // timer: 3000,
                // });;
                vm.getData();
        })
    },
    beforeRouteLeave (to, from, next) {
        next();
    },
    mounted() {
        // this.getData();
    }
}
</script>