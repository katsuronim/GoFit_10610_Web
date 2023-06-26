<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Presensi Instruktur</h1>

        <p> <button @click.prevent="reset()" class="btn btn-primary" style="float:left; margin:2px;">RESET PRESENSI</button></p>
        
        <table class="table table-hover" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">NAMA INSTRUKTUR</th>
                    <th scope="col">TANGGAL JADWAL HARIAN</th>
                    <th scope="col">NAMA KELAS</th>
                    <th scope="col">JAM MULAI</th>
                    <th scope="col">JAM SELESAI</th>
                    <th scope="col">KETERLAMBATAN</th>
                    <th scope="col">DURASI KELAS</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(presensiInstruktur, id) in presensiInstrukturs" :key="id">
                    <td>
                        <div v-for="(instruktur, id) in instrukturs" :key="id">
                            <div v-if="presensiInstruktur.ID_INSTRUKTUR == instruktur.ID_INSTRUKTUR">{{ instruktur.ID_INSTRUKTUR }} - {{ instruktur.NAMA_INSTRUKTUR }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(jadwalHarian, id) in jadwalHarians" :key="id">
                            <div v-if="presensiInstruktur.ID_JADWAL_HARIAN == jadwalHarian.ID_JADWAL_HARIAN">{{ jadwalHarian.TANGGAL_JADWAL_HARIAN }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(jadwalHarian, id) in jadwalHarians" :key="id">
                            <div v-if="presensiInstruktur.ID_JADWAL_HARIAN == jadwalHarian.ID_JADWAL_HARIAN">
                                <div v-for="(jadwalUmum, id) in jadwalUmums" :key="id">
                                    <div v-if="jadwalHarian.ID_JADWAL_UMUM == jadwalUmum.ID_JADWAL_UMUM">
                                        <div v-for="(kelas, id) in kelass" :key="id">
                                            <div v-if="jadwalUmum.ID_KELAS == kelas.ID_KELAS">
                                                {{ kelas.NAMA_KELAS }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>{{ presensiInstruktur.JAM_MULAI }}</td>
                    <td>{{ presensiInstruktur.JAM_SELESAI }}</td>
                    <td>{{ presensiInstruktur.KETERLAMBATAN }}</td>
                    <td>{{ presensiInstruktur.DURASI_KELAS }}</td>
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
    let presensiInstrukturs = ref([])
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
    axios.get('https://backend10610.gofit10603.site/api/jadwalHarians')
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
    axios.get('https://backend10610.gofit10603.site/api/kelas')
    .then(response => {
    //assign state posts with response data
    kelass.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    axios.get('https://backend10610.gofit10603.site/api/presensiInstrukturs')
    .then(response => {
    //assign state posts with response data
    presensiInstrukturs.value = response.data.data
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
            presensiInstrukturs,
            instrukturs,
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