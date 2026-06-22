import { jsPDF } from "jspdf";
import type { DiagnosticResult } from "./questions";

interface PDFData {
  nom: string;
  email: string;
  diagnostic: DiagnosticResult;
  date: string;
}

export function generateDiagnosticPDF(data: PDFData): Blob {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const petrol: [number, number, number] = [7, 54, 66];
  const gold: [number, number, number] = [184, 154, 90];
  const ivoire: [number, number, number] = [243, 241, 236];
  const dark: [number, number, number] = [11, 12, 10];

  // Header
  doc.setFillColor(...petrol);
  doc.rect(0, 0, pageWidth, 50, "F");
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("ILOCAP", margin, 30);
  doc.setTextColor(...ivoire);
  doc.setFontSize(10);
  doc.text("FEUILLE DE ROUTE PERSONNALISÉE", margin, 40);
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.text(data.date, pageWidth - margin, 40, { align: "right" });

  // Score-Action
  let y = 70;
  doc.setTextColor(...petrol);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("VOS 3 CHIFFRES CLÉS", margin, y);

  y += 15;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const boxWidth = (pageWidth - margin * 2 - 10) / 3;

  // Box 1: Temps perdu
  doc.setFillColor(192, 57, 43);
  doc.rect(margin, y, boxWidth, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.diagnostic.tempsPerdu}h`, margin + 5, y + 15);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Perdues /semaine", margin + 5, y + 25);

  // Box 2: Opportunités
  doc.setFillColor(230, 126, 34);
  doc.rect(margin + boxWidth + 5, y, boxWidth, 35, "F");
  doc.text(`${data.diagnostic.opportunitesManquees}`, margin + boxWidth + 10, y + 15);
  doc.setFontSize(8);
  doc.text("Opportunités /mois", margin + boxWidth + 10, y + 25);

  // Box 3: Priorité
  doc.setFillColor(184, 154, 90);
  doc.rect(margin + boxWidth * 2 + 10, y, boxWidth, 35, "F");
  doc.setFontSize(10);
  const priorite = data.diagnostic.priorite.length > 20 ? data.diagnostic.priorite.substring(0, 20) + "..." : data.diagnostic.priorite;
  doc.text(priorite, margin + boxWidth * 2 + 15, y + 15);
  doc.setFontSize(8);
  doc.text("Priorité", margin + boxWidth * 2 + 15, y + 25);

  // Niveau
  y += 50;
  doc.setTextColor(...petrol);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("VOTRE NIVEAU", margin, y);

  y += 10;
  const niveauColors: Record<string, [number, number, number]> = {
    "Survivant": [192, 57, 43],
    "Opportuniste": [230, 126, 34],
    "Stratège": [184, 154, 90],
    "Leader": [7, 54, 66]
  };
  const color = niveauColors[data.diagnostic.niveau] || [128, 128, 128];
  doc.setFillColor(...color);
  doc.rect(margin, y, pageWidth - margin * 2, 25, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(data.diagnostic.niveau.toUpperCase(), margin + 10, y + 16);
  doc.setFontSize(10);
  doc.text(`${data.diagnostic.score}/100`, pageWidth - margin - 10, y + 16, { align: "right" });

  // Actions gratuites
  y += 40;
  doc.setTextColor(...petrol);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("3 ACTIONS GRATUITES CETTE SEMAINE", margin, y);

  y += 15;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const actions = [
    "1. Noter vos 3 tâches les plus longues et chronométrer",
    "2. Demander 3 avis Google à vos meilleurs clients",
    "3. Créer une réponse automatique email avec vos horaires"
  ];
  actions.forEach((action) => {
    doc.text(action, margin, y);
    y += 8;
  });

  // CTA Calendly
  y += 20;
  doc.setFillColor(...petrol);
  doc.rect(margin, y, pageWidth - margin * 2, 40, "F");
  doc.setTextColor(...gold);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("ENTRETIEN PERSONNALISÉ ILOCAP", margin + 10, y + 15);
  doc.setTextColor(...ivoire);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Réservez votre créneau de 30 min :", margin + 10, y + 25);
  doc.setTextColor(...gold);
  doc.text("calendly.com/candriatiana/30min", margin + 10, y + 33);

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFillColor(...dark);
  doc.rect(0, footerY - 10, pageWidth, 30, "F");
  doc.setTextColor(...ivoire);
  doc.setFontSize(8);
  doc.text("ILOCAP — Le sens au centre de votre transformation", margin, footerY);
  doc.text("contact@ilocap.com | ilocap.com", pageWidth - margin, footerY, { align: "right" });

  return doc.output("blob");
}