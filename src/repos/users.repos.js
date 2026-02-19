export function createUsersRepo() {

    const users = [];
    let nextId = 1;

    return {

        create(data) {
            const user = { id: nextId++, ...data };
            users.push(user);
            return user;
        },

        findByEmail(email) {
            return users.find((u) => u.email === email) ?? null;
        },


        findById(id) {
            return users.find((u) => u.id === id) ?? null;
        },
    };
}
