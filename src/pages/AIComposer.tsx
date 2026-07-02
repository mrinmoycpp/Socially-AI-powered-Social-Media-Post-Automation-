import { useEffect, useState } from "react";
import { Sparkles, ImageIcon, X, Calendar } from "lucide-react";

const dummyGenerationData: any[] = [
  {
    id: "demo-1",
    content:
      "Boost your productivity with AI-powered workflows. Save time, create smarter, and grow faster!",
  },
];

const platformsList = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "X (Twitter)",
];

const AIComposer = () => {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generateImage, setGenerateImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<any[]>([]);

  const [activeScheduler, setActiveScheduler] = useState<any>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduling, setScheduling] = useState(false);

  useEffect(() => {
    setGenerations(dummyGenerationData);
  }, []);

  const tones = ["Professional", "Casual", "Humorous", "Inspirational"];

  const handleGenerate = () => {
    setLoading(true);

    setTimeout(() => {
      setGenerations((prev) => [
        {
          id: Date.now().toString(),
          content: `${prompt} (${tone})`,
        },
        ...prev,
      ]);
      setPrompt("");
      setLoading(false);
    }, 1200);
  };

  const togglePlatform = (p: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const openScheduler = (item: any) => {
    setActiveScheduler(item);
    setSelectedPlatforms([]);
    setScheduledDate("");
    setScheduledTime("");
  };

  const handleSchedule = () => {
    setScheduling(true);

    setTimeout(() => {
      console.log("Scheduled:", {
        post: activeScheduler,
        selectedPlatforms,
        scheduledDate,
        scheduledTime,
      });

      setScheduling(false);
      setActiveScheduler(null);
    }, 900);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      {/* Composer Card */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-slate-800">
            AI Content Studio
          </h2>

          <span className="text-xs px-3 py-1 bg-slate-100 rounded-full">
            Beta
          </span>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What do you want to create today?"
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={4}
        />

        <div className="grid grid-cols-2 gap-3 mt-4">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="border rounded-xl p-2"
          >
            {tones.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <button
            onClick={() => setGenerateImage(!generateImage)}
            className={`rounded-xl border p-2 flex items-center justify-center gap-2 transition ${
              generateImage
                ? "bg-blue-50 border-blue-300"
                : "bg-white"
            }`}
          >
            <ImageIcon size={16} />
            {generateImage ? "Image ON" : "Image OFF"}
          </button>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt || loading}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:opacity-90 disabled:opacity-50"
        >
          <Sparkles size={18} />
          {loading ? "Generating..." : "Generate Content"}
        </button>
      </div>

      {/* Generated Posts */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">
          Generated Posts
        </h3>

        {generations.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            No posts yet. Generate something
          </div>
        ) : (
          <div className="space-y-4">
            {generations.map((item) => (
              <div
                key={item.id}
                className="group border rounded-2xl p-4 hover:shadow-md transition bg-gradient-to-b from-white to-slate-50"
              >
                <p className="text-slate-700 leading-relaxed">
                  {item.content}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-slate-400">
                    AI Generated
                  </span>

                  <button
                    onClick={() => openScheduler(item)}
                    className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <Calendar size={14} />
                    Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scheduler Modal */}
      {activeScheduler && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in">

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">
                Schedule Post
              </h3>
              <button onClick={() => setActiveScheduler(null)}>
                <X />
              </button>
            </div>

            {/* Preview */}
            <div className="bg-slate-50 border rounded-xl p-3 text-sm text-slate-700 mb-4">
              {activeScheduler.content}
            </div>

            {/* Platforms */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">
                Select Platforms
              </p>

              <div className="flex flex-wrap gap-2">
                {platformsList.map((p) => (
                  <button
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={`text-xs px-3 py-1 rounded-full border transition ${
                      selectedPlatforms.includes(p)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) =>
                  setScheduledDate(e.target.value)
                }
                className="border rounded-xl p-2"
              />

              <input
                type="time"
                value={scheduledTime}
                onChange={(e) =>
                  setScheduledTime(e.target.value)
                }
                className="border rounded-xl p-2"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveScheduler(null)}
                className="flex-1 border rounded-xl py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleSchedule}
                disabled={scheduling}
                className="flex-1 bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-700"
              >
                {scheduling ? "Scheduling..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIComposer;