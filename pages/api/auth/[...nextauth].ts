import spotifyApi, { LOGIN_URL } from 'lib/spotify';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000, // = 3600 (1 hour) return from the api
      refreshToken: refreshToken.refresh_token ?? token.refreshToken, // Replace if new one came back, otherwise use the old refresh token
    };
  } catch (error) {
    console.log(error);

    return { ...token, error: 'RefreshAccessTokenError' };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      // @ts-ignore
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, account, user }: any) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // (expire time * 1000)
        };
      }
      //Return previous toekn if the access token has not expired
      if (Date.now() < token.accessTokenExpires) {
        console.log('existing access is valid');
        return token;
      }

      // Access token has expired, refresh it
      console.log('access token has expired, refreshing');
      return await refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.userame;

      return session;
    },
  },
});
