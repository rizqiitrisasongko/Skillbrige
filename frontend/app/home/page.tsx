"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<{ nama: string; email: string } | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Proteksi halaman: Jika belum login, tendang ke halaman login
    const userData = localStorage.getItem("skillbridgeUser");
    if (!userData) {
      window.location.href = "/login";
      return;
    }
    setUser(JSON.parse(userData));
  }, []);

  if (!user) return <div style={styles.loading}>Memuat Halaman Utama...</div>;

  return (
    <main style={styles.container}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <span style={styles.logo} onClick={() => window.location.href = "/home"}>
          SkillBridge <span style={{ color: "#0284c7" }}>.</span>
        </span>
        <div style={styles.navLinks}>
          <button onClick={() => window.location.href = "/courses"} style={styles.textLink}>Kelas</button>
          <button onClick={() => window.location.href = "/webinars"} style={styles.textLink}>Seminar</button>
          <button onClick={() => window.location.href = "/dashboard"} style={styles.navBtn}>Dashboard Profil</button>
          <button 
            onClick={() => { localStorage.removeItem("skillbridgeUser"); window.location.href = "/"; }} 
            style={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.welcomeBadge}>AKUN MAHASISWA AKTIF ✅</div>
        <h1 style={styles.heroTitle}>
          Selamat Datang Kembali, <br />
          <span style={styles.gradientText}>{user.nama}</span>! 👋
        </h1>
        <p style={styles.heroSubtitle}>
          Akses semua materi eksklusif, jadwalkan partisipasi webinar, dan pantau sertifikat digitalmu langsung dari satu dasbor terintegrasi.
        </p>
        
        {/* MENU GRID UTAMA */}
        <div style={styles.menuGrid}>
          {/* CARD 1: KELAS ONLINE */}
          <div 
            onClick={() => window.location.href = "/courses"} 
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              ...styles.menuCard,
              transform: hoveredCard === 1 ? "translateY(-8px)" : "translateY(0)",
              borderColor: hoveredCard === 1 ? "#0284c7" : "#e2e8f0",
              background: hoveredCard === 1 ? "#f0f9ff" : "#ffffff",
              boxShadow: hoveredCard === 1 ? "0 20px 25px -5px rgba(2, 132, 199, 0.1)" : "0 4px 6px -1px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{...styles.iconWrapper, background: "rgba(2, 132, 199, 0.1)", color: "#0284c7"}}>📚</div>
            <h3 style={styles.cardTitle}>Jelajahi Kelas Online</h3>
            <p style={styles.cardDesc}>Tingkatkan keahlian teknis secara mandiri lewat video modul interaktif terstruktur.</p>
            <span style={{...styles.cardLink, color: "#0284c7"}}>Masuk Ruang Kelas →</span>
          </div>

          {/* CARD 2: WEBINAR & SEMINAR */}
          <div 
            onClick={() => window.location.href = "/webinars"} 
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              ...styles.menuCard,
              transform: hoveredCard === 2 ? "translateY(-8px)" : "translateY(0)",
              borderColor: hoveredCard === 2 ? "#7631ec" : "#e2e8f0",
              background: hoveredCard === 2 ? "#f5f3ff" : "#ffffff",
              boxShadow: hoveredCard === 2 ? "0 20px 25px -5px rgba(124, 58, 237, 0.1)" : "0 4px 6px -1px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{...styles.iconWrapper, background: "rgba(124, 58, 237, 0.1)", color: "#7c3aed"}}>🌐</div>
            <h3 style={styles.cardTitle}>Webinar & Seminar</h3>
            <p style={styles.cardDesc}>Ikuti sesi live streaming diskusi interaktif bersama mentor-mentor ahli industri global.</p>
            <span style={{...styles.cardLink, color: "#7c3aed"}}>Daftar Jadwal Acara →</span>
          </div>

          {/* CARD 3: PROGRESS & SERTIFIKAT */}
          <div 
            onClick={() => window.location.href = "/dashboard"} 
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              ...styles.menuCard,
              transform: hoveredCard === 3 ? "translateY(-8px)" : "translateY(0)",
              borderColor: hoveredCard === 3 ? "#059669" : "#e2e8f0",
              background: hoveredCard === 3 ? "#ecfdf5" : "#ffffff",
              boxShadow: hoveredCard === 3 ? "0 20px 25px -5px rgba(5, 150, 105, 0.1)" : "0 4px 6px -1px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{...styles.iconWrapper, background: "rgba(5, 150, 105, 0.1)", color: "#059669"}}>📊</div>
            <h3 style={styles.cardTitle}>Progress Belajar</h3>
            <p style={styles.cardDesc}>Periksa riwayat pendaftaran kursus, kumpulkan skor kuis, dan klaim sertifikat kelulusanmu.</p>
            <span style={{...styles.cardLink, color: "#059669"}}>Lihat Portofolio →</span>
          </div>
        </div>
      </section>
    </main>
  );
}

