<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Jadwal Harian</h1>

        <p> <button @click.prevent="init" class="btn btn-primary" style="float:left; margin:10px;">GENERATE JADWAL HARIAN</button></p>

        <div class="search-wrapper" style="float:right; margin:10px;">
            <input type="text" v-model="state.searchInput" placeholder="Search title.."/>
        </div>
        <table class="table table-hover" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">TANGGAL JADWAL HARIAN</th>
                    <th scope="col">HARI JADWAL UMUM</th>
                    <th scope="col">JAM JADWAL UMUM</th>
                    <th scope="col">NAMA KELAS</th>
                    <th scope="col">NAMA INSTRUKTUR</th>
                    <th scope="col">STATUS JADWAL HARIAN</th>
                    <th scope="col">AKSI</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(jadwalHarian, id) in displayedJadwalHarian" :key="id">
                    <td>{{ jadwalHarian.TANGGAL_JADWAL_HARIAN }}</td>
                    <td>
                        <div v-for="(jadwalUmum, id) in jadwalUmums" :key="id">
                            <div v-if="jadwalHarian.ID_JADWAL_UMUM == jadwalUmum.ID_JADWAL_UMUM">{{ jadwalUmum.HARI_JADWAL_UMUM }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(jadwalUmum, id) in jadwalUmums" :key="id">
                            <div v-if="jadwalHarian.ID_JADWAL_UMUM == jadwalUmum.ID_JADWAL_UMUM">{{ jadwalUmum.JAM_JADWAL_UMUM }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(jadwalUmum, id) in jadwalUmums" :key="id">
                            <div v-if="jadwalHarian.ID_JADWAL_UMUM == jadwalUmum.ID_JADWAL_UMUM">
                                <div v-for="(kelas, id) in kelass" :key="id">
                                    <div v-if="jadwalUmum.ID_KELAS == kelas.ID_KELAS">{{ kelas.NAMA_KELAS }}</div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(instruktur, id) in instrukturs" :key="id">
                            <div v-if="jadwalHarian.ID_INSTRUKTUR == instruktur.ID_INSTRUKTUR">{{ instruktur.NAMA_INSTRUKTUR }}</div>
                        </div>
                    </td>
                    <td>{{ jadwalHarian.STATUS_JADWAL_HARIAN }}</td>
                    <td>
                        <router-link :to="{ name: 'jadwalHarian.edit', params: { id: jadwalHarian.ID_JADWAL_HARIAN } }" class="btn btn-outline-primary" style="margin-right: 5px;">EDIT</router-link>
                      <button @click.prevent="jadwalHarianLibur(jadwalHarian.ID_JADWAL_HARIAN)" class="btn btn-outline-info" style="margin:5px">UBAH LIBUR</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
import { createToaster } from "@meforma/vue-toaster"
import { useRouter } from 'vue-router'
export default {
    setup() {
    //reactive state
    let jadwalHarians = ref([])
    let jadwalUmums = ref([])
    let instrukturs = ref([])
    let kelass = ref([])
    const toastr = createToaster({})
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    //vue router
     const router = useRouter()
     const state = reactive({
        searchInput: ''
    })
    //mounted
    onMounted(() => {
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
    //get API from Laravel Backend
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
    axios.get('https://backend10610.gofit10603.site/api/instrukturs')
    .then(response => {
    //assign state posts with response data
    instrukturs.value = response.data.data
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
    })
    //method delete
    function jadwalHarianDelete(id) {
            
            //delete data post by ID
            axios.delete(`https://backend10610.gofit10603.site/api/jadwalHarians/${id}`)
            .then(() => {
                //splice posts 
                jadwalHarians.value.splice(jadwalHarians.value.indexOf(id), 1);
                window.location.reload(true);
                toastr.success('Data berhasil dihapus!' , { position:"top-right" });
             }).catch(error => {
                 console.log(error.response.data)
             })
         }
    //method libur
    function jadwalHarianLibur(id) {
        if (window.confirm('Apakah anda yakin ingin meliburkan jadwal ini?')) {
          //delete data post by ID
          axios.put(`https://backend10610.gofit10603.site/api/jadwalHarians/libur/${id}`)
            .then(() => {
                //splice posts 
                jadwalHarians.value.splice(jadwalHarians.value.indexOf(id), 1);
                window.location.reload(true);
                toastr.success('Data berhasil diubah!' , { position:"top-right" });
             }).catch(error => {
                toastr.error('Data gagal diubah!' , { position:"top-right" });
                 console.log(error.response.data)
             })
        } else {
            toastr.error('Data tidak jadi diliburkan!', { position:"top-right" });
        } 
     }
    //generate jadwal harian
    function init() {
            //delete data post by ID
            axios.post(`https://backend10610.gofit10603.site/api/jadwalHarians/init`)
            .then(() => {
                window.location.reload(true);
                toastr.success('Data berhasil digenerate!' , { position:"top-right" });
             }).catch(error => {
                toastr.error(error.response.data.errors, { position:"top-right" });
                console.log(error.response.data)
             })
         }
        //return
        return {
            instrukturs,
            kelass,
            jadwalUmums,
            jadwalHarians,
            jadwalHarianDelete,
            jadwalHarianLibur,
            init,
            state
        }
    },
    computed: {
        displayedJadwalHarian() {
        const searchKeyword = this.state.searchInput.toLowerCase();
        return this.jadwalHarians.filter(jadwalHarian => {
            const jadwalHarianString = Object.values(jadwalHarian).join(' ').toLowerCase();
            return jadwalHarianString.includes(searchKeyword);
        });
    }
    }
}
</script>
<style>
</style>