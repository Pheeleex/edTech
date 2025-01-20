import Certifications from "@/components/Certification";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import Process from "@/components/Process";
import Schools from "@/components/Schools";


export default function Home() {
  return (
    <div className="mt-20 md:mt-30 ">
      <div className="relative">
      <Hero />
      <Process />
      <Certifications />
      </div>
     <Schools />
  
    </div>
  );
}
