const fs = require('fs');
const path = require('path');
const Docxtemplater = require('docxtemplater');

// Charger le modèle du document Word
const templatePath = path.join(__dirname, 'templates', 'contract_template.docx');
const templateContent = fs.readFileSync(templatePath, 'binary');
const doc = new Docxtemplater();
doc.loadZip(templateContent);

// Insérer les données récupérées à partir du formulaire dans le document Word
const data = {
  projectName: 'Nom du projet',
  contractName: 'Nom du contrat',
  // Ajoutez d'autres données ici
};
doc.setData(data);

// Générer le document Word
doc.render();
const outputFilePath = path.join(__dirname, 'output', 'generated_contract.docx');
const output = doc.getZip().generate({ type: 'nodebuffer' });
fs.writeFileSync(outputFilePath, output);
