import * as SQLite from "expo-sqlite";

export const create_tables = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS pictures (uri TEXT PRIMARY KEY NOT NULL, project TEXT NOT NULL, taken DATETIME DEFAULT(STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')));
    CREATE TABLE IF NOT EXISTS projects (project TEXT PRIMARY KEY NOT NULL, created DATETIME DEFAULT(STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')));
    `
  );
};

export interface ProjectType {
  uri?: string;
  project: string;
  taken?: Date;
}
interface UriType {
  uri: string;
}

export const get_projects: (
  db: SQLite.SQLiteDatabase
) => Promise<ProjectType[]> = async (db) => {
  return await db.getAllAsync(
    `SELECT uri, projects.project FROM projects LEFT JOIN (SELECT uri, project, MAX(taken) AS taken FROM pictures GROUP BY project ORDER BY taken) USING(project) ORDER BY taken DESC;`
  );
};

export const get_project_images = async (
  db: SQLite.SQLiteDatabase,
  project_name: string
) => {
  return (await db.getAllAsync(
    `SELECT uri FROM pictures WHERE project IS ? ORDER BY taken;`,
    project_name
  )) as UriType[];
};

export const get_last_project_image = async (
  db: SQLite.SQLiteDatabase,
  project_name: string
) => {
  return (await db.getFirstAsync(
    `SELECT uri FROM pictures WHERE project IS ? ORDER BY taken DESC;`,
    project_name
  )) as UriType;
};

export const get_first_project_image = async (
  db: SQLite.SQLiteDatabase,
  project_name: string
) => {
  return (await db.getFirstAsync(
    `SELECT uri FROM pictures WHERE project IS ? ORDER BY taken ASC;`,
    project_name
  )) as UriType;
};

export const create_project = async (
  db: SQLite.SQLiteDatabase,
  project_name: string
) => {
  return await db.runAsync(
    `INSERT INTO projects (project) VALUES (?);`,
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
