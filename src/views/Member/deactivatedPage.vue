<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Member Yang Dinonaktifkan Hari Ini</h1>

        <div class="search-wrapper" style="float:right; margin:10px;">
            <input type="text" v-model="state.searchInput" placeholder="Search title.."/>
        </div>
        <table class="table table-fixed" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">ID MEMBER</th>
                    <th scope="col">NAMA MEMBER</th>
                    <th scope="col">ALAMAT MEMBER</th>
                    <th scope="col">NOMOR TELEPON MEMBER</th>
                    <th scope="col">TANGGAL LAHIR MEMBER</th>
                    <th scope="col">EMAIL MEMBER</th>
                    <th scope="col">SALDO MEMBER</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(member, id) in displayedMembers" :key="id">
                    <td>{{ member.ID_MEMBER }}</td>
                    <td>{{ member.NAMA_MEMBER }}</td>
                    <td>{{ member.ALAMAT_MEMBER }}</td>
                    <td>{{ member.NO_TELEPON_MEMBER }}</td>
                    <td>{{ member.TANGGAL_LAHIR_MEMBER }}</td>
                    <td>{{ member.EMAIL_MEMBER }}</td>
                    <td>{{ member.SALDO }}</td>
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
    //get API from Laravel Backend
    axios.post('https://backend10610.gofit10603.site/api/members/getDeactivated')
    .then(response => {
    //assign state posts with response data
    members.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    })
        //return
        return {
            members,
            state
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