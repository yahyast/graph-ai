<template lang="pug">
    .layout-general
        form.form-general.card-bg-theme.p-6.rounded.shadow(@submit="submit($event)")
            .form-general__header
                h2 {{ page_title }}
                router-link(to="/cases")
                    b-button(text="Kembali" text_icon_left="chevron-left" type="button")
            .form-general__body
                .grid.grid-cols-11.gap-8.mb-16
                    .col-span-4.pr-12
                        h2.text-xl.font-bold.mb-2 Informasi Kasus
                        p.text-gray-400 Pastikan Informasi kasus diisi sesuai dengan kebutuhan peran.
                    .col-span-7
                        .field
                            label.field-label Nama Kasus
                            input.field-style(placeholder="Name" type="text" v-model="model.name")
                            span.field-message.text-red-500(v-if="$v.model.name.$error") Nama kasus wajib diisi &amp; maksimal memiliki 255 karakter.
                            span.field-message.text-red-500(v-if="error_name !== ''") {{ error_name }}

                        .field
                            label.field-label Deskripsi Kasus
                            textarea.field-style(placeholder="Tulis Deskripsi disini..." type="text" v-model="model.description" rows="5")
                            span.field-message.text-red-500(v-if="$v.model.description.$error") Deskripsi wajib diisi &amp; maksimal memiliki 255 karakter.
                            span.field-message.text-red-500(v-if="error_description !== ''") {{ error_description }}

                .grid.grid-cols-11.gap-8.mb-16
                    .col-span-4.pr-12
                        h2.text-xl.font-bold.mb-2 Detail Kasus
                        p.text-gray-400 Pilih Gatra yang sesuai dengan kasus
                    .col-span-7
                        .field
                            label.field-label Pilih Gatra
                            //- input.field-style(placeholder="Gatra" type="text" v-model="model.gatra")
                            //- span.field-message.text-red-500(v-if="$v.model.gatra.$error") This gatra is required &amp; max length is 255 char.

                            .relative.p-10(v-if="status_list_gatra.status === 'loading'")
                                b-loading(text="Memuat data")

                            template(v-else)
                                template(v-if="list_gatra && list_gatra.length > 0")
                                    .grid.grid-cols-3.gap-2.mt-4
                                        b-checkbox.mb-4(v-for="item in list_gatra" :value="item.id" :key="item.id" :label="item.label" v-model="choosenGatra")
                                span.text-center(v-else) -

                            span.field-message.text-red-500(v-if="error_gatra !== ''") {{ error_gatra }}

                        //- .field
                            label.field-label Start Date <sup>*</sup>
                            input.field-style(placeholder="Start Date" type="text" v-model="model.start_date")
                            span.field-message.text-red-500(v-if="$v.model.start_date.$error") This start date is required.
                            span.field-message.text-red-500(v-if="error_start_date !== ''") {{ error_start_date }}


                        //- .field
                            label.field-label End Date <sup>*</sup>
                            input.field-style(placeholder="End Date" type="text" v-model="model.end_date")
                            span.field-message.text-red-500(v-if="$v.model.end_date.$error") This end date is required.
                            span.field-message.text-red-500(v-if="error_end_date !== ''") {{ error_end_date }}

                        //- .field
                            label.field-label Tanggal Mulai - Tanggal Akhir
                            .box-calendar.box-calendar--born
                                b-icon(name="calendar")
                                date-range-picker(
                                    v-if="dateRange.startDate && dateRange.endDate"
                                    ref="picker"
                                    v-model="dateRange"
                                    @update="pickerUpdate($event)"
                                    :locale-data="{ firstDay: 1, format: 'dd mmmm yyyy' }"
                                    :date-format="dateFormatPicker"
                                    opens="right"
                                    drops="up"
                                    :ranges="default_ranges"
                                    :autoApply="true"
                                    :singleDatePicker="false"
                                    :showDropdowns="false"
                                )
                                    template(slot="input" slot-scope="picker" style="min-width: 350px;") {{ picker.startDate | date }} - {{ picker.endDate | date }}

            .form-general__footer
                b-button(text="Reset" type="button" @click.native="reset()")
                b-button(text="Simpan" kind="primary" type="submit")

</template>

<script>
import {mapState} from 'vuex';
import {required, minLength, maxLength} from 'vuelidate/lib/validators';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import moment from 'moment';

