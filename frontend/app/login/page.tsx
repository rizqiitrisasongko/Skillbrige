"use client";

import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = localStorage.getItem("skillbridgeUser");

    if (!userData) {
      alert("Akun belum terdaftar!");
      return;
    }

    const user = JSON.parse(userData);

    if (

      email === user.email &&

      password === user.password

    ) {

      alert("Login berhasil!");



      window.location.href = "/home";

    } else {

      alert("Email atau Password salah!");

    }

  };



  return (

  <main style={styles.container}>

    <div style={styles.card}>

      <div style={styles.infoBox}>

        <h2 style={styles.welcome}>Hai! 👋</h2>

        <p style={styles.infoText}>
          Selamat datang di SkillBridge.
          Silakan login untuk mengakses pelatihan,
          webinar, kursus, dan sertifikasi pilihanmu.

        </p>

      </div>



      <form onSubmit={handleLogin}>

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



        <button type="submit" style={styles.button}>

          Masuk

        </button>

      </form>



      <p style={styles.text}>

        Belum punya akun?{" "}

        <a href="/register" style={styles.link}>

          Daftar

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
    background: "#f3f4f6",
    padding: "20px",

  },



  card: {

    width: "430px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "25px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",

  },



  infoBox: {

    background: "#f5f5f5",

    borderRadius: "20px",

    padding: "20px",

    textAlign: "center" as const,

    marginBottom: "25px",

  },



  welcome: {

    marginBottom: "10px",

    color: "#111827",

  },



  infoText: {

    color: "#4b5563",

    lineHeight: "1.6",

  },



  input: {

    width: "100%",

    padding: "15px 18px",

    marginBottom: "15px",

    borderRadius: "999px",

    border: "1px solid #d1d5db",

    outline: "none",

    fontSize: "16px",

    boxSizing: "border-box" as const,

  },



  button: {

    width: "100%",

    padding: "15px",

    border: "none",

    borderRadius: "999px",

    background: "#4f5bd5",

    color: "white",

    fontWeight: "bold",

    fontSize: "18px",

    cursor: "pointer",

    marginTop: "10px",

  },



  text: {

    textAlign: "center" as const,

    marginTop: "20px",

    color: "#4b5563",

  },



  link: {

    color: "#2563eb",

    textDecoration: "none",

    fontWeight: "bold",

  },

};  