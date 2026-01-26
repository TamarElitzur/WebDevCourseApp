const userRepo = require("../repositories/userRepository");
const bcrypt = require("bcryptjs"); // Make sure you have bcryptjs installed

class AuthService {
    async register({ email, fullName, password }) {
        const existing = await userRepo.findByEmail(email);
        if (existing) {
            throw new Error("This email is already registered.");
        }

        if (password.length < 4) {
             throw new Error("Password must be at least 4 characters.");
        }

        const passwordHash = await bcrypt.hash(password, 12);
        return await userRepo.create({ email, fullName, passwordHash });
    }

    async login({ email, password }) {
        const user = await userRepo.findByEmail(email);
        
        // CASE 1: User Not Found
        if (!user) {
            throw new Error("User not found. Please register first.");
        }

        // CASE 2: Wrong Password
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            throw new Error("Incorrect password. Please try again.");
        }

        return user;
    }
}

module.exports = new AuthService();