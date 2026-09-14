import databaseClient from "./client";

let schemaPromise: Promise<void> | undefined;

const createSchema = async () => {
  await databaseClient.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `);

  await databaseClient.query(`
    CREATE TABLE IF NOT EXISTS todo (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      is_completed BOOLEAN NOT NULL DEFAULT FALSE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
};

const ensureSchema = () => {
  schemaPromise ??= createSchema();
  return schemaPromise;
};

export default ensureSchema;
