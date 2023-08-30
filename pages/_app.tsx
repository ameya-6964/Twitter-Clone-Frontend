import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <GoogleOAuthProvider clientId="66810103075-nnpu5lqebn2e31urpm6pfskb1a3jflf4.apps.googleusercontent.com">
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </div>
  );
}
