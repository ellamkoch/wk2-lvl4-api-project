export async function createRepos() {
    const { createUsersRepo } = await import('./users.repos.js');
    const { createClassesRepo } = await import('./classes.repo.js')


    return {
        classes: createClassesRepo(),
        users: createUsersRepo()
    };
}
