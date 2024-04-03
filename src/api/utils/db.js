import pg from "pg";
import isInsideContainer from "is-inside-container";
import { initDb } from "./init-db.js";

export default (() => {
	const pool = new pg.Pool({
		user: process.env.DB_USER,
		host: isInsideContainer()
			? process.env.DB_HOST_DOCKER
			: process.env.DB_HOST_LOCAL,
		database: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
	});

	pool.connect(async (err, client) => {
		if (err) {
			return console.error("Error:", err.stack);
		}

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

		console.log("Database Connected 📶");
	});

	return {
		query: (text, params) => pool.query(text, params),
		...pool,
	};
})();
