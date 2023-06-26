<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT MEMBER</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Nama Member</label>
                            <input type="text" class="form-control" v-model="member.nama_member" placeholder="Masukkan Nama Member">
                            
                            <div v-if="validation.nama_member" class="mt-2 alert alert-danger">
                                {{ validation.nama_member[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Alamat Member</label>
                            <input type="text" class="form-control" v-model="member.alamat_member" placeholder="Masukkan Alamat member">
                            
                            <div v-if="validation.alamat_member" class="mt-2 alert alert-danger">
                                {{ validation.alamat_member[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Nomor Telepon Member</label>
                            <input class="form-control" v-model="member.no_telepon_member"
                            placeholder="Masukkan Nomor Telepon Member">
                            
                            <div v-if="validation.no_telepon_member" class="mt-2 alert alert-danger">
                            {{
                            validation.no_telepon_member[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Tanggal Lahir Member</label>
                            <input class="form-control" type="date" :format="'YYYY-MM-DD'" v-model="member.tanggal_lahir_member" placeholder="Masukkan Tanggal Lahir Member">
                            
                            <div v-if="validation.tanggal_lahir_member" class="mt-2 alert alert-danger">
                                {{ validation.tanggal_lahir_member[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Email Member</label>
                            <input class="form-control" type="email" v-model="member.email_member"
                            placeholder="Masukkan Email Member">
                            
                            <div v-if="validation.email_member" class="mt-2 alert alert-danger">
                            {{
                            validation.email_member[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Username Member</label>
                            <input class="form-control" v-model="member.username_member"
                            placeholder="Masukkan Username Member">
                            
                            <div v-if="validation.username_member" class="mt-2 alert alert-danger">
                            {{
                            validation.username_member[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Password Member</label>
                            <input class="form-control" v-model="member.password_member"
                            placeholder="Masukkan Password Member">
                            
                            <div v-if="validation.password_member" class="mt-2 alert alert-danger">
                            {{
                            validation.password_member[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Saldo Member</label>
                            <input class="form-control" v-model="member.saldo"
                            placeholder="Masukkan Saldo Member">
                            
                            <div v-if="validation.saldo" class="mt-2 alert alert-danger">
                            {{
                            validation.saldo[0] }}
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" style="float:left">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createToaster } from "@meforma/vue-toaster"
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
    deposit_kelas: '',
    saldo: '',
    })
    //state validation
    const validation = ref([])
    const toastr = createToaster({})
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
        member.nama_member = response.data.data.NAMA_MEMBER
        member.alamat_member = response.data.data.ALAMAT_MEMBER
        member.no_telepon_member = response.data.data.NO_TELEPON_MEMBER
        member.tanggal_lahir_member = response.data.data.TANGGAL_LAHIR_MEMBER
        member.email_member = response.data.data.EMAIL_MEMBER
        member.username_member = response.data.data.USERNAME_MEMBER
        member.password_member = response.data.data.PASSWORD_MEMBER
        member.saldo = response.data.data.SALDO
        })
    })
    //method update
    function update() {
        if (window.confirm('Apakah anda yakin ingin mengedit data ini?')) {
            let nama_member = member.nama_member
            let alamat_member = member.alamat_member
            let no_telepon_member = member.no_telepon_member
            let tanggal_lahir_member = member.tanggal_lahir_member
            let email_member = member.email_member
            let username_member = member.username_member
            let password_member = member.password_member
            let saldo = member.saldo
            axios.put(`https://backend10610.gofit10603.site/api/members/${route.params.id}`, {
            nama_member: nama_member,
            alamat_member: alamat_member,
            no_telepon_member: no_telepon_member,
            tanggal_lahir_member: tanggal_lahir_member,
            email_member: email_member,
            username_member: username_member,
            password_member: password_member,
            saldo: saldo,
            }).then(() => {
            //redirect ke post index
                router.push({
                name: 'member.index'
                })
                toastr.success('Data berhasil diupdate!' , { position:"top-right" });
            }).catch(error => {
                //assign state validation with error
                toastr.error(error.response.data.errors, { position:"top-right" });
                validation.value = error.response.data
            })
        } else {
            toastr.error('Data tidak jadi diedit!', { position:"top-right" });
        } 
    }
        //return
        return {
            member,
            validation,
            router,
            update
        }
    }
}
</script>
<style>
</style>
