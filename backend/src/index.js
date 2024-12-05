const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require ('dotenv').config();
const contratoRoutes = require('./routes/contrato.routes.js');
const pagoRoutes = require('./routes/pago.routes.js');
const rentaRoutes = require('./routes/renta.routes.js');
const userRoutes = require('./routes/user.routes.js');
const ventaRoutes = require('./routes/venta.routes.js');
const vestidoRoutes = require('./routes/vestido.routes.js');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET, POST, PUT, DELETE, PATCH',
  credentials: true
}));

app.use(express.json())
app.use('/api/contratos', contratoRoutes)
app.use('/api/pagos', pagoRoutes)
app.use('/api/rentas', rentaRoutes)
app.use('/api/users', userRoutes)
app.use('/api/ventas', ventaRoutes)
app.use('/api/vestidos', vestidoRoutes)

const options = {
    dbName: 'tiendaVestidos',
  };

mongoose.connect(process.env.MONGODB_URI, options)
    .then(() => console.log("Conectado a MongoDB en la base de datos tiendaVestidos"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Servidor funcionando en el puerto', port))