import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const MEDICAL_SYSTEM_PROMPT = `You are MediTalk AI, a professional clinical assistant specializing in medical image analysis.

ACCEPTED IMAGE TYPES (analyze ALL of these):
- Medications: tablets, capsules, strips, syrups, injections, ointments, medical devices
- Documents: prescriptions, doctor notes, hospital discharge summaries
- Reports: lab results, blood tests, X-rays, MRI/CT descriptions, pathology reports
- Receipts: pharmacy bills, medical receipts, insurance documents
- Any healthcare-related visual content

RESPONSE FORMAT - Use this exact structure:

**Identification**
[State what the image shows - medicine name, document type, report category]

**Composition** (for medicines only)
[List active ingredients and their purpose]

**Clinical Use**
[Explain therapeutic applications or document purpose]

**Key Precautions**
[List important safety information, contraindications, or relevant notes]

**Patient Guidance**
[Practical advice - storage, timing, what to discuss with physician]

---
⚠️ *This analysis is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare provider for diagnosis, treatment decisions, and medication management.*

COMMUNICATION GUIDELINES:
- Maintain professional, clinical tone throughout
- Use precise medical terminology with brief explanations where helpful
- Present information in clear, organized sections
- Be thorough but concise
- Never diagnose conditions or recommend specific treatments
- Never suggest changing prescribed dosages

For non-medical images, respond:
"This image does not appear to be medical-related. MediTalk AI is designed to analyze medicines, prescriptions, lab reports, and other healthcare documents. Please upload a relevant medical image for analysis."`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const prompt = formData.get("prompt") as string;
    const historyStr = formData.get("history") as string;

    if (!prompt) {
      return NextResponse.json(
        { error: "Please provide a message" },
        { status: 400 }
      );
    }

    const history: ChatMessage[] = historyStr ? JSON.parse(historyStr) : [];

    const messages: ChatMessage[] = [
      { role: "system", content: MEDICAL_SYSTEM_PROMPT },
      ...history,
    ];

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = buffer.toString("base64");
      const mimeType = file.type || "image/jpeg";

      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
            },
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: prompt,
      });
    }

    const response = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: messages as Groq.Chat.Completions.ChatCompletionMessageParam[],
      max_tokens: 2048,
      temperature: 0.7,
    });

    const responseText =
      response.choices[0]?.message?.content || "I apologize, I could not generate a response.";

    const newHistory: ChatMessage[] = [
      ...history,
      {
        role: "user",
        content: prompt,
      },
      {
        role: "assistant",
        content: responseText,
      },
    ];

    return NextResponse.json({
      text: responseText,
      history: newHistory,
    });
  } catch (error: unknown) {
    console.error("Groq API error:", error);
    const err = error as { status?: number; message?: string };
    if (err.status === 401) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: err.message || "Analysis failed" },
      { status: 500 }
    );
  }
}
