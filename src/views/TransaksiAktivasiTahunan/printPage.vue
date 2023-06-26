<template>
    <div class="printme" id="all-products" style="margin:25px">
        <h6 style="font-weight:bold; text-align: left; padding-top:25px;">GoFit</h6>
        <h6 style="text-align: left; ">Jl. Centralpark No.10 Yogyakarta</h6>
        <h6 style="text-align: right; ">Nomor Struk     : {{ aktivasiTahunan.nomor_struk_aktivasi }} </h6>
        <h6 style="text-align: right; ">Tanggal     : {{ aktivasiTahunan.tanggal }}</h6>

        <table style="text-align: left; font-size: medium;">
                <tr>
                    <th>Member</th>
                    <th><h6> : {{aktivasiTahunan.id_member}} </h6></th>
                </tr>
                <tr>
                    <th><h6>Aktivasi Tahunan</h6></th>
                    <th><h6> : Rp 3000000</h6></th>
                </tr>
                <tr>
                    <th><h6>Masa Aktif Member</h6></th>
                    <th><h6> : {{aktivasiTahunan.masa_aktif_member}}</h6></th>
                </tr>
                <tr>
                    <th><h6>Jumlah Pembayaran</h6></th>
                    <th><h6> : {{aktivasiTahunan.jumlah_pembayaran}}</h6></th>
                </tr>
                <tr>
                    <th><h6>Kembalian</h6></th>
                    <th><h6> : {{uang.kembalian}}</h6></th>
                </tr>
        </table>
        <h6 style="text-align: right; ">Kasir: {{ aktivasiTahunan.id_pegawai }}</h6>
    </div>
    <div class="no-printme">
        <button @click.prevent="strukPrint" class="btn btn-outline-info" style="margin-top: 30px; margin-left: 150px;">PRINT</button>
    </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
//import { createToaster } from "@meforma/vue-toaster"
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import html2pdf from "html2pdf.js";
export default {
    setup() {
    const aktivasiTahunan = reactive({
    nomor_struk_aktivasi: '',
    id_member: '',
    id_pegawai: '',
    tanggal_aktivasi: '',
    masa_aktif_member: '',
    jumlah_pembayaran: '',
    nama_pegawai: '',
    nama_member: '',
    tanggal:''
    })
    const uang = reactive({
    kembalian: ''
    })
    let isVisible = 1
    //state validation
    const validation = ref([])
    //vue router
    const router = useRouter();
    //const toastr = createToaster({})
    const route = useRoute();
    const id = route.params.id;
    const date = new Date();
    let currentYear = date.getFullYear();
    dayjs.locale('id');
    const tanggal = dayjs().format('DD MMMM YYYY');
    const bulan = dayjs().format('MMMM')

    onMounted(() => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    let currentDate = `${day}/${month}/${year}`;
    let currentTime = date.toLocaleTimeString();
    axios.get(`https://backend10610.gofit10603.site/api/transaksiAktivasiTahunans/${id}`)
    .then(response => {
        aktivasiTahunan.nomor_struk_aktivasi = response.data.data.NOMOR_STRUK_AKTIVASI
        aktivasiTahunan.id_member = response.data.data.ID_MEMBER  + " / " + response.data.data.NAMA_MEMBER
        aktivasiTahunan.id_pegawai = response.data.data.ID_PEGAWAI + " / " + response.data.data.NAMA_PEGAWAI
        aktivasiTahunan.tanggal_aktivasi = response.data.data.TANGGAL_AKTIVASI
        aktivasiTahunan.masa_aktif_member = response.data.data.MASA_AKTIF_MEMBER
        aktivasiTahunan.jumlah_pembayaran = "Rp " + response.data.data.JUMLAH_PEMBAYARAN
        aktivasiTahunan.tanggal = currentDate + " " + currentTime
        uang.kembalian = "Rp " + response.data.data.KEMBALIAN
        })
    })
    function strukPrint() {
        window.print();
        router.push({
            name: 'transaksiAktivasiTahunan.index'
            })
    }
    function exportToPDF() {
        const element = document.getElementById('all-products');

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
            name: 'transaksiAktivasiTahunan.index'
            })
    }
    function printContent() {
        const printableContent = document.getElementById('all-products')
        const printWindow = window.open('', '', 'height=500,width=1000')
        printWindow.document.write(printableContent.innerHTML)
        printWindow.print()

    }
        //return
        return {
            aktivasiTahunan,
            uang,
            validation,
            router,
            strukPrint,
            currentYear,
            tanggal,
            bulan,
            exportToPDF,
            isVisible,
            printContent,
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
