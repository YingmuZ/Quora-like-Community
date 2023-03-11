const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_CONNECTION)
.then ( () => {
  console.log("DB is connected");
})
.catch( err => {
  console.log(err)
});