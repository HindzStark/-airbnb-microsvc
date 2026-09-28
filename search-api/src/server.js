const app = require("./app");

const port = Number(process.env.PORT) || 3003;

app.listen(port, () => {
  console.log(`Search API listening on port ${port}`);
});
