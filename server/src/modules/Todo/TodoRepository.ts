import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { NewTodo, Todo, UpdateTodo } from "../../types/todo";

class TodoRepository {
  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM todo WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );
    return rows as Todo[];
  }
  async create(todo: NewTodo) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO todo (title, description, user_id) VALUES (?, ?, ?)",
      [todo.title, todo.description, todo.userId],
    );
    return result.insertId;
  }
  async delete(id: number, userId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM todo WHERE id = ? AND user_id = ?",
      [id, userId],
    );
    return result.affectedRows;
  }
  async update(id: number, todo: UpdateTodo, userId: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE todo SET title = ?, description = ? WHERE id = ? AND user_id = ?",
      [todo.title, todo.description, id, userId],
    );
    return result.affectedRows;
  }
  async updateCompleted(id: number, is_completed: boolean, userId: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE todo SET is_completed = ? WHERE id = ? AND user_id = ?",
      [is_completed, id, userId],
    );
    return result.affectedRows;
  }
}
export default new TodoRepository();
