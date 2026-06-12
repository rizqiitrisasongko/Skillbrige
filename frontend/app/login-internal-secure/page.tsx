"use client";

import { useState } from "react";

export default function LoginPenyelenggaraPage() {
  const [email, setEmail] = useState("");
  const [namaOrganisasi, setNamaOrganisasi] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPenyelenggara = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !namaOrganisasi || !password) {
      alert("Mohon isi semua kolom log masuk!");
      return;
    }

    // Mengunci role secara otomatis sebagai "penyelenggara"
    const adminData = {
      nama: namaOrganisasi,
      email: email,
      role: "penyelenggara" 
    };

    // Simpan informasi user ke localStorage
    localStorage.setItem("skillbridgeUser", JSON.stringify(adminData));

    alert(`Selamat datang kembali, ${namaOrganisasi}!`);
    
    // Alihkan halaman ke dashboard penyelenggara
    window.location.href = "/penyelenggara"; 
  };

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <span style={styles.badge}>INTERNAL ACCESS ONLY 🔐</span>
        <h2 style={styles.title}>Portal Penyelenggara Acara</h2>
        <p style={styles.subtitle}>Silakan masuk untuk mempublikasikan webinar baru ke mahasiswa.</p>

        <form onSubmit={handleLoginPenyelenggara}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nama Organisasi / Komunitas</label>
            <input 
              type="text" 
              placeholder="Contoh: HMIF Universitas Andalas" 
              value={namaOrganisasi}
              onChange={(e) => setNamaOrganisasi(e.target.value)}
              style={styles.input} 
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Resmi Penyelenggara</label>
            <input 
              type="email" 
              placeholder="Contoh: hmif@unand.ac.id" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input} 
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Security Token / Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input} 
            />
          </div>

          <button type="submit" style={styles.btn}>
            Masuk Ke Dashboard 🚀
          </button>
        </form>
      </div>
    </main>
  );
}

const styles = {
  container: { 
    minHeight: "100vh", 
    background: "#ffffff", // Diubah ke Slate Gelap Ultra
    display: "grid", 
    placeItems: "center", 
    color: "white", 
    fontFamily: "system-ui, sans-serif", 
    padding: "20px" 
  },
  card: { 
    background: "#fcfcfc", // Diubah ke Slate Grey Kontras
    padding: "40px 30px", 
    borderRadius: "20px", 
    width: "100%", 
    maxWidth: "450px", 
    border: "1px solid #1f2937", // Diubah warna batasnya agar sesuai tema gelap baru
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)" 
  },
  badge: { 
    display: "inline-block", 
    background: "rgba(79, 111, 255, 0.74)", 
    color: "#000000", 
    padding: "4px 10px", 
    borderRadius: "6px", 
    fontSize: "11px", 
    fontWeight: "bold", 
    marginBottom: "15px", 
    border: "1px solid rgba(244, 63, 94, 0.2)" 
  },
  title: { 
    fontSize: "24px", 
    fontWeight: "800", 
    margin: "0 0 8px 0", 
    color: "#4c31ff" // Diubah ke warna Emerald Mint utama
  },
  subtitle: { 
    color: "#9ca3af", // Diubah ke abu-abu terang agar lebih kontras
    fontSize: "14px", 
    lineHeight: "1.5", 
    margin: "0 0 25px 0" 
  },
  formGroup: { 
    marginBottom: "18px" 
  },
  label: { 
    display: "block", 
    fontSize: "13px", 
    color: "#cbd5e1", 
    marginBottom: "8px", 
    fontWeight: "600" 
  },
  input: { 
    width: "100%", 
    padding: "12px", 
    borderRadius: "10px", 
    border: "1px solid #1f2937", // Diubah warna batasnya
    background: "#090d16", // Diubah latar belakang kolom input
    color: "white", 
    fontSize: "14px", 
    outline: "none" 
  },
  btn: { 
    width: "100%", 
    padding: "14px", 
    background: "#10b981", // Diubah ke warna Emerald Mint utama
    color: "#090d16", // Diubah teks tombol ke slate gelap agar kontras tinggi
    border: "none", 
    borderRadius: "10px", 
    fontWeight: "bold", 
    fontSize: "15px", 
    cursor: "pointer", 
    marginTop: "10px",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)"
  }
};