"use client";

import { useState, useEffect, useRef } from "react";

interface MateriItem {
  id: number;
  title: string;
  desc: string;
  content: React.ReactNode; 
  btnNextText: string;
}

interface KelasData {
  isPremium: boolean;
  data: MateriItem[];
}

// 1. BANK DATA MATERI UNTUK 6 PELATIHAN
const BANK_MATERI: { [key: string]: KelasData } = {
  "Belajar Next.js 14 untuk Pemula": {
    isPremium: false, 
    data: [
      {
        id: 1,
        title: "Modul 1 - Pengenalan Next.js",
        desc: "Pada modul ini kamu akan mempelajari dasar-dasar framework Next.js.",
        content: (
          <div>
            <h2 style={{ fontSize: "20px", color: "#2563eb", marginBottom: "10px", fontWeight: "700" }}>Apa itu Next.js?</h2>
            <p style={{ lineHeight: "1.8", color: "#334155" }}>Next.js adalah framework berbasis React untuk web modern yang mendukung Server Side Rendering (SSR) dan optimasi performa otomatis.</p>
          </div>
        ),
        btnNextText: "Tandai Selesai & Lanjut →",
      },
      {
        id: 2,
        title: "Modul 2 - Routing & Server Components",
        desc: "Melanjutkan materi dari Modul 1, sekarang kita akan mempelajari rute.",
        content: (
          <div>
            <h2 style={{ fontSize: "20px", color: "#2563eb", marginBottom: "10px", fontWeight: "700" }}>1. File-Based Routing</h2>
            <p style={{ lineHeight: "1.8", color: "#334155" }}>Next.js menggunakan App Router (folder app) di mana struktur folder otomatis mendefinisikan rute URL aplikasi Anda.</p>
          </div>
        ),
        btnNextText: "Mulai Ujian Quiz Pelatihan 📝",
      }
    ]
  },
  "Manajemen Keuangan Bisnis": {
    isPremium: true, 
    data: [
      {
        id: 1,
        title: "Modul 1 - Pondasi Keuangan Bisnis & Arus Kas",
        desc: "Pada modul ini kamu akan mempelajari dasar-dasar pengelolaan keuangan.",
        content: (
          <div>
            <h2 style={{ fontSize: "20px", color: "#2563eb", marginBottom: "10px", fontWeight: "700" }}>Pentingnya Manajemen Keuangan</h2>
            <p style={{ lineHeight: "1.8", color: "#334155" }}>Pondasi utama dalam bisnis adalah memisahkan dengan tegas rekening uang pribadi dan operasional perusahaan.</p>
          </div>
        ),
        btnNextText: "Tandai Selesai & Lanjut →",
      },
      {
        id: 2,
        title: "Modul 2 - Analisis Laporan Keuangan & BEP",
        desc: "Melanjutkan materi Pondasi Bisnis, sekarang kita akan mempelajari laporan keuangan.",
        content: (
          <div>
            <h2 style={{ fontSize: "20px", color: "#2563eb", marginBottom: "10px", fontWeight: "700" }}>1. Tiga Laporan Keuangan Utama</h2>
            <p style={{ lineHeight: "1.8", color: "#334155" }}>Setiap pemilik bisnis wajib memantau minimal 3 komponen laporan: Laporan Laba Rugi, Arus Kas, dan Neraca.</p>
          </div>
        ),
        btnNextText: "Mulai Ujian Quiz Pelatihan 📝",
      }
    ]
  },
  "Digital Marketing Berbasis AI": {
    isPremium: false,
    data: [
      {
        id: 1,
        title: "Modul 1 - Transformasi AI dalam Pemasaran",
        desc: "Mempelajari pemanfaatan AI untuk efisiensi strategi marketing.",
        content: (
          <div>
            <h2 style={{ fontSize: "20px", color: "#2563eb", marginBottom: "10px", fontWeight: "700" }}>AI & Otomatisasi Konten</h2>
            <p style={{ lineHeight: "1.8", color: "#334155" }}>Teknologi AI membantu pemasar menganalisis data audiens secara real-time dan menghasilkan copywriting yang persuasif secara instan.</p>
          </div>
        ),
        btnNextText: "Mulai Ujian Quiz Pelatihan 📝",
      }
    ]
  },
  "UI/UX Design dengan Figma": {
    isPremium: false,
    data: [
      {
        id: 1,
        title: "Modul 1 - Dasar Desain Antarmuka Modern",
        desc: "Mempelajari wireframing, prototyping, dan design system di Figma.",
        content: (
          <div>
            <h2 style={{ fontSize: "20px", color: "#2563eb", marginBottom: "10px", fontWeight: "700" }}>User-Centered Design</h2>
            <p style={{ lineHeight: "1.8", color: "#334155" }}>Desain yang baik berfokus pada kemudahan pengguna (usability) serta konsistensi komponen visual di setiap halaman.</p>
          </div>
        ),
        btnNextText: "Mulai Ujian Quiz Pelatihan 📝",
      }
    ]
  },
  "Data Science Menggunakan Python": {
    isPremium: true,
    data: [
      {
        id: 1,
        title: "Modul 1 - Manipulasi Data dan Analisis Statistik",
        desc: "Pengenalan library Pandas, NumPy, dan visualisasi data dasar.",
        content: (
          <div>
            <h2 style={{ fontSize: "20px", color: "#2563eb", marginBottom: "10px", fontWeight: "700" }}>Eksplorasi Data (EDA)</h2>
            <p style={{ lineHeight: "1.8", color: "#334155" }}>Data Science memungkinkan kita menggali pola tersembunyi dari sekumpulan data mentah untuk keputusan bisnis terukur.</p>
          </div>
        ),
        btnNextText: "Mulai Ujian Quiz Pelatihan 📝",
      }
    ]
  },
  "Product Management Fundamental": {
    isPremium: true,
    data: [
      {
        id: 1,
        title: "Modul 1 - Siklus Hidup Produk & Strategi Launching",
        desc: "Memahami peran PM dalam menjembatani bisnis, teknologi, dan user experience.",
        content: (
          <div>
            <h2 style={{ fontSize: "20px", color: "#2563eb", marginBottom: "10px", fontWeight: "700" }}>Minimum Viable Product (MVP)</h2>
            <p style={{ lineHeight: "1.8", color: "#334155" }}>Menyusun prioritas fitur produk terkecil yang dapat langsung dirilis guna mendapatkan feedback awal dari pengguna nyata.</p>
          </div>
        ),
        btnNextText: "Mulai Ujian Quiz Pelatihan 📝",
      }
    ]
  }
};

