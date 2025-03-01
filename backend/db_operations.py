import sqlite3

def create_table():
    # Connect to SQLite database (creates the file if it doesn't exist)
    db_name = "db.sqlite3"  # Name of your database file
    connection = sqlite3.connect(db_name)
    cursor = connection.cursor()

    # Create the 'suggested_pc' table
    # cursor.execute("""
    # CREATE TABLE IF NOT EXISTS suggested_pc (
    #     name TEXT NOT NULL,
    #     price REAL NOT NULL
    # );
    # """)
    cursor.execute("""
    SELECT * FROM 'suggested_pc';
    """)
    
    # Commit changes and close the connection
    connection.commit()
    connection.close()

    print(f"Table 'suggested_pc' created successfully in {db_name}!")

if __name__ == "__main__":
    create_table()