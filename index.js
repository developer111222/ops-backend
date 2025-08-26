const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoute');
const careerRoutes = require('./routes/careerRoutes');
const blogRoutes = require('./routes/blogRoute');
const blogCategoryRoutes = require('./routes/blocategoryRoute');
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000', 'https://opsreality.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-api-key"   // ✅ allow API key header
  ],
  credentials: true
}));

// ✅ API Key Middleware
app.use("/api", apiKeyMiddleware);

app.use(morgan('dev'));
// app.use(xss()); // Temporarily disabled due to Express 5.x compatibility issue
app.use(rateLimiter);

// Routes
app.use('/api/auth',apiKeyMiddleware, authRoutes);
app.use('/api/project',apiKeyMiddleware, projectRoutes);
app.use('/api/career',apiKeyMiddleware, careerRoutes);
app.use('/api/blog',apiKeyMiddleware, blogRoutes);
app.use('/api/blog-category',apiKeyMiddleware, blogCategoryRoutes);
// Error Handler
app.use(errorHandler);

// DB & Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
