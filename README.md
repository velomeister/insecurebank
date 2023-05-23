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

Execute the following command inside your `mysql` console:

```bash
source /path/to/repo/create_database.sql
```

It should setup the required database, already populated with some users.

### Start app

Using simple `npm`:

```bash
npm install
npm start
```
