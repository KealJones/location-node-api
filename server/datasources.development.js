module.exports = {
  accountDS: {
    name: "accountDS",
    connector: "postgresql",
    ssl: true,
    url: process.env.DATABASE_URL
  }
};
