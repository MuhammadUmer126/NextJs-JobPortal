import { fetchProfileAction } from "@/actions";
import Header from "../header";
import { currentUser } from "@clerk/nextjs/server";
import { Toaster } from "../ui/sonner";
export default async function CommonLayout({ children }) {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  (user);

  return (
    <>
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <Header
          user={JSON.parse(JSON.stringify(user))}
          profileInfo={JSON.parse(JSON.stringify(profileInfo))}
        />
        <main>{children}</main>
      </div>
      <Toaster />
    </>
  );
}
