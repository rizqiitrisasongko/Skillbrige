"use client";
import { useState, useEffect } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  // FUNGSI MENGAMBIL DATA DARI DATABASE
  useEffect(() => {
    fetch('http://localhost:4000/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  // LOGIKA FILTER MENGGUNAKAN DATA DARI DATABASE
  const filteredCourses = courses.filter((course: any) => {
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
      <header style={styles.header}>
        <a href="/dashboard" style={styles.backLink}>← Kembali ke Dashboard</a>
        <h1 style={styles.title}>Katalog Pelatihan SkillBridge 📚</h1>
        <p style={styles.subtitle}>Temukan pelatihan terbaik berdasarkan minat dan level kemampuanmu</p>
      </header>

      <section style={styles.filterSection}>
        <input
          type="text"
          placeholder="🔍 Cari nama pelatihan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <div style={styles.selectGroup}>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={styles.select}>
            <option value="All">Semua Kategori</option>
            <option value="Tech">Tech / Koding</option>
            <option value="Design">UI/UX Design</option>
            <option value="Business">Bisnis</option>
          </select>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} style={styles.select}>
            <option value="All">Semua Level</option>
            <option value="Beginner">Beginner (Pemula)</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced (Mahir)</option>
          </select>
        </div>
      </section>

      <section style={styles.grid}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course: any) => (
            <div key={course.id} style={styles.card}>
              <div style={styles.badgeGroup}>
                <span style={styles.badgeCategory}>{course.category || 'Umum'}</span>
                <span style={styles.badgeLevel}>{course.level || 'Semua'}</span>
              </div>
              <h3 style={styles.courseTitle}>{course.title}</h3>
              <p style={styles.mentorText}>Mentor: {course.mentor || 'TBA'}</p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>{course.price}</span>
                <button onClick={() => handleEnroll(course.title)} style={styles.enrollButton}>
                  Ikuti Kelas
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noResult}>Sedang memuat data atau pelatihan tidak ditemukan...</p>
        )}
      </section>
    </main>
  );
}

// Styles tetap sama seperti yang kamu berikan
const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: "100vh", backgroundColor: "#f4f7fa", color: "#1e293b", fontFamily: "'Segoe UI', sans-serif", padding: "40px 20px" },
  header: { maxWidth: "1000px", margin: "0 auto 40px auto" },
  backLink: { color: "#2563eb", textDecoration: "none", fontSize: "14px", fontWeight: "600", marginBottom: "15px", display: "inline-block" },
  title: { fontSize: "36px", fontWeight: "800", color: "#0f172a", margin: "0 0 10px 0" },
  subtitle: { color: "#475569", fontSize: "16px", margin: 0 },
  filterSection: { maxWidth: "1000px", margin: "0 auto 30px auto", display: "flex", gap: "15px", flexWrap: "wrap" },
  searchInput: { flex: 2, minWidth: "250px", padding: "14px 20px", borderRadius: "14px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", outline: "none" },
  selectGroup: { flex: 1, display: "flex", gap: "10px", minWidth: "250px" },
  select: { width: "100%", padding: "14px", borderRadius: "14px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", cursor: "pointer" },
  grid: { maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" },
  card: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "24px", padding: "28px", display: "flex", flexDirection: "column", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" },
  badgeGroup: { display: "flex", gap: "8px", marginBottom: "15px" },
  badgeCategory: { backgroundColor: "#eff6ff", color: "#2563eb", padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: "700" },
  badgeLevel: { backgroundColor: "#f1f5f9", color: "#475569", padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: "700" },
  courseTitle: { fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" },
  mentorText: { color: "#64748b", fontSize: "14px", margin: "0 0 20px 0" },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "18px", borderTop: "1px solid #f1f5f9" },
  price: { fontWeight: "800", fontSize: "18px", color: "#4f46e5" },
  enrollButton: { padding: "12px 22px", backgroundColor: "#2563eb", color: "#ffffff", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer" },
  noResult: { color: "#64748b", gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" },
};