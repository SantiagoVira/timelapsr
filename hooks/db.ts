import * as SQLite from "expo-sqlite";

export const create_table = async (db: SQLite.SQLiteDatabase) => {
  await db.runAsync(
    "CREATE TABLE IF NOT EXISTS pictures (uri TEXT PRIMARY KEY NOT NULL, project TEXT NOT NULL, taken DATETIME DEFAULT(STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')));"
  );
};

export interface ProjectType {
  uri: string;
  project: string;
  taken: Date;
}

export const get_projects: (
  db: SQLite.SQLiteDatabase
) => Promise<ProjectType[]> = async (db) => {
  return await db.getAllAsync(
    `SELECT uri, project, MAX(when_ts) as when_ts FROM pictures GROUP BY project ORDER BY taken`
  );
};

export const get_project_images = async (
  db: SQLite.SQLiteDatabase,
  project_name: string
) => {
  return await db.getAllAsync(
    `SELECT uri FROM pictures WHERE project IS ? ORDER BY taken;`,
    project_name
  );
};

export const get_last_project_image = async (
  db: SQLite.SQLiteDatabase,
  project_name: string
) => {
  return await db.getFirstAsync(
    `SELECT uri FROM pictures WHERE project IS ? ORDER BY taken DESC;`,
    project_name
  );
};

export const get_first_project_image = async (
  db: SQLite.SQLiteDatabase,
  project_name: string
) => {
  return await db.getFirstAsync(
    `SELECT uri FROM pictures WHERE project IS ? ORDER BY taken ASC;`,
    project_name
  );
};

export const insert_image_into_project = async (
  db: SQLite.SQLiteDatabase,
  project_name: string,
  uri: string
) => {
  return await db.runAsync(
    `INSERT INTO pictures (uri, project) VALUES (?, ?);`,
    uri,
    project_name
  );
};

export const delete_image_from_project = async (
  db: SQLite.SQLiteDatabase,
  uri: string
) => {
  return await db.runAsync(`DELETE FROM pictures WHERE uri IS ?;`, uri);
};
