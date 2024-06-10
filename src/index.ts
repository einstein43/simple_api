import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';
import https from 'https';

const app = express();
app.use(bodyParser.json());
app.options('*', cors());
app.use(
  cors({
    origin: '*', // Replace with your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  })
);

const users = [
  { id: 1, email: 'a-janssen@vitalcare.com', password: 'Janssen123!' },
  // Add more users as needed
];

const agent = new https.Agent({ rejectUnauthorized: false });

class AuthService {
  async authenticate(email: string, password: string) {
    const sqliPattern = /('|--|;|\/\*|\*\/|xp_)/i;
    if (sqliPattern.test(email) || sqliPattern.test(password)) {
      await fetch('https://10.0.2.75:55000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'SQL injection attempt detected',
          email,
          password,
        }),
        agent,
      });
      return 'SQLi detected';
    }

    const user = users.find(user => user.email === email && user.password === password);
    return user ? { id: user.id, email: user.email } : null;
  }
}

class AuthController {
  private authService = new AuthService();

  async auth(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.authService.authenticate(email, password);
    
    if (result === 'SQLi detected') {
      res.status(400).json({ message: 'SQL injection attempt detected' });
    } else if (result) {
      res.status(200).json({ message: 'Authentication successful', user: result });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  }
}

const authController = new AuthController();

app.post('/auth', (req: Request, res: Response) => authController.auth(req, res));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to The Clinic\'s API. Contact the network administrator for more information.');
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});

export default app;
