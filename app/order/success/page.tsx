import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { formatCents } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Order received | InstaSIGN",
  robots: { index: false },
};

async function loadSession(sessionId: string | undefined) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session = await loadSession(session_id);
  const paid = session?.payment_status === "paid";

  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-gray-50 py-20 px-6">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {paid ? "Thanks — your order is in!" : "Thanks — we've got your order"}
          </h1>
          {session?.amount_total != null && (
            <p className="text-lg text-gray-700 mb-2">
              {paid ? "Paid" : "Total"}: <strong>{formatCents(session.amount_total)}</strong>
            </p>
          )}
          {session?.customer_details?.email && (
            <p className="text-gray-600 mb-6">A receipt is on its way to {session.customer_details.email}.</p>
          )}
          <p className="text-gray-600 mb-8">
            Next, we&apos;ll email you a digital proof to approve before anything is printed. Questions? Call{" "}
            <a href="tel:+15616857335" className="text-primary font-semibold">(561) 685-7335</a>.
          </p>
          <Link href="/" className="btn btn-primary">Back to home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
