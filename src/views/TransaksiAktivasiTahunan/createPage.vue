<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH TRANSAKSI AKTIVASI TAHUNAN</h4>
                        <hr>
                        <form @submit.prevent="store">
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">ID Member</label>
                            <input type="text" class="form-control" disabled v-model="aktivasiTahunan.id_member">
                           
                            <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                {{ validation.id_member[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">ID Pegawai</label>
                            <input type="text" class="form-control" disabled v-model="aktivasiTahunan.id_pegawai">
                            
                            <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                {{ validation.id_pegawai[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Tanggal Aktivasi</label>
                            <input type="text" class="form-control" disabled v-model="aktivasiTahunan.tanggal_aktivasi" placeholder="Masukkan Tanggal Aktivasi">
                            
                            <div v-if="validation.tanggal_aktivasi" class="mt-2 alert alert-danger">
                                {{ validation.tanggal_aktivasi[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Jumlah Pembayaran</label>
                            <input type="text" class="form-control" v-model="aktivasiTahunan.jumlah_pembayaran" placeholder="Masukkan Jumlah Pembayaran">

                            <div v-if="validation.jumlah_pembayaran" class="mt-2 alert alert-danger">
                                {{ validation.jumlah_pembayaran[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">
                                Kembalian
                                 <button @click.prevent="kembalian(aktivasiTahunan.jumlah_pembayaran)" class="btn btn-outline-primary">Hitung Kembalian</button>
                            </label>
                            <input type="text" class="form-control" v-model="uang.kembali" disabled>
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
    const aktivasiTahunan = reactive({
    id_member: '',
    id_pegawai: '',
    tanggal_aktivasi: '',
    jumlah_pembayaran: ''
    })
    let uang = reactive({
    kembali: ''
    })
    //state validation
    const validation = ref([])
    const members = ref([])
    const pegawais = ref([])
    const toastr = createToaster({})
    //vue router
    const router = useRouter()
    
    const route = useRoute();
    const akun = localStorage.getItem("akun")
    const id = route.params.id

    onMounted(() => {
    aktivasiTahunan.id_member = id
    aktivasiTahunan.id_pegawai = akun
    aktivasiTahunan.tanggal_aktivasi = new Date().toISOString().substr(0, 10)
    axios.get('https://backend10610.gofit10603.site/api/members')
    .then(response => {
    //assign state posts with response data
     members.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    axios.get('https://backend10610.gofit10603.site/api/pegawais')
    .then(response => {
    //assign state posts with response data
    pegawais.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    })
    //method store
    function store() {
        if (window.confirm('Apakah anda yakin ingin melakukan transaksi sebesar Rp.'+ aktivasiTahunan.jumlah_pembayaran +' ini?')) {
            let id_member = aktivasiTahunan.id_member
            let id_pegawai = aktivasiTahunan.id_pegawai
            let tanggal_aktivasi = aktivasiTahunan.tanggal_aktivasi
            let jumlah_pembayaran = aktivasiTahunan.jumlah_pembayaran
            axios.post('https://backend10610.gofit10603.site/api/transaksiAktivasiTahunans', {
            id_member: id_member,
            id_pegawai: id_pegawai,
            tanggal_aktivasi: tanggal_aktivasi,
            jumlah_pembayaran: jumlah_pembayaran
            }).then(() => {
            //redirect ke post index
                router.push({
                name: 'transaksiAktivasiTahunan.index'
                })
                toastr.success('Data berhasil ditambahkan!' , { position:"top-right" });
            }).catch(error => {
                //assign state validation with error
                toastr.error(error.response.data.errors, { position:"top-right" });
                validation.value = error.response.data
            })
        }
    }
    function kembalian(input){
        if(input > 3000000){
            uang.kembali = input - 3000000
        } else {
            uang.kembali = 0
        }
        
    }
        //return
        return {
            uang,
            aktivasiTahunan,
            pegawais,
            members,
            validation,
            router,
            store,
            kembalian
        }
    }
}
</script>
<style>
</style>
