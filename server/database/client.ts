import { Pool } from "pg";

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  console.warn("POSTGRES_URL n'est pas défini");
}

const normalizedConnectionString = connectionString
  ? (() => {
      const url = new URL(connectionString);
      url.searchParams.delete("sslmode");
      url.searchParams.delete("sslcert");
      url.searchParams.delete("sslkey");
      url.searchParams.delete("sslrootcert");
      return url.toString();
    })()
  : undefined;

const databaseClient = new Pool({
  connectionString: normalizedConnectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
  max: 5,
});

export default databaseClient;
