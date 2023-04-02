import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'dragon' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };
				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {},
};

export default NextAuth(authOptions);
