<template lang="pug">
    .layout-general
        .flex.items-center.justify-between.mb-5
            .flex.items-center.gap-4
                .block.w-30
                        .field.field--icon-right.w-full
                            select.field-style(@change="sizeChange($event)" v-model="items_per_page")
                                option(v-for="(s,index) in size" :key="index" :value="s") {{ s }}
                            span.icon-field
                                b-icon(name="chevron-down")

                .block.w-64
                    .field.field--icon-left.w-full
                        input.field-style(placeholder="Search..." v-model="keyword" @keyup="searchKeyword")
                        span.icon-field
                            b-icon(name="search")

            .block
                router-link(:to="{ name: 'GeneralRolesCreate', params: {} }")
                    b-button(text="Role Baru" kind="primary" text_icon_left="plus")

        .block.w-full
            .card-bg-theme.p-6.rounded.shadow.w-full
                table.main-table
                    //- thead
                        tr
                            th Role Name
                            th Description
                            th Created At
                    thead
                        tr
                            th(v-for="(th,index) in tableThead" :key="index" :class="(th.number && th.number===true ? 'number' : '')+(th.action && th.action===true ? ' thead-action' : '')") {{ th.name }}
                    tbody
                        //- tr(v-for="item in roles")
                            td
                                router-link.link(:to="item.url") {{ item.name }}
                            td {{ item.desc }}
                            td {{ item.created }}

                        tr(v-if="status_list.status === 'loading'")
                            td.text-center(:colspan="tableThead.length")
                                .relative.p-10
                                    b-loading(text="Memuat data")
                                //- .flex.flex-wrap.items-center.justify-center
                                    //- Spinner(show="true" size="48")
                                    | Loading...

                        //- template(v-else-if="list && list.data && list.data.length > 0")
                        template(v-else-if="list && list.length > 0")
                            tr(v-for="(data,index) in list" :key="data.id")
                                td {{ data.name ? data.name : '-' }}
                                td {{ data.label ? data.label : '-' }}
                                td {{ data.description ? data.description : '-' }}
                                //- td {{ data.created_at ? data.created_at : '-' }}
                                td
                                    .flex.justify-end.w-full
                                        //- router-link.mr-2(:to="'/roles/'+data.id+'/'+encodeDetailData(data)+'/edit'")
                                        router-link.mr-2(:to="'/roles/'+data.id+'/edit'" v-tooltip="'Ubah'")
                                            b-button( icon_only="edit" text="Edit")
                                        b-button(kind="danger" icon_only="trash" text="Delete" @click.native="deleteData(data.id, data.name)" v-tooltip="'Hapus'")

                        tr(v-else)
                            td.text-center(:colspan="tableThead.length") Data tidak ditemukan.

</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'GeneralRolesIndex',
    data() {
        return {
            // roles: [
            //     {
            //         url: 'roles/form',
            //         name: 'Superadmin',
            //         desc: 'Digital forensics is a skill that is valuable for all types of investigators.',
            //         created: '10 April 2021 11:23'
            //     },
            //     {
            //         url: 'roles/form',
            //         name: 'Admin',
            //         desc: 'Paraben offers software and training to get you set up for processing internally',
            //         created: '10 April 2021 11:23'
            //     },
            //     {
            //         url: 'roles/form',
            //         name: 'Official',
            //         desc: 'professional services that can augment your current investigative offerings.',
            //         created: '10 April 2021 11:23'
            //     },
            // ],

            tableThead: [
                {
                    name: 'Nama',
                    // number: true,
                },{
                    name: 'Label',
                },{
                    name: 'Deskripsi',
                // }, {
                //     name: 'Created At',
                }, {
                    name: '',
                    action: true,
                },
            ],

            total_data: 0,
            items_per_page: 100,

            size: [2, 10, 25, 50, 100],

            page: 0,
            start: 0,
            end: 0,

            keyword: '',
            timeout: null,
        };
    },
    computed: {
        ...mapState('roles', [
            'status_list',
            'list',
        ]),
    },
    watch: {
        list(newData) {
            let total_data = 0;
            // if (Object.keys(newData).length > 0)
            //     total_data = parseInt(newData.total_data);

            if (newData && newData.length > 0) {
                total_data = newData.length;
            }

            this.total_data = total_data;
        },
        items_per_page() {
            this.getData();
        },
        page() {
            this.getData();
        },
    },
    methods: {
        getData() {
            // for dispatch get data
            this.$store.dispatch('roles/getList', [this.items_per_page, (this.page + 1), this.keyword]);
        },
        deleteData(id, name) {
            this.$swal.fire({
                icon: 'warning',
                title: 'Hapus data?',
                text: 'Role : ' + name,
                confirmButtonText: 'Ya!',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                cancelButtonText: 'Tidak',
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        Event.$emit('showLoading', true);

                        this.$store.dispatch('roles/delete', id)
                            .then((resp) => {
                                if (resp === 'success') {
                                    this.page = 0;

                                    this.getData();

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
                self.$store.commit('roles/setList', {});
                self.getData();
            }, 650);
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.items_per_page = 25;
            vm.page = 0;
            vm.keyword = '';
            vm.$store.commit('roles/setList', {});

            if (to.name === 'GeneralRolesIndex' && vm.$route.params.id === undefined) {
                vm.getData();
            }
        });
    },
    // beforeRouteLeave (to, from, next) {
    //     next();
    // },
};
</script>