export default {
    name: 'GeneralCasesForm',
    components: {
        DateRangePicker,
    },
    data() {
        return {
            route_name: '',

            choosenGatra: [],

            dateRange: {
                startDate: moment().subtract(6, 'days').toDate(),
                endDate: moment().toDate(),
            },
            default_ranges: {
                'Today': [moment().toDate(), moment().toDate()],
                'Yesterday': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
                // 'Last 7 days': [moment().subtract(6, 'days').toDate(), moment().toDate()],
                // 'Last week': [moment().subtract(1, 'isoWeek').startOf('isoWeek').toDate(), moment().subtract(1, 'isoWeek').endOf('isoWeek').toDate()],
            },

            model: {
                name: '',
                gatra: '',
                // start_date: '',
                // end_date: '',
                start_date: moment().subtract(6, 'days').toDate(),
                end_date: moment().toDate(),
                description: '',
            },

            error_name: '',
            error_gatra: '',
            error_start_date: '',
            error_end_date: '',
            error_description: '',
        };
    },
    validations: {
        model: {
            name: {
                required,
                maxLength: maxLength(255),
            },
            gatra: {
                // required,
                // maxLength: maxLength(255)
            },
            start_date: {
                required,
            },
            end_date: {
                // required,
            },
            description: {
                // required,
            },
        },
    },
    computed: {
        ...mapState('cases', ['detail']),
        ...mapState('graph', [
            'status_list_gatra',
            'list_gatra',
        ]),
        id() {
            return this.$route.params.id;
        },
        page_title() {
            let title = 'Ubah Kasus';
            if (this.route_name === 'GeneralCasesCreate') {
                title = 'Tambah Kasus';
            }
            return title;
        },
    },
    watch: {
        id() {},
        page_title() {},
        // form data
        detail(newData) {
            // console.log(newData)
            this.model.name = (newData.name ? newData.name : '');
            // this.model.gatra = (newData.gatra ? newData.gatra : '');
            this.choosenGatra = (newData.gatra && newData.gatra.length > 0 ? newData.gatra : []);

            // this.model.start_date = (newData.start_date ? newData.start_date : '');
            // this.model.end_date = (newData.end_date ? newData.end_date : '');

            if (newData.start_date) {
                this.model.start_date = newData.start_date;
                this.dateRange.startDate = moment(newData.start_date, 'YYYY-MM-DD');
            }

            if (newData.end_date) {
                this.model.end_date = newData.end_date;
                this.dateRange.endDate = moment(newData.end_date, 'YYYY-MM-DD');
            }

            this.model.description = (newData.description ? newData.description : '');
        },
        choosenGatra(newVal) {
            // this.model.gatra = newVal.join();
            this.model.gatra = newVal;
        },
        // 'model.start_date': function(newVal, oldVal) {
        //     console.log('watch model.start_date')
        //     console.log(oldVal)
        //     console.log(newVal)
        // },
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
                this.error_gatra = '';
                this.error_start_date = '';
                this.error_end_date = '';
                this.error_description = '';
            } else if (empty !== true && errors !== null) {
                this.error_name = errors.name ? errors.name : '';
                this.error_gatra = errors.gatra ? errors.gatra : '';
                this.error_start_date = errors.start_date ? errors.start_date : '';
                this.error_end_date = errors.end_date ? errors.end_date : '';
                this.error_description = errors.description ? errors.description : '';
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
                    title: 'Apakah anda benar-benar ingin mengosongkan semua data yang sudah diisi?',
                    // text: id,
                    confirmButtonText: 'ya',
                    confirmButtonColor: '#DD6B55',
                    cancelButtonText: 'Tidak',
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
        async pickerUpdate(e) {
            // console.log(moment(this.dateRange.endDate).format('YYYY-MM-DD'))
            this.model.start_date = moment(this.dateRange.startDate).format('YYYY-MM-DD');
            this.model.end_date = moment(this.dateRange.endDate).format('YYYY-MM-DD');
        },
        getData(update=false) {
            this.reset(true);

            this.$store.dispatch('graph/getListGatra');

            if (this.route_name === 'GeneralCasesEdit') {
                Event.$emit('showLoading', true);

                // this.$store.commit('cases/setDetail', this.decodeDetailData());
                // // temp
                // Event.$emit('showLoading', false);

                this.$store.dispatch('cases/getDetail', this.id)
                    .then((resp) => {
                        if (resp === 'success') {
                            Event.$emit('showLoading', false);
                        } else {
                            Event.$emit('error');
                        }
                    });
            } else {
                // if (this.route_name === 'GeneralCasesCreate')
                this.$store.commit('cases/setDetail', {});
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

            Event.$emit('showLoading', true);
            let model_data = this.model;
            model_data.gatra = JSON.stringify(model_data.gatra);
            // console.log(model_data);
            model_data = Object.keys(model_data).map((key) => model_data[key]);

            if (this.route_name === 'GeneralCasesCreate') {
                this.$store.dispatch('cases/create', model_data)
                    .then((resp) => {
                        if (resp.result === 'success') {
                            if (save_continue === false) {
                                this.$router.push('/cases');
                            } else {
                                this.$router.push('/cases/'+ resp.data.data.id +'/edit');
                            }

                            this.$swal.fire({
                                icon: 'success',
                                title: 'Kasus berhasil dibuat',
                                timer: 3000,
                            });
                        } else {
                            if (resp.data && resp.data.message && resp.data.message.errors) {
                            // this.setErrors(false, resp.data.message.errors);
                            // Event.$emit('error', null, resp.data.message.errors);
                                Event.$emit('showLoading', false);
                                window.scrollTo(0, 0);
                            } else {
                                Event.$emit('error');
                            }
                        }
                    });

            // GeneralCasesEdit
            } else {
                model_data = [this.id].concat(model_data);

                this.$store.dispatch('cases/update', model_data)
                    .then((resp) => {
                        if (resp.result === 'success') {
                            if (save_continue === false) {
                                this.$router.push('/cases');
                            }

                            this.$swal.fire({
                                icon: 'success',
                                title: 'Kasus berhasil diperbarui',
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
            if (to.name === 'GeneralCasesCreate' || to.name === 'GeneralCasesEdit') {
                vm.getData();
            }

            if (to.name === 'GeneralCasesCreate') {
                vm.model.start_date = moment(vm.dateRange.startDate).format('YYYY-MM-DD');
                vm.model.end_date = moment(vm.dateRange.endDate).format('YYYY-MM-DD');
            }
        });
    },
    beforeRouteLeave(to, from, next) {
        this.route_name = '';
        this.$store.commit('cases/setDetail', {});
        next();
    },
    mounted() {
        // this.getData();
    },
};
</script>
