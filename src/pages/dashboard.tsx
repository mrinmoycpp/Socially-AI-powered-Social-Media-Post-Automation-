import { useState } from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  UsersIcon,
  BarChart3Icon,
} from "lucide-react";

const Dashboard = () => {
  const name = localStorage.getItem("name") || "User";

  const [stats] = useState({
    scheduledPosts: 5,
    publishedPosts: 12,
    totalAccounts: 3,
    totalFollowers: 1200,
    engagementRate: "2.5%",
  });

  const [activities] = useState([
    {
      type: "Scheduled",
      post: "Summer Sale Campaign",
      platform: "Instagram",
      time: "Today • 10:00 AM",
    },
    {
      type: "Published",
      post: "New Feature Announcement",
      platform: "LinkedIn",
      time: "Yesterday • 6:30 PM",
    },
    {
      type: "Scheduled",
      post: "Weekly Tech Tips",
      platform: "Twitter/X",
      time: "Tomorrow • 9:00 AM",
    },
    {
      type: "Published",
      post: "AI Marketing Tips",
      platform: "Facebook",
      time: "2 days ago • 11:00 AM",
    },
  ]);

  const statCards = [
    {
      label: "Scheduled Posts",
      value: stats.scheduledPosts,
      description: "Posts waiting to be published.",
      icon: ClockIcon,
      trend: "+2 today",
    },
    {
      label: "Published Posts",
      value: stats.publishedPosts,
      description: "Total posts published.",
      icon: CheckCircleIcon,
      trend: "All time",
    },
    {
      label: "Total Followers",
      value: stats.totalFollowers,
      description: "Followers across all accounts.",
      icon: BarChart3Icon,
      trend: "+100 this month",
    },
    {
      label: "Connected Accounts",
      value: stats.totalAccounts,
      description: "Social accounts connected.",
      icon: UsersIcon,
      trend: "+1 this month",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Good Morning, {name} 
        </h2>
        <p className="text-slate-600 mt-1">
          Here's what's happening with your social media today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="
              bg-white rounded-2xl border border-slate-200 p-6
              shadow-sm transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              hover:border-blue-300 cursor-pointer
            "
          >
            <div className="flex items-center justify-between mb-5">
              <div className="p-3 rounded-xl bg-blue-50">
                <card.icon className="h-6 w-6 text-blue-600" />
              </div>

              <span className="text-sm font-medium text-slate-500">
                {card.trend}
              </span>
            </div>

            <h3 className="text-slate-600 text-sm">{card.label}</h3>

            <p className="text-3xl font-bold text-slate-900 mt-2">
              {card.value}
            </p>

            <p className="text-sm text-slate-500 mt-2">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900">
            Recent Activities
          </h3>

          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="
                flex items-center justify-between
                p-4 rounded-xl border border-slate-200
                transition-all duration-200
                hover:bg-slate-50 hover:border-blue-200
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    activity.type === "Published"
                      ? "bg-green-100"
                      : "bg-yellow-100"
                  }`}
                >
                  {activity.type === "Published" ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  ) : (
                    <ClockIcon className="h-6 w-6 text-yellow-600" />
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {activity.post}
                  </h4>

                  <p className="text-sm text-slate-500">
                    Posted on {activity.platform}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.type === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {activity.type}
                </span>

                <p className="text-xs text-slate-500 mt-2">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Posts */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          Upcoming Scheduled Posts
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50">
            <div>
              <h4 className="font-semibold text-slate-900">
                Product Launch Reel
              </h4>
              <p className="text-sm text-slate-500">Instagram</p>
            </div>

            <span className="text-sm text-slate-600">
              Today • 5:00 PM
            </span>
          </div>

          <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50">
            <div>
              <h4 className="font-semibold text-slate-900">
                Weekly Newsletter
              </h4>
              <p className="text-sm text-slate-500">LinkedIn</p>
            </div>

            <span className="text-sm text-slate-600">
              Tomorrow • 10:00 AM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;