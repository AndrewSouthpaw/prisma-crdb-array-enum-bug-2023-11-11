Demonstrates issue with Prisma generating migration that is incompatible with CRDB.

# Setup

1. `npm install`
1. Have CRDB v22.2 running on port 26257
1. `npx prisma migrate dev`
1. 💥

Should get this error:

```
Applying migration `20221212204348_breaking_migration`
Error: P3018

A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve

Migration name: 20221212204348_breaking_migration

Database error code: 55000

Database error:
ERROR: column "balance" being dropped, try again later

DbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E55000), message: "column \"balance\" being dropped, try again later", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("add_column.go"), line: Some(244), routine: Some("checkColumnDoesNotExist") }
```

Then change to running v22.1.11 with a fresh DB. Run `npx prisma migrate dev` and now it'll work.
