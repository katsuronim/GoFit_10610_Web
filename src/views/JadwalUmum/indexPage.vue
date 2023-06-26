<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Jadwal Umum</h1>

        <p> <router-link :to="{name: 'jadwalUmum.create'}" class="btn btn-primary" style="float:left; margin:10px;">TAMBAH JADWAL UMUM</router-link></p>

        <table class="table table-hover" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">HARI JADWAL UMUM</th>
                    <th scope="col">KELAS</th>
                    <th scope="col">NAMA INSTRUKTUR</th>
                    <th scope="col">JAM JADWAL UMUM</th>
                    <th scope="col">AKSI</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(jadwalUmum, id) in jadwalUmums" :key="id">
                    <td>{{ jadwalUmum.HARI_JADWAL_UMUM }}</td>
                    <td>
                        <div v-for="(kelas, id) in kelass" :key="id">
                            <div v-if="jadwalUmum.ID_KELAS == kelas.ID_KELAS">{{ kelas.NAMA_KELAS }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(instruktur, id) in instrukturs" :key="id">
                            <div v-if="jadwalUmum.ID_INSTRUKTUR == instruktur.ID_INSTRUKTUR">{{ instruktur.NAMA_INSTRUKTUR }}</div>
                        </div>
                    </td>
                    <td>{{ jadwalUmum.JAM_JADWAL_UMUM }}</td>
                    <td>
                        <router-link :to="{ name: 'jadwalUmum.edit', params: { id: jadwalUmum.ID_JADWAL_UMUM } }" class="btn btn-outline-primary" style="margin-right: 5px;">EDIT</router-link>
                      <button @click.prevent="jadwalUmumDelete(jadwalUmum.ID_JADWAL_UMUM)" class="btn btn-outline-danger">DELETE</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { createToaster } from "@meforma/vue-toaster"
import { useRouter } from 'vue-router'
export default {
    setup() {
    //reactive state
    let jadwalUmums = ref([])
    let instrukturs = ref([])
    let kelass = ref([])
    const toastr = createToaster({})
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    //vue router
     const router = useRouter()
    //mounted
    onMounted(() => {
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
    //get API from Laravel Backend
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
    function jadwalUmumDelete(id) {
        if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
         //delete data post by ID
         axios.delete(`https://backend10610.gofit10603.site/api/jadwalUmums/${id}`)
            .then(() => {
                //splice posts 
                jadwalUmums.value.splice(jadwalUmums.value.indexOf(id), 1);
                window.location.reload(true);
                toastr.success('Data berhasil dihapus!' , { position:"top-right" });
             }).catch(error => {
                 console.log(error.response.data)
             })
        } else {
            toastr.error('Data tidak jadi dihapus!', { position:"top-right" });
        } 
        }
        //return
        return {
            instrukturs,
            kelass,
            jadwalUmums,
            jadwalUmumDelete
        }
    }
}
</script>
<style>
</style>