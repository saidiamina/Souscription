const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Créer un nouveau document PDF
const doc = new PDFDocument();

// Définir le chemin de sortie pour le document PDF généré
const outputFilePath = path.join(__dirname, 'output', 'generated_contract.pdf');
const outputStream = fs.createWriteStream(outputFilePath);

// Écrire les données récupérées à partir du formulaire dans le document PDF
doc.pipe(outputStream);
doc.fontSize(12).text('Nom du projet: ', { continued: true }).text('Nom du contrat');
// Ajoutez d'autres données ici

// Finaliser et enregistrer le document PDF
doc.end();
outputStream.on('finish', () => {
  console.log('Document PDF généré avec succès.');
});
