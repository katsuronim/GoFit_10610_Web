<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Presensi Kelas Member</h1>

        <p> <button @click.prevent="reset()" class="btn btn-primary" style="float:left; margin:2px;">RESET PRESENSI</button></p>
        
        <table class="table table-hover" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">NOMOR STRUK</th>
                    <th scope="col">NAMA MEMBER</th>
                    <th scope="col">TANGGAL JADWAL HARIAN</th>
                    <th scope="col">NAMA KELAS</th>
                    <th scope="col">TANGGAL MELAKUKAN BOOKING</th>
                    <th scope="col">JENIS BOOKING</th>
                    <th scope="col">STATUS PRESENSI KELAS</th>
                    <th scope="col">JAM PRESENSI KELAS</th>
                    <th scope="col">AKSI</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(presensiKelas, id) in presensiKelass" :key="id">
                    <td>{{ presensiKelas.NOMOR_STRUK}}</td>
                    <td>
                        <div v-for="(member, id) in members" :key="id">
                            <div v-if="presensiKelas.ID_MEMBER == member.ID_MEMBER">{{ member.ID_MEMBER }} - {{ member.NAMA_MEMBER }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(jadwalHarian, id) in jadwalHarians" :key="id">
                            <div v-if="presensiKelas.ID_JADWAL_HARIAN == jadwalHarian.ID_JADWAL_HARIAN">
                                {{ jadwalHarian.HARI_JADWAL_UMUM }}, {{ jadwalHarian.TANGGAL_JADWAL_HARIAN }}  {{ jadwalHarian.JAM_JADWAL_UMUM }}
                            </div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(jadwalHarian, id) in jadwalHarians" :key="id">
                            <div v-if="presensiKelas.ID_JADWAL_HARIAN == jadwalHarian.ID_JADWAL_HARIAN">
                                {{ jadwalHarian.NAMA_KELAS }}
                            </div>
                        </div>
                    </td>
                    <td>{{ presensiKelas.TANGGAL_BOOKING_KELAS }}</td>
                    <td>{{ presensiKelas.JENIS_BOOKING_PRESENSI }}</td>
                    <td>{{ presensiKelas.STATUS_PRESENSI_KELAS }}</td>
                    <td>{{ presensiKelas.JAM_PRESENSI_KELAS }}</td>
                    <td>
                        <div v-if="presensiKelas.STATUS_PRESENSI_KELAS != 'Belum Dipresensi'">
                            <div v-if="presensiKelas.JENIS_BOOKING_PRESENSI == 'Reguler'">
                                <router-link :to="{ name: 'presensiKelasReguler.print', params: { id: presensiKelas.NOMOR_STRUK } }" class="btn btn-outline-primary" style="margin: 5px;">PRINT</router-link>
                            </div>
                            <div v-if="presensiKelas.JENIS_BOOKING_PRESENSI == 'Paket'">
                                <router-link :to="{ name: 'presensiKelasPaket.print', params: { id: presensiKelas.NOMOR_STRUK } }" class="btn btn-outline-info" style="margin: 5px;">PRINT</router-link>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
import { reactive, onMounted, ref } from 'vue'
// import { useRouter } from 'vue-router'
import { createToaster } from "@meforma/vue-toaster"
export default {
    setup() {
    //reactive state
    let instrukturs = ref([])
    let presensiKelass = ref([])
    let members = ref([])
    let jadwalHarians = ref([])
    let jadwalUmums = ref([])
    let kelass = ref([])
    let filter = 'All'
    const toastr = createToaster({})
    const state = reactive({
        searchInput: ''
    })
    //vue router
    // const router = useRouter()
    //mounted
    onMounted(() => {
    //get API from Laravel Backend
    axios.get('https://backend10610.gofit10603.site/api/instrukturs')
    .then(response => {
    //assign state posts with response data
    instrukturs.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    axios.post('https://backend10610.gofit10603.site/api/jadwalHarians/getAll')
    .then(response => {
    //assign state posts with response data
    jadwalHarians.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    axios.get('https://backend10610.gofit10603.site/api/jadwalUmums')
    .then(response => {
    //assign state posts with response data
    jadwalUmums.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    axios.get('https://backend10610.gofit10603.site/api/members')
    .then(response => {
    //assign state posts with response data
    members.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    axios.get('https://backend10610.gofit10603.site/api/kelas')
    .then(response => {
    //assign state posts with response data
    kelass.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    axios.get('https://backend10610.gofit10603.site/api/bookingPresensiKelas')
    .then(response => {
    //assign state posts with response data
    presensiKelass.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    })
    //method delete
    function reset() {
        if (window.confirm('Apakah anda yakin ingin mereset data ini?')) {
         //delete data post by ID
         axios.post(`https://backend10610.gofit10603.site/api/presensiInstrukturs/reset`)
        .then(() => {
                toastr.success('Data-data presensi berhasil direset!' , { position:"top-right" });
                window.location.reload(true);
            }).catch(error => {
                console.log(error.response.data)
            })
        } else {
            toastr.error('Data tidak jadi dihapus!', { position:"top-right" });
        } 
        }
        //return
        return {
            presensiKelass,
            instrukturs,
            members,
            jadwalHarians,
            jadwalUmums,
            kelass,
            reset,
            filter,
            state
        }
    }
}
</script>
<style>
</style>