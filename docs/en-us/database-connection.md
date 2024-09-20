# Database Connection and Configuration

So, you've decided to play with databases? Bold move. Let's make sure you don't screw things up.

## Connecting to MySQL

First up, our good old friend MySQL. Here's how you get cozy with it.

### Step 1: Install a MySQL Client

If you haven't already, grab yourself a MySQL client. Options include:

- **MySQL Workbench**: Because GUIs are cool.
- **Sequel Pro**: For Mac users who like to feel superior.
- **Command Line**: For those who like to live dangerously.

### Step 2: Connection Details

Use the following credentials to connect. Don't get them wrong.

- **Host**: `localhost` or `127.0.0.1`
- **Port**: `${HOST_MYSQL_PORT}` (default is 3091)
- **Username**: `${DEVCONTAINER_MYSQL_USER}` (default is `admin`)
- **Password**: `${DEVCONTAINER_MYSQL_PASSWORD}` (default is `darkSide123`)
- **Database Name**: `${DEVCONTAINER_MYSQL_DATABASE}` (default is `ultimate_db`)

Remember to replace the placeholders with the actual values from your `.env` file. If you changed them and forgot, that's on you.

### Step 3: Test the Connection

Hit that connect button. If it works, congratulations—you did the bare minimum. If not, double-check your settings. Or triple-check. Whatever it takes.

## Connecting to MongoDB

When SQL just isn't cutting it, enter MongoDB.

### Step 1: Install a MongoDB Client

Pick your tool:

- **MongoDB Compass**: Because visuals help.
- **Robo 3T**: For those who like a snappy interface.
- **Command Line**: You masochist.

### Step 2: Connection Details

Here's what you need:

- **Host**: `localhost` or `127.0.0.1`
- **Port**: `${HOST_MONGO_PORT}` (default is 3093)
- **Username**: `${DEVCONTAINER_MONGO_INITDB_ROOT_USERNAME}` (default is `admin`)
- **Password**: `${DEVCONTAINER_MONGO_INITDB_ROOT_PASSWORD}` (default is `darkSide123`)
- **Authentication Database**: `${DEVCONTAINER_MONGO_INITDB_DATABASE}` (default is `ultimate_db`)

Again, replace the placeholders with actual values. Pay attention; this isn't rocket science.

### Step 3: Test the Connection

Attempt to connect. If it fails, well, perhaps NoSQL stands for "No, SQL would have been easier."

## Connecting to Redis

For those who appreciate speed and don't value their sanity.

### Step 1: Install a Redis Client

Your options:

- **RedisInsight**: Because why not?
- **Command Line**: Feeling brave today, aren't we?

### Step 2: Connection Details

Use these settings:

- **Host**: `localhost` or `127.0.0.1`
- **Port**: `${HOST_REDIS_PORT}` (default is 3092)
- **Password**: `${DEVCONTAINER_REDIS_PASSWORD}` (default is `darkSide123`)

### Step 3: Test the Connection

Connect and try setting a key. If it doesn't work, maybe stick to something simpler, like a text file.

## Important Notes for Newbies

- **Containers Must Be Running**: Don't expect magic. Run `docker-compose up` before you try connecting.
- **Check Your Ports**: Make sure you're using the correct host ports as defined in your `.env` file.
- **Environment Variables**: Keep your `.env` file updated. If you mess with it, own it.

## Wrapping Up

Connecting to databases isn't that hard, but you'd be amazed at how often people mess it up. Don't be one of those people. Follow the instructions, use your brain, and you'll be fine. Probably.

---

[back](table-of-contents.md)
