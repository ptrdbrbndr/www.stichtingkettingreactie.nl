import { NextRequest, NextResponse } from "next/server";

const USERS: Record<string, string> = {
  beheerder: "KettingKop2026!",
  bestuur: "StuurKetting2026!",
  tester: "TestKetting2026!",
};

export async function POST(request: NextRequest) {
  if (process.env.TEST_GATE_ENABLED !== "true") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { username, password } = await request.json();

  const expected = USERS[username as string];
  if (!expected || expected !== password) {
    return NextResponse.json(
      { error: "Ongeldige gebruikersnaam of wachtwoord" },
      { status: 401 }
    );
  }

  const secret = process.env.TEST_GATE_SESSION_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Server misconfiguratie" }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("test_gate_session", secret, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 uur
    path: "/",
  });
  return response;
}
