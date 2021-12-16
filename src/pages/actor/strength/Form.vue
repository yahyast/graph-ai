<template lang="pug">
    form.form-general(@submit.prevent="submit($event)")
        .form-general__header.w-full
            h2.text-2xl Kekuatan
        .form-general__body.w-full
            //- p.text-gray-400.mb-6 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            wysiwyg(v-model="model.strength")
            
            //- span.field-message.text-red-500(v-if="$v.model.strength.$error") This strength is required.

        .form-general__footer
            router-link(to="/bdi/tokoh")
                b-button(text="Batalkan" type="button")
            b-button(text="Simpan" kind="primary" type="submit")
</template>

<script>
import { mapState } from 'vuex';
import { required } from "vuelidate/lib/validators";

export default {
    props: ['id'],
    data() {
        return {
            model: {
                strength: '',
            },
        };
    },
    validations: {
        model: {
            strength: {
                // required,
            },
        }
    },
    computed: {
        ...mapState('actor', [
            'detail',
        ]),
    },
    watch: {
        id() {},
        detail(newVal) {
            // console.log('watch detail', newVal);
            this.model.strength = (newVal.strength ? newVal.strength : '');
        },
    },
    methods: {
        setEmptyModel(all=true) {
            for (let key in Object.keys(this.model)) {
                if (all === true)
                    this.model[Object.keys(this.model)[key]] = '';
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
            this.$nextTick(() => { this.$v.$reset(); });
            // this.setErrors(true);
        },
        async getData() {
            await this.reset(true);
            Event.$emit('getDataActor');
        },
        submit(e) {
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
                window.scrollTo(0,0);
                return;
            }

            Event.$emit('showLoading', true);
            
            let model_data = this.model;

            // update only
            this.$store.dispatch('actor/update', [this.id, this.model, 'strength'])
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
                            this.$router.push({ path: '/bdi/tokoh' });
                        }

                        Event.$emit('success', 'Data berhasil diperbarui!');
                    });

                } else {
                    Event.$emit('error');
                }
            });


        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            console.log(to.name);
            if (to.name === 'strengthOfActorForm') {
                vm.getData();
            }
        });
    },
}
</script>

<style lang="sass">

</style>