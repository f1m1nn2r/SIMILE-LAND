import { Profile } from "./(home)/profile";
import { HeroSection } from "./(home)/hero";
import { Discography } from "@/src/features/discography";
import { Merch } from "@/src/features/merch";

export default function Home() {
  return (
    <main className="space-y-[250px]">
      <HeroSection />
      <Profile />
      <Discography />
      <Merch />
    </main>
  );
}