// 100% SINKRON DENGAN LIGHT TEMA SEPERTI DI GAMBAR (image_2dcd31.jpg)
const styles: { [key: string]: React.CSSProperties } = {
  container: { 
    minHeight: "100vh", 
    background: "linear-gradient(to bottom, #f0f9ff 0%, #f8fafc 100%)", /* Gradasi biru muda lembut sesuai gambar */
    color: "#0f172a", /* Font Utama Hitam Pekat */
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
  },
  loading: { 
    minHeight: "100vh", 
    display: "grid", 
    placeItems: "center", 
    background: "#ffffff", 
    color: "#0284c7", 
    fontSize: "18px", 
    fontWeight: "bold" 
  },
  navbar: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: "20px 60px", 
    background: "rgba(255, 255, 255, 0.8)", /* Navbar Putih Transparan */
    backdropFilter: "blur(12px)", 
    borderBottom: "1px solid #e2e8f0",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  logo: { fontSize: "22px", fontWeight: "800", color: "#2563eb", cursor: "pointer", letterSpacing: "-0.5px" },
  navLinks: { display: "flex", gap: "25px", alignItems: "center" },
  textLink: { background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: "15px", fontWeight: "500", transition: "0.2s" },
  navBtn: { background: "#1c5ff2", border: "none", color: "#ffffff", padding: "10px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", transition: "0.2s" },
  logoutBtn: { background: "rgba(220, 38, 38, 0.08)", color: "#dc2626", border: "1px solid rgba(220, 38, 38, 0.2)", padding: "10px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
  hero: { maxWidth: "1200px", margin: "0 auto", padding: "80px 20px", textAlign: "center" },
  welcomeBadge: { display: "inline-block", background: "#e0f2fe", color: "#0369a1", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", marginBottom: "20px", border: "1px solid #bae6fd", letterSpacing: "1px" },
  heroTitle: { fontSize: "48px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-1px", marginBottom: "20px", color: "#1e293b" },
  gradientText: { background: "linear-gradient(to right, #2563eb, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSubtitle: { color: "#475569", fontSize: "18px", maxWidth: "700px", margin: "0 auto 50px auto", lineHeight: "1.6" },
  menuGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "25px", marginTop: "20px" },
  menuCard: { 
    padding: "35px 30px", 
    borderRadius: "20px", 
    border: "1px solid #d9dfe7", 
    cursor: "pointer", 
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
    textAlign: "left"
  },
  iconWrapper: { width: "50px", height: "50px", borderRadius: "14px", display: "grid", placeItems: "center", fontSize: "24px", marginBottom: "25px" },
  cardTitle: { fontSize: "20px", fontWeight: "700", marginBottom: "12px", color: "#1e293b" },
  cardDesc: { color: "#475569", fontSize: "14px", lineHeight: "1.6", marginBottom: "25px", minHeight: "66px" },
  cardLink: { fontSize: "14px", fontWeight: "600" }
};