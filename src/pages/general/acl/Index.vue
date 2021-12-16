<template lang="pug">
    .bdi-layouts
        GeneralSidebar
        .bdi-layouts__content
            //- header page
            HeaderPage(title="ACL")
            //- form filter
            .layout-general 
                .block.w-full
                    .card-bg-theme.p-6.rounded.shadow.w-full
                        .flex.items-center.pb-6.justify-end
                            b-button.mr-4(text="Batalkan perubahan")
                            b-button(text="Simpan perubahan" kind="primary" type='submit')
                        table.table.table--roles
                            thead
                                tr
                                    th Fitur
                                    th: b-checkbox(name="roles" label="Role A")
                                    th: b-checkbox(name="roles" label="Role B")
                                    th: b-checkbox(name="roles" label="Role C")
                                    th: b-checkbox(name="roles" label="Role E")
                                    th: b-checkbox(name="roles" label="Role F")
                            tbody
                                tr.as-parent
                                    td Management Users
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Index 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Update 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Delete 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")

                                tr.as-parent
                                    td Manajemen Topik
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Index 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Update 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Delete 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")

                                tr.as-parent
                                    td BDI Organisasi
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Index 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Update 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Delete 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")

                                tr.as-parent
                                    td BDI Tokoh
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Index 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Update 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Delete 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")

                                tr.as-parent
                                    td BDI Isu
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Index 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Update 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Delete 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")

                                tr.as-parent
                                    td Gatra
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Index 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Update 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                tr
                                    td Delete 
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")
                                    td: b-checkbox(name="roles")

                        .flex.items-center.pt-6.justify-end
                            b-button.mr-4(text="Batalkan perubahan")
                            b-button(text="Simpan perubahan" kind="primary" type='submit')
</template>

<script>

import GeneralSidebar from '@/pages/general/Sidebar'
import HeaderPage from '@/components/sections/HeaderPage'

export default {
    name: 'GeneralRolesShell',
    components: {
        GeneralSidebar,
        HeaderPage
    },
    data() {
        return {
            
        }
    },
}
</script>

<style lang="sass">

</style>