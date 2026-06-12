"use client";

import { useState } from "react";

// 1. Data Dummy Kelas/Pelatihan
const DUMMY_COURSES = [
  { id: 1, title: "Belajar Next.js 14 untuk Pemula", category: "Tech", level: "Beginner", mentor: "Alex", price: "Gratis" },
  { id: 2, title: "Mastering TypeScript & Clean Code", category: "Tech", level: "Advanced", mentor: "Budi", price: "Rp 150.000" },
  { id: 3, title: "UI/UX Design Dasar dengan Figma", category: "Design", level: "Beginner", mentor: "Citra", price: "Gratis" },
  { id: 4, title: "Advanced Interaction Design", category: "Design", level: "Advanced", mentor: "Citra", price: "Rp 200.000" },
  { id: 5, title: "Digital Marketing untuk Startup", category: "Business", level: "Intermediate", mentor: "Dedi", price: "Rp 99.000" },
  { id: 6, title: "Manajemen Keuangan Bisnis", category: "Business", level: "Beginner", mentor: "Eka", price: "Gratis" },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  // 2. Logika Filter dan Pencarian
  const filteredCourses = DUMMY_COURSES.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnroll = (courseTitle: string) => {
  localStorage.setItem("selectedCourse", courseTitle);

  window.location.href = "/learning";
};

  return (
    <main style={styles.container}>
      {/* Header Halaman */}
      <header style={styles.header}>
        <a href="/dashboard" style={styles.backLink}>← Kembali ke Dashboard</a>
        <h1 style={styles.title}>Katalog Pelatihan SkillBridge 📚</h1>
        <p style={styles.subtitle}>Temukan pelatihan terbaik berdasarkan minat dan level kemampuanmu</p>
      </header>

      {/* Kontrol Cari & Filter */}
      <section style={styles.filterSection}>
        <input
          type="text"
          placeholder="🔍 Cari nama pelatihan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.selectGroup}>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            style={styles.select}
          >
            <option value="All">Semua Kategori</option>
            <option value="Tech">Tech / Koding</option>
            <option value="Design">UI/UX Design</option>
            <option value="Business">Bisnis</option>
          </select>

          <select 
            value={selectedLevel} 
            onChange={(e) => setSelectedLevel(e.target.value)} 
            style={styles.select}
          >
            <option value="All">Semua Level</option>
            <option value="Beginner">Beginner (Pemula)</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced (Mahir)</option>
          </select>
        </div>
      </section>

      {/* Grid List Kursus */}
      <section style={styles.grid}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} style={styles.card}>
              <div style={styles.badgeGroup}>
                <span style={styles.badgeCategory}>{course.category}</span>
                <span style={styles.badgeLevel}>{course.level}</span>
              </div>
              <h3 style={styles.courseTitle}>{course.title}</h3>
              <p style={styles.mentorText}>Mentor: {course.mentor}</p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>{course.price}</span>
                <button onClick={() => handleEnroll(course.title)} style={styles.enrollButton}>
                  Ikuti Kelas
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noResult}>Pelatihan tidak ditemukan. Coba ubah kata kunci atau filter kamu.</p>
        )}
      </section>
    </main>
  );
}

// 3. Desain UI Minimalis Cerah (Matching dengan Dashboard Utama)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f7fa", // Menggunakan warna dasar background dashboard yang putih kebiruan segar
    color: "#1e293b", // Warna teks utama abu-abu sangat gelap (hampir hitam) agar terbaca jelas
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "40px 20px",
  },
  header: {
    maxWidth: "1000px",
    margin: "0 auto 40px auto",
  },
  backLink: {
    color: "#2563eb", // Link kembali menggunakan warna biru cerah
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
    marginBottom: "15px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#0f172a", // Judul tebal hitam pekat seperti tulisan "Selamat Datang Kembali"
    margin: "0 0 10px 0",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#475569", // Subtitle abu-abu sedang yang bersih
    fontSize: "16px",
    margin: 0,
  },
  filterSection: {
    maxWidth: "1000px",
    margin: "0 auto 30px auto",
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: 2,
    minWidth: "250px",
    padding: "14px 20px",
    borderRadius: "14px", // Sudut melengkung modern, tidak terlalu bulat kapsul
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff", // Input putih bersih
    color: "#0f172a",
    fontSize: "15px",
    outline: "none",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", // Shadow halus bawaan browser modern
  },
  selectGroup: {
    flex: 1,
    display: "flex",
    gap: "10px",
    minWidth: "250px",
  },
  select: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    color: "#475569",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  grid: {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px",
  },
  card: {
    backgroundColor: "#ffffff", // Kotak kelas putih bersih sesuai card bawah dashboard kamu
    border: "1px solid #e2e8f0",
    borderRadius: "24px", // Melengkung tebal yang estetik (seperti card Jelajahi Kelas Online)
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)", // Bayangan lembut agar terlihat melayang tipis
  },
  badgeGroup: {
    display: "flex",
    gap: "8px",
    marginBottom: "15px",
  },
  badgeCategory: {
    backgroundColor: "#eff6ff", // Biru sangat muda transparan
    color: "#2563eb", // Teks biru cerah
    padding: "6px 14px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "700",
  },
  badgeLevel: {
    backgroundColor: "#f1f5f9", // Abu-abu muda netral
    color: "#475569",
    padding: "6px 14px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "700",
  },
  courseTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a", // Judul kursus hitam tegas
    margin: "0 0 8px 0",
    lineHeight: "1.4",
  },
  mentorText: {
    color: "#64748b", // Nama mentor abu-abu halus
    fontSize: "14px",
    margin: "0 0 20px 0",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: "18px",
    borderTop: "1px solid #f1f5f9",
  },
  price: {
    fontWeight: "800",
    fontSize: "18px",
    color: "#4f46e5", // Warna ungu/biru gelap cerah (senada teks nama user di dashboard)
  },
  enrollButton: {
    padding: "12px 22px",
    backgroundColor: "#2563eb", // Biru cerah, sama persis dengan tombol "Dashboard Profil" milikmu
    color: "#ffffff",
    border: "none",
    borderRadius: "12px", // Sudut melengkung kotak manis, tidak bulat kapsul penuh
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)", // Efek bersinar biru lembut di bawah tombol
  },
  noResult: {
    color: "#64748b",
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "40px 0",
  },
};