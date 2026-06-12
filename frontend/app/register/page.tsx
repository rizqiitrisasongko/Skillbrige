"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    const user = {
      nama,
      email,
      password,
    };

    localStorage.setItem("skillbridgeUser", JSON.stringify(user));

    alert("Registrasi berhasil!");
    window.location.href = "/login";
  };

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Daftar SkillBridge 🚀</h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Daftar
          </button>
        </form>

        <p style={styles.text}>
          Sudah punya akun?{" "}
          <a href="/login" style={styles.link}>
            Login
          </a>
        </p>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6", // Background abu-abu terang bawaan halaman login
  },

  card: {
    width: "420px",
    backgroundColor: "#ffffff", // Mengubah background card menjadi putih bersih
    padding: "40px",
    borderRadius: "28px", // Membuat sudut melengkung halus (seperti gambar atas)
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.03)", // Efek shadow tipis yang elegan
    fontFamily: "sans-serif",
  },

  title: {
    textAlign: "center" as const,
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937", // Warna teks judul menjadi abu-abu gelap/hitam
  },

  input: {
    width: "100%",
    padding: "14px 20px",
    marginBottom: "16px",
    borderRadius: "9999px", // Membuat input berbentuk kapsul (oval bulat penuh)
    border: "1px solid #e5e7eb", // Garis pinggir abu-abu tipis halus
    outline: "none",
    fontSize: "15px",
    color: "#4b5563",
    backgroundColor: "#ffffff",
    boxSizing: "border-box" as const,
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "9999px", // Membuat tombol berbentuk kapsul oval
    backgroundColor: "#505fe3", // Mengubah warna tombol menjadi biru keunguan (Indigo)
    color: "#ffffff", // Teks tombol putih
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
    boxSizing: "border-box" as const,
  },

  text: {
    marginTop: "24px",
    textAlign: "center" as const,
    fontSize: "14px",
    color: "#4b5563", // Teks biasa berwarna gelap santai
  },

  link: {
    color: "#3b52e2", // Warna link Login mengikuti warna tombol biru keunguan
    textDecoration: "none",
    fontWeight: "600",
  },
};