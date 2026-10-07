const steps = [
  {
    title: "Tell us the idea",
    text: "Call, stop by the shop or send a quote request with your size, location and deadline.",
  },
  {
    title: "Approve a proof",
    text: "We design it to match your brand and send a proof. Nothing is made until you sign off.",
  },
  {
    title: "We build it here",
    text: "Printed and fabricated in Delray Beach with premium, weather-resistant materials.",
  },
  {
    title: "We install it",
    text: "Our own crew handles delivery and installation, so it goes up right the first time.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-ink text-white py-20 md:py-24">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-wrap gap-x-16 gap-y-6 justify-between items-end mb-14">
          <div className="max-w-[620px]">
            <div className="eyebrow text-[#9fb4cc] mb-3">Why InstaSIGN</div>
            <h2 className="display text-4xl md:text-[3.25rem] !leading-[1.02]">
              One local shop, from first sketch to final bolt.
            </h2>
          </div>
          <p className="max-w-[420px] text-[17px] text-[#c9d3df]">
            Thousands of South Florida businesses have trusted us for nearly four
            decades. Here&apos;s how a job comes together.
          </p>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-7">
          {steps.map((step, i) => (
            <li key={step.title} className="pt-7 pb-6 border-t-2 border-[#2a3b52]">
              <div className="display text-[15px] tracking-[0.06em] text-[#ff5c86] mb-3.5 [font-stretch:120%]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-[#b3c0cf]">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
