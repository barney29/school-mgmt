import express from 'express';
import globalErrorHandler from './features/global.error.handler';
import { router as regRouter } from './router/registerar.router';
import { router as adminRouter } from './router/admin.router';
import { router as teacherRouter } from './router/teacher.router';

const app = express();


app.use(express.json());

app.use('/admin', adminRouter);
app.use('/registerar',regRouter);
app.use('/teacher', teacherRouter);

app.all('*', (req, res) => {
    res.status(404).json({
        status: "fail",
        msg: "Page not found"
    })
})
app.use(globalErrorHandler);
export default app;