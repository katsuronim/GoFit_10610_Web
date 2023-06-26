<template>
    <div id="all-products">
        <h4 style="font-weight:bold; text-align: left; padding-top:25px;">GoFit</h4>
        <h4 style="text-align: left; ">Jl. Centralpark No.10 Yogyakarta</h4>
        <h4 style="font-weight:bold;text-align: left; padding-top: 25px; text-decoration: underline;">LAPORAN KINERJA INSTRUKTUR BULANAN</h4>
        <h4 style="text-align: left; ">BULAN: 
            <select id="year" v-model="select.selectedMonth">
                <option disabled value="">Silahkan pilih periode bulan</option>
                <option :value="'1'">Januari</option>
                <option :value="'2'">Februari</option>
                <option :value="'3'">Maret</option>
                <option :value="'4'">April</option>
                <option :value="'5'">Mei</option>
                <option :value="'6'">Juni</option>
                <option :value="'7'">Juli</option>
                <option :value="'8'">Agustus</option>
                <option :value="'9'">September</option>
                <option :value="'10'">Oktober</option>
                <option :value="'11'">November</option>
                <option :value="'12'">Desember</option>
            </select>
        </h4>
        <h4 style="text-align: left; ">TAHUN: 
            <select id="year" v-model="select.selectedYear">
                <option disabled value="">Silahkan pilih periode tahun</option>
                <option :value="2020">2020</option>
                <option :value="2021">2021</option>
                <option :value="2022">2022</option>
                <option :value="2023">2023</option>
            </select>
        </h4>
        <h4 style="text-align: left; ">Tanggal Cetak: {{ tanggal }}</h4>

        <div v-if="select.selectedYear != '' && select.selectedMonth != ''">
            <router-link :to="{ name: 'laporanKinerjaInstruktur.print', params: { year: select.selectedYear, month: select.selectedMonth}}" class="btn btn-outline-primary" style="margin: 25px; text-align: center;">CETAK LAPORAN</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
//import { createToaster } from "@meforma/vue-toaster"
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
export default {
    setup() {
    //reactive state
    let laporans = ref([])
//    const toastr = createToaster({})
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    const akun = localStorage.getItem('akun')
    //vue router
    const router = useRouter()
    const date = new Date();
    let currentYear = date.getFullYear();
    dayjs.locale('id');
    const tanggal = dayjs().format('DD MMMM YYYY');
    const bulan = dayjs().format('MMMM')
    const select = reactive({
    selectedYear: '',
    selectedMonth: ''
    })
    //mounted
    onMounted(() => {
    axios.post(`https://backend10610.gofit10603.site/api/presensiInstrukturs/getLaporanKinerjaInstruktur`)
    .then(response => {
        laporans.value = response.data.data
    });
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
    })
        return {
            laporans,
            akun,
            tanggal,
            bulan,
            currentYear,
            select
        }
    },
    computed: {
        displayedMembers() {
            const searchKeyword = this.state.searchInput.toLowerCase();
                return this.members.filter(member => {
                const memberString = Object.values(member).join(' ').toLowerCase();
                return memberString.includes(searchKeyword);
            });
        }
    }

}
</script>
<style>
</style>