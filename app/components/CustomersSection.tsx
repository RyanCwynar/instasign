import Image from "next/image";

const customers = [
  { src: "/atlantic-comm.png", alt: "Atlantic Comm" },
  { src: "/bark-logo.png", alt: "BARK" },
  { src: "/big-apple.png", alt: "Big Apple" },
  { src: "/raveis.png", alt: "Raveis" },
  { src: "/engel-volkers.png", alt: "Engel & Völkers" },
  { src: "/delray-beach-club.png", alt: "Delray Beach Club" },
];

export default function CustomersSection() {
  return (
    <section id="customers" className="bg-white py-14 border-b border-line">
      <div className="max-w-[1240px] mx-auto px-6 flex flex-wrap gap-x-14 gap-y-7 items-center">
        <p className="basis-[200px] font-semibold text-[15px] leading-snug text-muted">
          Trusted by businesses across South Florida
        </p>
        <div className="flex-[1_1_600px] min-w-0 grid grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-8 items-center justify-items-center">
          {customers.map((customer) => (
            <Image
              key={customer.src}
              src={customer.src}
              alt={customer.alt}
              width={150}
              height={50}
              className="h-10 w-auto object-contain grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
