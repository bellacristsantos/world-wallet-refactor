const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');


const app = express();

app.use(bodyParser.json());


app.use(cors(
  {
    origin: 'http://localhost:3001',
}
));

app.use('/', router);


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});