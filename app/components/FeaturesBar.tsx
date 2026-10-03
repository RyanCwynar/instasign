import { Bolt, PenTool, ShieldCheck, Wrench } from "./Icons";

const features = [
  {
    icon: PenTool,
    title: "Custom design",
    text: "Work with our team to match your brand — proofs before anything gets made.",
  },
  {
    icon: Bolt,
    title: "Fast turnaround",
    text: "Made in our Delray Beach shop, so deadlines don't wait on a supplier.",
  },
  {
    icon: Wrench,
    title: "Professional install",
    text: "Our own trained crew mounts it — level, secure and in the right spot.",
  },
  {
    icon: ShieldCheck,
    title: "Built to last",
    text: "Weather-resistant materials chosen for the South Florida sun and storms.",
  },
];

export default function FeaturesBar() {
  return (
    <section className="bg-white border-b border-line">
      {/* 1px gaps over a line-colored background draw the dividers at every breakpoint */}
      <div className="max-w-[1240px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="bg-white px-6 py-8 lg:py-9 flex gap-4 items-start">
            <div className="flex-none w-11 h-11 rounded-lg bg-[#e6eef7] text-brand-blue flex items-center justify-center">
              <Icon />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">{title}</h3>
              <p className="text-[15px] leading-normal text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
