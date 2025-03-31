const express = require('express');
const winston = require('winston');

const app = express();
const port = 3000;

// Winston logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Middleware to log every request
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`, {
    headers: req.headers,
    ip: req.ip,
  });
  next();
});

// Utility function to validate numbers
const validateTwoNumbers = (num1, num2) => {
  return !(isNaN(num1) || isNaN(num2));
};

const validateOneNumber = (num) => {
  return !isNaN(num);
};

// Basic Operations

app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (!validateTwoNumbers(n1, n2)) {
    logger.error('Invalid input for addition');
    return res.status(400).json({ error: 'Invalid input: num1 and num2 must be numbers.' });
  }

  const result = n1 + n2;
  logger.info(`Add: ${n1} + ${n2} = ${result}`);
  res.json({ result });
});

app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (!validateTwoNumbers(n1, n2)) {
    logger.error('Invalid input for subtraction');
    return res.status(400).json({ error: 'Invalid input: num1 and num2 must be numbers.' });
  }

  const result = n1 - n2;
  logger.info(`Subtract: ${n1} - ${n2} = ${result}`);
  res.json({ result });
});

app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (!validateTwoNumbers(n1, n2)) {
    logger.error('Invalid input for multiplication');
    return res.status(400).json({ error: 'Invalid input: num1 and num2 must be numbers.' });
  }

  const result = n1 * n2;
  logger.info(`Multiply: ${n1} * ${n2} = ${result}`);
  res.json({ result });
});

app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (!validateTwoNumbers(n1, n2)) {
    logger.error('Invalid input for division');
    return res.status(400).json({ error: 'Invalid input: num1 and num2 must be numbers.' });
  }

  if (n2 === 0) {
    logger.error('Division by zero attempt');
    return res.status(400).json({ error: 'Cannot divide by zero.' });
  }

  const result = n1 / n2;
  logger.info(`Divide: ${n1} / ${n2} = ${result}`);
  res.json({ result });
});

// Advanced Operations

app.get('/power', (req, res) => {
  const { num1, num2 } = req.query;
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (!validateTwoNumbers(n1, n2)) {
    logger.error('Invalid input for power');
    return res.status(400).json({ error: 'Invalid input: num1 and num2 must be numbers.' });
  }

  const result = Math.pow(n1, n2);
  logger.info(`Power: ${n1} ^ ${n2} = ${result}`);
  res.json({ result });
});

app.get('/sqrt', (req, res) => {
  const { num1 } = req.query;
  const n1 = parseFloat(num1);

  if (!validateOneNumber(n1) || n1 < 0) {
    logger.error('Invalid input for square root');
    return res.status(400).json({ error: 'Input must be a non-negative number.' });
  }

  const result = Math.sqrt(n1);
  logger.info(`Square Root: √${n1} = ${result}`);
  res.json({ result });
});

app.get('/mod', (req, res) => {
  const { num1, num2 } = req.query;
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (!validateTwoNumbers(n1, n2)) {
    logger.error('Invalid input for modulo');
    return res.status(400).json({ error: 'Invalid input: num1 and num2 must be numbers.' });
  }

  if (n2 === 0) {
    logger.error('Modulo by zero attempt');
    return res.status(400).json({ error: 'Cannot modulo by zero.' });
  }

  const result = n1 % n2;
  logger.info(`Modulo: ${n1} % ${n2} = ${result}`);
  res.json({ result });
});

// Start server
app.listen(port, () => {
  console.log(`Calculator microservice running at http://localhost:${port}`);
});
