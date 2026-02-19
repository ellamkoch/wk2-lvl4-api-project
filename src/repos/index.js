export async function createRepos() {
    const { createUsersRepo } = await import('./users.repos.js');

    return {
        users: createUsersRepo(),
    };
}
