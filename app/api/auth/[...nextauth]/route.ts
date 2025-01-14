import { sanityClient } from "@/lib/client";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// User data we'll be using for sanity user document
interface UserDetailsProps {
  provider: string | undefined;
  userId: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(params) {
      const { user, account, profile, email } = params;
      // Extract the user details here upon sign in

      const userDetails: UserDetailsProps = {
        provider: account?.provider,
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
      };

      if (user.email) {
        await saveUserDetailsInDatabase(userDetails);
      }

      return true;
    },

    // async redirect({ url, baseUrl }) {
    //   return "/cart";
    // },
    async session({ session, user }) {
      // If you need to customize the session data, you can do it here
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // If you need to customize the JWT payload, you can do it here
      return token;
    },
  },
};

// Save the user details in the database if they don't exist
// This code is just a placeholder and will need to be replaced with your actual database logic
async function saveUserDetailsInDatabase(userDetails: UserDetailsProps) {
  const { userId, email, image, name, provider } = userDetails;

  const query = `*[_type == 'account' && email == '${email}']`;

  const userExists = await sanityClient.fetch(query);

  // If user exists, do nothing, else create new user document
  if (userExists.length > 0 && userExists) {
    console.log("User already exists");
    return;
  } else {
    const newAccountDoc = {
      _type: "account",
      name,
      email,
      image,
      userId,
      provider,
    };

    try {
      const createdAccount = await sanityClient.create(newAccountDoc);
      console.log("Created new account:", createdAccount);
    } catch (error) {
      console.log("Failed to create new account:", error);
    }
  }

  console.log(
    "Saving User Details In Database. Email: ",
    JSON.stringify(userDetails)
  );
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
