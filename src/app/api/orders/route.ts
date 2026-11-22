import { NextRequest, NextResponse } from "next/server";
import { OrderApiSchema } from "@/lib/validations";
import { generateOrderReference } from "@/lib/utils";
import { PRODUCT } from "@/lib/products";

export interface StoredOrder {
  orderId: string;
  orderNumber: string;
  createdAt: string;
  status: "Confirmed" | "Preparing" | "In Transit" | "Delivered";
  customer: {
    fullName: string;
    email: string;
    phone: string;
    houseBuilding: string;
    streetArea: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  deliveryMethod: "standard" | "express";
  paymentMethod: string;
  estimatedDelivery: string;
}

const ordersStore = new Map<string, StoredOrder>();

function calculateEstimatedDelivery(method: "standard" | "express"): string {
  const daysToAdd = method === "express" ? 3 : 5;
  const d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = OrderApiSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please check the highlighted fields.",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { customer, items, deliveryMethod, paymentMethod } = result.data;

    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    let shipping = 0;
    if (deliveryMethod === "express") {
      shipping = 199;
    } else {
      shipping = subtotal >= PRODUCT.freeShippingThreshold ? 0 : 99;
    }

    const total = subtotal + shipping;
    const orderNumber = generateOrderReference();
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const estimatedDelivery = calculateEstimatedDelivery(deliveryMethod);

    const orderRecord: StoredOrder = {
      orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      customer,
      items,
      subtotal,
      shipping,
      total,
      deliveryMethod,
      paymentMethod,
      estimatedDelivery,
    };

    ordersStore.set(orderId, orderRecord);
    ordersStore.set(orderNumber, orderRecord);

    return NextResponse.json({
      success: true,
      message: "Your order is confirmed.",
      order: orderRecord,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Let's try that again.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Order reference is required." },
      { status: 400 }
    );
  }

  const order = ordersStore.get(id);

  if (!order) {
    return NextResponse.json(
      { success: false, error: "Order not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, order });
}
