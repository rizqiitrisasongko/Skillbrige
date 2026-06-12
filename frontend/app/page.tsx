"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5">
        <h1 className="text-2xl font-bold text-blue-600">
          SkillBridge
        </h1>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-5 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Tingkatkan Skill dan Karirmu Bersama SkillBridge
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Platform yang membantu mahasiswa menemukan pelatihan,
          webinar, seminar, kursus online, dan sertifikasi
          sesuai minat serta kemampuan mereka.
        </p>

        <div className="flex gap-4">
          <Link
            href="/register"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600"
          >
            Mulai Sekarang
          </Link>

          <Link
            href="/login"
            className="border border-blue-500 text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          Kenapa Memilih SkillBridge?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              📚 Pelatihan Online
            </h3>
            <p className="text-gray-600">
              Temukan berbagai pelatihan yang sesuai dengan minat dan kebutuhanmu.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              🎓 Webinar & Seminar
            </h3>
            <p className="text-gray-600">
              Ikuti webinar dan seminar dari berbagai institusi terpercaya.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              🏆 Sertifikat Digital
            </h3>
            <p className="text-gray-600">
              Dapatkan sertifikat untuk meningkatkan portofolio dan CV.
            </p>
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="py-16 bg-blue-50">
        <div className="grid md:grid-cols-3 text-center gap-8">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">1000+</h3>
            <p>Mahasiswa Terdaftar</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-blue-600">200+</h3>
            <p>Pelatihan Tersedia</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-blue-600">50+</h3>
            <p>Mitra Penyelenggara</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white text-center py-6">
        <p>© 2026 SkillBridge. All Rights Reserved.</p>
      </footer>
    </main>
  );
}