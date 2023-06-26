<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Member Yang Deposit Kelasnya direset</h1>

        <table class="table table-fixed" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">ID DEPOSIT MEMBER</th>
                    <th scope="col">NAMA MEMBER</th>
                    <th scope="col">NAMA KELAS</th>
                    <th scope="col">DEPOSIT PAKET KELAS</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(deposit, id) in deposits" :key="id">
                    <td>{{ deposit.ID_DEPOSIT_MEMBER }}</td>
                    <td>
                        <div v-for="(member, id) in members" :key="id">
                            <div v-if="deposit.ID_MEMBER == member.ID_MEMBER">{{ member.ID_MEMBER }} - {{ member.NAMA_MEMBER }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(kelas, id) in kelass" :key="id">
                            <div v-if="deposit.ID_KELAS == kelas.ID_KELAS">{{ kelas.ID_KELAS }} - {{ kelas.NAMA_KELAS }}</div>
                        </div>
                    </td>
                    <td>{{ deposit.DEPOSIT_PAKET_KELAS }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
import { reactive, onMounted, ref } from 'vue'
import { createToaster } from "@meforma/vue-toaster"
import { useRouter } from 'vue-router'
export default {
    setup() {
    //reactive state
    let members = ref([])
    let deposits = ref([])
    let kelass = ref([])
    const toastr = createToaster({})
    const state = reactive({
        searchInput: ''
    })
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    //vue router
    const router = useRouter()
    const akun = localStorage.getItem("akun")
    //mounted
    onMounted(() => {
    toastr.success( akun, { position:"top-right" });
    if (loggedIn == "true" && route != "Kasir"){
        router.push({
            name: 'jadwalUmum.index'
            })
    }
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    } 
    axios.get('https://backend10610.gofit10603.site/api/members')
    .then(response => {
    //assign state posts with response data
    members.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    })
    axios.get('https://backend10610.gofit10603.site/api/kelas')
    .then(response => {
    //assign state posts with response data
    kelass.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })

    //get API from Laravel Backend
    axios.post('https://backend10610.gofit10603.site/api/members/getResetDeposit')
    .then(response => {
    //assign state posts with response data
    deposits.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    
        //return
        return {
            members,
            deposits,
            kelass,
            state
        }
    }
}
</script>
<style>
</style>