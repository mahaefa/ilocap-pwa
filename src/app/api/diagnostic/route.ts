import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Les clients sont instanciés dans le handler pour éviter
// les erreurs au build quand les variables d'env sont absentes

// Force le rendu dynamique : cette route ne doit pas être exécutée au build
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Instanciation ici : les variables sont lues au runtime, pas au build
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const resendKey = process.env.RESEND_API_KEY || "";

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("ERREUR: Variables Supabase manquantes !");
    return Response.json(
      { success: false, error: "Configuration serveur manquante" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const resend = new Resend(resendKey);

  console.log("API Diagnostic POST received");
  
  try {
    const body = await req.json();
    console.log("Body received:", { 
      nom: body.nom, 
      email: body.email, 
      profil: body.profil 
    });

    if (!body.nom || !body.email || !body.profil) {
      console.error("Missing required fields");
      return Response.json(
        { success: false, error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    console.log("Inserting to Supabase...");
    const { data: diagnostic, error: dbError } = await supabase
      .from("diagnostics")
      .insert({
        nom: body.nom,
        email: body.email,
        telephone: body.telephone || null,
        profil: body.profil,
        score: body.score_diagnostic,
        niveau_maturite: body.niveau,
        niveau: body.niveau,
        temps_perdu: body.temps_perdu,
        opportunites_manquees: body.opportunites_manquees,
        priorite: body.priorite,
        reponses: body.reponses || [],
        opt_in: body.optIn || false,
        sms_rappel: body.smsRappel || false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return Response.json(
        { success: false, error: "Erreur base de donnees", details: dbError.message },
        { status: 500 }
      );
    }

    console.log("Supabase insert OK, ID:", diagnostic.id);

    // 2. Email prospect (feuille de route)
    if (resendKey && body.email) {
      try {
        console.log("Sending email to prospect...");
        await resend.emails.send({
          from: "ILOCAP <onboarding@resend.dev>",
          to: body.email,
          subject: "Votre feuille de route ILOCAP - 3 actions a faire cette semaine",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Votre feuille de route ILOCAP</title>
            </head>
            <body style="margin:0;padding:0;font-family:'Manrope',Arial,sans-serif;background-color:#F3F1EC;color:#2A3A4F;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#073642;padding:40px 20px;text-align:center;">
                <tr>
                  <td>
                    <h1 style="color:#B89A5A;font-family:'Sora',Arial,sans-serif;text-transform:uppercase;font-size:24px;margin:0;letter-spacing:0.1em;">ILOCAP</h1>
                    <p style="color:#F3F1EC;font-size:14px;margin-top:10px;text-transform:uppercase;letter-spacing:0.2em;">Votre feuille de route personnalisee</p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
                <tr>
                  <td>
                    <p style="font-size:16px;line-height:1.6;">Bonjour <strong>${body.nom}</strong>,</p>
                    <p style="font-size:16px;line-height:1.6;">Merci d'avoir realise votre diagnostic digital avec ILOCAP. Voici vos resultats :</p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;padding:0 20px 40px;">
                <tr>
                  <td style="background-color:#0B0C0A;color:#F3F1EC;padding:30px;text-align:center;">
                    <p style="font-size:14px;text-transform:uppercase;letter-spacing:0.1em;color:#B89A5A;margin:0 0 20px 0;">Votre diagnostic</p>
                    <p style="font-size:36px;font-weight:bold;color:#B89A5A;margin:0;">${body.temps_perdu}h perdues /semaine</p>
                    <p style="font-size:18px;color:#F3F1EC;margin:10px 0 0 0;">${body.opportunites_manquees} opportunites manquees /mois</p>
                    <p style="font-size:14px;color:#F3F1EC;margin:20px 0 0 0;opacity:0.8;">Niveau : <strong>${body.niveau}</strong> (${body.score_diagnostic}/100)</p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;padding:0 20px 40px;">
                <tr>
                  <td style="background-color:#B89A5A;padding:20px;text-align:center;">
                    <p style="color:#0B0C0A;font-size:14px;font-weight:bold;margin:0 0 15px 0;text-transform:uppercase;letter-spacing:0.1em;">Votre priorite immediate</p>
                    <p style="color:#0B0C0A;font-size:18px;margin:0;font-weight:bold;">${body.priorite}</p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;padding:0 20px 40px;">
                <tr>
                  <td>
                    <h2 style="color:#073642;font-size:18px;text-transform:uppercase;margin:0 0 20px 0;letter-spacing:0.05em;">3 actions gratuites cette semaine</h2>
                    <ol style="font-size:14px;line-height:1.6;padding-left:20px;margin:0;">
                      <li style="margin-bottom:10px;">Noter vos 3 taches les plus longues et les chronometrer</li>
                      <li style="margin-bottom:10px;">Demander 3 avis Google a vos meilleurs clients</li>
                      <li style="margin-bottom:10px;">Creer une reponse automatique email avec vos horaires</li>
                    </ol>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;padding:0 20px 40px;">
                <tr>
                  <td style="background-color:#073642;padding:30px;text-align:center;">
                    <p style="color:#B89A5A;font-size:14px;font-weight:bold;margin:0 0 15px 0;text-transform:uppercase;letter-spacing:0.1em;">Votre entretien personnalise</p>
                    <p style="color:#F3F1EC;font-size:14px;margin:0 0 20px 0;">Reservez votre creneau de 30 minutes avec un expert ILOCAP</p>
                    <a href="https://calendly.com/candriatiana/30min" style="background-color:#B89A5A;color:#0B0C0A;padding:15px 30px;text-decoration:none;text-transform:uppercase;font-size:12px;letter-spacing:0.1em;display:inline-block;font-weight:bold;">Reserver mon creneau 30 min</a>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0B0C0A;padding:30px 20px;text-align:center;">
                <tr>
                  <td>
                    <p style="color:#F3F1EC;font-size:12px;text-transform:uppercase;letter-spacing:0.2em;margin:0;">ILOCAP - Le sens au centre de votre transformation</p>
                    <p style="color:#B89A5A;font-size:12px;margin:10px 0 0 0;">contact@ilocap.com | www.ilocap.com</p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
        console.log("Email prospect sent");
      } catch (emailError) {
        console.error("Email prospect failed:", emailError);
      }
    }

    // 3. Email equipe (notification interne)
    if (resendKey) {
      try {
        console.log("Sending email to team...");
        await resend.emails.send({
          from: "ILOCAP <onboarding@resend.dev>",
          to: "candriatiana@gmail.com",  // TEMPORAIRE : remplacer par management@ilocap.com apres verification domaine
          subject: `[ILOCAP] Nouveau lead qualifie : ${body.nom} (${body.profil})`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>Nouveau lead ILOCAP</title>
            </head>
            <body style="margin:0;padding:20px;font-family:Arial,sans-serif;background-color:#F3F1EC;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;padding:40px;">
                <tr>
                  <td>
                    <h1 style="color:#073642;text-transform:uppercase;font-size:20px;margin:0 0 30px 0;">Nouveau diagnostic qualifie</h1>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:30px;">
                      <tr>
                        <td style="padding:10px;border-bottom:1px solid #eee;width:30%;"><strong>Nom</strong></td>
                        <td style="padding:10px;border-bottom:1px solid #eee;">${body.nom}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Email</strong></td>
                        <td style="padding:10px;border-bottom:1px solid #eee;">${body.email}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Telephone</strong></td>
                        <td style="padding:10px;border-bottom:1px solid #eee;">${body.telephone || 'Non renseigne'}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Profil</strong></td>
                        <td style="padding:10px;border-bottom:1px solid #eee;">${body.profil}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Score</strong></td>
                        <td style="padding:10px;border-bottom:1px solid #eee;">${body.score_diagnostic}/100 - ${body.niveau}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Temps perdu</strong></td>
                        <td style="padding:10px;border-bottom:1px solid #eee;">${body.temps_perdu}h/semaine</td>
                      </tr>
                      <tr>
                        <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Opportunites</strong></td>
                        <td style="padding:10px;border-bottom:1px solid #eee;">${body.opportunites_manquees}/mois</td>
                      </tr>
                      <tr>
                        <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Priorite</strong></td>
                        <td style="padding:10px;border-bottom:1px solid #eee;">${body.priorite}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px;border-bottom:1px solid #eee;"><strong>SMS rappel</strong></td>
                        <td style="padding:10px;border-bottom:1px solid #eee;">${body.smsRappel ? 'Oui' : 'Non'}</td>
                      </tr>
                    </table>
                    
                    <div style="background-color:#B89A5A;padding:20px;text-align:center;margin-top:30px;">
                      <a href="https://calendly.com/candriatiana/30min" style="background-color:#073642;color:#F3F1EC;padding:12px 24px;text-decoration:none;text-transform:uppercase;font-size:12px;letter-spacing:0.1em;display:inline-block;">Voir Calendly</a>
                    </div>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
        console.log("Email equipe sent");
      } catch (e) {
        console.error("Email equipe failed:", e);
      }
    }

    return Response.json({ success: true, id: diagnostic.id });
    
  } catch (error) {
    console.error("API catch error:", error);
    return Response.json(
      { success: false, error: "Erreur serveur", details: String(error) },
      { status: 500 }
    );
  }
}