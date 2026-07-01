import { Trash2 } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

interface Account {
  id: string;
  platform: string;
  username: string;
  followers: number;
}

interface AccountListProps {
  accounts: Account[];
  OnDisconnect: (accountId: string) => void;
}

const AccountList = ({
  accounts,
  OnDisconnect,
}: AccountListProps) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <FaInstagram className="text-pink-500 text-2xl" />;

      case "Facebook":
        return <FaFacebook className="text-blue-600 text-2xl" />;

      case "LinkedIn":
        return <FaLinkedin className="text-blue-700 text-2xl" />;

      case "Twitter":
        return <FaXTwitter className="text-black text-2xl" />;

      default:
        return null;
    }
  };

  if (accounts.length === 0) {
    return (
      <div className="border border-dashed border-slate-300 rounded-xl p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No accounts connected
        </h3>

        <p className="text-slate-500 mt-2">
          Connect your first social media account.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {accounts.map((account) => (
        <div
          key={account.id}
          className="
            bg-white rounded-xl border border-slate-200
            p-6 shadow-sm
            hover:shadow-lg hover:-translate-y-1
            transition-all
          "
        >
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              {getIcon(account.platform)}

              <div>
                <h3 className="font-semibold text-slate-900">
                  {account.platform}
                </h3>

                <p className="text-sm text-slate-500">
                  @{account.username}
                </p>
              </div>
            </div>

            <span className="text-green-600 text-sm">
              Connected
            </span>
          </div>

          <p className="mt-5 text-slate-500 text-sm">
            {account.followers.toLocaleString()} followers
          </p>

          <button
            onClick={() => OnDisconnect(account.id)}
            className="
              mt-5 flex items-center gap-2
              text-red-600 hover:text-red-700
            "
          >
            <Trash2 className="h-4 w-4" />
            Disconnect
          </button>
        </div>
      ))}
    </div>
  );
};

export default AccountList;