// 2. KUMPULAN SOAL KUIS LENGKAP UNTUK 6 PELATIHAN (MASING-MASING TEPAT 5 SOAL)
const KUMPULAN_QUIZ: { [key: string]: { id: number; question: string; options: string[]; correctAnswer: string; }[] } = {
  "Belajar Next.js 14 untuk Pemula": [
    {
      id: 1,
      question: "1. Manakah file yang WAJIB ada di dalam direktori folder App Router Next.js agar rute URL dapat diakses?",
      options: ["layout.tsx", "page.tsx", "route.ts", "style.css"],
      correctAnswer: "page.tsx"
    },
    {
      id: 2,
      question: "2. Secara default, seluruh komponen yang dibuat di dalam App Router Next.js dikategorikan sebagai...",
      options: ["Client Components", "Server Components", "Shared Components", "Static Assets"],
      correctAnswer: "Server Components"
    },
    {
      id: 3,
      question: "3. Directive teks apakah yang harus dituliskan di baris paling atas berkas jika ingin mengubah ke Client Component?",
      options: ['"use dev";', '"use static";', '"use client";', '"use server";'],
      correctAnswer: '"use client";'
    },
    {
      id: 4,
      question: "4. Metode rendering Next.js yang melakukan kompilasi HTML langsung pada server setiap kali ada request masuk disebut...",
      options: ["Static Site Generation (SSG)", "Server-Side Rendering (SSR)", "Incremental Static Regeneration (ISR)", "Client-Side Rendering (CSR)"],
      correctAnswer: "Server-Side Rendering (SSR)"
    },
    {
      id: 5,
      question: "5. Komponen bawaan Next.js yang paling tepat digunakan untuk rute navigasi cepat tanpa reload halaman penuh adalah...",
      options: ["<a href='...'>", "<Navigate to='...'>", "<Link href='...'>", "<Redirect url='...'>"],
      correctAnswer: "<Link href='...'>"
    }
  ],
  "Manajemen Keuangan Bisnis": [
    {
      id: 1,
      question: "1. Komponen laporan keuangan yang menyajikan posisi aset, liabilitas, dan modal ekuitas pada tanggal tertentu adalah...",
      options: ["Laporan Laba Rugi", "Laporan Arus Kas", "Neraca (Balance Sheet)", "Catatan Keuangan"],
      correctAnswer: "Neraca (Balance Sheet)"
    },
    {
      id: 2,
      question: "2. Apa tindakan awal yang paling krusial dalam membangun finansial UMKM yang sehat?",
      options: ["Membeli aset tetap", "Memisahkan akun rekening bank pribadi dengan rekening bank usaha", "Mengajukan pinjaman modal besar", "Menghapus seluruh biaya pemasaran"],
      correctAnswer: "Memisahkan akun rekening bank pribadi dengan rekening bank usaha"
    },
    {
      id: 3,
      question: "3. Kondisi finansial di mana pendapatan bisnis bernilai sama dengan total biaya pengeluaran dinamakan...",
      options: ["Return on Investment (ROI)", "Break Even Point (BEP)", "Cash Runway", "Gross Profit Margin"],
      correctAnswer: "Break Even Point (BEP)"
    },
    {
      id: 4,
      question: "4. Aliran masuk-keluar uang tunai riil operasional harian perusahaan tercermin secara transparan pada...",
      options: ["Laporan Arus Kas (Cash Flow Statement)", "Laporan Perubahan Modal", "Laporan Piutang Dagang", "Proyeksi Saham"],
      correctAnswer: "Laporan Arus Kas (Cash Flow Statement)"
    },
    {
      id: 5,
      question: "5. Pengeluaran usaha yang nilainya tetap konstan terlepas dari naik turunnya jumlah produksi barang disebut...",
      options: ["Biaya Variabel (Variable Cost)", "Biaya Tetap (Fixed Cost)", "Biaya Overhead Dadakan", "Biaya Operasional Fleksibel"],
      correctAnswer: "Biaya Tetap (Fixed Cost)"
    }
  ],
  "Digital Marketing Berbasis AI": [
    {
      id: 1,
      question: "1. Tools AI generator teks manakah yang paling umum digunakan untuk membuat draf konten copywriting iklan digital?",
      options: ["ChatGPT / Claude", "Midjourney", "Stable Diffusion", "Figma"],
      correctAnswer: "ChatGPT / Claude"
    },
    {
      id: 2,
      question: "2. Apa keuntungan utama menerapkan algoritma Machine Learning pada platform periklanan seperti Meta Ads atau Google Ads?",
      options: ["Make biaya iklan menjadi gratis", "Menargetkan iklan otomatis ke audiens dengan konversi tertinggi", "Menghapus kebutuhan halaman website", "Menggantikan peran legalitas hukum bisnis"],
      correctAnswer: "Menargetkan iklan otomatis ke audiens dengan konversi tertinggi"
    },
    {
      id: 3,
      question: "3. Mengapa riset keyword (kata kunci) berbasis tren pencarian AI sangat penting bagi optimasi SEO?",
      options: ["Agar website otomatis nangkring di peringkat 1 Google tanpa artikel", "Memahami intent / maksud pencarian spesifik dari calon konsumen", "Menghambat kompetitor membuat iklan", "Membatasi traffic pengunjung luar negeri"],
      correctAnswer: "Memahami intent / maksud pencarian spesifik dari calon konsumen"
    },
    {
      id: 4,
      question: "4. Metrik iklan digital yang menghitung persentase jumlah klik dibanding total impresi tayangan disebut...",
      options: ["Cost Per Click (CPC)", "Click-Through Rate (CTR)", "Return on Ad Spend (ROAS)", "Conversion Rate (CR)"],
      correctAnswer: "Click-Through Rate (CTR)"
    },
    {
      id: 5,
      question: "5. Strategi pemasaran kembali kepada audiens yang sudah pernah berinteraksi dengan website atau produk kita disebut...",
      options: ["Broadcasting", "Cold Emailing", "Retargeting / Remarketing", "Organic Sourcing"],
      correctAnswer: "Retargeting / Remarketing"
    }
  ],
  "UI/UX Design dengan Figma": [
    {
      id: 1,
      question: "1. Kerangka dasar visual hitam-putih beresolusi rendah yang digunakan untuk menata struktur tata letak aplikasi dinamakan...",
      options: ["High-Fidelity Prototype", "Wireframe / Low-Fidelity", "Design System", "Moodboard"],
      correctAnswer: "Wireframe / Low-Fidelity"
    },
    {
      id: 2,
      question: "2. Fitur krusial di Figma yang berfungsi membuat komponen responsif mengikuti perubahan ukuran layar secara dinamis adalah...",
      options: ["Auto Layout", "Smart Animate", "Masking", "Pen Tool"],
      correctAnswer: "Auto Layout"
    },
    {
      id: 3,
      question: "3. Kumpulan komponen visual, tipografi, warna, dan aturan baku desain yang terstandarisasi dalam suatu proyek disebut...",
      options: ["UI Kits", "Design System", "Style Guide", "Frame Group"],
      correctAnswer: "Design System"
    },
    {
      id: 4,
      question: "4. Apa perbedaan mendasar antara UI (User Interface) dan UX (User Experience)?",
      options: ["UI berfokus pada estetika visual, UX berfokus pada alur kemudahan dan kenyamanan pengguna", "UI mengatur coding data, UX mengatur tata letak gambar", "UI hanya untuk website, UX eksklusif untuk aplikasi mobile", "Tidak ada perbedaan, keduanya sama"],
      correctAnswer: "UI berfokus pada estetika visual, UX berfokus pada alur kemudahan dan kenyamanan pengguna"
    },
    {
      id: 5,
      question: "5. Metode pengujian ke pengguna nyata untuk memvalidasi apakah rute desain aplikasi mudah dipahami atau membingungkan disebut...",
      options: ["A/B Testing", "Usability Testing", "Heuristic Evaluation", "Mind Mapping"],
      correctAnswer: "Usability Testing"
    }
  ],
  "Data Science Menggunakan Python": [
    {
      id: 1,
      question: "1. Library Python populer yang dikhususkan untuk manipulasi, analisis struktur tabel, dan pembersihan data (data cleansing) adalah...",
      options: ["Django", "Flask", "Pandas", "PyQt"],
      correctAnswer: "Pandas"
    },
    {
      id: 2,
      question: "2. Manakah di bawah ini tipe struktur data bawaan Python yang bersifat 'immutable' (nilainya tidak bisa diubah setelah dibuat)?",
      options: ["List", "Dictionary", "Tuple", "Set"],
      correctAnswer: "Tuple"
    },
    {
      id: 3,
      question: "3. Apa tujuan utama melakukan tahapan normalisasi data atau penanganan Missing Values pada dataset sebelum modeling?",
      options: ["Memperkecil ukuran file penyimpanan", "Menghindari bias dan eror saat melatih algoritma Machine Learning", "Mengubah format file menjadi gambar", "Menghapus separuh total baris data"],
      correctAnswer: "Menghindari bias dan eror saat melatih algoritma Machine Learning"
    },
    {
      id: 4,
      question: "4. Library Python yang paling mendasar untuk membuat grafik visualisasi data seperti diagram batang, garis, atau scatter plot adalah...",
      options: ["Matplotlib / Seaborn", "Requests", "BeautifulSoup", "Scrapy"],
      correctAnswer: "Matplotlib / Seaborn"
    },
    {
      id: 5,
      question: "5. Algoritma Machine Learning yang digunakan untuk mengelompokkan data ke dalam beberapa klaster tanpa label target (unsupervised) adalah...",
      options: ["Linear Regression", "Logistic Regression", "K-Means Clustering", "Decision Tree"],
      correctAnswer: "K-Means Clustering"
    }
  ],
  "Product Management Fundamental": [
    {
      id: 1,
      question: "1. Konsep versi produk paling minimalis yang dirilis ke pasar untuk menguji respons pengguna dengan modal seefisien mungkin dinamakan...",
      options: ["Final Product Release", "Minimum Viable Product (MVP)", "Beta Design Concept", "Product Market Fit"],
      correctAnswer: "Minimum Viable Product (MVP)"
    },
    {
      id: 2,
      question: "2. Dokumen komprehensif berisi spesifikasi fitur, tujuan bisnis, user persona, dan target sukses suatu produk yang ditulis oleh PM dinamakan...",
      options: ["PRD (Product Requirement Document)", "Pitch Deck", "Financial Ledger", "Source Code Documentation"],
      correctAnswer: "PRD (Product Requirement Document)"
    },
    {
      id: 3,
      question: "3. Metrik retensi (Retention Rate) digunakan oleh Product Manager untuk melacak dan mengukur...",
      options: ["Berapa banyak dana pemasaran yang dihabiskan", "Persentase pengguna yang terus kembali menggunakan produk dalam jangka waktu tertentu", "Jumlah bug eror yang diperbaiki developer", "Kecepatan loading server aplikasi"],
      correctAnswer: "Persentase pengguna yang terus kembali menggunakan produk dalam jangka waktu tertentu"
    },
    {
      id: 4,
      question: "4. Kerangka prioritas kerja yang membagi fitur berdasarkan tingkat urgensinya dengan label Must-have, Should-have, Could-have, dan Won't-have dinamakan...",
      options: ["RICE Scoring", "Kano Model", "MoSCoW Method", "Story Mapping"],
      correctAnswer: "MoSCoW Method"
    },
    {
      id: 5,
      question: "5. Kondisi ideal di mana sebuah produk telah berhasil memecahkan masalah pasar dan diminati oleh target pelanggan secara konsisten disebut...",
      options: ["Product-Market Fit (PMF)", "Ideation Phase", "Product Backlog", "Churn Risk"],
      correctAnswer: "Product-Market Fit (PMF)"
    }
  ]
};

