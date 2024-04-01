import pg from "pg";
import isInsideContainer from "is-inside-container";
import { initDb } from "./init-db.js";

async function connect() {
	const client = new pg.Client({
		user: process.env.DB_USER,
		host: isInsideContainer()
			? process.env.DB_HOST_DOCKER
			: process.env.DB_HOST_LOCAL,
		database: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
	});
	await client.connect();
	console.log("Connected to the database");

	const res = await client.query(`
        SELECT EXISTS (
            SELECT FROM pg_tables
            WHERE schemaname = 'public'
        );
    `);

	if (!res.rows[0].exists) {
		console.log("No tables found, initializing database...");
		await initDb(client);
	}

	return client;
}

export { connect };
