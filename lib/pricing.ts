import { z } from "zod";

/**
 * InstaSIGN instant-pricing engine.
 *
 * This is the single source of truth for online prices. The chat assistant
 * calls it through a tool to build estimates, and the checkout route calls it
 * again server-side so a customer can never pay a price the server didn't
 * compute. Tune the numbers in PRICING below; everything else derives from it.
 *
 * All money is handled in integer cents.
 */

export const PRICING = {
  /** Florida 6% + Palm Beach County 1% discretionary surtax. */
  salesTaxRate: 0.07,
  /** Smallest order we take online (before tax). */
  orderMinimumCents: 5000,

  banner: {
    label: "Vinyl Banner",
    /** Price per sq ft for one printed side, includes hemming + grommets. */
    materials: {
      "13oz_vinyl": { label: "13oz scrim vinyl", perSqFtCents: 400, doubleSidedOk: false },
      "18oz_blockout": { label: "18oz blockout vinyl", perSqFtCents: 600, doubleSidedOk: true },
      mesh: { label: "8oz mesh (wind-through)", perSqFtCents: 650, doubleSidedOk: false },
    },
    /** Second side multiplier on the printed area cost. */
    doubleSidedMultiplier: 1.75,
    minPerUnitCents: 4500,
    maxShortSideIn: 120, // 10 ft — widest we print without seaming
    maxLongSideIn: 600,
  },

  rigid_sign: {
    label: "Rigid Sign",
    /** Blank substrate cost per sq ft. Graphics are added on top, per side. */
    materials: {
      coroplast_4mm: { label: "4mm corrugated plastic (yard sign)", perSqFtCents: 150 },
      foamcore_5mm: { label: "5mm foam board (indoor only)", perSqFtCents: 250 },
      pvc_3mm: { label: "3mm PVC / Sintra", perSqFtCents: 450 },
      pvc_6mm: { label: "6mm PVC / Sintra", perSqFtCents: 650 },
      acm_3mm: { label: "3mm aluminum composite (ACM / Dibond)", perSqFtCents: 1100 },
      aluminum_040: { label: ".040 solid aluminum", perSqFtCents: 1200 },
      acrylic_3_16: { label: "3/16\" clear acrylic", perSqFtCents: 1800 },
    },
    minPerUnitCents: 3000,
    /** Largest single sheet. Bigger signs need a custom (multi-panel) quote. */
    maxSheetIn: [48, 96] as const,
  },

  adhesive_graphic: {
    label: "Vinyl Graphic / Decal",
    /** Media cost per sq ft, added to the graphic method price. */
    materials: {
      standard_vinyl: { label: "Standard adhesive vinyl", perSqFtCents: 300 },
      removable_vinyl: { label: "Removable adhesive vinyl", perSqFtCents: 400 },
      clear_vinyl: { label: "Clear vinyl", perSqFtCents: 450 },
      perforated_window: { label: "Perforated one-way window film", perSqFtCents: 600 },
      frosted_etched: { label: "Frosted / etched glass vinyl", perSqFtCents: 550 },
      reflective: { label: "Reflective vinyl", perSqFtCents: 900 },
      floor_graphic: { label: "Floor graphic w/ anti-slip laminate", perSqFtCents: 700 },
    },
    minPerUnitCents: 2500,
    maxShortSideIn: 60,
    maxLongSideIn: 600,
  },

  vehicle_magnet: {
    label: "Vehicle Magnet",
    materials: {
      magnet_30mil: { label: "30 mil vehicle magnet", perSqFtCents: 1400 },
    },
    minPerUnitCents: 4000,
    maxShortSideIn: 24,
    maxLongSideIn: 72,
  },

  /** Graphics applied to rigid signs and adhesive graphics, per printed side. */
  graphicMethods: {
    digital_print: { label: "Full-color large-format print", perSqFtCents: 350 },
    cut_vinyl: { label: "Cut vinyl lettering / logo", perSqFtCents: 500, setupCents: 2500 },
  },
  /** The second printed side costs this fraction of the first (same file, already set up). */
  secondSideFactor: 0.6,

  addons: {
    laminate: { label: "UV/scratch laminate", perSqFtCents: 150 },
    contour_cut: { label: "Contour cut to shape", perSqFtCents: 200, minCents: 1000 },
    pole_pockets: { label: "Pole pockets", perUnitCents: 1500 },
    wind_slits: { label: "Wind slits", perUnitCents: 500 },
    h_stakes: { label: "H-wire stake", perUnitCents: 250 },
    drilled_holes: { label: "Drilled mounting holes", perUnitCents: 300 },
    rounded_corners: { label: "Rounded corners", perUnitCents: 200 },
  },

  /** Quantity breaks applied to production (per line item). */
  quantityBreaks: [
    { minQty: 50, discount: 0.25 },
    { minQty: 25, discount: 0.2 },
    { minQty: 10, discount: 0.15 },
    { minQty: 5, discount: 0.1 },
  ],

  design: {
    none: { label: "Customer-supplied print-ready artwork", cents: 0 },
    setup: { label: "Artwork setup (resize / clean up customer art or logo)", cents: 4500 },
    custom: { label: "Custom design (layout from scratch, 2 revisions)", cents: 12500 },
  },

  rushMultiplier: 0.3, // +30% of production for next-business-day

  fulfillment: {
    pickup: { label: "Pickup at our Delray Beach shop", cents: 0 },
    delivery: { label: "Local delivery (Palm Beach County)", cents: 4000 },
    install: {
      label: "Professional installation (Palm Beach County)",
      tripCents: 12500,
      perSqFtCents: 300,
    },
  },
} as const;

