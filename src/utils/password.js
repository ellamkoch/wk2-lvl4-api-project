/**
 * Password Utility
 *
 * Responsibilities:
 * - Hash plain text passwords
 * - Compare plain text password with stored hash
 *
 * Uses bcryptjs for hashing.
 * Password hashes are never returned to clients.
 *
 * Phase: 1
 */

import bcrypt from 'bcryptjs';

/**
 * Hash a plain text password.
 *
 * @param {string} password
 * @returns {Promise<string>}
 */

export function hashPassword(password) {
    const saltRounds = 10;

    return bcrypt.hashSync(password, saltRounds);
}

/**
 * Compare plain text password to stored hash.
 *
 * @param {string} password
 * @param {string} passwordHash
 * @returns {Promise<boolean>}
 */

export function verifyPassword(password, hash){
    return bcrypt.compareSync(password, hash);
}
