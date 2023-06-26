<template>
    <div class="printme" id="all-products" style="margin:25px">
        <h6 style="font-weight:bold; text-align: left; padding-top:25px;">GoFit</h6>
        <h6 style="text-align: left; ">Jl. Centralpark No.10 Yogyakarta</h6>
        <h6 style="text-align: right; ">Nomor Struk     : {{ depositPaket.nomor_struk_deposit_paket }} </h6>
        <h6 style="text-align: right; ">Tanggal     : {{ depositPaket.tanggal }}</h6>

        <table style="text-align: left; font-size: medium;">
                <tr>
                    <th>Member</th>
                    <th><h6> : {{depositPaket.id_member}} </h6></th>
                </tr>
                <tr>
                    <th><h6>Deposit (Bayar {{ depositPaket.deposit_paket }} gratis {{ depositPaket.bonus_deposit_paket }})</h6></th>
                    <th><h6> : Rp {{ depositPaket.harga_kelas * depositPaket.deposit_paket }} ({{ depositPaket.deposit_paket }} x Rp {{ depositPaket.harga_kelas }})</h6></th>
                </tr>
                <tr>
                    <th><h6>Jenis Kelas</h6></th>
                    <th><h6> : {{ depositPaket.nama_kelas}}</h6></th>
                </tr>
                <tr>
                    <th><h6>Total Deposit Paket</h6></th>
                    <th><h6> : {{ depositPaket.total_deposit_paket}}</h6></th>
                </tr>
                <tr>
                    <th><h6>Berlaku sampai dengan</h6></th>
                    <th><h6> : {{ depositPaket.tanggal_kadaluarsa}}</h6></th>
                </tr>
        </table>
        <h6 style="text-align: right; ">Kasir: {{ depositPaket.id_pegawai }}</h6>
    </div>
    <div class="no-printme">
        <button @click.prevent="strukPrint" class="btn btn-outline-info" style="margin-top: 30px; margin-left: 150px;">PRINT</button>
    </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
export default {
    setup() {
    const depositPaket = reactive({
    nomor_struk_deposit_paket: '',
    id_member: '',
    id_pegawai: '',
    tanggal_deposit_paket: '',
    deposit_paket: '',
    bonus_deposit_paket: '',
    total_deposit_paket: '',
    nama_kelas: '',
    nama_pegawai: '',
    nama_member: '',
    harga_kelas: '',
    tanggal_kadaluarsa: '',
    tanggal: ''
    })
    //state validation
    const validation = ref([])
    //vue router
    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;
    const date = new Date();
    dayjs.locale('id');
    const tanggal = dayjs().format('DD MMMM YYYY');

    onMounted(() => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    let currentDate = `${day}/${month}/${year}`;
    let currentTime = date.toLocaleTimeString();
    axios.get(`https://backend10610.gofit10603.site/api/transaksiDepositKelasPakets/${id}`)
    .then(response => {
        depositPaket.nomor_struk_deposit_paket = response.data.data.NOMOR_STRUK_DEPOSIT_PAKET
        depositPaket.id_member = response.data.data.ID_MEMBER + " / " + response.data.data.NAMA_MEMBER
        depositPaket.id_pegawai = response.data.data.ID_PEGAWAI + " / " + response.data.data.NAMA_PEGAWAI
        depositPaket.tanggal_deposit_paket = response.data.data.TANGGAL_DEPOSIT_PAKET
        depositPaket.deposit_paket = response.data.data.DEPOSIT_PAKET
        depositPaket.nama_kelas = response.data.data.NAMA_KELAS
        depositPaket.bonus_deposit_paket = response.data.data.BONUS_DEPOSIT_PAKET 
        depositPaket.total_deposit_paket = response.data.data.TOTAL_DEPOSIT_PAKET
        depositPaket.harga_kelas = response.data.data.HARGA_KELAS
        depositPaket.tanggal_kadaluarsa = response.data.data.TANGGAL_AKHIR_BERLAKU
        depositPaket.tanggal = currentDate + " " + currentTime
        })
    })
    function strukPrint() {
        window.print();
        router.push({
            name: 'transaksiDepositPaket.index'
            })
    }
        //return
        return {
            depositPaket,
            validation,
            router,
            strukPrint,
            tanggal
        }
    }
}
</script>
<style>
@media print {
  .orientation {
    width: 100% /* print width */;
  }
  .no-printme  {
		display: none;
	}
	.printme  {
		display: block;
	}
}
</style>
