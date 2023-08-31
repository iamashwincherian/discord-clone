import { ThemeSwitcher } from "@/components/themeSwitcher/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <section className="m-2">
        <p>Discord</p>
        <UserButton afterSignOutUrl="/" />
        <ThemeSwitcher />
      </section>
    </main>
  );
}
