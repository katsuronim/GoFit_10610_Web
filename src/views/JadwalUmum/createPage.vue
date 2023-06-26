<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH JADWAL UMUM</h4>
                        <hr>
                        <form @submit.prevent="store()">
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Hari Jadwal Umum</label>
                            <select class="form-control" v-model="jadwalUmum.hari_jadwal_umum">
                                <option disabled value="">Please select one</option>
                                <option :value="'Senin'"> Senin </option>
                                <option :value="'Selasa'"> Selasa </option>
                                <option :value="'Rabu'"> Rabu </option>
                                <option :value="'Kamis'"> Kamis </option>
                                <option :value="'Jumat'"> Jumat </option>
                                <option :value="'Sabtu'"> Sabtu </option>
                                <option :value="'Minggu'"> Minggu </option>
                            </select>
                            
                            <div v-if="validation.hari_jadwal_umum" class="mt-2 alert alert-danger">
                                {{ validation.hari_jadwal_umum[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label" style="float:left">Nama Kelas</label>
                            <select class="form-control" v-model="jadwalUmum.id_kelas">
                                <option disabled value="">Please select one</option>
                                <option v-for="(kelas,id) in kelass" :value="kelas.ID_KELAS" :key="id">
                                    {{ kelas.NAMA_KELAS }}
                                </option>
                            </select>
                            <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                {{ validation.id_kelas[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Nama Instruktur</label>
                            <select class="form-control" v-model="jadwalUmum.id_instruktur">
                                <option disabled value="">Please select one</option>
                                <option v-for="(instruktur,id) in instrukturs" :value="instruktur.ID_INSTRUKTUR" :key="id">
                                    {{ instruktur.NAMA_INSTRUKTUR }}
                                </option>
                            </select>
                            <div v-if="validation.id_instruktur" class="mt-2 alert alert-danger">
                                {{ validation.id_instruktur[0] }}
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label" style="float:left">Jam Jadwal Umum (HH:MM:SS)</label>
                            <input type="text" class="form-control" v-model="jadwalUmum.jam_jadwal_umum" placeholder="Masukkan Jam Jadwal Umum">
                            <div v-if="validation.jam_jadwal_umum" class="mt-2 alert alert-danger">
                            {{
                            validation.jam_jadwal_umum[0] }}
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" style="float:left">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createToaster } from "@meforma/vue-toaster"
import axios from 'axios'
export default {
    setup() {
    //state jadwalUmum
    const jadwalUmum = reactive({
    hari_jadwal_umum: '',
    id_kelas: '',
    id_instruktur: '',
    jam_jadwal_umum: ''
    })
    //state validation
    const validation = ref([])
    const instrukturs = ref([])
    const kelass = ref([])
    const toastr = createToaster({})
    //vue router
    const router = useRouter()
    let isValidFormat = true

    onMounted(() => {
    axios.get('https://backend10610.gofit10603.site/api/instrukturs')
    .then(response => {
    //assign state posts with response data
    instrukturs.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    axios.get('https://backend10610.gofit10603.site/api/kelas')
    .then(response => {
    //assign state posts with response data
    kelass.value = response.data.data
        }).catch(error => {
        console.log(error.response.data)
        })
    })
    //method store
    function store() {
        //const regex = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
        const regex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;
        isValidFormat = regex.test(jadwalUmum.jam_jadwal_umum);
        if(isValidFormat == false){
            toastr.error('Input waktu harus sesuai dengan format HH:MM:SS' , { position:"top-right" });
        } else {
            let nama_kelas = ''
            let nama_instruktur = ''
            axios.get(`https://backend10610.gofit10603.site/api/kelas/${jadwalUmum.id_kelas}`)
            .then(response => {
            //assign state posts with response data
            nama_kelas = response.data.data.NAMA_KELAS
            axios.get(`https://backend10610.gofit10603.site/api/instrukturs/${jadwalUmum.id_instruktur}`)
            .then(response => {
                //assign state posts with response data
                nama_instruktur = response.data.data.NAMA_INSTRUKTUR
                if (window.confirm('Apakah anda yakin ingin membuat jadwal pada hari ' + jadwalUmum.hari_jadwal_umum + ' untuk kelas ' + nama_kelas +
                    ' dengan instruktur ' + nama_instruktur + ' pada pukul ' + jadwalUmum.jam_jadwal_umum + '?')) {
                        let hari_jadwal_umum = jadwalUmum.hari_jadwal_umum
                        let id_kelas = jadwalUmum.id_kelas
                        let id_instruktur = jadwalUmum.id_instruktur
                        let jam_jadwal_umum = jadwalUmum.jam_jadwal_umum
                        axios.post('https://backend10610.gofit10603.site/api/jadwalUmums', {
                        hari_jadwal_umum: hari_jadwal_umum,
                        id_kelas: id_kelas,
                        id_instruktur: id_instruktur,
                        jam_jadwal_umum: jam_jadwal_umum
                        }).then(() => {
                        //redirect ke post index
                            router.push({
                            name: 'jadwalUmum.index'
                            })
                            toastr.success('Data berhasil ditambahkan!' , { position:"top-right" });
                        }).catch(error => {
                            //assign state validation with error
                            validation.value = error.response.data
                        })
                    }
                })
            })
        }
    }
        //return
        return {
            jadwalUmum,
            instrukturs,
            kelass,
            validation,
            router,
            store
        }
    },
  methods: {
        formatTime() {
        const regex = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
        this.isValidFormat = regex.test(this.time);
        }
    }
}
</script>
<style>
</style>
