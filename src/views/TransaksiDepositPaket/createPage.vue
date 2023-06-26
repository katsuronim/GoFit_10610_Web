<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH TRANSAKSI DEPOSIT PAKET KELAS</h4>
                        <hr>
                        <form @submit.prevent="store">
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Nama Member</label>
                            <input type="text" class="form-control" disabled v-model="depositPaket.id_member">
                            
                            <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                {{ validation.id_member[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Nama Pegawai</label>
                            <input type="text" class="form-control" disabled v-model="depositPaket.id_pegawai" placeholder="Masukkan ID Pegawai">
                            
                            <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                {{ validation.id_pegawai[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Kelas</label>
                            <select class="form-control" v-model="depositPaket.id_kelas">
                                <option value="">Please select one</option>
                                <option v-for="(kelas,id) in kelass" :value="kelas.ID_KELAS" :key="id">
                                    {{ kelas.ID_KELAS }} - {{ kelas. NAMA_KELAS }} - Rp.{{ kelas. HARGA_KELAS }}
                                </option>
                            </select>
                            <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                {{ validation.id_kelas[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Tanggal Deposit</label>
                            <input type="text" class="form-control" v-model="depositPaket.tanggal_deposit_paket" disabled>
                            
                            <div v-if="validation.tanggal_deposit_uang" class="mt-2 alert alert-danger">
                                {{ validation.tanggal_deposit_uang[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Deposit Paket Kelas</label>
                            <select class="form-control" v-model="depositPaket.deposit_paket">
                                <option value="">Please select one</option>
                                <option :value="5">5 Paket Kelas</option>
                                <option :value="10">10 Paket Kelas</option>
                            </select>
                            <div v-if="validation.deposit_uang" class="mt-2 alert alert-danger">
                                {{ validation.deposit_uang[0] }}
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
    const depositPaket = reactive({
    id_kelas: '',
    id_member: '',
    id_pegawai: '',
    id_promo: '',
    tanggal_deposit_paket: '',
    deposit_paket: ''
    })
    //state validation
    const validation = ref([])
    const kelass = ref([])
    const depositKelass = ref([])
    const members = ref([])
    const pegawais = ref([])
    const promos = ref([])
    //vue router
    const router = useRouter()
    const route = useRoute()
    const toastr = createToaster({})
    const akun = localStorage.getItem('akun')
    const id = route.params.id

    onMounted(() => {
    depositPaket.id_member = id
    depositPaket.id_pegawai = akun
    depositPaket.tanggal_deposit_paket = new Date().toISOString().substr(0, 10)
    axios.get('https://backend10610.gofit10603.site/api/kelas')
    .then(response => {
    //assign state posts with response data
     kelass.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
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
    axios.get('https://backend10610.gofit10603.site/api/promos')
    .then(response => {
    //assign state posts with response data
    promos.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    })
    axios.get('https://backend10610.gofit10603.site/api/transaksiDepositKelasPakets')
    .then(response => {
    //assign state posts with response data
    depositKelass.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    //method store
    function store() {
        let id = depositPaket.id_kelas
        axios.get(`https://backend10610.gofit10603.site/api/kelas/${id}`)
        .then(response => {
        //assign state posts with response data
        if (window.confirm('Apakah anda yakin ingin melakukan transaksi untuk kelas ' + response.data.data.NAMA_KELAS + ' sebanyak ' + depositPaket.deposit_paket + ' paket kelas dengan total harga Rp.'+  response.data.data.HARGA_KELAS * depositPaket.deposit_paket +' ini?')) {
            let id_kelas = depositPaket.id_kelas
            let id_member = depositPaket.id_member
            let id_pegawai = depositPaket.id_pegawai
            let id_promo = depositPaket.id_promo
            let tanggal_deposit_paket = depositPaket.tanggal_deposit_paket
            let deposit_paket = depositPaket.deposit_paket
            axios.post('https://backend10610.gofit10603.site/api/transaksiDepositKelasPakets', {
            id_kelas: id_kelas,
            id_member: id_member,
            id_pegawai: id_pegawai,
            id_promo: id_promo,
            tanggal_deposit_paket: tanggal_deposit_paket,
            deposit_paket: deposit_paket
            }).then(() => {
            //redirect ke post index
                toastr.success('Data berhasil ditambahkan!' , { position:"top-right" });
                router.push({
                name: 'transaksiDepositPaket.index'
                })
            }).catch(error => {
                //assign state validation with error
                toastr.error(error.response.data.errors, { position:"top-right" });
                validation.value = error.response.data
            })
        }
        }).catch(error => {
        console.log(error.response.data)
        })
    }
        //return
        return {
            depositPaket,
            pegawais,
            promos,
            members,
            kelass,
            validation,
            router,
            store
        }
    },
    methods: {
        resetSelect() {
        this.selectedOption = '';
        }
    }
}
</script>
<style>
</style>
