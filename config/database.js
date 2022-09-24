const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/todolist', {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  })
.then(()=> console.log('Conectado ao MongoDB'))
.catch((err) => console.error(err))