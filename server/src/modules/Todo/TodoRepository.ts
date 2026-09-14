import databaseClient from "../../../database/client";
import type { NewTodo, Todo, UpdateTodo } from "../../types/todo";

class TodoRepository {
  async readByUserId(userId: number) {
    const { rows } = await databaseClient.query<Todo>(
      "SELECT * FROM todo WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );
    return rows;
  }
  async create(todo: NewTodo) {
    const { rows } = await databaseClient.query<{ id: number }>(
      "INSERT INTO todo (title, description, user_id) VALUES ($1, $2, $3) RETURNING id",
      [todo.title, todo.description, todo.userId],
    );
    return rows[0].id;
  }
  async delete(id: number, userId: number) {
    const result = await databaseClient.query(
      "DELETE FROM todo WHERE id = $1 AND user_id = $2",
      [id, userId],
    );
    return result.rowCount ?? 0;
  }
  async update(id: number, todo: UpdateTodo, userId: number) {
    const result = await databaseClient.query(
      "UPDATE todo SET title = $1, description = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4",
      [todo.title, todo.description, id, userId],
    );
    return result.rowCount ?? 0;
  }
  async updateCompleted(id: number, is_completed: boolean, userId: number) {
    const result = await databaseClient.query(
      "UPDATE todo SET is_completed = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3",
      [is_completed, id, userId],
    );
    return result.rowCount ?? 0;
  }
}
export default new TodoRepository();
