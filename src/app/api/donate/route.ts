import { NextRequest, NextResponse } from "next/server";

const MOLLIE_API_KEY = process.env.MOLLIE_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.stichtingkettingreactie.nl";

export async function POST(request: NextRequest) {
  // Feature toggle check (server-side)
  if (process.env.NEXT_PUBLIC_FEATURE_MOLLIE_DONATIONS !== "true") {
    return NextResponse.json(
      { error: "Online donaties zijn momenteel niet beschikbaar." },
      { status: 503 }
    );
  }

  if (!MOLLIE_API_KEY) {
    return NextResponse.json(
      { error: "Betalingsconfiguratie ontbreekt." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { amount, name, email } = body;

    // Validate amount
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 1 || numAmount > 25000) {
      return NextResponse.json(
        { error: "Voer een geldig bedrag in tussen €1 en €25.000." },
        { status: 400 }
      );
    }

    // Create Mollie payment
    const response = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MOLLIE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: {
          currency: "EUR",
          value: numAmount.toFixed(2),
        },
        description: `Donatie Stichting Kettingreactie${name ? ` - ${name}` : ""}`,
        redirectUrl: `${BASE_URL}/steun-ons?donatie=bedankt`,
        metadata: {
          donor_name: name || "Anoniem",
          donor_email: email || null,
        },
        // Allow all available payment methods
        method: undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mollie API error:", errorData);
      return NextResponse.json(
        { error: "Kon betaling niet aanmaken. Probeer het later opnieuw." },
        { status: 502 }
      );
    }

    const payment = await response.json();

    return NextResponse.json({
      checkoutUrl: payment._links.checkout.href,
    });
  } catch (error) {
    console.error("Donate API error:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden." },
      { status: 500 }
    );
  }
}
