<template lang="pug">
    .layout-general
        .flex.items-center.justify-between.mb-5
            .flex.items-center.gap-4
                //- .block.w-64
                    .field.field--icon-right.w-full
                        select.field-style()
                            option Filter A
                            option Filter B
                            option Filter C
                            option Filter D
                            option Filter E
                        span.icon-field
                            b-icon(name="chevron-down")
                .block.w-30
                    .field.field--icon-right.w-full
                        select.field-style(@change="sizeChange($event)" v-model="items_per_page")
                            option(v-for="(s,index) in size" :key="index" :value="s") {{ s }}
                        span.icon-field
                            b-icon(name="chevron-down")

                .block.w-64
                    .field.field--icon-right.w-full
                        .field-style.field-style--loading(v-if="filter_role_status_list.status === 'loading'")
                            b-loading(kind="circular")
                        .relative(v-else)
                            select.field-style(v-model="role_id")
                                option(value="") - Semua Role -
                                //- template(v-if="filter_role_list && filter_role_list.items && filter_role_list.items.length > 0")
                                    option(v-for="(item,index) in filter_role_list.items" :key="item.id" :value="item.id") {{ item.name }}
                                
                                template(v-if="filter_role_list && filter_role_list.length > 0")
                                    option(v-for="(item,index) in filter_role_list" :key="item.id" :value="item.id") {{ item.name }}
                            span.icon-field
                                b-icon(name="chevron-down")

                .block.w-64
                    .field.field--icon-left.w-full
                        input.field-style(placeholder="Search..." v-model="keyword" @keyup="searchKeyword")
                        span.icon-field
                            b-icon(name="search")

                //- .block.w-30
                    b-button(icon_only="refresh-cw" kind="tertiary" v-tooltip="'Reset Filter'")

            .block
                router-link(:to="{ name: 'GeneralUsersCreate', params: {} }")
                    b-button(text="User Baru" kind="primary" text_icon_left="plus")

        .block.w-full
            .card-bg-theme.p-6.rounded.shadow.w-full
                table.main-table
                    thead
                        tr
                            th(v-for="(th,index) in tableThead" :key="index" :class="(th.number && th.number===true ? 'number' : '')+(th.action && th.action===true ? ' thead-action' : '')") {{ th.name }}
                    tbody
                        tr(v-if="status_list.status === 'loading'")
                            td.text-center(:colspan="tableThead.length")
                                .relative.p-10
                                    b-loading(text="Memuat data")

                        template(v-else-if="list && list.items && list.items.length > 0")
                            tr(v-for="(data,index) in list.items" :key="data.id")
                                td {{ data.name ? data.name : '-' }}
                                td {{ data.username ? data.username : '-' }}
                                td {{ data.email ? data.email : '-' }}
                                td {{ data.role && data.role.name ? data.role.name : '-' }}
                                //- td {{ data.assign_to_case && data.assign_to_case.length > 0 ? data.assign_to_case.join(', ') : '-' }}
                                //- td 
                                    template(v-if="data.assign_to_case && data.assign_to_case.length > 0")
                                        span(class="label" v-for="item in data.assign_to_case") {{ item }}
                                    span(v-else) -
                                //- td {{ data.created_at ? data.created_at : '-' }}
                                td
                                    .flex.justify-end.w-full
                                        //- router-link.mr-2(:to="'/users/'+data.id+'/'+encodeDetailData(data)+'/edit'")
                                        router-link.mr-2(:to="'/users/'+data.id+'/edit'" v-tooltip="'Ubah'")
                                            b-button( icon_only="edit" text="Edit")
                                        b-button(kind="danger" icon_only="trash" text="Delete" @click.native="deleteData(data.id, data.name)" v-tooltip="'Hapus'")

                        tr(v-else)
                            td.text-center(:colspan="tableThead.length") Data tidak ditemukan.


                .pagination.mt-5(v-if="status_list.status !== 'loading'")
                    //- hr
                    vue-ads-pagination(
                        :total-items="total_data"
                        :items-per-page="items_per_page"
                        :page="page"
                        :max-visible-pages="5"
                    )
                        template(slot="buttons" slot-scope="props")
                            vue-ads-page-button(
                                v-for="(button, key) in props.buttons"
                                :key="key"
                                v-bind="button"
                                :class="{'bg-yellow-dark': button.active}"
                                @page-change="page = button.page"
                                @range-change="start = button.start; end = button.end"
                            )

