import { prisma } from './index'

const resetData = async () => {
  const db = prisma;
  // https://www.prisma.io/docs/concepts/components/prisma-client/crud#deleting-all-data-with-raw-sql--truncate
  const tableNames = await db.$queryRaw<Array<{ tablename: string }>>`SELECT tablename
                                                                        FROM pg_tables
                                                                        WHERE schemaname = 'public'`;
  console.log("tableNames", tableNames);

  const names = tableNames
    .filter(({ tablename }) => tablename !== "_prisma_migrations")
    .map(({ tablename }) => `"public"."${tablename}"`);

  try {
    await db.$executeRawUnsafe(`TRUNCATE TABLE ${names.join(",")} CASCADE;`);
  } catch (error) {
    console.log({ error });
  }
};


it("breaks when using array enum type and truncate", async () => {
  await prisma.test.create({ data: { colors: ['blue'] }, });
  await resetData();
  await prisma.test.create({ data: { colors: ['red'] }, });    
});