const express = require('express');


const authRoutes = require('./routes/authRoute');

const app = express();
const PORT = process.env.PORT || 5000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});