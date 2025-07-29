import { StoreProvider } from "@/store/storeProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>{children}</body>
      </StoreProvider>
    </html>
  );
}
