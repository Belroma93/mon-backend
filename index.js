const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get('/', (req, res) => {
  res.json({ message: 'Serveur en ligne ✅' });
});

app.post('/inscription', async (req, res) => {
  const { nom, email, plan } = req.body;
  const { data, error } = await supabase
    .from('utilisateurs')
    .insert([{ nom, email, plan }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: `Bienvenue ${nom} !`, data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
