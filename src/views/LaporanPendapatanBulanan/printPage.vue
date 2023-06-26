<template>
    <div class="printme" id="all-products" style="margin: 15px;">
        <h4 style="font-weight:bold; text-align: left; padding-top:25px;">GoFit</h4>
        <h4 style="text-align: left; ">Jl. Centralpark No.10 Yogyakarta</h4>
        <h4 style="font-weight:bold;text-align: left; padding-top: 25px; text-decoration: underline;">LAPORAN PENDAPATAN BULANAN</h4>
        <h4 style="text-align: left; ">PERIODE: {{ currentYear }}</h4>
        <h4 style="text-align: left; ">Tanggal Cetak: {{ tanggal }}</h4>


        <table class="table table-bordered" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : black; font-weight : bold;">
                    <th scope="col">Bulan</th>
                    <th scope="col">Aktivasi</th>
                    <th scope="col">Deposit</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(laporan, id) in laporans" :key="id">
                    <td>{{ laporan.Bulan }}</td>
                    <td>{{ laporan.Aktivasi }}</td>
                    <td>{{ laporan.Deposit }}</td>
                    <td>{{ laporan.Total }}</td>
                </tr>
                <tr>
                    <td colspan="3">Total</td>
                    <td>
                        {{ columnTotals.column1 }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div style="width:70%">
            <canvas id="myChart"></canvas>
        </div>

    </div>
    <div class="no-printme">
        <button @click.prevent="strukPrint" class="btn btn-outline-info" style="margin-top: 30px; margin-left: 150px;">PRINT</button>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
//import { createToaster } from "@meforma/vue-toaster"
import { useRouter, useRoute } from 'vue-router'
import Chart from 'chart.js/auto'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import html2pdf from "html2pdf.js";
export default {
    setup() {
    //reactive state
    let laporans = ref([])
    let arrayTotal = []
    let arrayBulan = []
//    const toastr = createToaster({})
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    let jumlah = 0
    const akun = localStorage.getItem('akun')
    //vue router
    const router = useRouter()
    const routes = useRoute()
    const date = new Date();
    let currentYear = date.getFullYear();
    dayjs.locale('id');
    const tanggal = dayjs().format('DD MMMM YYYY');
    

    //mounted
    onMounted(() => {
    axios.post(`https://backend10610.gofit10603.site/api/laporanPendapatans/getLaporan`,{
        tahun: routes.params.id
    })
    .then(response => {
        laporans.value = response.data.data

        for(let i = 0; i < laporans.value.length; i++){
            const total = laporans.value[i].Total
            const bulan = laporans.value[i].Bulan

            arrayTotal[i] = total
            arrayBulan[i] = bulan
        }
        const ctx = document.getElementById('myChart')

        new Chart(ctx, {
            type: 'bar',
            data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Jumlah Pendapatan Bulanan',
                data: arrayTotal,
                borderWidth: 1
            }]
            },
            options: {
            backgroundColor: 'rgba(106, 90, 205,1)',
            borderColor: 'rgba(0,0,0,1)',
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });
    })
    
    
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
    })
    function exportToPDF() {
        const element = document.getElementById('all-products');

        const options = {
            filename: 'example.pdf',
            html2canvas: { scale: 2 }, // Adjust the scale factor for better quality if needed
            jsPDF: { unit: 'pt' }, // Use points as the unit for positioning and dimensions
            size: 'F4'
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
                pdfContainer.style.width = '1000pt'; // Adjust the desired page height here
            };
            });
            router.push({
            name: 'laporanPendapatanBulanan.index'
            })
    }
    function strukPrint() {
        window.print();
        router.push({
            name: 'laporanPendapatanBulanan.index'
            })
    }
        return {
            laporans,
            akun,
            jumlah,
            currentYear,
            tanggal,
            exportToPDF,
            strukPrint
        }
    },
    computed: {
        columnTotals() {
            const totals = {
            column1: 0,
            // Add more properties for each column
            };

            this.laporans.forEach(row => {
            totals.column1 += row.Total;
            // Add more properties for each column
            });

            return totals;
        }

    }

}
</script>
<style>
@media print {
  .no-printme  {
		display: none;
	}
	.printme  {
		display: block;
	}
}
</style>