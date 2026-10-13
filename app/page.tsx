
import Hero from "./components/Hero";
import JobCategories from "./components/JobCategories";
import FeaturedJobs from "./components/FeaturedJobs";
import CTA from "./components/CTA";


export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen text-white">
      
      <Hero />
      <JobCategories />
      <FeaturedJobs />
      <CTA />
      {/* <Footer /> */}
    </main>
  );
}