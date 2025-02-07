import empress from 'express';
import { sendEmail } from '../controllers/emailSystem.js';

const routes = empress.Router();

routes.post('/send-email', sendEmail);
//hello

export default routes;