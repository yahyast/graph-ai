<template lang="pug">
    .box-auth
        .w-full
            .container-auth
                template(v-if="!logging")
                    .container-auth__header
                        img(src="/images/GraphAI.svg", alt="alt")
                    .container-auth__body
                        form.grid.gap-4(@submit="login($event)")
                            input.field-style#email(placeholder="Username or Email" type="text" v-model="model.email")
                            .pb-1(v-if="$v.model.email.$error || error_email !== ''")
                                .message.text-xs.text-red-500(v-if="$v.model.email.$error") This email is required.
                                .message.text-xs.text-red-500(v-if="error_email !== ''") {{ error_email }}

                            input.field-style(placeholder="Password" type="password" v-model="model.password")
                            .pb-1(v-if="$v.model.password.$error || error_password !== ''")
                                .message.text-xs.text-red-500(v-if="$v.model.password.$error") This password is required.
                                .message.text-xs.text-red-500(v-if="error_password !== ''") {{ error_password }}

                            b-button(text="Masuk Graph AI" width="full" kind="primary" type="submit" @click="login($event)")
                template(v-else)
                    .container-auth__body
                        .loading
                            .box-loading
                                span 
                            p Mohon Tunggu...
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
    name: 'authasLogin',
    data() {
        return {
            logging: false,

            model: {
                email: '',
                password: '',
            },

            // error message
            error_email: '',
            error_password: '',
        }
    },
    validations: {
        model: {
            email: {
                required,
                // maxLength: maxLength(255),
                // email
            },
            password: {
                required,
            },
        },
    },
    methods : {
        setEmptyModel(all=true) {
            for (let key in Object.keys(this.model)) {
                if (all === true) {
                    // if (Object.keys(this.model)[key] === 'key') {
                    //     this.model[Object.keys(this.model)[key]] = this.generateKey();
                    this.model[Object.keys(this.model)[key]] = '';

                }
                //  else {
                //     if (Object.keys(this.model)[key] !== 'key' && Object.keys(this.model)[key] !== 'secret')
                //         this.model[Object.keys(this.model)[key]] = '';
                // }
            }
        },
        setErrors(empty=true, errors=null) {
            if (empty === true) {
                this.error_email = '';
                this.error_password = '';
            } else if (empty !== true && errors !== null) {
                this.error_email = (errors.email ? errors.email : '');
                this.error_password = (errors.password ? errors.password : '');
            }
        },
        reset(direct=false) {
            if (direct === true) {
                this.setEmptyModel(false);
                // reset vuelidate
                this.$nextTick(() => { this.$v.$reset(); });
                this.setErrors(true);
                window.scrollTo(0,0);
            } else {
                // this.$swal.fire({
                //     icon: 'warning',
                //     title: 'Are you sure you want to reset form?',
                //     // text: id,
                //     confirmButtonText: 'Yes!',
                //     confirmButtonColor: '#DD6B55',
                //     showCancelButton: true,
                //     allowOutsideClick: false,
                // })
                // .then((result) => {
                //     if (result.isConfirmed) {
                //         if (this.route_name === 'pageClientsCreate') {
                //             this.setEmptyModel(false);
                //             // reset vuelidate
                //             this.$nextTick(() => { this.$v.$reset(); });
                //             this.setErrors(true);
                //             window.scrollTo(0,0);
                //         } else {
                //             this.getData();
                //         }
                //     }
                // });
            }
        },
        async login(e){

            e.preventDefault();
            this.setErrors();
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
                return;
            }

            // Event.$emit('showLoading', true);
            this.logging = true;
            let model_data = Object.keys(this.model).map((key) => this.model[key]);

            let result = null;

            await this.$store.dispatch('auth/login', model_data)
            .then((resp) => {
                result = resp;
            });

            // console.log(result)

            if (result.result === 'success') {
                // if (save_continue === false) {
                //     this.$router.push('/clients');
                // } else {
                //     this.$router.push('/clients/'+ resp.data.data.id +'/edit');
                // }

                // this.$swal.fire({
                //     icon: 'success',
                //     title: 'Data successfully created!',
                //     timer: 3000,
                // });

                await this.$store.dispatch('auth/getProfile');


                // this.$swal.close();
                // this.$swal.fire({
                //     title: 'Welcome, '+ resp.data.name +'!',
                //     icon: 'success',
                //     timer: 3000,
                // });
                this.reset();
                if (document.getElementById('username'))
                    document.getElementById('username').focus();
                this.logging = false;
                
                this.$router.push('/');                
                // alert('Welcome!');

            } else {
                this.logging = false;
                // alert('Error!')

                if (document.getElementById('email'))
                    document.getElementById('email').focus();

                if (result.data && result.data.message)
                    this.error_email = result.data.message;
                
                // if (resp.data.message && resp.data.message.errors) {
                //     this.setErrors(false, resp.data.message.errors);
                //     // Event.$emit('error', null, resp.data.message.errors);
                //     // Event.$emit('showLoading', false);
                //     // window.scrollTo(0,0);
                //     this.logging = false;
                // } else {
                //     // Event.$emit('error');
                //     alert('Error!')
                // }
            }
        },
    },
    mounted() {
        if (document.getElementById('email'))
            document.getElementById('email').focus();
    },
}
</script>

<style lang="sass">
    .box-auth
        @apply w-full h-screen flex justify-center
        background: url('/images/bg.png')no-repeat center center
        background-size: cover
        padding-top: 18%
        
        .container-auth
            width: 100%
            max-width: 300px
            margin: 0 auto
            &__header
                @apply mb-4
                img
                    width: 100%
                    height: 100px
                    object-fit: cover

            &__body
                .loading
                    text-align: center
                    .box-loading
                        width: 180px
                        height: 180px
                        margin: 0 auto 1rem auto
                        span
                            background-color: rgb(39, 91, 202)
                            opacity: 0.68
                            width: 180px
                            height: 180px
                            display: block
                            border-radius: 100%
                            animation: loading 0.9s ease alternate infinite

@keyframes loading
    from
        transform: scale(1)
    to
        transform: scale(0.5)

</style>