</template>

<script>
import {mapState} from 'vuex';
import VueAdsPagination, {VueAdsPageButton} from 'vue-ads-pagination';

export default {
    name: 'GeneralUsersIndex',
    components: {
        VueAdsPagination,
        VueAdsPageButton,
    },
    data() {
        return {
            users: [
                {
                    url: 'users/form',
                    name: 'Devi Krisdiansyah',
                    email: 'devi@krisdiansyah.com',
                    uname: 'agilbaka',
                    role: 'superadmin',
                    created: '10 April 2021 11:23',
                },
                {
                    url: 'users/form',
                    name: 'Devi Krisdiansyah',
                    email: 'devi@krisdiansyah.com',
                    uname: 'agilbaka',
                    role: 'superadmin',
                    created: '10 April 2021 11:23',
                },
                {
                    url: 'users/form',
                    name: 'Devi Krisdiansyah',
                    email: 'devi@krisdiansyah.com',
                    uname: 'agilbaka',
                    role: 'superadmin',
                    created: '10 April 2021 11:23',
                },
            ],

            tableThead: [
                {
                    name: 'Nama',
                    // number: true,
                }, {
                    name: 'Username',
                }, {
                    name: 'Email',
                }, {
                    name: 'Role',
                // }, {
                //     name: 'Kasus',
                // },{
                //     name: 'Created At',
                }, {
                    name: '',
                    action: true,
                },
            ],

            total_data: 0,
            items_per_page: 10,

            size: [2,10, 25, 50, 100],

            page: 0,
            start: 0,
            end: 0,

            role_id: '',

            keyword: '',
            timeout: null,
        };
    },
    computed: {
        ...mapState('users', [
            'status_list',
            'list',
        ]),
        ...mapState('roles', {
            filter_role_status_list: state => state.status_list,
            filter_role_list: state => state.list,
        }),
    },
    watch: {
        list(newData) {
            let total_data = 0;
            if (Object.keys(newData).length > 0)
            // total_data = parseInt(newData.total_data);
            {
                total_data = parseInt(newData.total_item);
            }

            // if (newData && newData.length > 0)
            //     total_data = newData.length;

            this.total_data = total_data;
        },
        items_per_page() {
            this.getData();
        },
        page() {
            this.getData();
        },
        role_id() {
            this.getData(true);
        },
        filter_role_status_list(newVal) {
            // console.log(newVal)
        },
        filter_role_list(newVal) {
            // console.log(newVal)
        },
    },
    methods: {
        getData(reset=false, get_roles=false) {
            // for dispatch get data
            if (reset) {
                this.items_per_page = 10;
                this.page = 0;
            }

            // if (this.filter_role_status_list.status !== true)
            if (get_roles === true)
                this.$store.dispatch('roles/getList', [100, 1]);

            this.$store.dispatch('users/getList', [this.items_per_page, (this.page + 1), this.role_id, this.keyword]);
        },
        deleteData(id, name) {
            this.$swal.fire({
                icon: 'warning',
                title: 'Are you sure you want to delete?',
                text: 'Role : ' + name,
                confirmButtonText: 'Yes!',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        Event.$emit('showLoading', true);

                        this.$store.dispatch('users/delete', id)
                            .then((resp) => {
                                if (resp === 'success') {
                                    this.page = 0;

                                    this.getData(true);

                                    this.$swal.fire({
                                        icon: 'success',
                                        title: 'Data successfully deleted!',
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
        pageChange(page) {
            this.page = page;
        },
        // rangeChange(start, end) {
        //     this.start = start;
        //     this.end = end;
        // },
        sizeChange() {
            this.page = 0;
        },
        searchKeyword() {
            clearTimeout(this.timeout);
            const self = this;
            this.timeout = setTimeout(function() {
                self.page = 0;
                self.$store.commit('users/setList', {});
                self.getData();
            }, 650);
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.items_per_page = 10;
            vm.page = 0;
            vm.keyword = '';
            vm.$store.commit('users/setList', {});

            if (to.name === 'GeneralUsersIndex' && vm.$route.params.id === undefined) {
                vm.getData(true, true);
            }
        });
    },
    // beforeRouteLeave (to, from, next) {
    //     next();
    // },
};
</script>
