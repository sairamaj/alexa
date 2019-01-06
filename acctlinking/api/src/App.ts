import * as express from 'express';
import SkillRouter from './routes/SkillRouter';
import AdminRouter from './routes/AdminRouter';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware()
    this.routes()
  }

  // Configure API endpoints.
  private routes(): void {

    this.express.use('/api/admin', AdminRouter)
    this.express.use('/api/skill/link/:id', SkillRouter)

    this.express.use('/', (req, res) => {
      res.send({ message: 'alexa-utility...' })
    })
  }

  // Configure Express middleware.
  private middleware(): void {
    
    this.express.use(express.static('dashboard/dist/dashboard'))
    this.express.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.express.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }
}

export default new App().express;