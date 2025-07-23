import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios"; // ✅ Axios instance with correct baseURL
import { Link, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/notes", { title, content });

      if (response.status === 201 || response.status === 200) {
        toast.success("Note created successfully!");
        navigate("/");
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        {/* Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body space-y-4">
            <h2 className="card-title text-2xl font-bold">
              📝 Create New Note
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="label font-medium">Title</label>
                <input
                  type="text"
                  placeholder="Enter a title..."
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content Textarea */}
              <div>
                <label className="label font-medium">Content</label>
                <textarea
                  placeholder="Write your note..."
                  className="textarea textarea-bordered w-full min-h-[120px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-success btn-wide"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
