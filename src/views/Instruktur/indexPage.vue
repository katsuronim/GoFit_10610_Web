<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Instruktur</h1>

        <p> <router-link :to="{name: 'instruktur.create'}" class="btn btn-primary" style="float:left; margin:10px;">TAMBAH INSTRUKTUR</router-link></p>

        <div class="search-wrapper" style="float:right; margin:10px;">
            <input type="text" v-model="state.searchInput" placeholder="Search title.."/>
        </div>
        <table class="table table-hover" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">ID INSTRUKTUR</th>
                    <th scope="col">NAMA INSTRUKTUR</th>
                    <th scope="col">ALAMAT INSTRUKTUR</th>
                    <th scope="col">TANGGAL LAHIR INSTRUKTUR</th>
                    <th scope="col">NOMOR TELEPON INSTRUKTUR</th>
                    <th scope="col">EMAIL INSTRUKTUR</th>
                    <th scope="col">USERNAME INSTRUKTUR</th>
                    <th scope="col">AKSI</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(instruktur, id) in displayedIns" :key="id">
                    <td>{{ instruktur.ID_INSTRUKTUR }}</td>
                    <td>{{ instruktur.NAMA_INSTRUKTUR }}</td>
                    <td>{{ instruktur.ALAMAT_INSTRUKTUR }}</td>
                    <td>{{ instruktur.TANGGAL_LAHIR_INSTRUKTUR }}</td>
                    <td>{{ instruktur.NO_TELEPON_INSTRUKTUR }}</td>
                    <td>{{ instruktur.EMAIL_INSTRUKTUR }}</td>
                    <td>{{ instruktur.USERNAME_INSTRUKTUR }}</td>

                    <td>
                        <router-link :to="{ name: 'instruktur.edit', params: { id: instruktur.ID_INSTRUKTUR } }" class="btn btn-outline-primary" style="margin-right: 5px;">EDIT</router-link>
                        <button @click.prevent="instrukturDelete(instruktur.ID_INSTRUKTUR)" class="btn btn-outline-danger">DELETE</button>
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
    let instruktur = reactive({
    nama_instruktur: '',
    alamat_instruktur: '',
    tanggal_lahir_instruktur: '',
    no_telepon_instruktur: '',
    email_instruktur: '',
    username_instruktur: '',
    password_instruktur: ''
    })
    //reactive state
    let instrukturs = ref([])
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
    })
    //method delete
    function instrukturDelete(id) {
        if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
         //delete data post by ID
         axios.delete(`https://backend10610.gofit10603.site/api/instrukturs/${id}`)
            .then(() => {
                //splice posts 
                instrukturs.value.splice(instrukturs.value.indexOf(id), 1);
                window.location.reload(true);
                toastr.success('Data berhasil diupdate!' , { position:"top-right" });
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
            instruktur,
            instrukturDelete,
            filter,
            state
        }
    },
    computed: {
        displayedIns() {
            const searchKeyword = this.state.searchInput.toLowerCase();
                return this.instrukturs.filter(instruktur => {
                const instrukturString = Object.values(instruktur).join(' ').toLowerCase();
                return instrukturString.includes(searchKeyword);
            });
    }
}
}
</script>
<style>
</style>