import { ArrowUpRight } from "./Icons";

const featured = {
  name: "H. Kennemer",
  text: "InstaSIGN does an excellent job every time! Coastal Commercial Group has used InstaSIGN for almost 10 years. Our signs always look great and are ready very quickly. Thank you Bill and Tom, great job.",
};

const reviews = [
  {
    name: "Craig McInnis",
    text: "I have been doing business with InstaSIGN for many years. They are always on point, great at meeting deadlines and always rise to design challenges. Quality work by great people!",
  },
  {
    name: "Suzan Santosus",
    text: "We have been using InstaSIGN for over 10 years quality and pricing are phenomenal. I highly recommend them.",
  },
  {
    name: "Stephen Jara",
    text: "Bill and Insta Sign has provided the finest quality and service a business could demand. Friendly and professional, the staff does a fantastic job.",
  },
  {
    name: "G Damage",
    text: "Got to be the best place and prices for signs that I have found in a long time. The owner and staff are very courteous and helpful with creating the perfect sign for your business.",
  },
  {
    name: "Kelsey Johnson",
    text: "Bill is AWESOME! He is very friendly and goes over and beyond to help us out. They have GREAT prices for quality copies in bulk.",
  },
];

function Stars({ className }: { className: string }) {
  return (
    <div className={`text-[#e0a100] ${className}`} aria-label="Five stars">
      ★★★★★
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-20 md:py-26">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-wrap gap-12 mb-12">
          <div className="flex-[1_1_360px] min-w-0">
            <div className="eyebrow text-brand-red mb-3">Reviews</div>
            <h2 className="display text-4xl md:text-[3.25rem] !leading-[1.02] mb-5">
              Customers stick with us for decades.
            </h2>
            <a
              href="https://www.google.com/search?q=InstaSIGN+Delray+Beach"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex gap-2 items-center py-2.5 font-semibold text-brand-blue hover:text-[#003d74]"
            >
              Read more on Google
              <ArrowUpRight />
            </a>
          </div>
          <figure className="flex-[1.6_1_520px] min-w-0 bg-white border border-line rounded-xl p-8 md:p-10">
            <Stars className="text-[22px] tracking-[3px] mb-4" />
            <blockquote className="font-[family-name:var(--font-archivo)] font-medium text-xl md:text-[26px] leading-snug mb-6">
              &ldquo;{featured.text}&rdquo;
            </blockquote>
            <figcaption className="font-semibold text-muted">
              {featured.name} · Coastal Commercial Group
            </figcaption>
          </figure>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="bg-white border border-line rounded-xl p-7 flex flex-col gap-3.5"
            >
              <Stars className="text-[17px] tracking-[2px]" />
              <blockquote className="text-base leading-relaxed text-[#2a3646] grow">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="font-semibold text-[15px] text-muted">{review.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
