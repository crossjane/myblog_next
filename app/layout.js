import { StoreProvider } from "@/store/storeProvider";
import "./globals.css";
import Header from "./components/Header";
import "prosemirror-view/style/prosemirror.css";

export async function generateMetadata() {
  return {
    title: "Jane's Blog",
    description: "Jane의 front-end 기술 블로그 입니다.",
  };
}
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <StoreProvider>
        <body>
          <Header />
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
