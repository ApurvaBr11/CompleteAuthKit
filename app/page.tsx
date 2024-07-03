import Loginbutton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-sky-500">
      <div className="space-y-6">
        <h1>Auth</h1>
       <Loginbutton asChild>
       <Button variant={"secondary"}>SignIn</Button>
       </Loginbutton>
      </div>
    </div>
  );
}
