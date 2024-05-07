const sqlite3 = require('sqlite3').verbose();

// Chemin vers la base de données SQLite
const dbPath = path.resolve(__dirname, '..', 'data', 'database.db'); 

// Fonction pour initialiser la connexion à la base de données
function initDatabase() {
  return new sqlite3.Database(dbPath);
}

// Récupérer tous les contrats
exports.getAllContracts = (req, res) => {
  const db = initDatabase();
  const sql = 'SELECT * FROM contracts';
  db.all(sql, [], (err, contracts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(contracts);
  });
  db.close();
};

// Récupérer un contrat par son ID
exports.getContractById = (req, res) => {
  const { id } = req.params;
  const db = initDatabase();
  const sql = 'SELECT * FROM contracts WHERE id = ?';
  db.get(sql, [id], (err, contract) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!contract) {
      return res.status(404).json({ message: "Contrat non trouvé" });
    }
    res.json(contract);
  });
  db.close();
};

// Créer un nouveau contrat
exports.createContract = (req, res) => {
  const { projectId, contractName } = req.body;
  const db = initDatabase();
  const sql = 'INSERT INTO contracts (projectId, contractName) VALUES (?, ?)';
  db.run(sql, [projectId, contractName], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
  db.close();
};

// Mettre à jour un contrat existant
exports.updateContract = (req, res) => {
  const { id } = req.params;
  const { projectId, contractName } = req.body;
  const db = initDatabase();
  const sql = 'UPDATE contracts SET projectId = ?, contractName = ? WHERE id = ?';
  db.run(sql, [projectId, contractName, id], err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Contrat mis à jour avec succès" });
  });
  db.close();
};

// Supprimer un contrat existant
exports.deleteContract = (req, res) => {
  const { id } = req.params;
  const db = initDatabase();
  const sql = 'DELETE FROM contracts WHERE id = ?';
  db.run(sql, [id], err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Contrat supprimé avec succès" });
  });
  db.close();
};
