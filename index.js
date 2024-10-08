const { PORT } = require('./src/config/config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./src/middleware/errorHandler');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const productRoutes = require('./src/routes/productRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');




const port = PORT;
const app = express();






app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Endpoint for admin routes
app.use('/admin', adminRoutes);

// Endpoint for user auth routes
app.use('/auth', authRoutes);

app.use('/categories', categoryRoutes);

app.use('/products', productRoutes);

app.use('/orders', orderRoutes);

app.use('/payments', paymentRoutes);





// Handles the error across our aplication
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Application is listening on port localhost:${port}`);
});