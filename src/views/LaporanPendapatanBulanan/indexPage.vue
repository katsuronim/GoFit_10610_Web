<template>
    <div id="all-products">
        <h4 style="font-weight:bold; text-align: left; padding-top:25px;">GoFit</h4>
        <h4 style="text-align: left; ">Jl. Centralpark No.10 Yogyakarta</h4>
        <h4 style="font-weight:bold;text-align: left; padding-top: 25px; text-decoration: underline;">LAPORAN PENDAPATAN BULANAN</h4>
        <h4 style="text-align: left; ">PERIODE: 
            <select id="year" v-model="select.selectedYear">
                <option disabled value="">Silahkan pilih periode tahun</option>
                <option :value="2020">2020</option>
                <option :value="2021">2021</option>
                <option :value="2022">2022</option>
                <option :value="2023">2023</option>
            </select>
        </h4>
        <h4 style="text-align: left; ">Tanggal Cetak: {{ tanggal }}</h4>

        <div v-if="select.selectedYear != ''">
            <router-link :to="{ name: 'laporanPendapatanBulanan.print', params: { id: select.selectedYear} }" class="btn btn-outline-primary" style="margin: 25px; text-align: center;">GENERATE LAPORAN</router-link>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, reactive } from 'vue'
//import { createToaster } from "@meforma/vue-toaster"
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
export default {
    setup() {
    //reactive state
    let laporans = ref([])
    const select = reactive({
    selectedYear: ''
    })
    let availableYears = []
//    const toastr = createToaster({})
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    let jumlah = 0
    const akun = localStorage.getItem('akun')
    //vue router
    const router = useRouter()
    const date = new Date();
    let currentYear = date.getFullYear();
    dayjs.locale('id');
    const tanggal = dayjs().format('DD MMMM YYYY');
    

    //mounted
    onMounted(() => {
    generateYears()
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
    })
    function getYears () {
      let currentDate = new Date()
      let currentYear = currentDate.getFullYear()
      let nextyear = currentYear++
      return [currentYear, nextyear]
    }
    function generateYears() {
      for (let year = 2020; year <= currentYear; year++) {
        availableYears.push(year);
      }
    }
        return {
            laporans,
            akun,
            jumlah,
            currentYear,
            tanggal,
            generateYears,
            select,
            availableYears,
            getYears
        }
    }

}
</script>
<style>
</style>