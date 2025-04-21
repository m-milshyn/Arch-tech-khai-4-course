import express from 'express';
import bodyParser from 'body-parser';
import { logRequest } from './middleware.js';
import productRouter from './product/product.router.js';
import userRouter from './user/user.router.js';
import { errorResponder } from './error.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logRequest);
app.use(productRouter);
app.use(userRouter);
app.use(errorResponder);

app.listen(PORT, () => {
   console.log(`Server listening at http://localhost:${PORT}`);
});