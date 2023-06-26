//import vue router
import { createRouter, createWebHistory } from 'vue-router'
//define a routes
const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/loginPage.vue"),
    },
    {
        path: "/",
        name: "main",
        component: () => import("@/components/DashboardMain.vue"),
    },
    {
        path: "/member/print",
        name: "member.print",
        component: () =>
        import('@/views/Member/printPage.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: "/transaksiAktivasiTahunan/print",
        name: "transaksiAktivasiTahunan.print",
        component: () =>
        import('@/views/TransaksiAktivasiTahunan/printPage.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: "/transaksiDepositUang/print",
        name: "transaksiDepositUang.print",
        component: () =>
        import('@/views/TransaksiDepositUang/printPage.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: "/transaksiDepositPaket/print",
        name: "transaksiDepositPaket.print",
        component: () =>
        import('@/views/TransaksiDepositPaket/printPage.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: "/presensiKelas/print/reguler",
        name: "presensiKelasReguler.print",
        component: () =>
        import('@/views/PresensiKelas/printPageReguler.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: "/presensiKelas/print/paket",
        name: "presensiKelasPaket.print",
        component: () =>
        import('@/views/PresensiKelas/printPagePaket.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: "/presensiGym/print",
        name: "presensiBookingGym.print",
        component: () =>
        import('@/views/PresensiGym/printPage.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: "/laporanPendapatanBulanan/print",
        name: "laporanPendapatanBulanan.print",
        component: () =>
        import('@/views/LaporanPendapatanBulanan/printPage.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: "/laporanKinerjaInstruktur/print",
        name: "laporanKinerjaInstruktur.print",
        component: () =>
        import('@/views/LaporanKinerjaInstruktur/printPage.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: "/laporanAktivitasKelas/print",
        name: "laporanAktivitasKelas.print",
        component: () =>
        import('@/views/LaporanAktivitasKelas/printPage.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: "/laporanAktivitasGym/print",
        name: "laporanAktivitasGym.print",
        component: () =>
        import('@/views/LaporanAktivitasGym/printPage.vue'),
        meta: {requiresAuth:true}
    },
    {
    path: '/berandaAdmin',
    name: 'berandaAdmin',
    component: () => import('@/components/LayoutAdmin.vue'),
        children:[
            {
                path: "/instruktur",
                name: "instruktur.index",
                component: () =>
                import('@/views/Instruktur/indexPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/instruktur/create",
                name: "instruktur.create",
                component: () =>
                import('@/views/Instruktur/createPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/instruktur/update",
                name: "instruktur.edit",
                component: () =>
                import('@/views/Instruktur/editPage.vue'),
                meta: {requiresAuth:true}
            }
        ],
    },
    {
        path: "/berandaKasir",
        name: "berandaKasir",
        component: () => import('@/components/LayoutKasir.vue'),
        children:[
            {
                path: "/member",
                name: "member.index",
                component: () =>
                import('@/views/Member/indexPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/member/create",
                name: "member.create",
                component: () =>
                import('@/views/Member/createPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/member/update",
                name: "member.edit",
                component: () =>
                import('@/views/Member/editPage.vue'),
                meta: {requiresAuth:true}
            },   
            {
                path: "/member/deactivated",
                name: "member.deactivated",
                component: () =>
                import('@/views/Member/deactivatedPage.vue'),
                meta: {requiresAuth:true}
            },   
            {
                path: "/member/resetDeposit",
                name: "member.resetDeposit",
                component: () =>
                import('@/views/Member/resetDepositPage.vue'),
                meta: {requiresAuth:true}
            },   
            {
                path: "/transaksiAktivasiTahunan",
                name: "transaksiAktivasiTahunan.index",
                component: () =>
                import('@/views/TransaksiAktivasiTahunan/indexPage.vue'),
                meta: {requiresAuth:true}
            },      
            {
                path: "/transaksiAktivasiTahunan/create",
                name: "transaksiAktivasiTahunan.create",
                component: () =>
                import('@/views/TransaksiAktivasiTahunan/createPage.vue'),
                meta: {requiresAuth:true}
            },      
            {
                path: "/transaksiDepositUang",
                name: "transaksiDepositUang.index",
                component: () =>
                import('@/views/TransaksiDepositUang/indexPage.vue'),
                meta: {requiresAuth:true}
            },      
            {
                path: "/transaksiDepositUang/create",
                name: "transaksiDepositUang.create",
                component: () =>
                import('@/views/TransaksiDepositUang/createPage.vue'),
                meta: {requiresAuth:true}
            },      
            {
                path: "/transaksiDepositPaket",
                name: "transaksiDepositPaket.index",
                component: () =>
                import('@/views/TransaksiDepositPaket/indexPage.vue'),
                meta: {requiresAuth:true}
            },      
            {
                path: "/transaksiDepositPaket/create",
                name: "transaksiDepositPaket.create",
                component: () =>
                import('@/views/TransaksiDepositPaket/createPage.vue'),
                meta: {requiresAuth:true}
            },      
            {
                path: "/presensiGym",
                name: "presensiGym.index",
                component: () =>
                import('@/views/PresensiGym/indexPage.vue'),
                meta: {requiresAuth:true}
            },      
            {
                path: "/presensiKelas",
                name: "presensiKelas.index",
                component: () =>
                import('@/views/PresensiKelas/indexPage.vue'),
                meta: {requiresAuth:true}
            },      
        ],
    },
    {
        path: "/berandaMO",
        name: "berandaMO",
        component: () => import('@/components/LayoutMO.vue'),
        children:[
            {
                path: "/jadwalUmum",
                name: "jadwalUmum.index",
                component: () =>
                import('@/views/JadwalUmum/indexPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/jadwalUmum/create",
                name: "jadwalUmum.create",
                component: () =>
                import('@/views/JadwalUmum/createPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/jadwalUmum/update",
                name: "jadwalUmum.edit",
                component: () =>
                import('@/views/JadwalUmum/editPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/jadwalHarian",
                name: "jadwalHarian.index",
                component: () =>
                import('@/views/JadwalHarian/indexPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/jadwalHarian/update",
                name: "jadwalHarian.edit",
                component: () =>
                import('@/views/JadwalHarian/editPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/izinInstruktur",
                name: "izinInstruktur.index",
                component: () =>
                import('@/views/IzinInstruktur/indexPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/presensiInstruktur",
                name: "presensiInstruktur.index",
                component: () =>
                import('@/views/PresensiInstruktur/indexPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/laporanAktivitasKelas",
                name: "laporanAktivitasKelas.index",
                component: () =>
                import('@/views/LaporanAktivitasKelas/indexPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/laporanKinerjaInstruktur",
                name: "laporanKinerjaInstruktur.index",
                component: () =>
                import('@/views/LaporanKinerjaInstruktur/indexPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/laporanPendapatanBulanan",
                name: "laporanPendapatanBulanan.index",
                component: () =>
                import('@/views/LaporanPendapatanBulanan/indexPage.vue'),
                meta: {requiresAuth:true}
            },
            {
                path: "/laporanAktivitasGym",
                name: "laporanAktivitasGym.index",
                component: () =>
                import('@/views/LaporanAktivitasGym/indexPage.vue'),
                meta: {requiresAuth:true}
            },
        ],
    }
]
//create router
const router = createRouter({
history: createWebHistory(),
routes // config routes
})

router.beforeEach((to) => {
    // instead of having to check every route record with
    // 
    let loggedIn = localStorage.getItem('loggedIn')
    let route = localStorage.getItem('route')
    if (to.meta.requiresAuth) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if(loggedIn == "false" && route == "-") {
        return {
            path: '/login',

            query: { redirect: to.fullPath },
          }
      } 
    }
  })

export default router;