import databaseClient from "../../../database/client";
import type { User } from "../../types/user";

class UserRepository {
  async readByEmail(email: string) {
    const { rows } = await databaseClient.query<User>(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    return rows[0];
  }
  async createAccount(user: { email: string; passwordHash: string }) {
    const { rows } = await databaseClient.query<{ id: number }>(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
      [user.email, user.passwordHash],
    );
    return rows[0].id;
  }
  async readById(id: number) {
    const { rows } = await databaseClient.query<User>(
      "SELECT * FROM users WHERE id = $1",
      [id],
    );
    return rows[0];
  }
}

export default new UserRepository();
