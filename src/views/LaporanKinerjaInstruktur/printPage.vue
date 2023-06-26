<template>
    <div class="printme" id="all-products">
        <h4 style="font-weight:bold; text-align: left; padding-top:25px;">GoFit</h4>
        <h4 style="text-align: left; ">Jl. Centralpark No.10 Yogyakarta</h4>
        <h4 style="font-weight:bold;text-align: left; padding-top: 25px; text-decoration: underline;">LAPORAN KINERJA INSTRUKTUR BULANAN</h4>
        <h4 style="text-align: left; text-decoration: underline;"><u>Bulan: {{ showBulan.nama }}</u> <u>     Tahun: {{ tahun }}</u></h4>
        <h4 style="text-align: left; ">Tanggal Cetak: {{ tanggal }}</h4>

        <table class="table table-bordered" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : black; font-weight : bold;">
                    <th scope="col">Nama</th>
                    <th scope="col">Jumlah Hadir</th>
                    <th scope="col">Jumlah Libur</th>
                    <th scope="col">Waktu Terlambat (detik)</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(laporan, id) in laporans" :key="id">
                    <td>{{ laporan.NAMA_INSTRUKTUR }}</td>
                    <td>{{ laporan.JUMLAH_HADIR }}</td>
                    <td>{{ laporan.JUMLAH_LIBUR }}</td>
                    <td>
                        <div v-if="laporan.WAKTU_TERLAMBAT == NULL">
                            0
                        </div>
                        <div v-if="laporan.WAKTU_TERLAMBAT != NULL">
                            {{ laporan.WAKTU_TERLAMBAT }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="no-printme">
            <button @click.prevent="strukPrint" class="btn btn-outline-info" style="margin-top: 30px; margin-left: 150px;">PRINT</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
//import { createToaster } from "@meforma/vue-toaster"
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
export default {
    setup() {
    //reactive state
    let laporans = ref([])
    const showBulan = reactive({
    nama: '',
    })
//    const toastr = createToaster({})
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    const akun = localStorage.getItem('akun')
    //vue router
    const router = useRouter()
    const routes = useRoute()
    const date = new Date();
    let currentYear = date.getFullYear();
    dayjs.locale('id');
    const tanggal = dayjs().format('DD MMMM YYYY');
    const bulan = routes.params.month
    const tahun = routes.params.year
    //mounted
    onMounted(() => {
    if(bulan == 1){
        showBulan.nama = 'Januari'
    } else if(bulan == 2){
        showBulan.nama = 'Februari'
    } else if(bulan == 3){
        showBulan.nama = 'Maret'
    } else if(bulan == 4){
        showBulan.nama = 'April'
    } else if(bulan == 5){
        showBulan.nama = 'Mei'
    } else if (bulan == 6){
        showBulan.nama = 'Juni'
    } else if (bulan == 7){
        showBulan.nama = 'Juli'
    } else if (bulan == 8){
        showBulan.nama = 'Agustus'
    } else if (bulan == 9){
        showBulan.nama = 'September'
    } else if (bulan == 10){
        showBulan.nama = 'Oktober'
    } else if (bulan == 11){
        showBulan.nama = 'November'
    } else if (bulan == 12){
        showBulan.nama = 'Desember'
    }
    axios.post(`https://backend10610.gofit10603.site/api/presensiInstrukturs/getLaporanKinerjaInstruktur`, {
        bulan: routes.params.month,
        tahun: routes.params.year
    })
    .then(response => {
        laporans.value = response.data.data
    });
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
    })
    function strukPrint() {
        window.print();
        router.push({
            name: 'laporanKinerjaInstruktur.index'
            })
    }
        return {
            laporans,
            akun,
            tanggal,
            bulan,
            tahun,
            currentYear,
            strukPrint,
            showBulan
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
@media print {
  .no-printme  {
		display: none;
	}
	.printme  {
		display: block;
	}
}
</style>