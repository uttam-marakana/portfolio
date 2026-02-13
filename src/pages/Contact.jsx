import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  /* ---------------- FORM INPUT ---------------- */

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ---------------- TOAST ---------------- */

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
        source: "portfolio",
        status: "new",
      });

      showToast("Message sent successfully!", "success");

      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      showToast("Error sending message. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <section className="min-h-screen bg-gray-950 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Let’s Build Something Great
          </h2>

          <p className="text-gray-400 mb-6 leading-relaxed">
            I build performance-focused Shopify and React solutions. Open for
            freelance projects and long-term collaborations.
          </p>

          <div className="space-y-2 text-gray-300">
            <p>📧 uttammarakana03@gmail.com</p>
            <p>📍 Rajkot, Gujarat, India</p>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full bg-gray-950 border border-gray-700 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label className="absolute left-4 top-2 text-xs text-gray-400 peer-focus:text-indigo-400">
                Your Name
              </label>
            </div>

            {/* EMAIL */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full bg-gray-950 border border-gray-700 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label className="absolute left-4 top-2 text-xs text-gray-400 peer-focus:text-indigo-400">
                Email Address
              </label>
            </div>

            {/* PROJECT TYPE */}
            <div className="relative">
              <input
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="peer w-full bg-gray-950 border border-gray-700 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label className="absolute left-4 top-2 text-xs text-gray-400 peer-focus:text-indigo-400">
                Project Type (Shopify / React / CRO)
              </label>
            </div>

            {/* MESSAGE */}
            <div className="relative">
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="peer w-full bg-gray-950 border border-gray-700 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label className="absolute left-4 top-2 text-xs text-gray-400 peer-focus:text-indigo-400">
                Project Details
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* TOAST */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white transition-all pointer-events-none
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}
    </section>
  );
}
