const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/Logo_ilocap_icon_rm.png');
const outputDir = path.join(__dirname, '../public');

const sizes = [192, 512];

async function generateIcons() {
  // Vérifier que le fichier source existe
  if (!fs.existsSync(inputFile)) {
    console.error('❌ Fichier source non trouvé:', inputFile);
    console.log('📁 Fichiers disponibles dans /public:');
    const files = fs.readdirSync(outputDir);
    files.forEach(f => console.log('  -', f));
    process.exit(1);
  }

  console.log('✅ Fichier source trouvé:', inputFile);

  for (const size of sizes) {
    const outputFile = path.join(outputDir, `icon-${size}x${size}.png`);
    
    await sharp(inputFile)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 243, g: 241, b: 236, alpha: 1 } // #F3F1EC
      })
      .png()
      .toFile(outputFile);
    
    console.log(`✅ Généré: icon-${size}x${size}.png`);
  }

  console.log('\n🎉 Icônes PWA générées avec succès!');
}

generateIcons().catch(console.error);