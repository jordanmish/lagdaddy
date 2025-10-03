import { useState } from 'react';

const faqs = [
  {
    question: 'How do I start a return?',
    answer:
      'Initiate a return within 30 days of delivery. Complete the returns form below and our concierge team will email a prepaid shipping label within one business day.',
  },
  {
    question: 'When will my order ship?',
    answer:
      'Standard orders ship within two business days. Expedited orders placed before 12 p.m. ship the same day. Track progress through the shipping form or your account.',
  },
  {
    question: 'What is covered under the Lag Daddy warranty?',
    answer:
      'Lag Daddy apparel is covered for manufacturing defects for 365 days from purchase. Wear and tear from play is expected, but seams, zippers, and hardware failures are always on us.',
  },
  {
    question: 'Can I edit or cancel my order after purchase?',
    answer:
      'Orders can be edited or canceled within one hour of purchase. Submit a shipping request with your order number and our team will update you promptly.',
  },
];

export default function Help() {
  const [returnsSubmitted, setReturnsSubmitted] = useState(false);
  const [shippingSubmitted, setShippingSubmitted] = useState(false);
  const [warrantySubmitted, setWarrantySubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  return (
    <main className="pt-32 pb-24 px-6 bg-neutral-950 min-h-screen text-white">
      <div className="container mx-auto max-w-5xl space-y-16">
        <header className="text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Support</p>
          <h1 className="text-4xl md:text-5xl font-light uppercase tracking-[0.25em]">Help &amp; FAQs</h1>
          <p className="text-neutral-400 max-w-3xl mx-auto font-light text-lg">
            Find answers fast, start a return, or connect with the Lag Daddy concierge team for shipping, warranty, and general questions.
          </p>
        </header>

        <section aria-labelledby="faq-heading" className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 md:p-12 space-y-8">
          <div>
            <h2 id="faq-heading" className="text-2xl font-light uppercase tracking-[0.3em] mb-6">FAQs</h2>
            <p className="text-neutral-400 font-light">
              Tap a question to reveal our most requested answers.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group border border-neutral-800 rounded-2xl bg-black/40"
              >
                <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4">
                  <span className="text-lg font-light text-white group-open:text-white/80">
                    {item.question}
                  </span>
                  <span className="text-neutral-500 group-open:rotate-45 transition-transform duration-200 text-xl" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-neutral-300 font-light leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="returns-form" className="grid gap-12 lg:grid-cols-2">
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 md:p-12">
            <h2 id="returns-form" className="text-2xl font-light uppercase tracking-[0.3em] mb-4">Returns Concierge</h2>
            <p className="text-neutral-400 font-light mb-8">
              Share your order number and a few details to generate a prepaid label. A confirmation email will arrive shortly after submission.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setReturnsSubmitted(true);
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="return-order" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Order Number
                </label>
                <input
                  id="return-order"
                  name="return-order"
                  type="text"
                  required
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="LD-123456"
                />
              </div>
              <div>
                <label htmlFor="return-email" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Email Address
                </label>
                <input
                  id="return-email"
                  name="return-email"
                  type="email"
                  required
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="return-reason" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Return Reason
                </label>
                <select
                  id="return-reason"
                  name="return-reason"
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  defaultValue="fit"
                >
                  <option value="fit">Fit Issue</option>
                  <option value="defect">Product Defect</option>
                  <option value="exchange">Exchange Request</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="return-notes" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Notes for Concierge
                </label>
                <textarea
                  id="return-notes"
                  name="return-notes"
                  rows={4}
                  className="w-full bg-black/60 border border-neutral-700 rounded-3xl px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="Let us know about sizing, defects, or special requests."
                />
              </div>
              <button
                type="submit"
                className="w-full px-10 py-4 rounded-full bg-white text-black uppercase tracking-[0.3em] font-light hover:bg-neutral-200 transition-colors duration-300"
              >
                Start Return
              </button>
              {returnsSubmitted && (
                <p className="text-sm text-emerald-300 font-light">
                  Thanks! Your return request is in motion. Look for your label in the next business day.
                </p>
              )}
            </form>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 md:p-12">
            <h2 id="shipping-form" className="text-2xl font-light uppercase tracking-[0.3em] mb-4">Shipping Assistance</h2>
            <p className="text-neutral-400 font-light mb-8">
              Track a delivery, update an address, or request expedited handling. Provide your order number for the fastest service.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setShippingSubmitted(true);
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="shipping-order" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Order Number
                </label>
                <input
                  id="shipping-order"
                  name="shipping-order"
                  type="text"
                  required
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="LD-654321"
                />
              </div>
              <div>
                <label htmlFor="shipping-postal" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Postal Code
                </label>
                <input
                  id="shipping-postal"
                  name="shipping-postal"
                  type="text"
                  required
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="90210"
                />
              </div>
              <div>
                <label htmlFor="shipping-topic" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Topic
                </label>
                <select
                  id="shipping-topic"
                  name="shipping-topic"
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  defaultValue="status"
                >
                  <option value="status">Where is my order?</option>
                  <option value="update">Update shipping address</option>
                  <option value="expedite">Request expedited shipping</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div>
                <label htmlFor="shipping-notes" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Details
                </label>
                <textarea
                  id="shipping-notes"
                  name="shipping-notes"
                  rows={4}
                  className="w-full bg-black/60 border border-neutral-700 rounded-3xl px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="Share tracking concerns or delivery instructions."
                />
              </div>
              <button
                type="submit"
                className="w-full px-10 py-4 rounded-full bg-white text-black uppercase tracking-[0.3em] font-light hover:bg-neutral-200 transition-colors duration-300"
              >
                Request Update
              </button>
              {shippingSubmitted && (
                <p className="text-sm text-emerald-300 font-light">
                  Your shipping specialist is on it. Expect an update with tracking details soon.
                </p>
              )}
            </form>
          </div>
        </section>

        <section aria-labelledby="warranty-contact" className="grid gap-12 lg:grid-cols-2">
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 md:p-12">
            <h2 id="warranty-contact" className="text-2xl font-light uppercase tracking-[0.3em] mb-4">Warranty Claim</h2>
            <p className="text-neutral-400 font-light mb-8">
              Submit a claim for defects within one year of purchase. Include photos or videos through the link we send after review.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setWarrantySubmitted(true);
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="warranty-product" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Product Name or SKU
                </label>
                <input
                  id="warranty-product"
                  name="warranty-product"
                  type="text"
                  required
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="Lag Daddy Tour Polo"
                />
              </div>
              <div>
                <label htmlFor="warranty-date" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Purchase Date
                </label>
                <input
                  id="warranty-date"
                  name="warranty-date"
                  type="date"
                  required
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>
              <div>
                <label htmlFor="warranty-issue" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Issue Description
                </label>
                <textarea
                  id="warranty-issue"
                  name="warranty-issue"
                  rows={4}
                  className="w-full bg-black/60 border border-neutral-700 rounded-3xl px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="Describe the defect or failure you experienced."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-10 py-4 rounded-full bg-white text-black uppercase tracking-[0.3em] font-light hover:bg-neutral-200 transition-colors duration-300"
              >
                Submit Claim
              </button>
              {warrantySubmitted && (
                <p className="text-sm text-emerald-300 font-light">
                  Thanks! Our quality team will respond within two business days with next steps.
                </p>
              )}
            </form>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-light uppercase tracking-[0.3em] mb-4">Contact Us</h2>
            <p className="text-neutral-400 font-light mb-8">
              Prefer a direct line? Send a message and our concierge will respond from concierge@lagdaddy.com.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setContactSubmitted(true);
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="contact-name" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  name="contact-name"
                  type="text"
                  required
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="Jordan Brooks"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="contact-email"
                  type="email"
                  required
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-topic" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Topic
                </label>
                <select
                  id="contact-topic"
                  name="contact-topic"
                  className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  defaultValue="general"
                >
                  <option value="general">General question</option>
                  <option value="product">Product advice</option>
                  <option value="event">Event inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="contact-message"
                  rows={5}
                  className="w-full bg-black/60 border border-neutral-700 rounded-3xl px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="Tell us how we can help."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-10 py-4 rounded-full bg-white text-black uppercase tracking-[0.3em] font-light hover:bg-neutral-200 transition-colors duration-300"
              >
                Send Message
              </button>
              {contactSubmitted && (
                <p className="text-sm text-emerald-300 font-light">
                  Message received. Keep an eye on your inbox for a personal note from our concierge team.
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
