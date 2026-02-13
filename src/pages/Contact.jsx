import { personal } from "../data/personal";

export default function Contact() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Contact / Hire Me</h1>

          <p className="text-gray-600 mb-6">
            Available for Shopify and ReactJS development projects.
          </p>

          <p>Email: {personal.email}</p>
          <p>Phone: {personal.phone}</p>
        </div>

        <form className="space-y-4">
          <input className="w-full border p-3 rounded" placeholder="Name" />
          <input className="w-full border p-3 rounded" placeholder="Email" />
          <input
            className="w-full border p-3 rounded"
            placeholder="Project Type"
          />
          <textarea
            className="w-full border p-3 rounded"
            rows="5"
            placeholder="Project Details"
          />
          <button className="bg-black text-white px-6 py-3 rounded">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
