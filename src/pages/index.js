import Header from "../components/Header";
import Home from "../components/Home";
import Footer from "../components/Footer";
import Personagens from "@/components/Personagens";
import Vilas from "@/components/Vilas";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Home>
        <Personagens>
          <Vilas />
          </Personagens>
      </Home>
      <Footer email="marceloaugustocge@gmail.com" nome="Marcelo Augusto" />
    </div>
  );
}
