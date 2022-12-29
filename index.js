const app = require('./expressApp');

const port = 3002;
app.listen(port, () => console.log(`app listening on port ${port}!`));
