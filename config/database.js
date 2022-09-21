const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/todolist', {useNewUrlParset: true, useUnifiedTopoly: true})
.then(()=> console.log('Conectado ao MongoDB'))
.catch((err) => console.error(err))