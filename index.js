const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()


// PORT is define
const PORT = process.env.PORT || 3002

// cros
app.use(cors())

// Parses the text as url encoded data
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Router import and use
app.use('/api', require('./routes/UserRoute'));
app.use('/api', require('./routes/CityRoute'));
app.use('/api', require('./routes/CategoriesRoute'));
app.use('/api', require('./routes/BannerRoute'));
app.use('/api', require('./routes/ContactRoute'));
app.use('/api', require('./routes/DownloadRoute'));
app.use('/api', require('./routes/ReferIncomeRoute'));
app.use('/api', require('./routes/StudioRoute'));
app.use('/api', require('./routes/VideosRoute'));
app.use('/api', require('./routes/HireRoute'));
app.use('/api', require('./routes/PricesRoute'));
app.use('/api', require('./routes/UnlimitedPremiumRoute'));

// test route
app.get('/', (req, res) => {
    res.send('Hello World!');
})


// DB import and call
const db = require('./config/DB')
db.on("error", () => console.log("connection error:"));
db.once("open", () => console.log("Database is connected"));

app.listen(PORT, () => {
    console.log("Server is running http://localhost:"+PORT);
})