import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        console.log("🔍 API received request...");

        // Получаем данные из запроса
        const body = await req.json();
        console.log("📥 Request body:", body);

        const text = body.text;
        if (!text || text.trim() === "") {
            console.error("⚠️ Error: No text provided");
            return NextResponse.json({ error: "No text provided" }, { status: 400 });
        }

        console.log("📤 Sending request to OpenAI...");
        
        // Отправляем запрос в OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // Или gpt-4, если доступен
                messages: [{ role: "user", content: `Correct this text: "${text}"` }],
            }),
        });

        console.log("📥 OpenAI Response Status:", response.status);
        const data = await response.json();
        console.log("📥 OpenAI Response Data:", data);

        if (!response.ok) {
            console.error("⚠️ OpenAI API Error:", data);
            return NextResponse.json({ error: data.error?.message || "OpenAI API error" }, { status: response.status });
        }

        console.log("✅ Correction Successful:", data.choices[0].message.content.trim());
        return NextResponse.json({ correctedText: data.choices[0].message.content.replace(/^"|"$/g, "").trim() });

    } catch (error) {
        console.error("🔥 Server Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
