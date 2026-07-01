import { useEffect, useState } from "react";
import { Sparkles, ImageIcon } from "lucide-react";

const dummyGenerationData: any[] = [];

const AIComposer = () => {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generateImage, setGenerateImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<any[]>([]);

  const [activeScheduler, setActiveScheduler] =
    useState<any>(null);
  const [selectedPlatforms, setSelectedPlatforms] =
    useState<string[]>([]);
  const [scheduledDate, setScheduledDate] =
    useState("");
  const [scheduledTime, setScheduledTime] =
    useState("");
  const [scheduling, setScheduling] =
    useState(false);

  const fetchGenerations = async () => {
    setGenerations(dummyGenerationData);
  };

  useEffect(() => {
    fetchGenerations();
  }, []);

  const tones = [
    "Professional",
    "Casual",
    "Humorous",
    "Inspirational",
    "Persuasive",
    "Friendly",
    "Formal",
    "Informal",
    "Optimistic",
    "Pessimistic",
  ];

  const handleGenerate = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Prompt Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          AI Content Composer
        </h2>

        <div className="space-y-5">
          {/* Prompt */}
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Prompt
            </label>

            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              placeholder="Describe the post you want AI to create..."
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tone */}
          <div>
            <label
              htmlFor="tone"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Tone
            </label>

            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {tones.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Image Generation */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <ImageIcon
                    size={18}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h3 className="font-medium text-slate-800">
                    Generate AI Image
                  </h3>

                  <p className="text-sm text-slate-500">
                    Create an image along with your post.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setGenerateImage(!generateImage)
                }
                className={`relative h-7 w-12 rounded-full transition ${
                  generateImage
                    ? "bg-blue-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    generateImage
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={18} />

            {loading
              ? "Generating..."
              : "Generate Content"}
          </button>
        </div>
      </div>

      {/* Generated Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Generated Posts
        </h2>

        {generations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Sparkles
              size={40}
              className="text-slate-300 mb-4"
            />

            <h3 className="font-medium text-slate-700">
              No generations yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Generate content and it will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {generations.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-slate-700">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIComposer;