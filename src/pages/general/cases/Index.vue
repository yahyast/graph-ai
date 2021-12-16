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
                    .field.field--icon-left.w-full
                        input.field-style(placeholder="Cari kasus..." v-model="keyword" @keyup="searchKeyword")
                        span.icon-field
                            b-icon(name="search")

            .block
                router-link(:to="{ name: 'GeneralCasesCreate', params: {} }")
                    b-button(text="Kasus Baru" kind="primary" text_icon_left="plus")

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

                        //- template(v-else-if="list && list.items && list.items.length > 0")
                            tr(v-for="(data,index) in list.items" :key="data.id")
                        template(v-else-if="list && list.doc && list.doc.length > 0")
                            tr(v-for="(data,index) in list.doc" :key="data.id")
                                td {{ data.name ? data.name : '-' }}
                                //- td {{ data.gatra && data.gatra.length > 0 ? data.gatra.join(', ') : '-' }}
                                td 
                                    template(v-if="data.gatra && data.gatra.length > 0")
                                        //- span(class="label" v-for="item in data.gatra") {{ item }}
                                        span.mr-2.text-xs(class="label label--gray" v-for="item in data.gatra") {{ item }}
                                    span(v-else)
                                        router-link.link(:to="'/cases/'+data.id+'/edit'") Tambah gatra
                                //- td {{ data.start_date ? data.start_date : '-' }}
                                //- td {{ data.end_date ? data.end_date : '-' }}
                                td {{ data.description ? data.description : '-' }}
                                //- td {{ data.created_at ? data.created_at : '-' }}
                                td
                                    .flex.justify-end.w-full
                                        //- router-link.mr-2(:to="'/cases/'+data.id+'/'+encodeDetailData(data)+'/edit'")
                                        router-link.mr-2(:to="'/cases/'+data.id+'/edit'" v-tooltip="'Ubah'")
                                            b-button( icon_only="edit" text="Edit")
                                        b-button(kind="danger" icon_only="trash" text="Delete" @click.native="deleteData(data.id, data.name)"  v-tooltip="'Hapus'")

                        tr(v-else)
                            td.text-center(:colspan="tableThead.length") Kasus tidak ditemukan.


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
import { mapState } from 'vuex';
import VueAdsPagination, { VueAdsPageButton } from 'vue-ads-pagination';

export default {
    name: 'GeneralCasesIndex',
    components: {
        VueAdsPagination,
        VueAdsPageButton,
    },
    data() {
        return {
            tableThead: [
                {
                    name: 'Nama Kasus',
                    // number: true,
                },{
                    name: 'Gatra',
                // },{
                //     name: 'Start Date',
                // },{
                //     name: 'End Date',
                },{
                    name: 'Deskripsi',
                // },{
                //     name: 'Created At',
                },{
                    name: '',
                    action: true,
                },
            ],
            
            total_data: 0,
            items_per_page: 10,

            size: [1,2,10, 25, 50, 100],

            page: 0,
            start: 0,
            end: 0,

            keyword: '',
            timeout: null,
        }
    },
    computed: {
        ...mapState('cases', [
            'status_list',
            'list',
        ]),
    },
    watch: {
        list(newData) {
            let total_data = 0;

            // if (Object.keys(newData).length > 0)
            if (newData.pagination && newData.pagination.total && newData.pagination.total > 0)
                total_data = newData.pagination.total;
            
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
            this.$store.dispatch('cases/getList', [this.items_per_page, (this.page + 1), this.keyword]);
        },
        deleteData(id, name) {
            this.$swal.fire({
                icon: 'warning',
                title: 'Apakah anda benar-benar ingin menghapus ini?',
                text: 'Kasus : ' + name,
                confirmButtonText: 'Ya!',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                allowOutsideClick: false,
            })
            .then((result) => {

                if (result.isConfirmed) {
                    Event.$emit('showLoading', true);

                    this.$store.dispatch('cases/delete', id)
                    .then((resp) => {
                        if (resp === 'success') {
                            this.page = 0;

                            this.getData();

                            this.$swal.fire({
                                icon: 'success',
                                title: 'Kasus sudah dihapus!',
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
            var self = this;
            this.timeout = setTimeout(function () {
                self.page = 0;
                self.$store.commit('cases/setList', {});
                self.getData();
            }, 650);
        },
        encodeDetailData(data) {
            // return btoa(JSON.stringify(data));
            // return encodeURI(JSON.stringify(data));
            return encodeURI(btoa(JSON.stringify(data)));
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.items_per_page = 10;
            vm.page = 0;
            vm.keyword = '';
            vm.$store.commit('cases/setList', {});

            if (to.name === 'GeneralCasesIndex' && vm.$route.params.id === undefined)
                vm.getData();
        })
    },
    // beforeRouteLeave (to, from, next) {
    //     next();
    // },
}
</script>