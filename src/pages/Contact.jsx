import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import PageTransition from "../components/PageTransition";
import { db, isFirebaseConfigured } from "../services/firebase";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialFormData = {
  name: "",
  email: "",
  projectType: "",
  message: "",
  website: "",
};

export default function Contact() {
  usePageSeo({
    title: "Contact Uttam Marakana",
    description:
      "Contact Uttam Marakana for Shopify development, React frontend work, ecommerce optimization, and freelance collaboration.",
    path: "/contact",
    image: "/assets/images/portfolio.webp",
    keywords: [
      "contact Shopify developer",
      "contact React developer",
      "freelance frontend developer",
      "hire ecommerce developer",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: getAbsoluteUrl("/contact"),
      name: "Contact Uttam Marakana",
    },
  });

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [detectedService, setDetectedService] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const detectService = (text) => {
    const normalizedText = text.toLowerCase();

    if (normalizedText.includes("shopify")) return "Shopify";
    if (normalizedText.includes("react")) return "React";
    if (
      normalizedText.includes("cro") ||
      normalizedText.includes("conversion")
    ) {
      return "CRO";
    }

    return "General";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      projectType: formData.projectType.trim(),
      message: formData.message.trim(),
      website: formData.website.trim(),
    };

    if (!cleanedData.name || !cleanedData.email || !cleanedData.message) {
      showToast("Please fill all required fields", "error");
      setLoading(false);
      return;
    }

    if (cleanedData.website) {
      showToast("Unable to submit the form.", "error");
      setLoading(false);
      return;
    }

    if (!EMAIL_PATTERN.test(cleanedData.email)) {
      showToast("Please enter a valid email address", "error");
      setLoading(false);
      return;
    }

    if (cleanedData.message.length < 20) {
      showToast("Please add a bit more project detail", "error");
      setLoading(false);
      return;
    }

    if (!isFirebaseConfigured || !db) {
      showToast("Contact form is not configured right now.", "error");
      setLoading(false);
      return;
    }

    const service =
      cleanedData.projectType || detectService(cleanedData.message);

    try {
      await addDoc(collection(db, "contacts"), {
        name: cleanedData.name,
        email: cleanedData.email,
        projectType: cleanedData.projectType,
        message: cleanedData.message,
        service,
        status: "new",
        source: "portfolio",
        createdAt: serverTimestamp(),
      });

      setDetectedService(service);
      showToast("Message sent successfully!", "success");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Firestore Error:", error);
      showToast("Error sending message. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="min-h-screen py-20 px-6 bg-white text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Let’s Build Something Great
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              I build performance-focused Shopify and React solutions. Open for
              freelance projects and long-term collaborations.
            </p>

            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>📧 uttammarakana03@gmail.com</p>
              <p>📍 Rajkot, Gujarat, India</p>
            </div>

            {!isFirebaseConfigured && (
              <div className="mt-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-200">
                The contact form is disabled until Firebase environment values
                are configured.
              </div>
            )}

            {detectedService && (
              <div className="mt-6 inline-block bg-indigo-600/20 border border-indigo-500 text-indigo-300 px-4 py-2 rounded-lg text-sm">
                Project categorized as: <b>{detectedService}</b>
              </div>
            )}
          </div>

          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl transition-colors duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="absolute left-4 top-2 text-xs text-gray-500">
                  Your Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="absolute left-4 top-2 text-xs text-gray-500">
                  Email Address
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="absolute left-4 top-2 text-xs text-gray-500">
                  Project Type (Shopify / React / CRO)
                </label>
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="absolute left-4 top-2 text-xs text-gray-500">
                  Project Details
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !isFirebaseConfigured}
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {toast.show && (
          <div
            className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          >
            {toast.message}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
