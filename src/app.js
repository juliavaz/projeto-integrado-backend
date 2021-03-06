const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');
const errorController = require('./controllers/errorController');
const routes = require('./routes');

const app = express();

// Compress responses
app.use(compression());

// Security headers
app.use(helmet());

// Enable CORS
// TODO: define specific origin
app.use(cors());
app.options('*', cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  // TODO: define a reasonable amount of requests
  max: 50, // 4 requests
});
app.use(limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));

// Data sanitization (NoSQL query injection and XSS)
app.use(mongoSanitize());
app.use(xss());

// Protect against HTTP Parameter Pollution attacks
app.use(hpp());

// API routes
app.use(routes);

// Error Controller
app.use(errorController);

module.exports = app;
