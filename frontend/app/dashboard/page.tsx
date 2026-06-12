"use client";

import { useEffect, useState } from "react";

interface Webinar {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  speaker: string;
  flyer: string;            // Menampung link/Base64 Flyer dari penyelenggara
  registrationLink: string; // Menampung link pendaftaran dari penyelenggara
}

interface QuizStatus {
  webinarId: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  score?: number;           
  currentQuestion?: number;  
  totalQuestions?: number;   
}

export default function UltimateDashboardPage() {
  const [user, setUser] = useState<{ nama: string; email: string; role?: string } | null>(null);
  const [accessedWebinars, setAccessedWebinars] = useState<Webinar[]>([]);
  const [quizDatabase, setQuizDatabase] = useState<{ [id: number]: QuizStatus }>({});
  const [isLoading, setIsLoading] = useState(true);
  
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  useEffect(() => {
    // 1. Ambil data user login
    const userData = localStorage.getItem("skillbridgeUser");
    if (!userData) {
      window.location.href = "/login";
      return;
    }
    setUser(JSON.parse(userData));

    // 2. Ambil database webinar bersama
    const savedSharedWebinars = localStorage.getItem("shared_webinars_data");
    let allWebinars: Webinar[] = [];
    if (savedSharedWebinars) {
      allWebinars = JSON.parse(savedSharedWebinars);
    }

    // 3. Ambil riwayat webinar yang diikuti mahasiswa
    const savedRegs = localStorage.getItem("registeredWebinars");
    if (savedRegs && allWebinars.length > 0) {
      const registeredIds = JSON.parse(savedRegs) as number[];
      const filtered = allWebinars.filter((w) => registeredIds.includes(w.id));
      setAccessedWebinars(filtered);
    } else {
      setAccessedWebinars(allWebinars);
    }

    // 4. Sinkronisasi status kuis & rekam akademik
    const savedQuizStatuses = localStorage.getItem("skillbridge_quiz_statuses");
    if (savedQuizStatuses) {
      setQuizDatabase(JSON.parse(savedQuizStatuses));
    } else {
      const dummyQuizStatuses: { [id: number]: QuizStatus } = {
        1: { webinarId: 1, status: "COMPLETED", score: 95 }, 
        2: { webinarId: 2, status: "IN_PROGRESS", currentQuestion: 3, totalQuestions: 5 }
      };
      localStorage.setItem("skillbridge_quiz_statuses", JSON.stringify(dummyQuizStatuses));
      setQuizDatabase(dummyQuizStatuses);
    }

    setIsLoading(false);
  }, []);

  const totalCertificatesEarned = accessedWebinars.filter(
    (w) => quizDatabase[w.id]?.status === "COMPLETED"
  ).length;

  const handleQuizAction = (webinarId: number, title: string, status: string) => {
    if (status === "IN_PROGRESS") {
      alert(`🔄 Melanjutkan latihan kuis pada sesi:\n"${title}"`);
    } else {
      alert(`📝 Membuka latihan kuis baru untuk sesi:\n"${title}"`);
    }
  };

  const handleDownloadCertificate = (webinarId: number, title: string, score: number, date: string) => {
    if (downloadingId !== null) return;

    setDownloadingId(webinarId);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          triggerFileDownload(title, score, date, webinarId);
          
          setTimeout(() => {
            setDownloadingId(null);
            setDownloadProgress(0);
          }, 600);

          return 100;
        }
        return prev + 25; 
      });
    }, 150);
  };

  // FUNGSI UTAMA GENERATOR PDF TERISOLASI (Mencegah Menu Berantakan)
  const triggerFileDownload = async (title: string, score: number, date: string, webinarId: number) => {
    if (typeof window === "undefined") return;

    // A. Buat iframe tersembunyi agar proses rendering TIDAK mengganggu/merusak menu utama dashboard
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.width = "1120px";
    iframe.style.height = "790px";
    iframe.style.left = "-9999px";
    iframe.style.top = "-9999px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!iframeDoc) return;

    try {
      const html2pdf = require("html2pdf.js");

      let predikat = "CUKUP";
      if (score >= 90) predikat = "SANGAT MEMUASKAN";
      else if (score >= 80) predikat = "MEMUASKAN";
      else if (score >= 70) predikat = "BAIK";

      const generateCertNumber = `CERT/SB/${webinarId}/${Math.floor(1000 + Math.random() * 9000)}/2026`;
      const studentName = user?.nama?.toUpperCase() || "MAHASISWA SKILLBRIDGE";

      const certificateHTML = `
        <div style="
          width: 1120px; 
          height: 790px; 
          padding: 30px; 
          box-sizing: border-box; 
          background: #ffffff; 
          font-family: 'Georgia', serif; 
          position: relative;
          color: #1e293b;
        ">
          <div style="
            border: 6px double #ca8a04; 
            width: 100%; 
            height: 100%; 
            padding: 40px; 
            box-sizing: border-box; 
            background: linear-gradient(to bottom, #ffffff, #fdfbf7);
            position: relative;
            text-align: center;
          ">
            <div style="position: absolute; top: 10px; left: 10px; width: 25px; height: 25px; border-top: 4px solid #eab308; border-left: 4px solid #eab308;"></div>
            <div style="position: absolute; top: 10px; right: 10px; width: 25px; height: 25px; border-top: 4px solid #eab308; border-right: 4px solid #eab308;"></div>
            <div style="position: absolute; bottom: 10px; left: 10px; width: 25px; height: 25px; border-bottom: 4px solid #eab308; border-left: 4px solid #eab308;"></div>
            <div style="position: absolute; bottom: 10px; right: 10px; width: 25px; height: 25px; border-bottom: 4px solid #eab308; border-right: 4px solid #eab308;"></div>

            <div style="font-size: 13px; font-weight: 800; color: #ca8a04; letter-spacing: 5px; text-transform: uppercase; margin-bottom: 10px;">
              🛡️ Official Certificate of Completion
            </div>
            
            <h1 style="font-size: 42px; margin: 15px 0 5px 0; color: #0f172a; font-weight: 700; letter-spacing: 2px;">
              SERTIFIKAT KELULUSAN
            </h1>
            <div style="font-size: 14px; color: #64748b; font-family: monospace; margin-bottom: 25px;">
              No Kredensial: ${generateCertNumber}
            </div>
            
            <div style="width: 150px; height: 3px; background: #ca8a04; margin: 0 auto 30px auto;"></div>

            <p style="font-style: italic; color: #475569; font-size: 18px; margin-bottom: 25px;">
              Sertifikat ini secara resmi diberikan kepada:
            </p>

            <h2 style="font-size: 40px; color: #0f172a; font-weight: bold; margin: 20px 0; border-bottom: 2px solid #e2e8f0; display: inline-block; padding: 0 40px 10px 40px;">
              ${studentName}
            </h2>

            <p style="max-width: 850px; margin: 25px auto; color: #334155; font-size: 16px; line-height: 1.8; font-family: sans-serif;">
              Atas dedikasi, performa akademik, dan keberhasilannya menyelesaikan seluruh rangkaian program kompetensi pelatihan daring serta ujian evaluasi kuis akhir pada ruang lingkup spesifikasi materi:
            </p>

            <h3 style="font-size: 24px; color: #ca8a04; font-weight: 700; margin: 20px 0; font-style: italic;">
              "${title}"
            </h3>

            <p style="color: #475569; font-size: 15px; font-family: sans-serif; margin-bottom: 40px;">
              Dinyatakan lulus dengan hasil evaluasi kuis akhir berkualifikasi <strong style="color: #10b981;">${predikat}</strong> (Skor Akurat: ${score}/100).
            </p>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 40px; margin-top: 60px; font-family: sans-serif;">
              
              <div style="text-align: left; width: 250px;">
                <span style="color: #94a3b8; display: block; font-size: 11px; letter-spacing: 1px;">TANGGAL TERBIT</span>
                <span style="font-size: 15px; font-weight: 600; color: #334155;">Yogyakarta, ${date}</span>
                <div style="margin-top: 15px; font-size: 11px; color: #64748b; font-family: monospace;">SKILLBRIDGE ACADEMY</div>
              </div>

              <div style="
                background: linear-gradient(135deg, #fef08a 0%, #ca8a04 100%);
                color: #ffffff;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                font-size: 12px;
                box-shadow: 0 6px 15px rgba(202, 138, 4, 0.3);
                border: 3px solid #ffffff;
              ">
                <span>PASSED</span>
                <span style="font-size: 9px; opacity: 0.9;">VERIFIED</span>
              </div>

              <div style="text-align: center; width: 250px;">
                <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 28px; color: #1e3a8a; transform: rotate(-2deg); margin-bottom: -5px;">
                  Andi Hermawan
                </div>
                <div style="width: 180px; height: 1px; background: #cbd5e1; margin: 10px auto 5px auto;"></div>
                <span style="color: #334155; display: block; font-weight: 700; font-size: 13px;">Direktur Utama SkillBridge</span>
              </div>

            </div>

          </div>
        </div>
      `;

      // B. Inject kode HTML sertifikat ke dalam dokumen iframe terpisah
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head><style>body { margin: 0; padding: 0; background: white; }</style></head>
          <body><div id="cert-print-target">${certificateHTML}</div></body>
        </html>
      `);
      iframeDoc.close();

      // Beri sedikit jeda waktu mikro (100ms) agar iframe selesai memuat DOM internalnya
      await new Promise((resolve) => setTimeout(resolve, 100));
      const printTarget = iframeDoc.getElementById("cert-print-target");

      const options = {
        margin: 0,
        filename: `Sertifikat_${studentName.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "px", format: [1120, 790], orientation: "landscape" }
      };

      // C. Unduh PDF bersumber dari dalam kontainer iframe
      await html2pdf().set(options).from(printTarget).save();

    } catch (error) {
      console.error("Gagal memproses cetak berkas PDF:", error);
      alert("Terjadi masalah saat mempersiapkan dokumen PDF.");
    } finally {
      // D. Bersihkan dan buang iframe setelah selesai agar memori browser bersih & layout tidak bocor
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }
  };

  if (isLoading) return <div style={styles.loading}>Sinkronisasi Rekam Akademik...</div>;
  if (!user) return null;

  return (
    <main style={styles.container}>
      <div style={styles.glowTop}></div>

      {/* HEADER BANNER */}
      <header style={styles.headerBanner}>
        <div style={styles.headerLeft}>
          <span style={styles.backBtn} onClick={() => window.location.href = "/webinars"}>← Kembali ke Webinar</span>
          <h1 style={styles.welcomeText}>Halo, {user.nama}! 👋</h1>
          <p style={styles.userMeta}>Pusat Kontrol Kelulusan, Pantauan Kuis, & Transkrip Sertifikat Anda.</p>
        </div>
      </header>

      {/* RANGKUMAN METRIKS */}
      <section style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <span style={styles.metricIcon}>🎓</span>
          <div>
            <h4 style={styles.metricVal}>{accessedWebinars.length}</h4>
            <p style={styles.metricTitle}>Total Kelas Diikuti</p>
          </div>
        </div>
        <div style={styles.metricCard}>
          <span style={styles.metricIcon}>⏳</span>
          <div>
            <h4 style={styles.metricVal}>
              {accessedWebinars.filter(w => quizDatabase[w.id]?.status === "IN_PROGRESS").length}
            </h4>
            <p style={styles.metricTitle}>Latihan Belum Selesai</p>
          </div>
        </div>
        <div style={styles.metricCard}>
          <span style={styles.metricIcon}>🏆</span>
          <div>
            <h4 style={{ ...styles.metricVal, color: "#10b981" }}>{totalCertificatesEarned}</h4>
            <p style={styles.metricTitle}>Sertifikat Berhasil Didapat</p>
          </div>
        </div>
      </section>

      {/* LIST KARTU GRID WEBINAR */}
      <section style={styles.contentSection}>
        <div style={styles.sectionHeadingBox}>
          <h2 style={styles.sectionTitle}>Portofolio Kelulusan & Transkrip Real-time</h2>
          <span style={styles.sectionBadge}>E-Portofolio Terintegrasi</span>
        </div>

        {accessedWebinars.length === 0 ? (
          <div style={styles.emptyContainer}>
            <div style={styles.emptyIcon}>📂</div>
            <h3>Belum Ada Riwayat Aktivitas Kelas</h3>
            <p>Silakan ikuti kelas webinar dan selesaikan kuis evaluasinya untuk menerbitkan sertifikat resmi Anda di sini.</p>
          </div>
        ) : (
          <div style={styles.premiumGrid}>
            {accessedWebinars.map((webinar) => {
              const isThisDownloading = downloadingId === webinar.id;
              const quizInfo = quizDatabase[webinar.id] || { webinarId: webinar.id, status: "NOT_STARTED" };
              const isCompleted = quizInfo.status === "COMPLETED";

              return (
                <div key={webinar.id} style={styles.premiumCertCard}>
                  
                  {/* PREVIEW FLYER REAL-TIME */}
                  <div style={{
                    ...styles.certPreviewBox,
                    backgroundImage: webinar.flyer ? `linear-gradient(to bottom, rgba(9,13,22,0.3), rgba(17,24,39,0.95)), url(${webinar.flyer})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply",
                    backgroundColor: isCompleted ? "#1e1b4b" : "#111827"
                  }}>
                    <span style={{
                      ...styles.certRibbon,
                      color: isCompleted ? "#f59e0b" : "#94a3b8",
                      background: "rgba(0,0,0,0.6)"
                    }}>
                      {isCompleted ? "★ BERHASIL LULUS" : "🔒 SERTIFIKAT TERKUNCI"}
                    </span>
                    
                    <div style={styles.previewName}>{user.nama}</div>
                    <div style={styles.previewTopic}>{webinar.title.substring(0, 38)}...</div>
                    
                    <div style={styles.statusDisplayBadge}>
                      {isCompleted ? (
                        `Skor Ujian: ${quizInfo.score} / 100 🎓`
                      ) : (
                        `⚠️ Selesaikan kuis untuk klaim berkas`
                      )}
                    </div>
                  </div>

                  {/* KONTEN DETAIL INFORMASI BAWAH */}
                  <div style={styles.certInfoContainer}>
                    <div style={styles.tagLineRow}>
                      <span style={{
                        ...styles.categoryBadge,
                        borderColor: webinar.category === "Tech" ? "#38bdf8" : webinar.category === "Design" ? "#f43f5e" : "#10b981",
                        color: webinar.category === "Tech" ? "#38bdf8" : webinar.category === "Design" ? "#f43f5e" : "#10b981",
                      }}>{webinar.category}</span>
                      <span style={styles.dateStamp}>{webinar.date} - {webinar.time}</span>
                    </div>

                    <h3 style={styles.cardWebinarTitle}>{webinar.title}</h3>
                    <p style={styles.speakerSub}>Mentor: <b>{webinar.speaker}</b></p>

                    {isThisDownloading && (
                      <div style={styles.progressContainer}>
                        <div style={styles.progressTextRow}>
                          <span>Menyusun berkas PDF berwarna...</span>
                          <span>{downloadProgress}%</span>
                        </div>
                        <div style={styles.progressBarBg}>
                          <div style={{ ...styles.progressBarFill, width: `${downloadProgress}%` }} />
                        </div>
                      </div>
                    )}

                    {/* BLOK AKSI LOGIKA TERINTEGRASI */}
                    <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
                      
                      {/* 1. TOMBOL LINK PENDAFTARAN EKSTERNAL */}
                      {webinar.registrationLink && (
                        <a 
                          href={webinar.registrationLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={styles.registrationBtn}
                        >
                          🔗 Buka Link Form Pendaftaran
                        </a>
                      )}

                      {/* 2. TOMBOL STATUS SERTIFIKAT / KUIS */}
                      {isCompleted ? (
                        <button
                          disabled={downloadingId !== null}
                          onClick={() => handleDownloadCertificate(webinar.id, webinar.title, quizInfo.score || 0, webinar.date)}
                          style={{ ...styles.actionBtn, background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", boxShadow: "0 4px 12px rgba(3, 105, 161, 0.2)" }}
                        >
                          {isThisDownloading ? "Membuat PDF..." : "Unduh Sertifikat Berwarna (PDF) 📥"}
                        </button>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {quizInfo.status === "IN_PROGRESS" && (
                            <div style={styles.miniProgressTrack}>
                              <div style={{ ...styles.miniProgressFill, width: `${((quizInfo.currentQuestion || 0) / (quizInfo.totalQuestions || 5)) * 100}%` }} />
                            </div>
                          )}
                          <button
                            onClick={() => handleQuizAction(webinar.id, webinar.title, quizInfo.status)}
                            style={{ 
                              ...styles.actionBtn, 
                              background: quizInfo.status === "IN_PROGRESS" ? "#f97316" : "rgba(255,255,255,0.02)", 
                              color: quizInfo.status === "IN_PROGRESS" ? "white" : "#94a3b8",
                              border: quizInfo.status === "IN_PROGRESS" ? "none" : "1px solid #334155"
                            }}
                          >
                            {quizInfo.status === "IN_PROGRESS" ? "Lanjutkan Latihan Kuis ⚡" : "Mulai Latihan Kuis 📝"}
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

// PREMIUM LIGHT STYLE OBJECT (Matching dengan Tema Dashboard Utama)
const styles: { [key: string]: React.CSSProperties } = {
  container: { 
    minHeight: "100vh", 
    background: "#f4f7fa", // Latar belakang putih kebiruan segar sesuai dashboard utama
    color: "#1e293b", // Warna teks utama abu-abu gelap agar kontras dan tajam
    fontFamily: "system-ui, -apple-system, sans-serif", 
    paddingBottom: "80px", 
    position: "relative", 
    overflowX: "hidden" 
  },
  loading: { 
    minHeight: "100vh", 
    display: "grid", 
    placeItems: "center", 
    background: "#f4f7fa", 
    color: "#2563eb", 
    fontSize: "16px", 
    fontWeight: "600" 
  },
  glowTop: { 
    position: "absolute", 
    width: "500px", 
    height: "500px", 
    background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, rgba(0,0,0,0) 70%)", // Efek pendaran biru yang sangat tipis dan bersih
    top: "-150px", 
    left: "-100px", 
    pointerEvents: "none" 
  },
  headerBanner: { maxWidth: "1200px", margin: "40px auto 20px auto", padding: "0 20px" },
  backBtn: { 
    color: "#2563eb", // Menggunakan warna biru cerah tombol utama
    fontSize: "14px", 
    fontWeight: "600", 
    cursor: "pointer", 
    display: "block", 
    marginBottom: "8px" 
  },
  welcomeText: { 
    fontSize: "32px", 
    fontWeight: "800", 
    color: "#0f172a", // Judul hitam tebal kokoh
    margin: 0, 
    letterSpacing: "-0.5px" 
  },
  userMeta: { color: "#475569", margin: "5px 0 0 0", fontSize: "15px" },

  metricsGrid: { maxWidth: "1200px", margin: "20px auto 40px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" },
  metricCard: { 
    background: "#ffffff", // Kartu metrik putih bersih melayang
    border: "1px solid #e2e8f0", 
    padding: "20px", 
    borderRadius: "16px", 
    display: "flex", 
    alignItems: "center", 
    gap: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
  },
  metricIcon: { 
    fontSize: "24px", 
    background: "#f1f5f9", // Background icon abu-abu muda bersih
    width: "48px", 
    height: "48px", 
    display: "grid", 
    placeItems: "center", 
    borderRadius: "12px" 
  },
  metricVal: { margin: 0, fontSize: "24px", fontWeight: "800", color: "#0f172a" },
  metricTitle: { margin: "2px 0 0 0", fontSize: "13px", color: "#64748b", fontWeight: "500" },

  contentSection: { maxWidth: "1200px", margin: "0 auto", padding: "0 20px" },
  sectionHeadingBox: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", borderBottom: "1px solid #e2e8f0", paddingBottom: "15px" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", color: "#0f172a" },
  sectionBadge: { fontSize: "12px", background: "#ecfdf5", color: "#10b981", padding: "4px 10px", borderRadius: "6px", fontWeight: "600" },
  emptyContainer: { textAlign: "center", padding: "60px 20px", background: "#ffffff", borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" },
  emptyIcon: { fontSize: "45px", marginBottom: "15px" },

  premiumGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "25px" },
  premiumCertCard: { 
    background: "#ffffff", // Card Utama Putih Bersih
    borderRadius: "24px", // Melengkung tebal yang estetik (24px)
    overflow: "hidden", 
    border: "1px solid #e2e8f0", 
    display: "flex", 
    flexDirection: "column",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)"
  },
  
  certPreviewBox: { 
    height: "160px", 
    position: "relative", 
    padding: "20px", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "end", 
    borderBottom: "2px dashed #e2e8f0" 
  },
  certRibbon: { 
    position: "absolute", 
    top: "15px", 
    right: "15px", 
    fontSize: "10px", 
    fontWeight: "700", 
    padding: "4px 10px", 
    borderRadius: "6px", 
    background: "rgba(15, 23, 42, 0.75)" // Overlay gelap tipis agar badge pita terbaca di atas flyer
  },
  previewName: { fontSize: "18px", fontWeight: "700", color: "#ffffff", marginBottom: "4px", textShadow: "0 2px 4px rgba(0,0,0,0.5)" },
  previewTopic: { fontSize: "12px", color: "#f1f5f9", marginBottom: "12px", paddingRight: "60px", fontWeight: "500", textShadow: "0 1px 3px rgba(0,0,0,0.5)" },
  statusDisplayBadge: { 
    fontSize: "11px", 
    color: "#0f172a", 
    background: "#ffffff", // Latar belakang badge status putih di dalam preview
    padding: "5px 12px", 
    borderRadius: "6px", 
    width: "fit-content", 
    fontWeight: "700", 
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)" 
  },

  certInfoContainer: { padding: "25px", display: "flex", flexDirection: "column", flex: 1 },
  tagLineRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
  categoryBadge: { fontSize: "11px", fontWeight: "700", border: "1px solid", padding: "2px 8px", borderRadius: "5px" },
  dateStamp: { fontSize: "12px", color: "#64748b" },
  cardWebinarTitle: { fontSize: "18px", fontWeight: "700", margin: "0 0 8px 0", lineHeight: "1.4", minHeight: "50px", color: "#0f172a" },
  speakerSub: { margin: "0 0 20px 0", fontSize: "13px", color: "#475569" },

  progressContainer: { marginBottom: "15px" },
  progressTextRow: { display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#2563eb", marginBottom: "5px", fontWeight: "600" },
  progressBarBg: { width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "10px", overflow: "hidden" },
  progressBarFill: { height: "100%", background: "#2563eb", transition: "width 0.1s linear" },
  
  miniProgressTrack: { width: "100%", height: "5px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden", marginBottom: "8px" },
  miniProgressFill: { height: "100%", background: "#2563eb" },
  
  registrationBtn: { 
    width: "100%", 
    display: "block", 
    boxSizing: "border-box", 
    textAlign: "center", 
    background: "#eff6ff", 
    border: "1px dashed #2563eb", 
    color: "#2563eb", 
    padding: "12px", 
    borderRadius: "12px", 
    fontWeight: "700", 
    fontSize: "13px", 
    textDecoration: "none", 
    transition: "0.2s" 
  },
  actionBtn: { 
    width: "100%", 
    border: "none", 
    padding: "13px", 
    borderRadius: "12px", // Berbentuk kotak tumpul melengkung manis senada tombol dashboard profil
    color: "white", 
    fontWeight: "700", 
    fontSize: "13px", 
    cursor: "pointer",
    transition: "all 0.2s ease"
  }
};