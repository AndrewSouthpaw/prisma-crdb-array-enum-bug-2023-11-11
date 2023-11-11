Demonstrates issue with Prisma generating SQL that fails to create a simple record with an enum array after running `TRUNCATE`.

If you create a record that has an enum array column, then run `TRUNCATE`, then create another record, it produces an error.

This is using the `TRUNCATE` code [recommended by Prisma for clearing test data](https://www.prisma.io/docs/concepts/components/prisma-client/crud#deleting-all-data-with-raw-sql--truncate).

# Setup

1. `npm install`
1. Have CRDB v22 or v23 running on port 26257
1. `$ DATABASE_URL="postgresql://root@localhost:26257/defaultdb" npx prisma migrate dev`
1. `$ DATABASE_URL="postgresql://root@localhost:26257/defaultdb" npx jest`
1. (you might have to run jest twice to get the error, unclear)
1. 💥

Should get this error:

```
 FAIL  ./index.test.ts
  ✕ breaks when using array enum type and truncate (315 ms)

  ● breaks when using array enum type and truncate

    PrismaClientUnknownRequestError:
    Invalid `prisma.test.create()` invocation in
    /Users/andrew/Projects/crdb-prisma-migration-repro-2022-12-12/index.test.ts:26:21

      23 it("breaks when using array enum type and truncate", async () => {
      24   await prisma.test.create({ data: { colors: ['blue'] }, });
      25   await resetData();
    → 26   await prisma.test.create(
    Error occurred during query execution:
    ConnectorError(ConnectorError { user_facing_error: None, kind: QueryError(PostgresError { code: "42804", message: "placeholder $1 already has type string, cannot assign Color", severity: "ERROR", detail: None, column: None, hint: None }), transient: false })

      at Cn.handleRequestError (node_modules/@prisma/client/runtime/library.js:123:6989)
      at Cn.handleAndLogRequestError (node_modules/@prisma/client/runtime/library.js:123:6206)
      at Cn.request (node_modules/@prisma/client/runtime/library.js:123:5926)
      at l (node_modules/@prisma/client/runtime/library.js:128:9968)
```

Test code is in `index.test.ts`.

If you comment out `await resetData()`, the error goes away. Rather strangely, if you add the reset back in, you have to run the test **twice** to produce the error.

# Discussion

I also tried this with a regular enum column (e.g. `color Color`), but it doesn't reproduce the issue.
