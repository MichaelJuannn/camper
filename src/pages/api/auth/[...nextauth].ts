import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/utils/prisma';

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt', maxAge: 60 * 60 * 24 },
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID!, // its a string check env
			clientSecret: process.env.DISCORD_CLIENT_SECRET!, // its a string check env
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'dragon' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = {
					id: '1',
					name: 'J Smith',
					email: 'jsmith@example.com',
				};
				console.log(credentials);
				if (credentials?.username == 'dragon') {
					return user;
				} else {
					throw new Error('check your mom');
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) token.id = user?.id;
			return token;
		},
		async session({ session, token, user }) {
			if (session.user) (session.user as Record<string, any>)['id'] = token.id;
			return session;
		},
	},
};

export default NextAuth(authOptions);
