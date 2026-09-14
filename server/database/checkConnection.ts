import client from "./client";

client
  .query("SELECT current_database() AS database")
  .then(({ rows }) => {
    console.info(`Using database ${rows[0]?.database}`);
  })
  .catch((error: Error) => {
    console.warn(
      "Warning:",
      "Failed to establish a database connection.",
      "Please check POSTGRES_URL if you need database access.",
    );
    console.warn(error.message);
  });