export type ProductKey = "banner" | "rigid_sign" | "adhesive_graphic" | "vehicle_magnet";

const PRODUCT_KEYS = ["banner", "rigid_sign", "adhesive_graphic", "vehicle_magnet"] as const;
const ALL_MATERIAL_KEYS = [
  ...Object.keys(PRICING.banner.materials),
  ...Object.keys(PRICING.rigid_sign.materials),
  ...Object.keys(PRICING.adhesive_graphic.materials),
  ...Object.keys(PRICING.vehicle_magnet.materials),
] as [string, ...string[]];

export const LineItemSchema = z.object({
  product: z.enum(PRODUCT_KEYS),
  name: z.string().min(1).max(80),
  width_in: z.number().positive().max(1200),
  height_in: z.number().positive().max(1200),
  quantity: z.number().int().min(1).max(1000),
  sides: z.union([z.literal(1), z.literal(2)]),
  material: z.enum(ALL_MATERIAL_KEYS),
  graphic_method: z.enum(["digital_print", "cut_vinyl"]),
  laminate: z.boolean(),
  contour_cut: z.boolean(),
  pole_pockets: z.boolean(),
  wind_slits: z.boolean(),
  h_stakes: z.boolean(),
  drilled_holes: z.boolean(),
  rounded_corners: z.boolean(),
});

export const QuoteRequestSchema = z.object({
  items: z.array(LineItemSchema).min(1).max(20),
  design: z.enum(["none", "setup", "custom"]),
  rush: z.boolean(),
  fulfillment: z.enum(["pickup", "delivery", "install"]),
});

export type LineItemSpec = z.infer<typeof LineItemSchema>;
export type QuoteRequest = z.infer<typeof QuoteRequestSchema>;

export interface QuoteLine {
  name: string;
  detail: string;
  quantity: number;
  unitCents: number;
  totalCents: number;
}

export interface Quote {
  request: QuoteRequest;
  lines: QuoteLine[];
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  notes: string[];
}

export class PricingError extends Error {}

const sqFt = (w: number, h: number) => (w * h) / 144;
const fmtIn = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(2).replace(/\.?0+$/, "")}"`;

function quantityDiscount(qty: number): number {
  for (const tier of PRICING.quantityBreaks) {
    if (qty >= tier.minQty) return tier.discount;
  }
  return 0;
}

function checkFits(short: number, long: number, maxShort: number, maxLong: number, what: string) {
  if (short > maxShort || long > maxLong) {
    throw new PricingError(
      `${what} larger than ${fmtIn(maxShort)} x ${fmtIn(maxLong)} needs a custom quote (multi-panel / seamed).`,
    );
  }
}

