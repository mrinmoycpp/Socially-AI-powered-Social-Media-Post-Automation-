import { useEffect, useState } from "react";
import { Calendar, Clock, ImagePlus, X } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { PLATFORMS } from "../assets/assets";

const dummyPostsData = [
  {
    id: 1,
    caption: "Launching our new AI feature 🚀",
    platforms: ["Instagram", "LinkedIn"],
    date: "2026-07-03",
    time: "10:00",
    status: "scheduled",
  },
  {
    id: 2,
    caption: "Check out our latest productivity tips 💡",
    platforms: ["Facebook", "X"],
    date: "2026-06-28",
    time: "18:30",
    status: "published",
  },
];

const Scheduler = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [caption, setCaption] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  useEffect(() => {
    setPosts(dummyPostsData);
  }, []);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !caption ||
      selectedPlatform.length === 0 ||
      !selectedDate ||
      !selectedTime
    ) {
      return;
    }

    const newPost = {
      id: Date.now(),
      caption,
      platforms: selectedPlatform,
      date: selectedDate,
      time: selectedTime,
      status: "scheduled",
      media: mediaFile?.name || null,
    };

    setPosts((prev) => [newPost, ...prev]);

    setCaption("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedPlatform([]);
    setMediaFile(null);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <FaInstagram size={14} />;
      case "facebook":
        return <FaFacebook size={14} />;
      case "linkedin":
        return <FaLinkedin size={14} />;
      case "x":
      case "twitter":
        return <FaXTwitter size={14} />;
      default:
        return null;
    }
  };

  const activityPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Compose Post */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Compose Post
          </h2>

          <form onSubmit={handleSchedule} className="space-y-6">
            {/* Platforms */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Select Platforms
              </label>

              <div className="flex flex-wrap gap-3">
                {PLATFORMS.map((platform) => {
                  const active = selectedPlatform.includes(platform.name);

                  return (
                    <button
                      key={platform.name}
                      type="button"
                      onClick={() => {
                        if (active) {
                          setSelectedPlatform((prev) =>
                            prev.filter((p) => p !== platform.name)
                          );
                        } else {
                          setSelectedPlatform((prev) => [
                            ...prev,
                            platform.name,
                          ]);
                        }
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                        active
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {platform.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Caption */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Caption
              </label>

              <textarea
                rows={5}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write your post..."
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Media (Optional)
              </label>

              <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 rounded-xl p-4 cursor-pointer hover:border-blue-500 transition">
                <ImagePlus size={18} />

                <span className="text-sm text-slate-600">
                  Upload Image or Video
                </span>

                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) =>
                    setMediaFile(e.target.files?.[0] || null)
                  }
                />
              </label>

              {mediaFile && (
                <div className="mt-3 flex items-center justify-between border border-slate-200 rounded-xl p-3">
                  <span className="text-sm text-slate-600 truncate">
                    {mediaFile.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => setMediaFile(null)}
                  >
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date
                </label>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) =>
                    setSelectedDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Time
                </label>

                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) =>
                    setSelectedTime(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 p-3"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
            >
              Schedule Post
            </button>
          </form>
        </div>
      </div>

      {/* Activity */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Activity
          </h2>

          <div className="space-y-4">
            {activityPosts.length === 0 ? (
              <div className="text-center py-10 text-slate-500">
                No activity yet.
              </div>
            ) : (
              activityPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {post.platforms.map((platform: string) => (
                        <span
                          key={platform}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs"
                        >
                          {getPlatformIcon(platform)}
                          {platform}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-slate-700">
                      {post.caption}
                    </p>

                    {post.media && (
                      <p className="text-xs text-slate-500">
                        📎 {post.media}
                      </p>
                    )}

                    <div className="flex gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.time}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === "scheduled"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {post.status === "scheduled"
                      ? "Scheduled"
                      : "Published"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;