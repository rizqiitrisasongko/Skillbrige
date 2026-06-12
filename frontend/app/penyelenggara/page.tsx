"use client";

import { useEffect, useState } from "react";

const INITIAL_WEBINARS = [
  {
    id: 1,
    title: "Cyber Security Phising Berkedok Berkah",
    category: "Tech",
    date: "10 Juni 2026",
    time: "13.20 - selesai WIB",
    fee: "Rp 10.000",
    speaker: "Farhan Reynaldi (Senior Web Engineer)",
    slots: 8,
    image: "⚡",
    flyer: "/webinar 1.jpeg",
    formLink: "https://bit.ly/WebinarMCEdition"
  }
];

type Webinar = typeof INITIAL_WEBINARS[0];

export default function AdminWebinarsPage() {
  // PERBAIKAN: Menghapus baris deklarasi state Weapon[] yang duplikat dan menyebabkan error compiler
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  
  // State Form Input
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tech");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [fee, setFee] = useState("Gratis");
  const [speaker, setSpeaker] = useState("");
  const [slots, setSlots] = useState(10);
  const [registrationLink, setRegistrationLink] = useState("");
  const [newFlyer, setNewFlyer] = useState("");

  // State Tambahan untuk Fitur Edit
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("shared_webinars_data");
    if (saved) {
      setWebinars(JSON.parse(saved));
    } else {
      setWebinars(INITIAL_WEBINARS);
      localStorage.setItem("shared_webinars_data", JSON.stringify(INITIAL_WEBINARS));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFlyer(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveWebinar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !speaker || !date || !time || !registrationLink) {
      alert("Mohon lengkapi semua field utama!");
      return;
    }

    let updatedWebinars: Webinar[] = [];

    if (editingId !== null) {
      // MODE EDIT: Update data lama berdasarkan id
      updatedWebinars = webinars.map((w) => {
        if (w.id === editingId) {
          return {
            ...w,
            title,
            category,
            date,
            time,
            fee,
            speaker,
            slots: Number(slots),
            image: category === "Tech" ? "⚡" : category === "Design" ? "🎨" : "💼",
            flyer: newFlyer || w.flyer, 
            formLink: registrationLink
          };
        }
        return w;
      });
      alert("Perubahan webinar berhasil disimpan! 📝");
    } else {
      // MODE BUAT BARU
      const newWebinar: Webinar = {
        id: Date.now(),
        title,
        category,
        date,
        time,
        fee,
        speaker,
        slots: Number(slots),
        image: category === "Tech" ? "⚡" : category === "Design" ? "🎨" : "💼",
        flyer: newFlyer || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=500&auto=format&fit=crop",
        formLink: registrationLink
      };
      updatedWebinars = [newWebinar, ...webinars];
      alert("Webinar berhasil ditambahkan dan di-publish ke Peserta! 🎉");
    }

    setWebinars(updatedWebinars);
    localStorage.setItem("shared_webinars_data", JSON.stringify(updatedWebinars));
    resetForm();
  };

  const handleEditClick = (webinar: Webinar) => {
    setEditingId(webinar.id);
    setTitle(webinar.title);
    setCategory(webinar.category);
    setDate(webinar.date);
    setTime(webinar.time);
    setFee(webinar.fee);
    setSpeaker(webinar.speaker);
    setSlots(webinar.slots);
    setRegistrationLink(webinar.formLink);
    setNewFlyer(""); 
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus webinar ini?")) {
      const updated = webinars.filter((w) => w.id !== id);
      setWebinars(updated);
      localStorage.setItem("shared_webinars_data", JSON.stringify(updated));
      if (editingId === id) resetForm();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSpeaker("");
    setDate("");
    setTime("");
    setFee("Gratis");
    setSlots(10);
    setRegistrationLink("");
    setNewFlyer("");
  };

  return (
    <main style={styles.container}>
      <nav style={styles.navbar}>
        <span style={styles.logo}>SkillBridge <span style={{ color: "#2563eb" }}>Admin Panel</span></span>
      </nav>

      <div style={styles.adminGrid}>
        {/* FORM BUAT / EDIT WEBINAR */}
        <section style={styles.cardBox}>
          <h2 style={{ marginTop: 0, color: editingId ? "#0284c7" : "#2563eb" }}>
            {editingId ? "Mode Edit Seminar 📝" : "Tambah Webinar Baru 📢"}
          </h2>
          <form onSubmit={handleSaveWebinar} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div>
              <label style={styles.label}>Judul Webinar</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} placeholder="Contoh: Belajar Next.js Tingkat Lanjut" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <label style={styles.label}>Kategori</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
                  <option value="Tech">Tech (Teknologi)</option>
                  <option value="Design">Design (Desain)</option>
                  <option value="Business">Business (Bisnis)</option>
                  <option value="Healty">Healty (kesehatan)</option>
                </select>
              </div>
              <div>
                <label style={styles.label}>Biaya Masuk</label>
                <input type="text" value={fee} onChange={(e) => setFee(e.target.value)} style={styles.input} placeholder="Contoh: Gratis atau Rp 50.000" />
              </div>
            </div>

            <div>
              <label style={styles.label}>Nama Pembicara / Mentor</label>
              <input type="text" value={speaker} onChange={(e) => setSpeaker(e.target.value)} style={styles.input} placeholder="Contoh: Alex John (Senior Dev)" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <label style={styles.label}>Tanggal Acara</label>
                <input type="text" value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} placeholder="Contoh: 15 Juli 2026" />
              </div>
              <div>
                <label style={styles.label}>Waktu Sesi</label>
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} style={styles.input} placeholder="Contoh: 19:00 - 21:00 WIB" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <label style={styles.label}>Jumlah Kuota Kursi</label>
                <input type="number" value={slots} onChange={(e) => setSlots(Number(e.target.value))} style={styles.input} />
              </div>
              <div>
                <label style={styles.label}>Upload Flyer Baru {editingId && "(Opsional)"}</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ ...styles.input, paddingTop: "8px" }} />
              </div>
            </div>

            <div>
              <label style={styles.label}>Link Tautan Pendaftaran Google Form asli</label>
              <input type="url" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} style={styles.input} placeholder="https://forms.gle/..." />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={{ ...styles.primaryBtn, background: editingId ? "#0284c7" : "#2563eb", flex: 2 }}>
                {editingId ? "Simpan Perubahan 💾" : "Publish Informasi Webinar 🚀"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} style={{ ...styles.primaryBtn, background: "#64748b", flex: 1 }}>
                  Batal
                </button>
              )}
            </div>
          </form>
        </section>

        {/* LIST WEBINAR YANG TERDAFTAR */}
        <section style={styles.cardBox}>
          <h2 style={{ marginTop: 0, color: "#232d3d" }}>Daftar Webinar Aktif ({webinars.length})</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxHeight: "650px", overflowY: "auto" }}>
            {webinars.map((webinar) => (
              <div 
                key={webinar.id} 
                style={{ 
                  ...styles.listItem, 
                  border: editingId === webinar.id ? "1px solid #0284c7" : "1px solid rgba(0,0,0,0.05)",
                  background: editingId === webinar.id ? "rgba(2, 132, 199, 0.05)" : "rgba(248, 250, 252, 0.8)"
                }}
              >
                <img src={webinar.flyer} alt="" style={styles.listThumb} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0", color: "#1e293b" }}>{webinar.title}</h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>👤 {webinar.speaker} | 💺 Sisa: {webinar.slots} Slot</p>
                </div>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button onClick={() => handleEditClick(webinar)} style={styles.editBtn}>Edit</button>
                  <button onClick={() => handleDelete(webinar.id)} style={styles.deleteBtn}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: "100vh", background: "#f8fafc", color: "#1e293b", fontFamily: "system-ui, sans-serif", paddingBottom: "40px" },
  navbar: { padding: "20px 60px", background: "#ffffff", borderBottom: "1px solid rgba(0, 0, 0, 0.05)", boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)" },
  logo: { fontSize: "20px", fontWeight: "bold", letterSpacing: "0.5px", color: "#1e293b" },
  adminGrid: { maxWidth: "1200px", margin: "40px auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "30px", padding: "0 20px" },
  cardBox: { background: "#ffffff", border: "1px solid rgba(0, 0, 0, 0.05)", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" },
  label: { display: "block", marginBottom: "6px", fontSize: "13px", color: "#64748b", fontWeight: "600" },
  input: { width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#ffffff", color: "#1e293b", boxSizing: "border-box" },
  primaryBtn: { color: "white", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", marginTop: "10px", transition: "0.2s" },
  listItem: { display: "flex", alignItems: "center", gap: "15px", padding: "15px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" },
  listThumb: { width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover" },
  editBtn: { background: "rgba(2, 132, 199, 0.1)", color: "#0284c7", border: "1px solid #0284c7", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" },
  deleteBtn: { background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid #ef4444", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }
};