import { conflict, unauthorized } from '#utils/httpErrors';
import { ensureFields } from '#utils/ensureFieldsGuard';
import { hashPassword, verifyPassword } from '#utils/password';
import { signToken } from '#utils/jwt';


export async function registerUser(req, res) {
    const { users } = res.locals.repos;

    ensureFields(req.body, ['email', 'password']);

    const email = String(req.body.email).toLowerCase().trim();
    const password = String(req.body.password).trim();

    //checking for duplicate emails

    const userExists = await users.findByEmail(email);

    if (userExists) {
        throw conflict('Email already registered');
    }

    const user = await users.create({
        email,
        passwordHash: hashPassword(password),
    });

    const token = signToken({ userId: user.id, secret: req.app.locals.config.JWT_SECRET });

    return res.created({
        token,
        user: { id: user.id, email: user.email },
    });
}

export async function loginUser(req, res) {
    const { users } = res.locals.repos;

    ensureFields(req.body, ['email', 'password' ]);

    const email = String(req.body.email).toLowerCase().trim();
    const password = String(req.body.password).trim();

    const user = await users.findByEmail(email);

    if (!user) {
        throw unauthorized('Invalid credentials');
    }

    if (!verifyPassword(password, user.passwordHash)) {
        throw unauthorized('Invalid credentials');
    }

    const token = signToken({ userId: user.id, secret: req.app.locals.config.JWT_SECRET });

    return res.ok({
        token,
        user: { id: user.id, email: user.email },
    })
}
