<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Transaksi Deposit Uang</h1>

        <table class="table table-hover" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">NOMOR STRUK DEPOSIT UANG</th>
                    <th scope="col">NAMA MEMBER</th>
                    <th scope="col">NAMA PEGAWAI</th>
                    <th scope="col">ID PROMO</th>
                    <th scope="col">TANGGAL DEPOSIT UANG</th>
                    <th scope="col">DEPOSIT UANG</th>
                    <th scope="col">BONUS DEPOSIT UANG</th>
                    <th scope="col">TOTAL DEPOSIT UANG</th>
                    <th scope="col">AKSI</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(depositUang, id) in depositUangs" :key="id">
                    <td>{{ depositUang.NOMOR_STRUK_DEPOSIT_UANG }}</td>
                    <td>
                        <div v-for="(member, id) in members" :key="id">
                            <div v-if="depositUang.ID_MEMBER == member.ID_MEMBER">{{ member.ID_MEMBER }} - {{ member.NAMA_MEMBER }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(pegawai, id) in pegawais" :key="id">
                            <div v-if="depositUang.ID_PEGAWAI == pegawai.ID_PEGAWAI">{{ pegawai.ID_PEGAWAI }} - {{ pegawai.NAMA_PEGAWAI }}</div>
                        </div>
                    </td>
                    <td>
                        <div v-for="(promo, id) in promos" :key="id">
                            <div v-if="depositUang.ID_PROMO == promo.ID_PROMO">{{ promo.ID_PROMO }} - {{ promo.JENIS_PROMO }}</div>
                        </div>
                    </td>
                    <td>{{ depositUang.TANGGAL_DEPOSIT_UANG }}</td>
                    <td>{{ depositUang.DEPOSIT_UANG }}</td>
                    <td>{{ depositUang.BONUS_DEPOSIT_UANG }}</td>
                    <td>{{ depositUang.TOTAL_DEPOSIT_UANG }}</td>
                    <td>
                      <button @click.prevent="depositUangDelete(depositUang.NOMOR_STRUK_DEPOSIT_UANG)" class="btn btn-outline-danger">DELETE</button>
                      <router-link :to="{ name: 'transaksiDepositUang.print', params: { id: depositUang.NOMOR_STRUK_DEPOSIT_UANG } }" class="btn btn-outline-primary" style="margin: 5px;">PRINT</router-link>
                    </td>
                </tr>
            </tbody>
        </table>

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
                      <router-link :to="{name: 'transaksiDepositUang.create', params: { id: member.ID_MEMBER } }"  class="btn btn-outline-info">TAMBAH TRANSAKSI DEPOSIT UANG</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
import { createToaster } from "@meforma/vue-toaster"
import { useRouter } from 'vue-router'
export default {
    setup() {
    //reactive state
    let depositUangs = ref([])
    let members = ref([])
    let pegawais = ref([])
    let promos = ref([])
    const toastr = createToaster({})
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    const akun = localStorage.getItem('akun')
    const state = reactive({
        searchInput: ''
    })

    //vue router
     const router = useRouter()
    //mounted
    onMounted(() => {
    if (loggedIn == "true" && route == "Admin"){
        router.push({
            name: 'instruktur.index'
            })
    }
    //get API from Laravel Backend
    axios.get('https://backend10610.gofit10603.site/api/transaksiDepositUangs')
    .then(response => {
    //assign state posts with response data
    depositUangs.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
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
    axios.get('https://backend10610.gofit10603.site/api/promos')
    .then(response => {
    //assign state posts with response data
    promos.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    
    //method delete
    function depositUangDelete(id) {
            if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
            //delete data post by ID
            axios.delete(`https://backend10610.gofit10603.site/api/transaksiDepositUangs/${id}`)
            .then(() => {
                //splice posts 
                depositUangs.value.splice(depositUangs.value.indexOf(id), 1);
                window.location.reload(true);
                toastr.success('Data berhasil dihapus!' , { position:"top-right" });
             }).catch(error => {
                 console.log(error.response.data)
             })
            } else {
                toastr.error('Data tidak jadi dihapus!', { position:"top-right" });
            }
         }
        //return
        return {
            members,
            state,
            pegawais,
            promos,
            depositUangs,
            akun,
            depositUangDelete
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