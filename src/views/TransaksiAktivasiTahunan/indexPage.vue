<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Transaksi Aktivasi Tahunan</h1>

        <table class="table table-hover" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">NOMOR STRUK AKTIVASI</th>
                    <th scope="col">NAMA MEMBER</th>
                    <th scope="col">NAMA PEGAWAI</th>
                    <th scope="col">TANGGAL AKTIVASI</th>
                    <th scope="col">MASA AKTIF MEMBER</th>
                    <th scope="col">JUMLAH PEMBAYARAN</th>
                    <th scope="col">KEMBALIAN</th>
                    <th scope="col">AKSI</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(aktivasiTahunan, id) in aktivasiTahunans" :key="id">
                    <td>{{ aktivasiTahunan.NOMOR_STRUK_AKTIVASI }}</td>
                    <td>
                        <div v-for="(member, id) in members" :key="id">
                            <div v-if="aktivasiTahunan.ID_MEMBER == member.ID_MEMBER">{{ member.ID_MEMBER }} - {{ member.NAMA_MEMBER }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(pegawai, id) in pegawais" :key="id">
                            <div v-if="aktivasiTahunan.ID_PEGAWAI == pegawai.ID_PEGAWAI">{{ pegawai.ID_PEGAWAI }} - {{ pegawai.NAMA_PEGAWAI }}</div>
                        </div>
                    </td>
                    <td>{{ aktivasiTahunan.TANGGAL_AKTIVASI }}</td>
                    <td>{{ aktivasiTahunan.MASA_AKTIF_MEMBER }}</td>
                    <td>Rp {{ aktivasiTahunan.JUMLAH_PEMBAYARAN }}</td>
                    <td>
                        <div v-if="aktivasiTahunan.JUMLAH_PEMBAYARAN == 3000000">
                            Rp 0
                        </div>
                        <div v-if="aktivasiTahunan.JUMLAH_PEMBAYARAN > 3000000">
                            Rp {{ aktivasiTahunan.JUMLAH_PEMBAYARAN - 3000000 }}
                        </div>
                    </td>
                    <td>
                      <!-- <button @click.prevent="aktivasiTahunanDelete(aktivasiTahunan.NOMOR_STRUK_AKTIVASI)" class="btn btn-outline-danger">DELETE</button> -->
                      <router-link :to="{ name: 'transaksiAktivasiTahunan.print', params: { id: aktivasiTahunan.NOMOR_STRUK_AKTIVASI } }" class="btn btn-outline-primary" style="margin: 5px;">PRINT</router-link>
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
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Member</h1>

        <div class="search-wrapper" style="float:right; margin:10px;">
            <input type="text" v-model="state.searchInput" placeholder="Search title.."/>
        </div>
        <table class="table table-fixed" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">ID MEMBER</th>
                    <th scope="col">NAMA MEMBER</th>
                    <th scope="col">SALDO MEMBER</th>
                    <th scope="col">AKSI</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(member, id) in displayedMembers" :key="id">
                    <td>{{ member.ID_MEMBER }}</td>
                    <td>{{ member.NAMA_MEMBER }}</td>
                    <td>{{ member.SALDO }}</td>
                    <td>
                      <router-link :to="{name: 'transaksiAktivasiTahunan.create', params: { id: member.ID_MEMBER } }"  class="btn btn-outline-info">TAMBAH TRANSAKSI AKTIVASI TAHUNAN</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
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
    let perPage = 5
    let totalPages = 0
    const state = reactive({
        searchInput: ''
    })
    //reactive state
    let aktivasiTahunans = ref([])
    let members = ref([])
    let pegawais = ref([])
    const toastr = createToaster({})
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    const akun = localStorage.getItem('akun')
    //vue router
     const router = useRouter()
    //mounted
    onMounted(() => {
    axios.get(`https://backend10610.gofit10603.site/api/transaksiAktivasiTahunans?page=${currentPage}`).then(response => {
            aktivasiTahunans.value = response.data.data.data
            totalPages = response.data.data.last_page
    });
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
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
    })
    //method delete
    function aktivasiTahunanDelete(id) {
        if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
            //delete data post by ID
            axios.delete(`https://backend10610.gofit10603.site/api/transaksiAktivasiTahunans/${id}`)
            .then(() => {
                //splice posts 
                aktivasiTahunans.value.splice(aktivasiTahunans.value.indexOf(id), 1);
                window.location.reload(true);
                toastr.success('Data berhasil dihapus!' , { position:"top-right" });
             }).catch(error => {
                 console.log(error.response.data)
             })
            } else {
                toastr.error('Data tidak jadi dihapus!', { position:"top-right" });
            }
         }
    function getData() {
        axios.get(`https://backend10610.gofit10603.site/api/transaksiAktivasiTahunans?page=${currentPage}`).then(response => {
            aktivasiTahunans.value = response.data.data.data
        });
        }
    function nextPage() {
      currentPage = currentPage + 1
      if(currentPage > totalPages){
        toastr.error('Tidak ada halaman berikutnya', { position:"top-right" });
      } else {
        getData()
      }
    }
    function prevPage() {
      currentPage = currentPage - 1
      if(currentPage == 0){
        toastr.error('Tidak ada halaman sebelumnya', { position:"top-right" });
        currentPage = currentPage + 1
      } else {
        getData()
      }
    }
        //return
        return {
            members,
            pegawais,
            aktivasiTahunans,
            aktivasiTahunanDelete,
            akun,
            getData,
            data,
            currentPage,
            perPage,
            totalPages,
            nextPage,
            prevPage,
            state
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