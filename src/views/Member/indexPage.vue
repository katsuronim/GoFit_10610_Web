<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Member</h1>

        <p> <router-link :to="{name: 'member.create'}" class="btn btn-primary" style="float:left; margin:10px;">TAMBAH MEMBER</router-link></p>
        <p> <button @click.prevent="deaktivasiMember()" class="btn btn-primary" style="float:left; margin:2px;">DEAKTIVASI MEMBER</button></p>
        <p> <button @click.prevent="resetDeposit()" class="btn btn-primary" style="float:left; margin:2px;margin-left: 10px;">RESET DEPOSIT</button></p>
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
                    <th scope="col">TANGGAL KADALUARSA MEMBER</th>
                    <th scope="col">SALDO MEMBER</th>
                    <th scope="col">AKSI</th>
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
                    <td>{{ member.TANGGAL_KADALUARSA_MEMBER }}</td>
                    <td>{{ member.SALDO }}</td>
                    <td>
                        <router-link :to="{ name: 'member.edit', params: { id: member.ID_MEMBER } }" class="btn btn-outline-primary" style="margin: 5px;">EDIT</router-link>
                        <button @click.prevent="memberDelete(member.ID_MEMBER)" class="btn btn-outline-danger" style="margin: 5px;">DELETE</button>
                        <button @click.prevent="memberReset(member.ID_MEMBER)" class="btn btn-outline-info" style="margin: 5px;">RESET PASSWORD</button>
                        <router-link :to="{ name: 'member.print', params: { id: member.ID_MEMBER } }" class="btn btn-outline-primary" style="margin: 5px;">PRINT</router-link>
                    </td>
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
    axios.get('https://backend10610.gofit10603.site/api/members')
    .then(response => {
    //assign state posts with response data
    members.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    })
    //method delete
    function memberDelete(id) {
        if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
        //delete data post by ID
        axios.delete(`https://backend10610.gofit10603.site/api/members/${id}`)
        .then(() => {
            //splice posts 
            members.value.splice(members.value.indexOf(id), 1);
            window.location.reload(true);
            toastr.success('Data berhasil dihapus!' , { position:"top-right" });
            }).catch(error => {
                console.log(error.response.data)
            })
        } else {
            toastr.error('Data tidak jadi dihapus!', { position:"top-right" });
        }
        }
    function deaktivasiMember() {
        if (window.confirm('Apakah anda yakin ingin melakukan deaktivasi data member?')) {
        //delete data post by ID
        axios.post(`https://backend10610.gofit10603.site/api/members/deaktivasiMember`)
        .then(() => {
            toastr.success('Data-data member berhasil dideaktivasi!' , { position:"top-right" });
            router.push({
            name: 'member.deactivated'
            })
            }).catch(error => {
                console.log(error.response.data)
            })
        } else {
            toastr.error('Data tidak jadi dihapus!', { position:"top-right" });
        }
        }
    function resetDeposit() {
        if (window.confirm('Apakah anda yakin ingin melakukan reset deposit data member?')) {
        //delete data post by ID
        axios.post(`https://backend10610.gofit10603.site/api/members/resetDeposit`)
        .then(() => {
            toastr.success('Data-data deposit member berhasil direset!' , { position:"top-right" });
            router.push({
            name: 'member.resetDeposit'
            })
            }).catch(error => {
                console.log(error.response.data)
            })
        } else {
            toastr.error('Data tidak jadi dihapus!', { position:"top-right" });
        }
        }
    function memberReset(id) {
        axios.put(`https://backend10610.gofit10603.site/api/members/reset/${id}`, {
        }).then(() => {
        //redirect ke post index
            window.location.reload(true);
            toastr.success('Password berhasil direset!' , { position:"top-right" });
        }).catch(error => {
                 console.log(error.response.data)
        })
    }
        //return
        return {
            members,
            deaktivasiMember,
            memberDelete,
            memberReset,
            resetDeposit,
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