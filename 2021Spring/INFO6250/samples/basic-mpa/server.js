const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./public'));

app.post('/response', express.urlencoded({ extended: false }), (req, res) => {
  res.send(`
    <!doctype html>
    <html>
    <head></head>
    <body>
      <a href="/">Return to form</a>
      <div>
        ${JSON.stringify(req.body)}
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
