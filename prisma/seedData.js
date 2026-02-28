/**
 * Seed helpers for the API project.
 *
 * Goals:
 * - Provide deterministic demo data for class and postman usage.
 * - Provide a SAFE reset strategy for Supabase (remote DB):
 *   clear tables -> seed again (without dropping schema).
 *
 * Notes:
 * - We delete in dependency order (entries -> classes -> users) to avoid FK issues.
 * - This module is imported by both prisma/seed.js and scripts/dbReset.js.
 */

/**
 * Clears all rows from application tables.
 *
 * @param {import('../generated/prisma/index.js').PrismaClient} prisma
 */
export async function clearDatabase(prisma) {
  // Delete children first, then parents
  await prisma.entry.deleteMany();
  await prisma.class.deleteMany();
  await prisma.user.deleteMany();
}

/**
 * Inserts deterministic demo data.
 *
 * @param {import('../generated/prisma/index.js').PrismaClient} prisma
 * @returns {Promise<{ users: any[], classes: any[], entries: any[] }>}
 */
export async function seedDatabase(prisma) {
  // Create demo users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'user1@example.com',
        // For class seed we store a placeholder hash.
        passwordHash: 'seeded_password_hash_not_for_login',
      },
    }),
    prisma.user.create({
      data: {
        email: 'user2@example.com',
        passwordHash: 'seeded_password_hash_not_for_login',
      },
    }),
  ]);

  // Create classes
  const classes = await Promise.all([
    prisma.class.create({
      data: {
        className: 'Halter',
        authorId: users[0].id,
      },
    }),
    prisma.class.create({
      data: {
        className: 'Showmanship',
        authorId: users[0].id,
      },
    }),
    prisma.class.create({
      data: {
        className: 'Western Pleasure',
        authorId: users[1].id,
      },
    }),
  ]);

  // Create entries
  const entries = await Promise.all([
    prisma.entry.create({
      data: {
        horseName: 'Cash',
        classId: classes[0].id,
        authorId: users[1].id,
      },
    }),
    prisma.entry.create({
      data: {
        horseName: 'Cowboy',
        classId: classes[0].id,
        authorId: users[0].id,
      },
    }),
    prisma.entry.create({
      data: {
        horseName: 'Crescendo',
        classId: classes[2].id,
        authorId: users[0].id,
      },
    }),
  ]);

  return { users, classes, entries };
}
