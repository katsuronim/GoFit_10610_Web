<template>
    <div class="container mt-2" style="float:center">
        <div id="element-to-convert" class="row">
            <h4>
                <strong>
                    <div style="float: left; margin-left: 5%;margin-top: 2%;">
                        GoFit
                    </div>
                </strong>
            </h4>
            <h4>
                <div style="float: left;margin-left: 5%">
                    Jl.Centralpark No.10 Yogyakarta
                </div>
            </h4>
                <table>
                    <td>
                        <div class="form-group mb-3" style="width:80%; height:50%; margin-left: 5%">
                            <strong>
                                <label class="form-label" style="float:left;font-size: 200%;">Struk Presensi Gym</label>
                            </strong>
                            <input class="form-control" v-model="presensiGym.nomor_struk" disabled>
                        </div>
                        <div class="form-group mb-3"  style="width:80%; height:50%; margin-left: 5%">
                            <input class="form-control" type="text" disabled v-model="presensiGym.tanggal">
                        </div>
                        <div class="form-group mb-3"  style="width:80%; height:50%; margin-left: 5%">
                            <input type="text" class="form-control" disabled v-model="presensiGym.member">
                        </div>
                        <div class="form-group mb-3" style="width:80%; height:50%; margin-left: 5%">
                            <input type="text" class="form-control" disabled v-model="presensiGym.slot_waktu">
                        </div>
                    </td>
                </table>
        </div>
        <button @click.prevent="exportToPDF" class="btn btn-outline-info" style="margin-top: 10px; margin-left:1%;margin-bottom: 1%;">PRINT</button>
    </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import html2pdf from "html2pdf.js";
export default {
    setup() {
    const presensiGym = reactive({
    nomor_struk: '',
    tanggal: '',
    member: '',
    slot_waktu: ''
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
    let currentTime = date.toLocaleTimeString()
    axios.get(`https://backend10610.gofit10603.site/api/bookingPresensiGyms/${id}`)
    .then(response => {
        presensiGym.nomor_struk =  "Nomor Struk    :  " + response.data.data.NOMOR_STRUK_BOOKING_PRESENSI_GYM
        presensiGym.tanggal =      "Tanggal            :  " + currentDate + "   " + currentTime
        presensiGym.member =       "Member           :  " + response.data.data.ID_MEMBER + " / " + response.data.data.nama_member
        presensiGym.slot_waktu = "Slot Waktu       :  " + response.data.data.SESI_DIBOOKING
        })
    })
    function strukPrint() {
        window.print();
        router.push({
            name: 'presensiGym.index'
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
            name: 'presensiGym.index'
            })
    }
        //return
        return {
            presensiGym,
            validation,
            router,
            strukPrint,
            exportToPDF
        }
    },
    methods: {
    printCard() {
      const printContents = document.getElementById('element-to-convert').innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
    
  }
}
</script>
<style scoped>
@media print {
  @page {
    size: A5; /* Adjust the paper size here, e.g., A4, letter, legal, etc. */
    /* You can also specify other print-related properties here, such as margins */
  }
  body {
    width: 148mm;
    height: 210mm;
    margin: 0;
    }
}
</style>
