import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      items,
      subtotal,
      tax,
      shipping,
      total,
      currency,
      testMode = true,
    } = body;

    if (!email || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const reference =
      "PAWPATH-" +
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).toUpperCase().slice(2, 6);

    const order = {
      reference,
      status: testMode ? "test_confirmed" : "confirmed",
      createdAt: new Date().toISOString(),
      customer: { firstName, lastName, email, phone },
      shippingAddress: { address, city, state, postalCode, country },
      items,
      subtotal,
      tax,
      shipping,
      total,
      currency,
      testMode,
      payment: {
        provider: "stripe_test",
        mode: "test",
        simulated: true,
        note: "This is a test flow. No real payment was processed.",
      },
    };

    return NextResponse.json({ order, reference }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
