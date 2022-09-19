const express = require('express');
const path = require('path');

const checklistRouter = require('./src/routes/checklists');
const rootRouter = require('./src/routes/index');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname,'../public')));

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use('/checklists', checklistRouter);
app.use('/', rootRouter);

app.listen(3000, ()=>{
    console.log('Servidor foi iniciado!');
})