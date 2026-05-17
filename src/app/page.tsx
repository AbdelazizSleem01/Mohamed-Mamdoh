import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Experience } from "@/components/portfolio/experience";
import { Education } from "@/components/portfolio/education";
import { Certifications } from "@/components/portfolio/certifications";
import { Services } from "@/components/portfolio/services";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { PortfolioDataProvider } from "@/components/portfolio/portfolio-data-provider";
import { getPortfolioContent } from "@/lib/portfolio-store";

export default async function Home() {
  const content = await getPortfolioContent();

  return (
    <PortfolioDataProvider initialData={content}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </PortfolioDataProvider>
  );
}
