import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Soluciones from "./components/Soluciones";
import Proceso from "./components/Proceso";
import Equipo from "./components/Equipo";
import Empresas from "./components/Empresas";
import Tecnologias from "./components/Tecnologias";
import Faq from "./components/Faq";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="bg-white text-slate-800 font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Soluciones />
        <Proceso />
        <Equipo />
        <Empresas />
        <Tecnologias />
        <Faq />
        <Contacto />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
