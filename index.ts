const { PrismaClient } = require('@prisma/client')
const { v4: uuidv4 } = require('uuid')

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
