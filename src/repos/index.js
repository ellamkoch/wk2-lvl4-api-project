export async function createRepos() {
  const { createUsersRepo } = await import('./users.repo.js');
  const { createClassesRepo } = await import('./classes.repo.js');
  const { createEntriesRepo } = await import('./entries.repo.js');

  return {
    classes: createClassesRepo(),
    users: createUsersRepo(),
    entries: createEntriesRepo(),
  };
}
