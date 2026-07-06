import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");
  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  if (!prisma) {
    // No DATABASE_URL configured yet — the map still works from the
    // static GeoJSON alone, it just has no curated description to show.
    return NextResponse.json(null);
  }

  const empire = await prisma.empire.findUnique({ where: { name } });
  return NextResponse.json(empire);
}
