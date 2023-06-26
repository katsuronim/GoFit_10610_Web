<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH INSTRUKTUR</h4>
                        <hr>
                        <form @submit.prevent="store">
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createToaster } from "@meforma/vue-toaster"
import axios from 'axios'
export default {
    setup() {
    //state instruktur
    const instruktur = reactive({
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
    //method store
    function store() {
        let nama_instruktur = instruktur.nama_instruktur
        let alamat_instruktur = instruktur.alamat_instruktur
        let tanggal_lahir_instruktur = instruktur.tanggal_lahir_instruktur
        let no_telepon_instruktur = instruktur.no_telepon_instruktur
        let email_instruktur = instruktur.email_instruktur
        let username_instruktur = instruktur.username_instruktur
        let password_instruktur = instruktur.password_instruktur
        axios.post('http://localhost:8000/api/instrukturs', {
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
    }
        //return
        return {
            instruktur,
            validation,
            router,
            store
        }
    }
}
</script>
<style>
</style>
