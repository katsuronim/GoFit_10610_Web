<template>
    <div class="printme" id="all-products" style="margin:25px">
        <h6 style="font-weight:bold; text-align: left; padding-top:25px;">GoFit</h6>
        <h6 style="text-align: left; ">Jl. Centralpark No.10 Yogyakarta</h6>
        <h6 style="font-weight:bold; text-align: left; ">STRUK PRESENSI KELAS PAKET</h6>
        <h6 style="text-align: left; ">Nomor Struk     : {{ presensiKelas.nomor_struk }} </h6>
        <h6 style="text-align: left; ">Tanggal     : {{ presensiKelas.tanggal }}</h6>

        <table style="text-align: left; font-size: medium;">
                <tr>
                    <th>Member</th>
                    <th><h6> : {{presensiKelas.member}} </h6></th>
                </tr>
                <tr>
                    <th><h6>Kelas</h6></th>
                    <th><h6> : {{ presensiKelas.kelas }}</h6></th>
                </tr>
                <tr>
                    <th><h6>Instruktur</h6></th>
                    <th><h6> : {{ presensiKelas.instruktur}}</h6></th>
                </tr>
                <tr>
                    <th><h6>Sisa Deposit</h6></th>
                    <th><h6> : {{ presensiKelas.sisa_deposit}}</h6></th>
                </tr>
                <tr>
                    <th><h6>Berlaku Sampai</h6></th>
                    <th><h6> : {{ presensiKelas.berlaku_sampai}}</h6></th>
                </tr>
        </table>
    </div>
    <div class="no-printme">
        <button @click.prevent="strukPrint" class="btn btn-outline-info" style="margin-top: 30px; margin-left: 150px;">PRINT</button>
    </div>
    
    
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import html2pdf from "html2pdf.js";
export default {
    setup() {
    const presensiKelas = reactive({
    nomor_struk: '',
    tanggal: '',
    member: '',
    kelas: '',
    instruktur: '',
    sisa_deposit: '',
    berlaku_sampai: '',
    tariff: ''
    })
    //state validation
    const validation = ref([])
    //vue router
    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;
    const date = new Date();

    onMounted(() => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    let currentDate = `${day}/${month}/${year}`;
    let currentTime = date.toLocaleTimeString();
    axios.get(`https://backend10610.gofit10603.site/api/bookingPresensiKelas/${id}`)
    .then(response => {
        presensiKelas.nomor_struk = response.data.data.NOMOR_STRUK
        presensiKelas.tanggal = currentDate + "  " + currentTime
        presensiKelas.member =  response.data.data.ID_MEMBER + " / " + response.data.data.nama_member
        presensiKelas.kelas = response.data.data.nama_kelas
        presensiKelas.instruktur =  response.data.data.nama_instruktur
        presensiKelas.sisa_deposit = response.data.data.deposit_paket_kelas + "x"
        presensiKelas.berlaku_sampai = response.data.data.tanggal_kadaluarsa
        presensiKelas.tariff = response.data.data.harga_kelas
        })
    })
    function strukPrint() {
        window.print();
        router.push({
            name: 'presensiKelas.index'
            })
    }
    function exportToPDF() {
        const element = document.getElementById('element-to-convert');

        const options = {
            filename: 'example.pdf',
            html2canvas: { scale: 2 }, // Adjust the scale factor for better quality if needed
            jsPDF: { unit: 'pt' }, // Use points as the unit for positioning and dimensions
            size: 'A5'
        };

        html2pdf()
            .set(options)
            .from(element)
            .outputPdf('blob')
            .then(pdf => {
            const pdfURL = URL.createObjectURL(pdf);
            const printWindow = window.open(pdfURL);
            printWindow.onload = () => {
                const printDocument = printWindow.document;
                const pdfContainer = printDocument.querySelector('body');
                pdfContainer.style.height = '1000pt'; // Adjust the desired page height here
            };
            });
            router.push({
            name: 'presensiKelas.index'
            })
    }
        //return
        return {
            presensiKelas,
            validation,
            router,
            strukPrint,
            exportToPDF
        }
    },
    methods: {
    printCard() {
      const printContents = document.querySelector('.card').innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
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
