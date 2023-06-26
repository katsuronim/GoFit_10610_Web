<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow" style="width:80%; height:100%">
                    <div class="card-body" style="width:100%; height:50%">
                        <h4>DATA KARTU MEMBER</h4>
                        <hr>
                        <table>
                            <td>
                                <div class="form-group mb-3"  style="width:100%; height:50%">
                                    <label class="form-label" style="float:left">ID Member</label>
                                    <input type="text" class="form-control" disabled v-model="member.id_member">
                                </div>
                                <div class="form-group mb-3" style="width:100%; height:50%">
                                    <label class="form-label" style="float:left">Nama Member</label>
                                    <input type="text" class="form-control" disabled v-model="member.nama_member">
                                </div>
                                <div class="form-group mb-3" style="width:100%; height:50%">
                                    <label class="form-label" style="float:left">Alamat Member</label>
                                    <input type="text" class="form-control" disabled v-model="member.alamat_member">
                                </div>
                                <div class="form-group mb-3" style="width:100%; height:50%">
                                    <label for="content" class="form-label" style="float:left">Nomor Telepon Member</label>
                                    <input class="form-control" v-model="member.no_telepon_member" disabled>
                                </div>
                                <div class="form-group mb-3" style="width:100%; height:50%">
                                    <label for="content" class="form-label" style="float:left">Tanggal Lahir Member</label>
                                    <input class="form-control" type="date" :format="'YYYY-MM-DD'" disabled v-model="member.tanggal_lahir_member">
                                </div>
                            </td>
                        <div style="margin-left:100px">
                            <td>
                                <div class="form-group mb-3" style="width:100%; height:50%">
                                    <label for="content" class="form-label" style="float:left">Email Member</label>
                                    <input class="form-control" type="email" v-model="member.email_member" disabled>
                                </div>
                                <div class="form-group mb-3" style="width:100%; height:50%">
                                    <label for="content" class="form-label" style="float:left">Username Member</label>
                                    <input class="form-control" v-model="member.username_member" disabled>
                                </div>
                                <div class="form-group mb-3" style="width:100%; height:50%">
                                    <label for="content" class="form-label" style="float:left">Tanggal Kadaluarsa Member</label>
                                    <input class="form-control" type="date" v-model="member.tanggal_kadaluarsa_member" disabled>
                                </div>
                                <div class="form-group mb-3" style="width:100%; height:50%">
                                    <label for="content" class="form-label" style="float:left">Deposit Kelas Member</label>
                                    <input class="form-control" v-model="member.deposit_kelas" disabled>
                                </div>
                                <div class="form-group mb-3" style="width:100%; height:50%">
                                    <label for="content" class="form-label" style="float:left">Saldo Member</label>
                                    <input class="form-control" v-model="member.saldo" disabled>
                                </div>
                                <button @click.prevent="memberPrint(member.ID_MEMBER)" class="btn btn-outline-info" style="margin-top: 30px; margin-left: 150px;">PRINT</button>
                            </td>
                        </div>
                        
                        </table>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
    const member = reactive({
    nama_member: '',
    alamat_member: '',
    no_telepon_member: '',
    tanggal_lahir_member: '',
    email_member: '',
    username_member: '',
    password_member: '',
    tanggal_kadaluarsa_member: '',
    deposit_kelas: '',
    saldo: '',
    })
    //state validation
    const validation = ref([])
    //vue router
    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;
    
    let loggedIn = localStorage.getItem('loggedIn')
    let routes = localStorage.getItem('route')

    onMounted(() => {
    if (loggedIn == "true" && routes != "Kasir"){
        router.push({
            name: 'jadwalUmum.index'
            })
    }
    if (loggedIn == "true" && routes == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
    axios.get(`https://backend10610.gofit10603.site/api/members/${id}`)
    .then(response => {
        member.id_member = response.data.data.ID_MEMBER
        member.nama_member = response.data.data.NAMA_MEMBER
        member.alamat_member = response.data.data.ALAMAT_MEMBER
        member.no_telepon_member = response.data.data.NO_TELEPON_MEMBER
        member.tanggal_lahir_member = response.data.data.TANGGAL_LAHIR_MEMBER
        member.email_member = response.data.data.EMAIL_MEMBER
        member.username_member = response.data.data.USERNAME_MEMBER
        member.tanggal_kadaluarsa_member = response.data.data.TANGGAL_KADALUARSA_MEMBER
        member.deposit_kelas = response.data.data.DEPOSIT_KELAS
        member.saldo = response.data.data.SALDO
        })
    })
    function memberPrint() {
        window.print();
        router.push({
            name: 'member.index'
            })
    }
        //return
        return {
            member,
            validation,
            router,
            memberPrint
        }
    }
}
</script>
<style>
</style>
