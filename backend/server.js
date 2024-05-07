const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 3000; // Port du serveur

 // servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, 'public')));

// Définition des routes pour les requêtes 
app.get('/api/exemple', (req, res) => {
    // Logique pour gérer la requête API
    res.json({ message: 'Exemple de réponse API' });
});


// Connexion à la base de données SQLite
const db = new sqlite3.Database('ma_base.sqlite');

// Middleware pour parser le corps des requêtes HTTP en JSON
app.use(express.json());

// Route pour récupérer tous les projets
app.get('/projets', (req, res) => {
  db.all("SELECT * FROM projets", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Route pour créer un nouveau projet
app.post('/projets', (req, res) => {
  const { numero_opportunite, nom_client, tarif_propose, lien_document_word, lien_document_pdf } = req.body;
  db.run("INSERT INTO projets (numero_opportunite, nom_client, tarif_propose, lien_document_word, lien_document_pdf) VALUES (?, ?, ?, ?, ?)", [numero_opportunite, nom_client, tarif_propose, lien_document_word, lien_document_pdf], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// Route pour générer un document Word
app.get('/generer-document-word/:id', (req, res) => {
  const id = req.params.id;
  // Logique de génération du document Word à partir des données en base de données
  res.send(`Document Word généré pour le projet/devis avec l'ID ${id}`);
});

// Route pour générer un document PDF
app.get('/generer-document-pdf/:id', (req, res) => {
  const id = req.params.id;
  // Logique de génération du document PDF à partir des données en base de données
  res.send(`Document PDF généré pour le projet/devis avec l'ID ${id}`);
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

// Définition de la route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur Express
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const PDFDocument = require('pdfkit');

// Fonction de génération du document Word
function generateWordDocument(data) {
  // Logique de génération du document Word avec docxtemplater
}

// Fonction de génération du document PDF
function generatePDFDocument(data) {
  // Logique de génération du document PDF avec pdfkit
}
