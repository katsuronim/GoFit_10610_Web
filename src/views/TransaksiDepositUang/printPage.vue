<template>
    <div class="container mt-2" style="float:center">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow" style="width:70%; height:100%; margin-left: 20%;">
                    <h4 style="margin-top:20px">STRUK TRANSAKSI DEPOSIT UANG</h4>
                    <hr>
                    <div class="card-body" style="width:50%; height:50%; margin-left: 10px;">
                        <table>
                            <td>
                                <div class="form-group mb-3" style="width:200%; height:50%">
                                    <label for="content" class="form-label" style="float:left">Nomor Struk Deposit Uang</label>
                                    <input class="form-control" v-model="depositUang.nomor_struk_deposit_uang" disabled>
                                </div>
                                <div class="form-group mb-3" style="width:200%; height:50%">
                                    <label for="content" class="form-label" style="float:left">Tanggal</label>
                                    <input class="form-control" type="date" :format="'YYYY-MM-DD'" disabled v-model="depositUang.tanggal_deposit_uang">
                                </div>
                                <div class="form-group mb-3"  style="width:200%; height:50%">
                                    <label class="form-label" style="float:left">ID Member</label>
                                    <input type="text" class="form-control" disabled v-model="depositUang.id_member">
                                </div>
                                <div class="form-group mb-3" style="width:200%; height:50%">
                                    <label class="form-label" style="float:left">Deposit</label>
                                    <input type="text" class="form-control" disabled v-model="depositUang.deposit_uang">
                                </div>
                                <div class="form-group mb-3" style="width:200%; height:50%">
                                    <label class="form-label" style="float:left">Bonus Deposit</label>
                                    <input type="text" class="form-control" disabled v-model="depositUang.bonus_deposit_uang">
                                </div>
                                <div class="form-group mb-3" style="width:200%; height:50%">
                                    <label class="form-label" style="float:left">Sisa Deposit</label>
                                    <input type="text" class="form-control" disabled v-model="depositUang.sisa_saldo">
                                </div>
                                <div class="form-group mb-3" style="width:200%; height:50%">
                                    <label class="form-label" style="float:left">Total Deposit</label>
                                    <input type="text" class="form-control" disabled v-model="depositUang.total_deposit_uang">
                                </div>
                                <div class="form-group mb-3" style="width:200%; height:50%">
                                    <label for="content" class="form-label" style="float:left">ID Kasir</label>
                                    <input class="form-control" v-model="depositUang.id_pegawai" disabled>
                                </div>
                                <button @click.prevent="strukPrint(depositUang.NOMOR_STRUK_DEPOSIT_UANG)" class="btn btn-outline-info" style="margin-top: 30px; margin-left:90%;">PRINT</button>
                            </td>
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
    const depositUang = reactive({
    nomor_struk_deposit_uang: '',
    id_member: '',
    id_pegawai: '',
    tanggal_deposit_uang: '',
    deposit_uang: '',
    bonus_deposit_uang: '',
    total_deposit_uang: '',
    sisa_saldo: '',
    nama_pegawai: '',
    nama_member: ''
    })
    //state validation
    const validation = ref([])
    //vue router
    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;

    onMounted(() => {
    axios.get(`https://backend10610.gofit10603.site/api/transaksiDepositUangs/${id}`)
    .then(response => {
        depositUang.nomor_struk_deposit_uang = response.data.data.NOMOR_STRUK_DEPOSIT_UANG
        depositUang.id_member = response.data.data.ID_MEMBER + " / " + response.data.data.NAMA_MEMBER
        depositUang.id_pegawai = response.data.data.ID_PEGAWAI + " / " + response.data.data.NAMA_PEGAWAI
        depositUang.tanggal_deposit_uang = response.data.data.TANGGAL_DEPOSIT_UANG
        depositUang.deposit_uang = "Rp. " + response.data.data.DEPOSIT_UANG
        depositUang.bonus_deposit_uang = "Rp. " + response.data.data.BONUS_DEPOSIT_UANG
        depositUang.total_deposit_uang = "Rp. " + (response.data.data.TOTAL_DEPOSIT_UANG+response.data.data.SISA_SALDO)
        depositUang.sisa_saldo = "Rp. " + response.data.data.SISA_SALDO
        })
    })
    function strukPrint() {
        window.print();
        router.push({
            name: 'transaksiDepositUang.index'
            })
    }
        //return
        return {
            depositUang,
            validation,
            router,
            strukPrint
        }
    }
}
</script>
<style>
</style>