/** Price one physical unit of a line item (before quantity discount). */
function priceUnit(item: LineItemSpec): { cents: number; detail: string; areaSqFt: number } {
  const area = sqFt(item.width_in, item.height_in);
  const short = Math.min(item.width_in, item.height_in);
  const long = Math.max(item.width_in, item.height_in);
  const parts: string[] = [`${fmtIn(item.width_in)} W x ${fmtIn(item.height_in)} H`];
  let cents = 0;
  let minCents = 0;

  const addPerSqFt = (rate: number) => {
    cents += rate * area;
  };

  switch (item.product) {
    case "banner": {
      const cfg = PRICING.banner;
      const mat = cfg.materials[item.material as keyof typeof cfg.materials];
      if (!mat) throw new PricingError(`"${item.material}" is not a banner material.`);
      checkFits(short, long, cfg.maxShortSideIn, cfg.maxLongSideIn, "Banners");
      if (item.sides === 2 && !mat.doubleSidedOk) {
        throw new PricingError("Double-sided banners must use 18oz_blockout so the sides don't show through.");
      }
      addPerSqFt(mat.perSqFtCents * (item.sides === 2 ? cfg.doubleSidedMultiplier : 1));
      parts.push(mat.label, item.sides === 2 ? "double-sided" : "single-sided", "hemmed + grommets");
      if (item.pole_pockets) {
        cents += PRICING.addons.pole_pockets.perUnitCents;
        parts.push("pole pockets");
      }
      if (item.wind_slits) {
        cents += PRICING.addons.wind_slits.perUnitCents;
        parts.push("wind slits");
      }
      minCents = cfg.minPerUnitCents;
      break;
    }

    case "rigid_sign": {
      const cfg = PRICING.rigid_sign;
      const mat = cfg.materials[item.material as keyof typeof cfg.materials];
      if (!mat) throw new PricingError(`"${item.material}" is not a rigid sign material.`);
      checkFits(short, long, cfg.maxSheetIn[0], cfg.maxSheetIn[1], "Rigid signs");
      addPerSqFt(mat.perSqFtCents);
      parts.push(mat.label);
      cents += priceGraphics(item, area, parts);
      if (item.h_stakes) {
        cents += PRICING.addons.h_stakes.perUnitCents;
        parts.push("H-stake");
      }
      if (item.drilled_holes) {
        cents += PRICING.addons.drilled_holes.perUnitCents;
        parts.push("drilled holes");
      }
      if (item.rounded_corners) {
        cents += PRICING.addons.rounded_corners.perUnitCents;
        parts.push("rounded corners");
      }
      minCents = cfg.minPerUnitCents;
      break;
    }

    case "adhesive_graphic": {
      const cfg = PRICING.adhesive_graphic;
      const mat = cfg.materials[item.material as keyof typeof cfg.materials];
      if (!mat) throw new PricingError(`"${item.material}" is not a decal / graphic material.`);
      checkFits(short, long, cfg.maxShortSideIn, cfg.maxLongSideIn, "Vinyl graphics");
      addPerSqFt(mat.perSqFtCents);
      parts.push(mat.label);
      cents += priceGraphics(item, area, parts);
      minCents = cfg.minPerUnitCents;
      break;
    }

    case "vehicle_magnet": {
      const cfg = PRICING.vehicle_magnet;
      const mat = cfg.materials[item.material as keyof typeof cfg.materials];
      if (!mat) throw new PricingError(`"${item.material}" is not a magnet material.`);
      checkFits(short, long, cfg.maxShortSideIn, cfg.maxLongSideIn, "Vehicle magnets");
      addPerSqFt(mat.perSqFtCents);
      parts.push(mat.label, "full-color print");
      if (item.rounded_corners) {
        cents += PRICING.addons.rounded_corners.perUnitCents;
        parts.push("rounded corners");
      }
      minCents = cfg.minPerUnitCents;
      break;
    }
  }

  return { cents: Math.max(Math.round(cents), minCents), detail: parts.join(" · "), areaSqFt: area };
}

/** Graphics cost (per unit) for products that take a print or cut-vinyl graphic. */
function priceGraphics(item: LineItemSpec, area: number, parts: string[]): number {
  const method = PRICING.graphicMethods[item.graphic_method];
  const sideFactor = item.sides === 2 ? 1 + PRICING.secondSideFactor : 1;
  let cents = method.perSqFtCents * area * sideFactor;
  parts.push(`${method.label}, ${item.sides === 2 ? "both sides" : "one side"}`);

  if (item.graphic_method === "digital_print" && item.laminate) {
    cents += PRICING.addons.laminate.perSqFtCents * area * sideFactor;
    parts.push("laminated");
  }
  if (item.contour_cut) {
    cents += Math.max(PRICING.addons.contour_cut.perSqFtCents * area, PRICING.addons.contour_cut.minCents);
    parts.push("contour cut");
  }
  return cents;
}

