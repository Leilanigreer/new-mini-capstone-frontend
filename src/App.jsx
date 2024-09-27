import { Header } from "./Header";
import { ProductsPage } from "./ProductsPage";
import { Footer } from "./Footer";
import { LogoutLink } from "./LogoutLink";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";

function App() {
  return (
    <div>
      <Header />
      {/* <LogoutLink />
      <SignupPage />
      <LoginPage /> */}
      <ProductsPage />
      <Footer />
    </div>
  )
}

export default App;