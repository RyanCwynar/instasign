import Anthropic, { toFile } from "@anthropic-ai/sdk";
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_BYTES, type ChatAttachment } from "@/lib/chat-types";

export const runtime = "nodejs";

const anthropic = new Anthropic();

/**
 * Accepts one customer file (image, screenshot or PDF), uploads it to the
 * Anthropic Files API so the chat can reference it on every turn without
 * re-sending the bytes, and — when BLOB_READ_WRITE_TOKEN is set — also stores
 * a copy in Vercel Blob so the shop can download the artwork after the order.
 */
export async function POST(req: Request) {
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

  const bytes = Buffer.from(await file.arrayBuffer());
  const name = file.name.slice(0, 120) || "upload";

  try {
    const uploaded = await anthropic.files.upload({
      file: await toFile(bytes, name, { type: file.type }),
      expires_in_seconds: 60 * 60 * 24 * 30,
    });

    let url: string | undefined;
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const blob = await put(`quote-uploads/${name}`, bytes, {
        access: "public",
        addRandomSuffix: true,
        contentType: file.type,
      });
      url = blob.url;
    }

    const attachment: ChatAttachment = {
      fileId: uploaded.id,
      name,
      mediaType: file.type as ChatAttachment["mediaType"],
      url,
    };
    return Response.json(attachment);
  } catch (err) {
    console.error("upload failed", err);
    return Response.json({ error: "Upload failed. Please try again." }, { status: 502 });
  }
}
