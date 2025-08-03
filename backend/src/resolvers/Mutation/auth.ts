import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users } from "@prisma/client";
import { Context } from "../../index.js";

interface UserArgs {
    name: string;
    email: string;
    password: string;
}

interface AuthPayloadType {
    userErrors: {
        message: string;
    }[];
    user: Users | null;
    token: string | null;
}

interface UserPayloadType {
    userErrors: {
        message: string;
    }[];
    user: Users | null;
}

export const authResolvers = {
    userCreate: async (
        _: any,
        { user }: { user: UserArgs },
        { prisma }: Context
    ): Promise<UserPayloadType> => {
        const { name, email, password } = user;

        if (!name || !email || !password) {
            return {
                userErrors: [{
                    message: "You must provide a name, email and password to create an account"
                }],
                user: null
            };
        }

        // Check if user already exists
        const existingUser = await prisma.users.findUnique({
            where: { email }
        });

        if (existingUser) {
            return {
                userErrors: [{
                    message: "A user with this email already exists"
                }],
                user: null
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
        });

        return {
            userErrors: [],
            user: createdUser
        };
    },

    userLogin: async (
        _: any,
        { email, password }: { email: string; password: string },
        { prisma }: Context
    ): Promise<AuthPayloadType> => {
        if (!email || !password) {
            return {
                userErrors: [{
                    message: "You must provide an email and password"
                }],
                user: null,
                token: null
            };
        }

        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (!user) {
            return {
                userErrors: [{
                    message: "Invalid credentials"
                }],
                user: null,
                token: null
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {
                userErrors: [{
                    message: "Invalid credentials"
                }],
                user: null,
                token: null
            };
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "7d" }
        );

        return {
            userErrors: [],
            user,
            token
        };
    }
};
