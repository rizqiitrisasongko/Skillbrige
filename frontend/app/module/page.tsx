"use client";

import { useState, useEffect } from "react";

// 1. DATA MATERI KURSUS (Modul 1 & Modul 2)
const listMateri = [
  {
    id: 1,
    title: "Modul 1 - Pengenalan Next.js",
    desc: "Pada modul ini kamu akan mempelajari dasar-dasar framework Next.js dan manfaatnya dalam pengembangan website modern.",
    content: (
      <>
        <h2>Apa itu Next.js?</h2>
        <p style={{ lineHeight: "1.8", color: "#e2e8f0" }}>
          Next.js adalah framework berbasis React yang digunakan untuk membangun aplikasi web modern.
          Framework ini menyediakan fitur seperti routing, server-side rendering (SSR), static site generation
          (SSG), dan optimasi performa secara otomatis.
        </p>

        <h2 style={{ marginTop: "25px" }}>Mengapa Menggunakan Next.js?</h2>
        <ul style={{ lineHeight: "2", color: "#e2e8f0" }}>
          <li>⚡ Performa website lebih cepat</li>
          <li>🔍 SEO lebih baik</li>
          <li>📂 Routing otomatis</li>
          <li>🚀 Mudah untuk deployment</li>
        </ul>
      </>
    ),
    btnNextText: "Tandai Selesai & Lanjut →",
  },
  {
    id: 2,
    title: "Modul 2 - Routing & Server Components",
    desc: "Melanjutkan materi dari Modul 1, sekarang kita akan mempelajari bagaimana cara kerja sistem App Router dan memahami perbedaan Server vs Client Components.",
    content: (
      <>
        <h2>1. File-Based Routing (App Router)</h2>
        <p style={{ lineHeight: "1.8", color: "#e2e8f0" }}>
          Next.js menggunakan sistem folder untuk membuat halaman web. Setiap folder di dalam direktori <code>app/</code> melambangkan segmen URL rute jalan. Untuk membuat rute tersebut dapat diakses, kamu wajib memasukkan file bernama <strong>page.tsx</strong> di dalamnya.
        </p>

        <h2 style={{ marginTop: "25px" }}>2. Server vs Client Component</h2>
        <p style={{ lineHeight: "1.8", color: "#e2e8f0" }}>
          Secara default, semua komponen di dalam folder Next.js adalah <strong>Server Components</strong> (dirender di server untuk kecepatan maksimal). Jika kamu membutuhkan interaktivitas seperti tombol klik atau <code>useState</code>, kamu wajib menambahkan baris <code>"use client";</code> di paling atas file.
        </p>
      </>
    ),
    btnNextText: "Mulai Ujian Quiz Pelatihan 📝", // FIX: Mengubah teks tombol agar tidak memicu "Selesaikan Kursus" prematur
  }
];

// 2. DATA SOAL QUIZ
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Manakah file yang WAJIB ada di dalam folder Next.js agar rute URL tersebut dapat diakses di browser?",
    options: ["layout.tsx", "page.tsx", "route.ts", "style.css"],
    correctAnswer: "page.tsx"
  },
  {
    id: 2,
    question: "Jika kamu ingin menggunakan fitur interaktivitas seperti 'useState' atau tombol klik di Next.js, baris kode apa yang harus ditambah di paling atas file?",
    options: ['"use server";', '"use react";', '"use client";', '"import state";'],
    correctAnswer: '"use client";'
  }
];

