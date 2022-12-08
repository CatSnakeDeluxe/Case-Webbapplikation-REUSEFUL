# Case-Webbapplikation-REUSEFUL

## Purpose
The purpose of the app is to create a platform for selling used furniture. People can create users which gives them the ability to post, edit and delete ads. Available categories for now: Sofas, Chairs, Tables and Lamps.

## How To Use App

### Step 1: Clone repo
Click the green button "Code" and copy repo link.

### Step 2: Clone repo to local machine
Open visual studio code and open the folder you want the project in. Open a new terminal and write command: git clone "repo link from github". Press Enter.

### Step 3: Install dependencies
Write command in terminal: npm i. npm i will install all needed dependencies which can be found in package.json.

### Step 4: Create database
Create a database at https://www.mongodb.com. Create a cluster and then select connect -> Connect your application. Take the string and paste it in to your .env file as the MONGO_CONNECTION_STR. Don't forget to write which database you want to access in the connection string. Your database name should be located between / and ? in the string. Example: mongodb.net/<yourDataBaseName>?

Make sure your database has two collections: Users Ads

### Step 5: Setup .env file
You must create a .env file in the root of the project. Look at .env-example for how to set it up.

### Step 6: Start server
Write command in terminal: node server

### Step 7: Open in browser
browser url: localhost:<chosen portnumber>/ads

TODO
- filter options
+ render
+ edit function
+ delete function
+ add pictures based on category