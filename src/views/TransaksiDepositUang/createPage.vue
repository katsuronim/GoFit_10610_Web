<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH TRANSAKSI DEPOSIT UANG</h4>
                        <hr>
                        <form @submit.prevent="store">
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">ID Member</label>
                            <input type="text" class="form-control" disabled v-model="depositUang.id_member">
                            
                            <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                {{ validation.id_member[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">ID Pegawai</label>
                            <input type="text" class="form-control" disabled v-model="depositUang.id_pegawai">
                            
                            <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                {{ validation.id_pegawai[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Promo</label>
                            <select class="form-control" v-model="depositUang.id_promo" @change="resetSelect">
                                <option value="">Tanpa Promo</option>
                                <option v-for="(promo,id) in promos" :value="promo.ID_PROMO" :key="id">
                                    {{ promo.ID_PROMO }} - {{ promo.JENIS_PROMO }} - Minimal Deposit: {{ promo.MINIMAL_PEMBELIAN }}
                                </option>
                            </select>
                            <div v-if="validation.id_promo" class="mt-2 alert alert-danger">
                                {{ validation.id_promo[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Tanggal Deposit</label>
                            <input type="text" class="form-control" v-model="depositUang.tanggal_deposit_uang" disabled>
                            
                            <div v-if="validation.tanggal_deposit_uang" class="mt-2 alert alert-danger">
                                {{ validation.tanggal_deposit_uang[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Deposit Uang</label>
                            <input type="text" class="form-control" v-model="depositUang.deposit_uang" placeholder="Masukkan Jumlah Deposit Uang">

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
    const depositUang = reactive({
    id_member: '',
    id_pegawai: '',
    id_promo: '',
    tanggal_deposit_uang: '',
    deposit_uang: ''
    })
    //state validation
    const validation = ref([])
    const members = ref([])
    const pegawais = ref([])
    const promos = ref([])
    const toastr = createToaster({})
    //vue router
    const router = useRouter()
    const route = useRoute()
    const akun = localStorage.getItem('akun')
    const id = route.params.id


    onMounted(() => {
    depositUang.id_member = id
    depositUang.id_pegawai = akun
    depositUang.tanggal_deposit_uang = new Date().toISOString().substr(0, 10)
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
    //method store
    function store() {
        let id_member = depositUang.id_member
        let id_pegawai = depositUang.id_pegawai
        let id_promo = depositUang.id_promo
        let tanggal_deposit_uang = depositUang.tanggal_deposit_uang
        let deposit_uang = depositUang.deposit_uang
        axios.post('https://backend10610.gofit10603.site/api/transaksiDepositUangs', {
        id_member: id_member,
        id_pegawai: id_pegawai,
        id_promo: id_promo,
        tanggal_deposit_uang: tanggal_deposit_uang,
        deposit_uang: deposit_uang
        }).then(() => {
        //redirect ke post index
            router.push({
            name: 'transaksiDepositUang.index'
            })
            toastr.success('Data berhasil ditambahkan!' , { position:"top-right" });
        }).catch(error => {
            //assign state validation with error
            toastr.error(error.response.data.errors, { position:"top-right" });
            validation.value = error.response.data
            
        })
    }
        //return
        return {
            depositUang,
            pegawais,
            promos,
            members,
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