export function calculateQuote(input: unknown): Quote {
  const parsed = QuoteRequestSchema.safeParse(input);
  if (!parsed.success) {
    throw new PricingError(`Invalid quote request: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
  }
  const req = parsed.data;
  const lines: QuoteLine[] = [];
  const notes: string[] = [];
  let productionCents = 0;
  let totalAreaSqFt = 0;
  let cutVinylSetupNeeded = false;

  for (const item of req.items) {
    const unit = priceUnit(item);
    const discount = quantityDiscount(item.quantity);
    const unitCents = Math.round(unit.cents * (1 - discount));
    const detail = discount > 0 ? `${unit.detail} · ${Math.round(discount * 100)}% qty discount` : unit.detail;
    lines.push({ name: item.name, detail, quantity: item.quantity, unitCents, totalCents: unitCents * item.quantity });
    productionCents += unitCents * item.quantity;
    totalAreaSqFt += unit.areaSqFt * item.quantity;
    if (item.graphic_method === "cut_vinyl" && item.product !== "banner" && item.product !== "vehicle_magnet") {
      cutVinylSetupNeeded = true;
    }
  }

  if (cutVinylSetupNeeded) {
    const setup = PRICING.graphicMethods.cut_vinyl.setupCents;
    lines.push({ name: "Cut vinyl setup", detail: "Vector prep, weeding and transfer tape", quantity: 1, unitCents: setup, totalCents: setup });
    productionCents += setup;
  }

  if (req.rush) {
    const rush = Math.round(productionCents * PRICING.rushMultiplier);
    lines.push({ name: "Rush production", detail: "Next business day", quantity: 1, unitCents: rush, totalCents: rush });
  }

  const design = PRICING.design[req.design];
  if (design.cents > 0) {
    lines.push({ name: "Design", detail: design.label, quantity: 1, unitCents: design.cents, totalCents: design.cents });
  }

  if (req.fulfillment === "delivery") {
    const d = PRICING.fulfillment.delivery;
    lines.push({ name: "Delivery", detail: d.label, quantity: 1, unitCents: d.cents, totalCents: d.cents });
  } else if (req.fulfillment === "install") {
    const i = PRICING.fulfillment.install;
    const cents = Math.round(i.tripCents + i.perSqFtCents * totalAreaSqFt);
    lines.push({ name: "Installation", detail: i.label, quantity: 1, unitCents: cents, totalCents: cents });
    notes.push("Installation assumes standard flat-surface mounting; we'll confirm site details before scheduling.");
  }

  let subtotalCents = lines.reduce((sum, l) => sum + l.totalCents, 0);
  if (subtotalCents < PRICING.orderMinimumCents) {
    const bump = PRICING.orderMinimumCents - subtotalCents;
    lines.push({ name: "Small order adjustment", detail: `Online order minimum is $${PRICING.orderMinimumCents / 100}`, quantity: 1, unitCents: bump, totalCents: bump });
    subtotalCents = PRICING.orderMinimumCents;
  }

  const taxCents = Math.round(subtotalCents * PRICING.salesTaxRate);
  return { request: req, lines, subtotalCents, taxCents, totalCents: subtotalCents + taxCents, notes };
}

/** Human-readable catalog for the assistant's system prompt, generated from PRICING. */
export function describeCatalog(): string {
  const mats = (m: Record<string, { label: string }>) =>
    Object.entries(m)
      .map(([k, v]) => `    - ${k}: ${v.label}`)
      .join("\n");
  return [
    `banner (${PRICING.banner.label}) — printed full color, hemmed with grommets. Max ${PRICING.banner.maxShortSideIn}" on the short side. Double-sided requires 18oz_blockout. Optional pole_pockets, wind_slits.`,
    mats(PRICING.banner.materials),
    `rigid_sign (${PRICING.rigid_sign.label}) — substrate + graphics. Must fit a ${PRICING.rigid_sign.maxSheetIn[0]}" x ${PRICING.rigid_sign.maxSheetIn[1]}" sheet. graphic_method digital_print (full color, laminate recommended outdoors) or cut_vinyl (solid colors). Optional h_stakes (yard signs), drilled_holes, rounded_corners, contour_cut.`,
    mats(PRICING.rigid_sign.materials),
    `adhesive_graphic (${PRICING.adhesive_graphic.label}) — decals, window, wall and floor graphics, stickers. graphic_method digital_print or cut_vinyl. Optional contour_cut, laminate (digital only).`,
    mats(PRICING.adhesive_graphic.materials),
    `vehicle_magnet (${PRICING.vehicle_magnet.label}) — full color, max ${PRICING.vehicle_magnet.maxShortSideIn}" x ${PRICING.vehicle_magnet.maxLongSideIn}". Optional rounded_corners.`,
    mats(PRICING.vehicle_magnet.materials),
    `Order options: design = none | setup | custom; rush = next business day (+${PRICING.rushMultiplier * 100}%); fulfillment = pickup | delivery | install.`,
    `Quantity breaks: 5+ 10%, 10+ 15%, 25+ 20%, 50+ 25%. Online order minimum $${PRICING.orderMinimumCents / 100}. Sales tax ${PRICING.salesTaxRate * 100}%.`,
  ].join("\n");
}

export const formatCents = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
