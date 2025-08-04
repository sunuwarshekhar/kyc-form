import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const response = await fetch(
      `https://xlit-api.ai4bharat.org/tl/ne/${encodeURIComponent(text)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      transliterated: data.result || data.output || data,
      original: text,
    });
  } catch (error) {
    console.error("Transliteration API error:", error);
    return NextResponse.json(
      {
        error: "Failed to transliterate text",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const text = searchParams.get("text");

  if (!text) {
    return NextResponse.json(
      { error: "Text parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://xlit-api.ai4bharat.org/tl/ne/${encodeURIComponent(text)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      transliterated: data.result || data.output || data,
      original: text,
    });
  } catch (error) {
    console.error("Transliteration API error:", error);
    return NextResponse.json(
      {
        error: "Failed to transliterate text",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
