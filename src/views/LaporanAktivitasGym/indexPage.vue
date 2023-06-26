<template>
    <div id="all-products">
        <h4 style="font-weight:bold; text-align: left; padding-top:25px;">GoFit</h4>
        <h4 style="text-align: left; ">Jl. Centralpark No.10 Yogyakarta</h4>
        <h4 style="font-weight:bold;text-align: left; padding-top: 25px; text-decoration: underline;">LAPORAN AKTIVITAS GYM Bulanan</h4>
        <h4 style="text-align: left; text-decoration: underline;"><u>Bulan: {{ bulan }}</u> <u>     Tahun: {{ currentYear }}</u></h4>
        <h4 style="text-align: left; ">Tanggal Cetak: {{ tanggal }}</h4>

        <table class="table table-bordered" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : black; font-weight : bold;">
                    <th scope="col">Tanggal</th>
                    <th scope="col">Jumlah Member</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(laporan, id) in laporans" :key="id">
                    <td>{{ laporan.Tanggal }}</td>
                    <td>{{ laporan.Jumlah_Member }}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>
                        {{ columnTotals.column1 }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div>
            <router-link :to="{ name: 'laporanAktivitasGym.print'}" class="btn btn-outline-primary" style="margin: 25px; text-align: center;">CETAK LAPORAN</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
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
    //mounted
    onMounted(() => {
    axios.post(`https://backend10610.gofit10603.site/api/laporanAktivitasGyms/getLaporanAktivitasGym`)
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
            currentYear,
            tanggal,
            bulan
        }
    },
    computed: {
        columnTotals() {
            const totals = {
            column1: 0,
            };
            this.laporans.forEach(row => {
            totals.column1 += row.Jumlah_Member;
            });

            return totals;
        },
    }
}
</script>
<style>
</style>