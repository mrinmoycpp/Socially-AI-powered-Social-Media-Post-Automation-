import { PlusIcon, X, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import AccountList from "../components/AccountList";

export interface Account {
  id: string;
  platform: string;
  username: string;
  followers: number;
}

const PLATFORMS = [
  {
    name: "Instagram",
    icon: FaInstagram,
    color: "text-pink-500",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    color: "text-blue-600",
  },
  {
    name: "Twitter",
    icon: FaXTwitter,
    color: "text-black",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "text-blue-700",
  },
];

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showPlatformPicker, setShowPlatformPicker] =
    useState(false);

  const handleConnect = (platform: string) => {
    const alreadyConnected = accounts.find(
      (acc) => acc.platform === platform
    );

    if (alreadyConnected) return;

    const newAccount: Account = {
      id: Date.now().toString(),
      platform,
      username: `${platform.toLowerCase()}_user`,
      followers: Math.floor(Math.random() * 5000) + 500,
    };

    setAccounts((prev) => [...prev, newAccount]);
    setShowPlatformPicker(false);
  };

  const handleDisconnect = (accountId: string) => {
    const confirmDisconnect = window.confirm(
      "Are you sure you want to disconnect this account?"
    );

    if (!confirmDisconnect) return;

    setAccounts((prev) =>
      prev.filter((acc) => acc.id !== accountId)
    );
  };

  return (
    <div className="space-y-8 max-w-5xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Connected Accounts
          </h2>

          <p className="text-slate-500 mt-1">
            {accounts.length} of {PLATFORMS.length} platforms
            connected
          </p>
        </div>

        <button
          onClick={() => setShowPlatformPicker(true)}
          className="
            flex items-center gap-2
            bg-blue-600 text-white
            px-5 py-3 rounded-xl
            hover:bg-blue-700
            transition
          "
        >
          <PlusIcon className="h-5 w-5" />
          Connect Account
        </button>
      </div>

      {/* Connected Accounts */}
      <AccountList
        accounts={accounts}
        OnDisconnect={handleDisconnect}
      />

      {/* Modal */}
      {showPlatformPicker && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                Connect an Account
              </h3>

              <button
                onClick={() =>
                  setShowPlatformPicker(false)
                }
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-3">
              {PLATFORMS.map((platform) => {
                const Icon = platform.icon;

                const connectedAccount = accounts.find(
                  (acc) =>
                    acc.platform === platform.name
                );

                const isConnected =
                  !!connectedAccount;

                return (
                  <div
                    key={platform.name}
                    className={`
                      w-full p-4 border rounded-xl
                      transition-all
                      ${
                        isConnected
                          ? "bg-green-50 border-green-200"
                          : "border-slate-200"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-slate-100">
                          <Icon
                            className={`text-2xl ${platform.color}`}
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {platform.name}
                          </p>

                          <p className="text-sm text-slate-500">
                            {isConnected
                              ? `${platform.name} already connected`
                              : `Connect your ${platform.name} account`}
                          </p>
                        </div>
                      </div>

                      {isConnected ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <button
                          onClick={() =>
                            handleConnect(
                              platform.name
                            )
                          }
                          className="
                            flex items-center gap-2
                            bg-blue-600 text-white
                            px-3 py-2 rounded-lg
                            hover:bg-blue-700
                            transition
                          "
                        >
                          <PlusIcon className="h-4 w-4" />
                          Connect
                        </button>
                      )}
                    </div>

                    {isConnected && (
                      <button
                        onClick={() =>
                          handleDisconnect(
                            connectedAccount.id
                          )
                        }
                        className="
                          mt-4 w-full
                          flex items-center justify-center gap-2
                          py-2 rounded-lg
                          bg-red-50 text-red-600
                          hover:bg-red-100
                          transition
                        "
                      >
                        Disconnect
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() =>
                setShowPlatformPicker(false)
              }
              className="
                w-full mt-6
                border border-slate-200
                rounded-xl py-3
                hover:bg-slate-50
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;