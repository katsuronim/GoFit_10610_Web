<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Izin Instruktur</h1>

        <h5 style="font-weight:bold; text-align: left; padding-top:25px;margin-top: 10px;">Data Izin Yang Belum dikonfirmasi</h5>
        <table class="table table-hover" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">NAMA INSTRUKTUR</th>
                    <th scope="col">NAMA INSTRUKTUR PENGGANTI</th>
                    <th scope="col">TANGGAL PENGAJUAN IZIN</th>
                    <th scope="col">TANGGAL IZIN</th>
                    <th scope="col">JAM SESI IZIN</th>
                    <th scope="col">ALASAN IZIN</th>
                    <th scope="col">STATUS KONFIRMASI</th>
                    <th scope="col">AKSI</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(izinInstruktur, id) in izinInstruktur" :key="id">
                    <td>
                        <div v-for="(instruktur, id) in instrukturs" :key="id">
                            <div v-if="izinInstruktur.ID_INSTRUKTUR == instruktur.ID_INSTRUKTUR">{{ instruktur.ID_INSTRUKTUR }} - {{ instruktur.NAMA_INSTRUKTUR }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(instruktur, id) in instrukturs" :key="id">
                            <div v-if="izinInstruktur.ID_INSTRUKTUR_PENGGANTI == instruktur.ID_INSTRUKTUR">{{ instruktur.ID_INSTRUKTUR }} - {{ instruktur.NAMA_INSTRUKTUR }}</div>
                        </div>
                    </td>
                    <td>{{ izinInstruktur.TANGGAL_PENGAJUAN_IZIN }}</td>
                    <td>{{ izinInstruktur.TANGGAL_IZIN }}</td>
                    <td>{{ izinInstruktur.JAM_SESI_IZIN }}</td>
                    <td>{{ izinInstruktur.ALASAN_IZIN }}</td>
                    <td>{{ izinInstruktur.STATUS_KONFIRMASI }}</td>
                    <td>
                      <button @click.prevent="confirm(izinInstruktur.ID_IZIN_INSTRUKTUR, izinInstruktur.NAMA_INSTRUKTUR, izinInstruktur.TANGGAL_IZIN, izinInstruktur.JAM_SESI_IZIN)" class="btn btn-outline-primary">KONFIRMASI</button>
                      <button @click.prevent="unconfirm(izinInstruktur.ID_IZIN_INSTRUKTUR, izinInstruktur.NAMA_INSTRUKTUR, izinInstruktur.TANGGAL_IZIN, izinInstruktur.JAM_SESI_IZIN)" class="btn btn-outline-danger" style="margin:10px">TIDAK DIZINKAN</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button  class="btn btn-dark" style="margin:5px" @click="prevPage">
            Previous
        </button>
        <button  class="btn btn-dark" style="margin:5px" @click="nextPage">
            Next
        </button>
        <hr>
        <h5 style="font-weight:bold; text-align: center; padding-top:25px;">Data Izin Yang Sudah Dikonfirmasi</h5>
        <table class="table table-hover" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">NAMA INSTRUKTUR</th>
                    <th scope="col">NAMA INSTRUKTUR PENGGANTI</th>
                    <th scope="col">TANGGAL PENGAJUAN IZIN</th>
                    <th scope="col">TANGGAL IZIN</th>
                    <th scope="col">JAM SESI IZIN</th>
                    <th scope="col">ALASAN IZIN</th>
                    <th scope="col">STATUS KONFIRMASI</th>
                    <th scope="col">TANGGAL KONFIRMASI</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(konfirmasi, id) in konfirmasi" :key="id">
                    <td>
                        <div v-for="(instruktur, id) in instrukturs" :key="id">
                            <div v-if="konfirmasi.ID_INSTRUKTUR == instruktur.ID_INSTRUKTUR">{{ instruktur.ID_INSTRUKTUR }} - {{ instruktur.NAMA_INSTRUKTUR }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(instruktur, id) in instrukturs" :key="id">
                            <div v-if="konfirmasi.ID_INSTRUKTUR_PENGGANTI == instruktur.ID_INSTRUKTUR">{{ instruktur.ID_INSTRUKTUR }} - {{ instruktur.NAMA_INSTRUKTUR }}</div>
                        </div>
                    </td>
                    <td>{{ konfirmasi.TANGGAL_PENGAJUAN_IZIN }}</td>
                    <td>{{ konfirmasi.TANGGAL_IZIN }}</td>
                    <td>{{ konfirmasi.JAM_SESI_IZIN }}</td>
                    <td>{{ konfirmasi.ALASAN_IZIN }}</td>
                    <td>{{ konfirmasi.STATUS_KONFIRMASI }}</td>
                    <td>{{ konfirmasi.TANGGAL_KONFIRMASI }}</td>
                </tr>
            </tbody>
        </table>
        <button  class="btn btn-dark" style="margin:5px" @click="prevPageKonfirmasi">
            Previous
        </button>
        <button  class="btn btn-dark" style="margin:5px" @click="nextPageKonfirmasi">
            Next
        </button>
    </div>
</template>
<script>
import axios from 'axios'
import { reactive, onMounted, ref } from 'vue'
import { createToaster } from "@meforma/vue-toaster"
import { useRouter } from 'vue-router'
export default {
    setup() {
    let data = ref([])
    let currentPage = 1
    let currentPageKonfirmasi = 1
    let perPage = 5
    let totalPages = 0
    let totalPagesKonfirmasi = 0
    const state = reactive({
        searchInput: ''
    })
    //reactive state
    let izinInstruktur = ref([])
    let konfirmasi = ref([])
    let instrukturs = ref([])
    const toastr = createToaster({})
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    const akun = localStorage.getItem('akun')
    //vue router
     const router = useRouter()
    //mounted
    onMounted(() => {
    axios.get(`https://backend10610.gofit10603.site/api/izinInstrukturs?page=${currentPage}`).then(response => {
            izinInstruktur.value = response.data.data.data
            totalPages = response.data.data.last_page
    });
    axios.post(`https://backend10610.gofit10603.site/api/izinInstrukturs/getAll?page=${currentPageKonfirmasi}`).then(response => {
            konfirmasi.value = response.data.data.data
            totalPagesKonfirmasi = response.data.data.last_page
    });
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
    axios.get('https://backend10610.gofit10603.site/api/instrukturs')
    .then(response => {
    //assign state posts with response data
    instrukturs.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    })
    function getData() {
    toastr.success(currentPage , { position:"top-right" });
        axios.get(`https://backend10610.gofit10603.site/api/izinInstrukturs?page=${currentPage}`).then(response => {
            izinInstruktur.value = response.data.data.data
        });
        }
    function nextPage() {
      currentPage = currentPage + 1
      if(currentPage > totalPages){
        toastr.error('Tidak ada halaman berikutnya', { position:"top-right" });
        currentPage = currentPage - 1
      } else {
        getData()
      }
    }
    function prevPage() {
      if(currentPage == 1){
        toastr.error('Tidak ada halaman sebelumnya', { position:"top-right" });
      } else {
        currentPage = currentPage - 1;
        getData()
      }
    }
    //konfirmsai
    function getDataKonfirmasi() {
    toastr.success(currentPageKonfirmasi , { position:"top-right" });
        axios.post(`https://backend10610.gofit10603.site/api/izinInstrukturs/getAll?page=${currentPageKonfirmasi}`).then(response => {
            konfirmasi.value = response.data.data.data
        });
        }
    function nextPageKonfirmasi() {
      currentPageKonfirmasi = currentPageKonfirmasi + 1
      if(currentPageKonfirmasi > totalPagesKonfirmasi){
        toastr.error('Tidak ada halaman berikutnya', { position:"top-right" });
        currentPageKonfirmasi = currentPageKonfirmasi - 1
      } else {
        getDataKonfirmasi()
      }
    }
    function prevPageKonfirmasi() {
      if(currentPageKonfirmasi == 1){
        toastr.error('Tidak ada halaman sebelumnya', { position:"top-right" });
      } else {
        getDataKonfirmasi()
      }
    }
    function confirm(id, nama, tanggal, jam){
        if (window.confirm('Apakah anda yakin ingin mengkonfirmasi izin instruktur '+ nama + ' pada tanggal ' + tanggal + ' dan jam ' + jam + '?')) {
          //delete data post by ID
          axios.put(`https://backend10610.gofit10603.site/api/izinInstrukturs/confirm/${id}`)
            .then(() => {
                window.location.reload(true);
                toastr.success('Data berhasil dikonfirmasi!' , { position:"top-right" });
             }).catch(error => {
                toastr.error('Data gagal dikonfirmasi!' , { position:"top-right" });
                 console.log(error.response.data)
             })
        }
    }
    function unconfirm(id, nama, tanggal, jam){
        if (window.confirm('Apakah anda yakin ingin tidak mengizinkan izin instruktur '+ nama + ' pada tanggal ' + tanggal + ' dan jam ' + jam + '?')) {
          //delete data post by ID
          axios.put(`https://backend10610.gofit10603.site/api/izinInstrukturs/unconfirm/${id}`)
            .then(() => {
                window.location.reload(true);
                toastr.success('Data berhasil dikonfirmasi!' , { position:"top-right" });
             }).catch(error => {
                toastr.error('Data gagal dikonfirmasi!' , { position:"top-right" });
                 console.log(error.response.data)
             })
        }
    }
        //return
        return {
            instrukturs,
            konfirmasi,
            izinInstruktur,
            akun,
            getData,
            confirm,
            data,
            currentPage,
            currentPageKonfirmasi,
            perPage,
            totalPages,
            totalPagesKonfirmasi,
            nextPage,
            prevPage,
            nextPageKonfirmasi,
            prevPageKonfirmasi,
            state,
            unconfirm
        }
    },
    computed: {
        displayedMembers() {
            const searchKeyword = this.state.searchInput.toLowerCase();
                return this.members.filter(member => {
                const memberString = Object.values(member).join(' ').toLowerCase();
                return memberString.includes(searchKeyword);
            });
    }
}
}
</script>
<style>
</style>