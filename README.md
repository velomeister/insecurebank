# IN Secure Bank

This is a simple application made with academic purposes. It's (most likely) very insecure, very basic and very, very ugly.

## Roles

### User

Users can:

- Request overdrafts
- Transfer money

### Auditor

Auditors can list users' transfers.

### Administrator

Administrators can:

- List users' transfers.
- Create users.
- Manage overdraft requests (approve or deny).

Neither Admins or Auditors have money nor the ability to request it.

## How to deploy

### Create database

With the current status of the SQL script that is being used, you need to create a new `mysql` user for this step, said user has to be called `dbuser` and the password has to be `insecurebank`. As this user, execute the following command inside your `mysql` console:

```bash
source /path/to/repo/create_database.sql
```

It should setup the required database, already populated with some users for the app.

### Start app

Using simple `npm`:

```bash
npm install
npm start
```