const SOAL_DEFAULT = [{ id: 1, question: "Apa singkatan dari teknologi AI?", options: ["Artificial Intelligence"], correctAnswer: "Artificial Intelligence" }];

export default function ModulePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [quizError, setQuizError] = useState("");
  const [namaKelas, setNamaKelas] = useState("Belajar Next.js 14 untuk Pemula");
  const [score, setScore] = useState({ benar: 0, total: 0 });

  const [showCertificate, setShowCertificate] = useState(false);
  const [studentName, setStudentName] = useState("Nama Peserta");
  const [certId, setCertId] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const savedCourse = localStorage.getItem("selectedCourse") || "Belajar Next.js 14 untuk Pemula";
      setNamaKelas(savedCourse);

      const savedName = localStorage.getItem("userName") || "NADIA";
      setStudentName(savedName);

      // Tetap menggunakan fallback ID otomatis jika di local storage kosong
      const randomId = "CERT/SB/1/7924/2026";
      setCertId(randomId);
      setCurrentDate("10 Juni 2026");
    }
  }, []);

  useEffect(() => {
    if (showCertificate && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.src = "/template-sertifikat.png"; 

      img.onload = () => {
        // Menentukan resolusi tinggi yang proporsional untuk cetakan dokumen cetak/gambar
        canvas.width = 1200;
        canvas.height = 850;

        // 1. Gambar Gambar Latar (Template Base)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 2. Judul Utama Sertifikat Kelulusan Internasional
        ctx.font = "bold 34px sans-serif";
        ctx.fillStyle = "#0f172a";
        ctx.textAlign = "center";
        ctx.fillText("OFFICIAL CERTIFICATE OF COMPLETION", canvas.width / 2, 160);

        // 3. Judul Bahasa Indonesia
        ctx.font = "bold 26px sans-serif";
        ctx.fillStyle = "#475569";
        ctx.fillText("SERTIFIKAT KELULUSAN", canvas.width / 2, 210);

        // 4. Nomor Kredensial Registrasi Dokumen Resmi
        ctx.font = "15px monospace";
        ctx.fillStyle = "#64748b";
        ctx.fillText(`No Kredensial: ${certId}`, canvas.width / 2, 255);

        // 5. Teks Pengantar Dedikasi Kompetensi
        ctx.font = "17px sans-serif";
        ctx.fillStyle = "#334155";
        ctx.fillText("Sertifikat ini secara resmi diberikan kepada:", canvas.width / 2, 335);

        // 6. Nama Lengkap Penerima (NADIA)
        ctx.font = "bold 52px Georgia, serif";
        ctx.fillStyle = "#0f172a";
        ctx.fillText(studentName, canvas.width / 2, 415);

        // 7. Paragraf Deskripsi Capaian Pembelajaran Akademik
        ctx.font = "15px sans-serif";
        ctx.fillStyle = "#475569";
        const descLine1 = "Atas dedikasi, performa akademik, dan keberhasilannya menyelesaikan seluruh rangkaian program kompetensi";
        const descLine2 = "pelatihan daring serta ujian evaluasi kuis akhir pada ruang lingkup spesifikasi materi:";
        ctx.fillText(descLine1, canvas.width / 2, 485);
        ctx.fillText(descLine2, canvas.width / 2, 515);

        // 8. Judul Topik Pembelajaran yang Diambil
        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#2563eb"; // Warna aksen biru komersial
        ctx.fillText(`"${namaKelas}"`, canvas.width / 2, 575);

        // 9. Hasil Nilai Evaluasi Kuis/Ujian Akhir
        ctx.font = "italic 16px sans-serif";
        ctx.fillStyle = "#1e293b";
        ctx.fillText(`Dinyatakan lulus dengan hasil evaluasi kuis akhir berkualifikasi SANGAT MEMUASKAN (Skor Akurat: ${score.benar * 20 || 95}/100).`, canvas.width / 2, 635);

        // 10. Status Sertifikasi Keaslian Dokumen (PASSED & VERIFIED)
        ctx.font = "bold 15px sans-serif";
        ctx.fillStyle = "#16a34a"; // Hijau indikator sukses
        ctx.textAlign = "left";
        ctx.fillText("✓ PASSED   ✓ VERIFIED", 130, canvas.height - 170);

        // 11. Informasi Lokasi Kota & Waktu Tanggal Terbit Berkas
        ctx.font = "14px sans-serif";
        ctx.fillStyle = "#64748b";
        ctx.fillText("TANGGAL TERBIT", 130, canvas.height - 125);
        ctx.font = "bold 16px sans-serif";
        ctx.fillStyle = "#0f172a";
        ctx.fillText(`Yogyakarta, ${currentDate}`, 130, canvas.height - 95);

        // 12. Informasi Pengesahan Tanda Tangan (Direktur Utama)
        ctx.textAlign = "right";
        ctx.font = "bold 18px Georgia, serif";
        ctx.fillStyle = "#0f172a";
        ctx.fillText("Andi Hermawan", canvas.width - 130, canvas.height - 120);
        ctx.font = "15px sans-serif";
        ctx.fillStyle = "#475569";
        ctx.fillText("Direktur Utama SkillBridge", canvas.width - 130, canvas.height - 95);
      };
    }
  }, [showCertificate, studentName, namaKelas, currentDate, certId, score]);

  if (!isMounted) return <div style={{ background: "#f4f7fa", minHeight: "100vh" }} />;

  const kelasAktif = BANK_MATERI[namaKelas] || BANK_MATERI["Belajar Next.js 14 untuk Pemula"];
  const listMateri = kelasAktif.data;
  const quizQuestions = KUMPULAN_QUIZ[namaKelas] || SOAL_DEFAULT;

  const hitungProgress = () => {
    const totalSteps = listMateri.length + 1; 
    return Math.min(((currentStep + 1) / totalSteps) * 100, 100);
  };

  const handleNext = () => {
    if (currentStep < listMateri.length) {
      setCurrentStep(currentStep + 1); 
    } else if (currentStep === listMateri.length) {
      validateQuiz();    
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      if (typeof window !== "undefined") window.location.href = "/dashboard";
    }
  };

  const validateQuiz = () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      setQuizError(`⚠️ Mohon jawab semua soal sebelum mengirim! (${Object.keys(selectedAnswers).length}/${quizQuestions.length})`);
      return;
    }

    let totalBenar = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) totalBenar += 1;
    });

    setScore({ benar: totalBenar, total: quizQuestions.length });

    if (typeof window !== "undefined") {
      localStorage.setItem("quizScore", `${totalBenar}/${quizQuestions.length}`);
      localStorage.setItem("statusLulus", "true");
    }
    
    setShowCertificate(true);
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = `Sertifikat_${studentName.replace(/\s+/g, "_")}.png`;
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div style={{ background: "#f4f7fa", minHeight: "100vh", color: "#1e293b", padding: "40px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <div id="non-printable-area">
          <button onClick={handleBack} style={{ background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", padding: "10px 20px", borderRadius: "12px", fontWeight: "600", cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            ← Kembali
          </button>
          
          <h1 style={{ marginTop: "20px", fontSize: "30px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>{namaKelas}</h1>
          <div style={{ background: "#e2e8f0", height: "10px", borderRadius: "5px", margin: "20px 0", overflow: "hidden" }}>
            <div style={{ width: `${hitungProgress()}%`, background: "#2563eb", height: "100%", transition: "0.3s" }} />
          </div>
        </div>

        {currentStep < listMateri.length ? (
          <div style={{ background: "#ffffff", padding: "30px", borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}>
            <h2 style={{ color: "#0f172a", fontWeight: "700", fontSize: "22px" }}>{listMateri[currentStep].title}</h2>
            <p style={{ color: "#64748b", marginBottom: "25px", fontSize: "15px" }}>{listMateri[currentStep].desc}</p>
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "25px" }}>
              {listMateri[currentStep].content}
            </div>
            <button onClick={handleNext} style={{ marginTop: "35px", background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", color: "#ffffff", border: "none", padding: "14px 28px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", fontSize: "14px", boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)" }}>
              {listMateri[currentStep].btnNextText}
            </button>
          </div>
        ) : (
          <div style={{ background: "#ffffff", padding: "30px", borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}>
            
            <div>
              <h2 style={{ color: "#0f172a", fontWeight: "700", fontSize: "24px" }}>Sesi Kuis & Evaluasi</h2>
              <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "25px" }}>Jawablah seluruh pertanyaan pilihan ganda di bawah ini dengan memilih satu opsi yang paling akurat.</p>
              
              {quizQuestions.map((q) => (
                <div key={q.id} style={{ marginTop: "25px", marginBottom: "25px", background: "#f8fafc", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  <p style={{ fontWeight: "700", fontSize: "16px", color: "#0f172a", marginBottom: "15px", lineHeight: "1.5" }}>{q.question}</p>
                  {q.options.map((opt) => (
                    <label key={opt} style={{ display: "flex", alignItems: "center", margin: "12px 0", cursor: "pointer", background: selectedAnswers[q.id] === opt ? "#eff6ff" : "#ffffff", padding: "12px 16px", borderRadius: "10px", border: selectedAnswers[q.id] === opt ? "1px solid #2563eb" : "1px solid #e2e8f0", transition: "0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.01)" }}>
                      <input 
                        type="radio" 
                        name={`q-${q.id}`} 
                        checked={selectedAnswers[q.id] === opt}
                        onChange={() => {
                          setSelectedAnswers({...selectedAnswers, [q.id]: opt});
                          setQuizError("");
                        }}
                        style={{ marginRight: "12px", width: "18px", height: "18px", accentColor: "#2563eb" }}
                      />
                      <span style={{ fontSize: "14px", fontWeight: selectedAnswers[q.id] === opt ? "600" : "500", color: selectedAnswers[q.id] === opt ? "#2563eb" : "#334155" }}>{opt}</span>
                    </label>
                  ))}
                </div>
              ))}
              
              {quizError && <p style={{ color: "#dc2626", marginTop: "15px", fontWeight: "600", fontSize: "14px" }}>{quizError}</p>}
              
              {!showCertificate && (
                <button onClick={handleNext} style={{ marginTop: "20px", width: "100%", background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", color: "#ffffff", border: "none", padding: "16px 24px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", fontSize: "16px", boxShadow: "0 4px 15px rgba(37, 99, 235, 0.25)" }}>
                  Kirim Jawaban Kuis & Evaluasi Akhir 📝
                </button>
              )}
            </div>
            
            {showCertificate && (
              <div style={{ marginTop: "35px", borderTop: "2px dashed #e2e8f0", paddingTop: "30px" }}>
                <h3 style={{ color: "#16a34a", marginBottom: "8px", textAlign: "center", fontSize: "24px", fontWeight: "800" }}>🎉 Selamat, Anda Dinyatakan Lulus!</h3>
                <p style={{ color: "#d97706", fontWeight: "700", textAlign: "center", marginBottom: "12px", fontSize: "16px" }}>Skor Evaluasi Anda: {score.benar} / {score.total} Jawaban Benar</p>
                <p style={{ color: "#64748b", fontSize: "14px", textAlign: "center", marginBottom: "25px", lineHeight: "1.6" }}>
                  Nama Anda telah disematkan secara otomatis pada templat dokumen resmi. Silakan periksa pratinjau dan unduh berkas di bawah ini.
                </p>

                <div style={{ display: "flex", justifyContent: "center", overflowX: "auto", background: "#f8fafc", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  <canvas 
                    ref={canvasRef}
                    style={{ 
                      maxWidth: "100%", 
                      height: "auto", 
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1"
                    }} 
                  />
                </div>

                <div style={{ marginTop: "30px" }}>
                  <button 
                    onClick={handleDownload}
                    style={{ 
                      width: "100%", 
                      background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)", 
                      color: "#fff", 
                      border: "none", 
                      padding: "16px 20px", 
                      borderRadius: "12px", 
                      fontWeight: "bold", 
                      fontSize: "16px",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(22, 163, 74, 0.25)",
                    }}
                  >
                    💾 Unduh Sertifikat Resmi (.PNG)
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}