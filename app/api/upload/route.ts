import { put } from "@vercel/blob";
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_BYTES, type ChatAttachment } from "@/lib/chat-types";

export const runtime = "nodejs";

/**
 * Accepts one customer file (image, screenshot or PDF) and stores it in Vercel
 * Blob. The chat route reads it back from there on each turn, and the URL is
 * attached to the Stripe order so the shop can download the artwork.
 */
export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      { error: "File uploads aren't set up yet. Email artwork to bill@instasign.com." },
      { status: 503 },
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "No file uploaded." }, { status: 400 });
  }
  if (!(ALLOWED_UPLOAD_TYPES as readonly string[]).includes(file.type)) {
    return Response.json({ error: "Please upload a PNG, JPG, GIF, WEBP or PDF." }, { status: 415 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return Response.json({ error: "Files must be under 4 MB. Email larger artwork to bill@instasign.com." }, { status: 413 });
  }

  const name = file.name.slice(0, 120) || "upload";
  try {
    const blob = await put(`quote-uploads/${name}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });
    const attachment: ChatAttachment = { url: blob.url, name, mediaType: file.type as ChatAttachment["mediaType"] };
    return Response.json(attachment);
  } catch (err) {
    console.error("upload failed", err);
    return Response.json({ error: "Upload failed. Please try again." }, { status: 502 });
  }
}
