<template lang="pug">
    header.content-header(v-if="status_detail === 'loading'")
        .m-20.p-20.relative.text-center.w-full.h-full
            b-loading(text="Memuat data")

    header.content-header(v-else)
        .content-header__photo
            //- img(src="https://graph-ntxdemo.vercel.app/icon/yorrys.png", alt="alt")
            img(:src="detail.photo ? detail.photo : ''" alt="alt" @error="(getErrorImage($event,'profile'))")
        .content-header__info
            h1 {{ detail.name && detail.name.length > 0 ? detail.name : '-' }}
            .grid.grid-cols-5.gap-6
                .call-out
                    span No. KTP
                    p {{ detail.ktp_number && detail.ktp_number.length > 0 ? detail.ktp_number : '-' }}
                .call-out
                    span Provinsi
                    p {{ detail.province && detail.province.length > 0 ? detail.province : '-' }}
                .call-out
                    span Alamat
                    p {{ detail.address && detail.address.length > 0 ? detail.address : '-' }}
                .call-out
                    span Kota
                    p {{ detail.city && detail.city.length > 0 ? detail.city : '-' }}
                .call-out
                    span Kecamatan
                    p {{ detail.district && detail.district.length > 0 ? detail.district : '-' }}
                .call-out
                    span Kelurahan
                    p {{ detail.village && detail.village.length > 0 ? detail.village : '-' }}
                .call-out
                    span RT/RW
                    p {{ detail.rt_rw && detail.rt_rw.length > 0 ? detail.rt_rw : '-' }}
                .call-out
                    span Kode Pos
                    p {{ detail.postal_code && detail.postal_code.length > 0 ? detail.postal_code : '-' }}
                .call-out
                    span Tanggal Lahir
                    p {{ detail.birth_date && detail.birth_date.length > 0 ? detail.birth_date : '-' }}
                .call-out
                    span Tempat Lahir
                    p {{ detail.birth_place && detail.birth_place.length > 0 ? detail.birth_place : '-' }}
                .call-out
                    span Agama
                    p {{ detail.religion && detail.religion.length > 0 ? detail.religion : '-' }}
                .call-out
                    span Pekerjaan
                    p {{ detail.profession && detail.profession.length > 0 ? detail.profession : '-' }}
                .call-out
                    span Status Menikah
                    p {{ detail.marital_status && detail.marital_status.length > 0 ? detail.marital_status : '-' }}
                .call-out
                    span Jenis Kelamin
                    p {{ detail.gender && detail.gender.length > 0 ? detail.gender : '-' }}
                .call-out
                    span Gol. Darah
                    p {{ detail.blood_type && detail.blood_type.length > 0 ? detail.blood_type : '-' }}
                .call-out
                    span Nomor KK
                    p {{ detail.kk_number && detail.kk_number.length > 0 ? detail.kk_number : '-' }}
                .call-out
                    span SIM
                    template(v-if="detail.driving_license && detail.driving_license.length > 0")
                        p(v-for="item in detail.driving_license") {{ item.license_type }} - {{ item.license_number }}
                    p(v-else) -
                .call-out
                    span STNK
                    template(v-if="detail.vehicle_reg && detail.vehicle_reg.length > 0")
                        p(v-for="item in detail.vehicle_reg") {{ item.type }} : {{ item.stnk_number }}
                    p(v-else) -
                    //- p Motor : 567567567
                    //- p Mobil : 123123123

                .call-out
                    span Nomor Polisi
                    template(v-if="detail.vehicle_reg && detail.vehicle_reg.length > 0")
                        p(v-for="item in detail.vehicle_reg") {{ item.type }} : {{ item.police_reg_number }}
                    p(v-else) -
                    //- p Motor : B 1243 Y
                    //- p Mobil : B 1242 Y

                .call-out
                    span MSISDN
                    p {{ detail.msisdn && detail.msisdn.length > 0 ? detail.msisdn : '-' }}
                    //- p Call history
                    //- p Location
                    //- p History location

</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'ActorHeader',
    data: function() {
        return {
        };
    },
    computed: {
        ...mapState('actor', [
            'status_detail',
            'detail',
        ]),
    },
    watch: {
        detail(newVal) {
            console.log(newVal);
        },
    },
};
</script>

<style lang="sass">
    .content-header
        background-color: var(--bg-card)
        @apply flex p-4 rounded mb-2
        &__photo
            @apply mr-4
            img
                width: 100%
                max-width: 125px
                min-width: 125px
                height: 155px
                object-fit: cover
                @apply rounded
        &__info
            @apply w-full
            h1
                font-size: 24px
                font-weight: 600
                line-height: 28px
                margin-block: 0px
                margin-bottom: 15px
    .call-out
        span
            opacity: 0.6
            font-size: 12px
        p
            font-size: 14px
</style>
