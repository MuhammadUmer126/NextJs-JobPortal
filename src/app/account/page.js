import Account from "@/components/account";
import { fetchProfileAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";

const AccountPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  return (
    <Account
      profileInfo={JSON.parse(JSON.stringify(profileInfo))}
      user={JSON.parse(JSON.stringify(user))}
    />
  );
};

export default AccountPage;
