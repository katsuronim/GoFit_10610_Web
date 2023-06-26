<template>
    <div id="all-products">
        <h4 style="font-weight:bold; text-align: left; padding-top:25px;">GoFit</h4>
        <h4 style="text-align: left; ">Jl. Centralpark No.10 Yogyakarta</h4>
        <h4 style="font-weight:bold;text-align: left; padding-top: 25px; text-decoration: underline;">LAPORAN AKTIVITAS GYM Bulanan</h4>
        <h4 style="text-align: left; text-decoration: underline;"><u>Bulan: {{ bulan }}</u> <u>     Tahun: {{ currentYear }}</u></h4>
        <h4 style="text-align: left; ">Tanggal Cetak: {{ tanggal }}</h4>

        <table class="table table-bordered" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : black; font-weight : bold;">
                    <th scope="col">Tanggal</th>
                    <th scope="col">Jumlah Member</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(laporan, id) in laporans" :key="id">
                    <td>{{ laporan.Tanggal }}</td>
                    <td>{{ laporan.Jumlah_Member }}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>
                        {{ columnTotals.column1 }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div>
        <button @click.prevent="strukPrint" class="btn btn-outline-info" style="margin-top: 30px; margin-left: 150px;">PRINT</button>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
//import { createToaster } from "@meforma/vue-toaster"
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import html2pdf from "html2pdf.js";
export default {
    setup() {
    //reactive state
    let laporans = ref([])
//    const toastr = createToaster({})
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    const akun = localStorage.getItem('akun')
    //vue router
     const router = useRouter()
    const date = new Date();
    let currentYear = date.getFullYear();
    dayjs.locale('id');
    const tanggal = dayjs().format('DD MMMM YYYY');
    const bulan = dayjs().format('MMMM')
    //mounted
    onMounted(() => {
    axios.post(`https://backend10610.gofit10603.site/api/laporanAktivitasGyms/getLaporanAktivitasGym`)
    .then(response => {
        laporans.value = response.data.data
    });
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
    })
    function strukPrint() {
        window.print();
        router.push({
            name: 'laporanPendapatanBulanan.index'
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
            name: 'presensiKelas.index'
            })
    }
        return {
            laporans,
            akun,
            currentYear,
            tanggal,
            bulan,
            strukPrint,
            exportToPDF
        }
    },
    computed: {
        columnTotals() {
            const totals = {
            column1: 0,
            };
            this.laporans.forEach(row => {
            totals.column1 += row.Jumlah_Member;
            });

            return totals;
        },
    }
}
</script>
<style>
</style>