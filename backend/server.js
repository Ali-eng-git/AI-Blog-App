require("dotenv").config({ path: __dirname + "/utils/.env" });
const express = require("express");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errLoger");
const cors = require('cors');
const path = require('path');
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes');
const blogPostRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')
const aiRoutes = require('./routes/aiRoutes')


const app = express();
app.use(
  cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
  })
)

connectDB()

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/posts",blogPostRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/dashboard-summary",dashboardRoutes);

app.use("/api/ai",aiRoutes);

// Serve Uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}))


// Start Server
const PORT = process.env.PORT || "8808";

// logging error
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