export default function ModulePage() {
  // INDEKS UTAMA: 0 = Modul 1, 1 = Modul 2, 2 = Slide Quiz, 3 = Slide Sertifikat
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [quizError, setQuizError] = useState("");
  const [namaKelas, setNamaKelas] = useState("Belajar Next.js untuk Pemula");

  useEffect(() => {
    const savedCourse = localStorage.getItem("selectedCourse");
    if (savedCourse) {
      setNamaKelas(savedCourse);
    }
  }, []);

  // FIX: Logika Navigasi Lanjut Per-Tahap yang Jauh Lebih Ketat
  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1); // Modul 1 -> Modul 2
    } else if (currentStep === 1) {
      setCurrentStep(2); // Modul 2 -> Slide Quiz (Ini yang memicu halaman quiz muncul!)
    } else if (currentStep === 2) {
      validateQuiz();    // Slide Quiz -> Cek Jawaban -> Sertifikat
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      window.location.href = "/courses";
    }
  };

  const validateQuiz = () => {
    if (Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length) {
      setQuizError("⚠️ Mohon selesaikan dan pilih jawaban untuk seluruh soal!");
      return;
    }

    let isAllCorrect = true;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] !== q.correctAnswer) {
        isAllCorrect = false;
      }
    });

    if (isAllCorrect) {
      alert("🎉 Selamat! Semua jawaban benar. Menghasilkan sertifikat kamu...");
      setQuizError("");
      setCurrentStep(3); // Pindah ke slide Sertifikat Kelulusan
    } else {
      setQuizError("❌ Jawaban kamu ada yang keliru. Silakan periksa kembali pilihanmu!");
    }
  };

  const handleSelectOption = (questionId: number, option: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
    setQuizError("");
  };

  // ================= [SLIDE INDEKS 3]: TAMPILAN SERTIFIKAT =================
  if (currentStep === 3) {
    return (
      <main style={styles.container}>
        <div style={{ maxWidth: "850px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: "#10b981", marginBottom: "10px" }}>🎉 Selamat! Kamu Dinyatakan Lulus</h1>
          <p style={{ color: "#94a3b8", marginBottom: "40px" }}>Evaluasi berhasil dilewati dengan akurasi jawaban 100%.</p>

          <div style={styles.certificateFrame}>
            <p style={styles.certHeader}>CERTIFICATE OF COMPLETION</p>
            <p style={{ color: "#94a3b8", margin: "0 0 10px 0" }}>Sertifikat resmi ini diberikan kepada:</p>
            
            <h2 style={styles.studentName}>Siswa Hebat SkillBridge</h2>
            
            <p style={{ color: "#94a3b8", margin: "20px 0 10px 0" }}>Atas kesuksesan menyelesaikan pelatihan:</p>
            <h3 style={{ fontSize: "24px", color: "#38bdf8", fontWeight: "700", margin: "0 0 30px 0" }}>{namaKelas}</h3>

            <p style={styles.certBody}>
              "Dinyatakan kompeten dalam memahami materi inti arsitektur Next.js framework, implementasi File-Based Routing, Server Components, hingga manajemen rendering di tingkat client."
            </p>

            <div style={styles.signatureRow}>
              <div>
                <p style={{ fontWeight: "bold", margin: "0 0 5px 0", fontFamily: "cursive", fontSize: "20px", color: "#38bdf8" }}>SkillBridge Team</p>
                <div style={{ width: "120px", height: "1px", background: "#475569", margin: "5px auto" }}></div>
                <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0 }}>Tim Penguji Utama</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold", margin: "0 0 5px 0", fontFamily: "monospace", fontSize: "16px" }}>ID: SB-{Math.floor(100000 + Math.random() * 900000)}</p>
                <div style={{ width: "120px", height: "1px", background: "#475569", margin: "5px auto" }}></div>
                <p style={{ color: "#eab308", fontSize: "12px", margin: 0 }}>Status: VERIFIED VALID</p>
              </div>
            </div>
          </div>

          <button onClick={() => window.location.href = "/dashboard"} style={styles.dashboardBtn}>
            Selesai & Kembali ke Dashboard →
          </button>
        </div>
      </main>
    );
  }

  // ================= [SLIDE INDEKS 2]: TAMPILAN QUIZ INTERAKTIF =================
  if (currentStep === 2) {
    return (
      <main style={styles.container}>
        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          
          <div style={styles.headerBlock}>
            <span style={{ background: "#eab308", color: "#0f172a", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", display: "inline-block", marginBottom: "10px" }}>
              Tahap Terakhir: Ujian Kelulusan
            </span>
            <h1 style={{ fontSize: "26px", color: "white", margin: 0 }}>Evaluasi Pemahaman Next.js 📝</h1>
          </div>

          {QUIZ_QUESTIONS.map((q, index) => (
            <div key={q.id} style={styles.quizCard}>
              <h3 style={{ fontSize: "18px", marginBottom: "15px", lineHeight: "1.5" }}>{index + 1}. {q.question}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {q.options.map((option) => {
                  const isSelected = selectedAnswers[q.id] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelectOption(q.id, option)}
                      style={{
                        ...styles.optionBtn,
                        border: isSelected ? "2px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                        background: isSelected ? "rgba(56, 189, 248, 0.15)" : "rgba(255,255,255,0.02)",
                        color: isSelected ? "#38bdf8" : "white",
                        fontWeight: isSelected ? "600" : "normal",
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {quizError && <p style={styles.errorText}>{quizError}</p>}

          {/* Navigasi Footer Quiz - Sekarang hanya menyisakan tombol Kirim Jawaban saja */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
            <button onClick={handleNext} style={styles.submitQuizBtn}>Kirim Jawaban & Cek Hasil 🚀</button>
          </div>

        </div>
      </main>
    );
  }
  // ================= [SLIDE INDEKS 0 & 1]: TAMPILAN PEMBACAAN MATERI MODUL =================
  return (
    <main style={styles.container}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        <div style={styles.headerBlock}>
          <span style={{ background: "#38bdf8", color: "#0f172a", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", display: "inline-block", marginBottom: "10px" }}>
            Progress: Modul {listMateri[currentStep].id} dari {listMateri.length}
          </span>
          <h1 style={{ marginBottom: "10px", fontSize: "28px" }}>{listMateri[currentStep].title}</h1>
          <p style={{ color: "#cbd5e1", margin: 0, lineHeight: "1.5" }}>{listMateri[currentStep].desc}</p>
        </div>

        <div style={styles.contentBlock}>
          {listMateri[currentStep].content}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "35px" }}>
            <button onClick={handleBack} style={styles.backBtn}>← Kembali</button>
            <button
              onClick={handleNext}
              style={{
                ...styles.nextBtn,
                background: currentStep === 1 ? "#eab308" : "#38bdf8", // Berubah jadi warna emas di Modul 2 sebagai gerbang masuk quiz
              }}
            >
              {listMateri[currentStep].btnNextText}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

// 3. CSS IN JS STYLING OBJECTS
const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: "100vh", background: "#0f172a", color: "white", padding: "40px 20px", fontFamily: "system-ui, sans-serif" },
  headerBlock: { background: "#1e293b", padding: "25px", borderRadius: "20px", marginBottom: "20px", border: "1px solid rgba(255, 255, 255, 0.05)" },
  contentBlock: { background: "#1e293b", padding: "25px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.05)" },
  backBtn: { padding: "12px 24px", border: "none", borderRadius: "10px", background: "#475569", color: "white", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
  nextBtn: { padding: "12px 24px", border: "none", borderRadius: "10px", color: "#0f172a", fontWeight: "bold", cursor: "pointer", fontSize: "14px" },
  quizCard: { background: "#1e293b", padding: "25px", borderRadius: "20px", marginBottom: "20px", border: "1px solid rgba(255, 255, 255, 0.05)" },
  optionBtn: { textAlign: "left", padding: "14px 20px", borderRadius: "10px", cursor: "pointer", fontSize: "15px", transition: "all 0.2s ease" },
  submitQuizBtn: { padding: "12px 28px", border: "none", borderRadius: "10px", background: "#10b981", color: "white", cursor: "pointer", fontWeight: "bold", fontSize: "14px" },
  errorText: { color: "#ef4444", fontWeight: "bold", textAlign: "center", marginBottom: "20px" },
  certificateFrame: { background: "#1e293b", border: "6px double #eab308", borderRadius: "24px", padding: "50px 40px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" },
  certHeader: { color: "#eab308", fontSize: "14px", fontWeight: "bold", letterSpacing: "3px", margin: "0 0 20px 0" },
  studentName: { fontSize: "36px", fontWeight: "800", color: "#ffffff", margin: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "inline-block", paddingBottom: "10px" },
  certBody: { color: "#cbd5e1", maxWidth: "600px", margin: "0 auto 40px auto", fontSize: "14px", lineHeight: "1.6", fontStyle: "italic" },
  signatureRow: { display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "30px" },
  dashboardBtn: { marginTop: "40px", padding: "14px 32px", background: "#38bdf8", color: "#0f172a", border: "none", borderRadius: "12px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" },
};