const app = require("./app");

const port = Number(process.env.PORT) || 3002;

app.listen(port, () => {
  console.log(`Booking API listening on port ${port}`);
});
