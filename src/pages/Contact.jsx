import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import PageTransition from "../components/PageTransition";
import { db, isFirebaseConfigured } from "../services/firebase";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const serviceOptions = ["Shopify", "React", "CRO", "General"];
const engagementNotes = [
  "Storefront redesigns and theme customization",
  "React interface implementation and refactors",
  "Performance cleanup on existing frontend systems",
];

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
      <section className="px-3 pt-6 pb-8">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            <div className="premium-panel px-6 py-8 md:px-8">
              <span className="eyebrow">Contact</span>
              <h1 className="section-title mt-5">
                If the frontend needs to feel cleaner, faster, and more deliberate, send the brief.
              </h1>

              <p className="section-copy mt-5">
                I take on Shopify and React work where interface quality,
                structure, and practical delivery all need to improve together.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="metric-card">
                  <p className="metric-label">Email</p>
                  <p className="mt-3 text-lg font-medium">
                    uttammarakana03@gmail.com
                  </p>
                </div>
                <div className="metric-card">
                  <p className="metric-label">Location</p>
                  <p className="mt-3 text-lg font-medium">
                    Rajkot, Gujarat, India
                  </p>
                </div>
              </div>
            </div>

            <div className="premium-panel p-6 md:p-8">
              <span className="eyebrow">Good fit</span>
              <h2 className="section-title mt-5">Typical engagements</h2>
              <ul className="mt-6 space-y-3">
                {engagementNotes.map((note) => (
                  <li
                    key={note}
                    className="rounded-[1.4rem] border border-[var(--line-soft)] bg-white/6 px-4 py-4 text-sm leading-7 text-[var(--text-2)]"
                  >
                    {note}
                  </li>
                ))}
              </ul>

              {!isFirebaseConfigured && (
                <div className="mt-6 rounded-[1.4rem] border border-amber-500/40 bg-amber-500/10 px-4 py-4 text-sm text-amber-700 dark:text-amber-200">
                  The form is intentionally disabled until Firebase environment
                  values are configured.
                </div>
              )}

              {detectedService && (
                <div className="mt-6 rounded-[1.4rem] border border-[var(--line-soft)] bg-white/6 px-4 py-4 text-sm text-[var(--text-2)]">
                  Request categorized as{" "}
                  <b className="text-[var(--text-1)]">{detectedService}</b>.
                </div>
              )}
            </div>
          </div>

          <div className="premium-panel p-6 md:p-8">
            <span className="eyebrow">Project brief</span>
            <h2 className="section-title mt-5">Send the details</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-2)]">
              A clear summary of the current problem, target outcome, and stack
              is enough to start the conversation.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">
                    Your name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-[1.3rem] border border-[var(--line-soft)] bg-white/6 px-4 py-4 outline-none focus:border-[var(--brand-1)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-[1.3rem] border border-[var(--line-soft)] bg-white/6 px-4 py-4 outline-none focus:border-[var(--brand-1)]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">
                  Project type
                </span>
                <input
                  type="text"
                  name="projectType"
                  list="project-type-options"
                  value={formData.projectType}
                  onChange={handleChange}
                  placeholder="Shopify, React, CRO, or General"
                  className="w-full rounded-[1.3rem] border border-[var(--line-soft)] bg-white/6 px-4 py-4 outline-none focus:border-[var(--brand-1)]"
                />
                <datalist id="project-type-options">
                  {serviceOptions.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </label>

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

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">
                  Project details
                </span>
                <textarea
                  name="message"
                  rows="7"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[1.3rem] border border-[var(--line-soft)] bg-white/6 px-4 py-4 outline-none focus:border-[var(--brand-1)]"
                />
              </label>

              <button
                type="submit"
                disabled={loading || !isFirebaseConfigured}
                className="premium-button premium-button--solid w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && (
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                )}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {toast.show && (
          <div
            className={`fixed bottom-6 right-6 z-40 rounded-2xl px-6 py-4 shadow-2xl text-white
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          >
            {toast.message}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
