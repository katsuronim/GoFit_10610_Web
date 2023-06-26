<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT JADWAL HARIAN</h4>
                        <hr>
                        <form @submit.prevent="update">
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Tanggal Jadwal Harian</label>
                            <input type="text" class="form-control" v-model="jadwalHarian.tanggal_jadwal_harian" placeholder="Masukkan Tanggal Jadwal Harian">
                            
                            <div v-if="validation.tanggal_jadwal_harian" class="mt-2 alert alert-danger">
                                {{ validation.tanggal_jadwal_harian[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Nama Instruktur</label>
                            <select class="form-control" v-model="jadwalHarian.id_instruktur">
                                <option disabled value="">Please select one</option>
                                <option v-for="(instruktur,id) in instrukturs" :value="instruktur.ID_INSTRUKTUR" :key="id">
                                    {{ instruktur.ID_INSTRUKTUR }} - {{ instruktur.NAMA_INSTRUKTUR }}
                                </option>
                            </select>
                            <div v-if="validation.id_instruktur" class="mt-2 alert alert-danger">
                                {{ validation.id_instruktur[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Status Jadwal Harian</label>
                            <input type="text" class="form-control" v-model="jadwalHarian.status_jadwal_harian" placeholder="Masukkan Status Jadwal Harian">
                            
                            <div v-if="validation.status_jadwal_harian" class="mt-2 alert alert-danger">
                                {{ validation.status_jadwal_harian[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Jadwal Umum</label>
                            <select class="form-control" v-model="jadwalHarian.id_jadwal_umum">
                                <option disabled value="">Please select one</option>
                                <option v-for="(jadwalUmum,id) in jadwalUmums" :value="jadwalUmum.ID_JADWAL_UMUM" :key="id">
                                    {{ jadwalUmum.ID_JADWAL_UMUM }} - {{ jadwalUmum.HARI_JADWAL_UMUM }} - {{ jadwalUmum.JAM_JADWAL_UMUM }}
                                </option>
                            </select>
                            <div v-if="validation.id_jadwal_umum" class="mt-2 alert alert-danger">
                                {{ validation.id_jadwal_umum[0] }}
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
    let jadwalHarian = reactive({
    tanggal_jadwal_harian: '',
    id_instruktur: '',
    status_jadwal_harian: '',
    id_jadwal_umum: ''
    })
    //state validation
    const validation = ref([])
    const jadwalUmums = ref([])
    const instrukturs = ref([])
    const toastr = createToaster({})
    //vue router
    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
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
    axios.get(`https://backend10610.gofit10603.site/api/jadwalHarians/${route.params.id}`)
    .then(response => {
        jadwalHarian.tanggal_jadwal_harian = response.data.data.TANGGAL_JADWAL_HARIAN
        jadwalHarian.id_instruktur = response.data.data.ID_INSTRUKTUR
        jadwalHarian.status_jadwal_harian = response.data.data.STATUS_JADWAL_HARIAN
        jadwalHarian.id_jadwal_umum = response.data.data.ID_JADWAL_UMUM
        })
    })
    //method update
    function update() {
        if (window.confirm('Apakah anda yakin ingin mengedit data ini?')) {
            let tanggal_jadwal_harian = jadwalHarian.tanggal_jadwal_harian
            let id_instruktur = jadwalHarian.id_instruktur
            let status_jadwal_harian = jadwalHarian.status_jadwal_harian
            let id_jadwal_umum = jadwalHarian.id_jadwal_umum
            axios.put(`https://backend10610.gofit10603.site/api/jadwalHarians/${route.params.id}`, {
            tanggal_jadwal_harian: tanggal_jadwal_harian,
            id_instruktur: id_instruktur,
            status_jadwal_harian: status_jadwal_harian,
            id_jadwal_umum: id_jadwal_umum
            }).then(() => {
            //redirect ke post index
                router.push({
                name: 'jadwalHarian.index'
                })
                toastr.success('Data berhasil diupdate!' , { position:"top-right" });
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        } else {
            toastr.error('Data tidak jadi diedit!', { position:"top-right" });
        }  
    }
        //return
        return {
            jadwalHarian,
            jadwalUmums,
            instrukturs,
            validation,
            router,
            update
        }
    }
}
</script>
<style>
</style>
