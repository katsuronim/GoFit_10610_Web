<template>
    <div id="all-products">
        <h1 style="font-weight:bold; text-align: center; padding-top:25px;">Data Presensi Member Gym</h1>
        
        <table class="table table-hover" style="overflow : hidden; border-radius : 5px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
            <thead>
                <tr style="color : white; font-weight : bold; background: #060411 ">
                    <th scope="col">NOMOR STRUK BOOKING PRESENSI GYM</th>
                    <th scope="col">NAMA MEMBER</th>
                    <th scope="col">TANGGAL MELAKUKAN BOOKING</th>
                    <th scope="col">TANGGAL YANG DIBOOKING</th>
                    <th scope="col">SESI GYM YANG DIBOOKING</th>
                    <th scope="col">STATUS PRESENSI GYM</th>
                    <th scope="col">JAM PRESENSI GYM</th>
                    <th scope="col">AKSI</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(presensiGym, id) in presensiGyms" :key="id">
                    <td>{{ presensiGym.NOMOR_STRUK_BOOKING_PRESENSI_GYM }}</td>
                    <td>
                        <div v-for="(member, id) in members" :key="id">
                            <div v-if="presensiGym.ID_MEMBER == member.ID_MEMBER">{{ member.ID_MEMBER }} - {{ member.NAMA_MEMBER }}</div>
                        </div>
                    </td>
                    <td>{{ presensiGym.TANGGAL_BOOKING_GYM }}</td>
                    <td>{{ presensiGym.TANGGAL_YANG_DIBOOKING_GYM }}</td>
                    <td>{{ presensiGym.SESI_DIBOOKING }}</td>
                    <td>{{ presensiGym.STATUS_PRESENSI_GYM }}</td>
                    <td>{{ presensiGym.JAM_PRESENSI_GYM }}</td>
                    <td>
                        <div v-if="presensiGym.STATUS_PRESENSI_GYM == 'Belum Dipresensi'">
                            <button @click.prevent="hadir(presensiGym.NOMOR_STRUK_BOOKING_PRESENSI_GYM, presensiGym.ID_MEMBER, presensiGym.TANGGAL_YANG_DIBOOKING_GYM)" class="btn btn-primary" style="float:left; margin:2px;">HADIR</button>
                            <button @click.prevent="tidakHadir(presensiGym.NOMOR_STRUK_BOOKING_PRESENSI_GYM, presensiGym.ID_MEMBER, presensiGym.TANGGAL_YANG_DIBOOKING_GYM)" class="btn btn-danger" style="float:left; margin:2px;">TIDAK HADIR</button>
                        </div>
                        <div v-if="presensiGym.STATUS_PRESENSI_GYM != 'Belum Dipresensi'">
                            <router-link :to="{ name: 'presensiBookingGym.print', params: { id: presensiGym.NOMOR_STRUK_BOOKING_PRESENSI_GYM } }" class="btn btn-outline-primary" style="margin: 5px;">CETAK STRUK</router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
import { reactive, onMounted, ref } from 'vue'
// import { useRouter } from 'vue-router'
import { createToaster } from "@meforma/vue-toaster"
export default {
    setup() {
    //reactive state
    let members = ref([])
    let presensiGyms = ref([])
    let filter = 'All'
    const toastr = createToaster({})
    const state = reactive({
        searchInput: ''
    })
    //vue router
    // const router = useRouter()
    //mounted
    onMounted(() => {
    //get API from Laravel Backend
    axios.get('https://backend10610.gofit10603.site/api/members')
    .then(response => {
    //assign state posts with response data
    members.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    axios.get('https://backend10610.gofit10603.site/api/bookingPresensiGyms')
    .then(response => {
    //assign state posts with response data
    presensiGyms.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    })
    function hadir(id, nama, tanggal) {
        if (window.confirm('Apakah anda yakin ingin mempresensi nomor struk ' + id + ' dengan member ' + nama + ' untuk tanggal booking gym ' + tanggal + ' menjadi HADIR?')) {
         //delete data post by ID
         axios.post(`https://backend10610.gofit10603.site/api/bookingPresensiGyms/hadir/${id}`)
        .then(() => {
                toastr.success('Data Member Berhasil Dipresensi' , { position:"top-right" });
                window.location.reload(true);
            }).catch(error => {
                console.log(error.response.data)
            })
        } else {
            toastr.error('Data tidak jadi dipresensi!', { position:"top-right" });
        } 
    }
    function tidakHadir(id, nama, tanggal) {
        if (window.confirm('Apakah anda yakin ingin mempresensi nomor struk ' + id + ' dengan member ' + nama + ' untuk tanggal booking gym ' + tanggal + ' menjadi TIDAK HADIR?')) {
         //delete data post by ID
         axios.post(`https://backend10610.gofit10603.site/api/bookingPresensiGyms/tidakHadir/${id}`)
        .then(() => {
                toastr.success('Data Member Berhasil Dipresensi' , { position:"top-right" });
                window.location.reload(true);
            }).catch(error => {
                console.log(error.response.data)
            })
        } else {
            toastr.error('Data tidak jadi dipresensi!', { position:"top-right" });
        } 
    }
        //return
        return {
            presensiGyms,
            members,
            hadir,
            tidakHadir,
            filter,
            state
        }
    }
}
</script>
<style>
</style>