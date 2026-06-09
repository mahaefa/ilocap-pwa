import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, email, entreprise, score_diagnostic, roi_estime, opt_in } = body;

    if (!nom || !email) {
      return NextResponse.json(
        { error: "Nom et email requis" },
        { status: 400 }
      );
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email invalide" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          nom,
          email,
          entreprise: entreprise || null,
          score_diagnostic: score_diagnostic || 0,
          roi_estime: roi_estime || 0,
          opt_in: opt_in || false,
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Cet email est deja enregistre" },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur API diagnostic:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}