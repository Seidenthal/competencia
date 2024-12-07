const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');
const Tutora = require('./models/Tutora');
const Aluna = require('./models/Aluna');
const Admin = require('./models/Admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

db.sync()
  .then(async () => {
    console.log('Tables have been created');
    // Criar um Admin padrão
    const admin = await Admin.findOne({ where: { email: 'admin@admin.com' } });
    if (!admin) {
      await Admin.create({ email: 'admin@admin.com', senha: 'admin123' });
      console.log('Admin padrão criado: admin@admin.com / admin123');
    }
  })
  .catch(err => console.log('Error: ' + err));

app.use('/api/tutoras', require('./routes/tutoras'));
app.use('/api/alunas', require('./routes/alunas'));
app.use('/api/admins', require('./routes/admins'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));