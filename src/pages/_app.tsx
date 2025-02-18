import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={cn(GeistSans.className, 'w-full h-full')}>
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
