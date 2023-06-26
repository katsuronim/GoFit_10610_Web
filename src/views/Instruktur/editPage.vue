<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT POST</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Nama Instruktur</label>
                            <input type="text" class="form-control" v-model="instruktur.nama_instruktur" placeholder="Masukkan Nama Instruktur">
                            
                            <div v-if="validation.nama_instruktur" class="mt-2 alert alert-danger">
                                {{ validation.nama_instruktur[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Alamat Instruktur</label>
                            <input type="text" class="form-control" v-model="instruktur.alamat_instruktur" placeholder="Masukkan Alamat instruktur">
                            
                            <div v-if="validation.alamat_instruktur" class="mt-2 alert alert-danger">
                                {{ validation.alamat_instruktur[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Tanggal Lahir Instruktur</label>
                            <input class="form-control" type="date" :format="'YYYY-MM-DD'" v-model="instruktur.tanggal_lahir_instruktur" placeholder="Masukkan Tanggal Lahir Instruktur">
                            
                            <div v-if="validation.tanggal_lahir_instruktur" class="mt-2 alert alert-danger">
                                {{ validation.tanggal_lahir_instruktur[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Nomor Telepon Instruktur</label>
                            <input class="form-control" v-model="instruktur.no_telepon_instruktur"
                            placeholder="Masukkan Nomor Telepon Instruktur">
                            
                            <div v-if="validation.no_telepon_instruktur" class="mt-2 alert alert-danger">
                            {{
                            validation.no_telepon_instruktur[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Email Instruktur</label>
                            <input class="form-control" type="email" v-model="instruktur.email_instruktur"
                            placeholder="Masukkan Email Instruktur">
                            
                            <div v-if="validation.email_instruktur" class="mt-2 alert alert-danger">
                            {{
                            validation.email_instruktur[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Username Instruktur</label>
                            <input class="form-control" v-model="instruktur.username_instruktur"
                            placeholder="Masukkan Username Instruktur">
                            
                            <div v-if="validation.username_instruktur" class="mt-2 alert alert-danger">
                            {{
                            validation.username_instruktur[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Password Instruktur</label>
                            <input class="form-control" v-model="instruktur.password_instruktur"
                            placeholder="Masukkan Password Instruktur">
                            
                            <div v-if="validation.password_instruktur" class="mt-2 alert alert-danger">
                            {{
                            validation.password_instruktur[0] }}
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
    //state pegawai
    let instruktur = reactive({
    nama_instruktur: '',
    alamat_instruktur: '',
    tanggal_lahir_instruktur: '',
    no_telepon_instruktur: '',
    email_instruktur: '',
    username_instruktur: '',
    password_instruktur: ''
    })
    //state validation
    const validation = ref([])
    const toastr = createToaster({})
    //vue router
    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
    axios.get(`https://backend10610.gofit10603.site/api/instrukturs/${route.params.id}`)
    .then(response => {
        instruktur.nama_instruktur = response.data.data.NAMA_INSTRUKTUR
        instruktur.alamat_instruktur = response.data.data.ALAMAT_INSTRUKTUR
        instruktur.tanggal_lahir_instruktur = response.data.data.TANGGAL_LAHIR_INSTRUKTUR
        instruktur.no_telepon_instruktur = response.data.data.NO_TELEPON_INSTRUKTUR
        instruktur.email_instruktur = response.data.data.EMAIL_INSTRUKTUR
        instruktur.username_instruktur = response.data.data.USERNAME_INSTRUKTUR
        instruktur.password_instruktur = response.data.data.PASSWORD_INSTRUKTUR
        }).catch(error => {
        console.log(error.response.data.message)
        })
        return instruktur;
    })
    //method update
    function update() {
        if (window.confirm('Apakah anda yakin ingin mengedit data ini?')) {
            let nama_instruktur = instruktur.nama_instruktur
            let alamat_instruktur = instruktur.alamat_instruktur
            let tanggal_lahir_instruktur = instruktur.tanggal_lahir_instruktur
            let no_telepon_instruktur = instruktur.no_telepon_instruktur
            let email_instruktur = instruktur.email_instruktur
            let username_instruktur = instruktur.username_instruktur
            let password_instruktur = instruktur.password_instruktur
            axios.put(`https://backend10610.gofit10603.site/api/instrukturs/${route.params.id}`, {
            nama_instruktur: nama_instruktur,
            alamat_instruktur: alamat_instruktur,
            tanggal_lahir_instruktur: tanggal_lahir_instruktur,
            no_telepon_instruktur: no_telepon_instruktur,
            email_instruktur: email_instruktur,
            username_instruktur: username_instruktur,
            password_instruktur: password_instruktur,
            }).then(() => {
            //redirect ke post index
                router.push({
                name: 'instruktur.index'
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
            instruktur,
            validation,
            router,
            update
        }
    }
}
</script>
<style>
</style>
