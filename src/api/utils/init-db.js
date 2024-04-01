async function initDb(client) {
	try {
		await client.query(`  
      CREATE TYPE sex AS ENUM ('Male', 'Female');

      CREATE TYPE activity_level AS ENUM ('Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active');

      CREATE TYPE category AS ENUM( 'Fruits', 'Vegetables', 'Grains', 'Protein', 'Dairy', 'Fats', 'Sweets', 'Drinks');

      CREATE TYPE unit AS ENUM ('g', 'ml', 'cup', 'tsp', 'tbsp', 'oz', 'lb');
      
      CREATE TABLE Users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        date_of_birth DATE,
        height INTEGER,
        weight INTEGER,
        sex sex,
        activity_level activity_level,
        dietary_restrictions TEXT,
        goals TEXT,
        preferences JSONB,
        bmr INTEGER,
        bmi FLOAT,
        maintenance_calories INTEGER,
        body_fat FLOAT,
        target_calories INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE Food_Items (
        food_id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        brand VARCHAR(255),
        category category,
        calories INTEGER,
        protein INTEGER,
        fat INTEGER,
        carbs INTEGER,
        sugar INTEGER,
        fiber INTEGER,
        sodium INTEGER,
        potassium INTEGER,
        micronutrients JSONB,
        image_url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE Recipes (
        recipe_id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        servings INTEGER,
        instructions TEXT,
        cook_time INTEGER,
        prep_time INTEGER,
        image_url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE Recipe_Items (
        recipe_item_id SERIAL PRIMARY KEY,
        recipe_id INTEGER REFERENCES Recipes(recipe_id),
        food_id INTEGER REFERENCES Food_Items(food_id),
        quantity FLOAT,
        unit unit,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
		console.log("Database initialized");
	} catch (err) {
		console.error("Error initializing database", err);
	}
}

export { initDb };
