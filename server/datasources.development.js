module.exports = {
  db: {
    name: "db",
    connector: "memory"
  },
  accountDS: {
    name: "accountDS",
    connector: "postgresql",
    url: process.env.DATABASE_URL
  }
};
