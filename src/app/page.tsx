import { AboutSection } from "./(sections)/AboutSection";
import { CoreValueSeciton } from "./(sections)/CoreValueSection";
import { MainSection } from "./(sections)/MainSection";

export default function HomePage() {
  return (
    <>
      <MainSection />
      <AboutSection />
      <CoreValueSeciton />
    </>
  );
}
