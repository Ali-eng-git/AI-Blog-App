import DashboardLayout from "../../../components/layouts/DashboardLayout";
import MDEditor, { commands } from "@uiw/react-md-editor";
import {
  LuLoaderCircle,
  LuSave,
  LuSend,
  LuSparkle,
  LuSparkles,
  LuTrash2,
} from "react-icons/lu";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CoverImageSelector from "../../../components/Inputs/CoverImageSelector";
import TagInput from "../../../components/Inputs/TagInput";
import SkeletonLoader from "../../../components/Loader/SkeletonLoader";
import BlogPostIdeaCard from "../../../components/Cards/BlogPostIdeaCard";
import Modal from "../../../components/Modal";
import GenerateBlogPostForm from "./GenerateBlogPostForm";
import uploadImage from "../../../utils/uploadImages";
import { toast } from "react-hot-toast";
import { getToastMessageByType } from "../../../utils/helper";
import DeleteAertContent from "../../../components/DeleteAlertContent";

const BlogPostEditor = ({ isEdit }) => {
  const navigate = useNavigate();

  const { postSlug = "" } = useParams();

  const [postData, setPostData] = useState({
    id: "",
    title: "",
    content: "",
    coverImageUrl: "",
    coverPreview: "",
    tags: [],
    isDraft: "",
    generatedByAI: false,
  });

  const [postIdeas, setPostIdeas] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState({
    open: false,
    data: null,
  });

  const [ideaLoading, setIdeaLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const handleValuChange = (key, value) => {
    setPostData((prev) => ({ ...prev, [key]: value }));
  };

  // Generate blog ideas using ai
  const generateBlogPostIdeas = async () => {
    try {
      setIdeaLoading(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_IDEAS,
        {
          topics: "React JS, Next JS, Node JS, React UI Components",
        },
      );

      const generatedIdeas = aiResponse.data;
      if (generatedIdeas.length > 0) {
        setPostIdeas(generatedIdeas);
      }
    } catch (error) {
      console.error("Something went wrong please try again late", error);
    } finally {
      setIdeaLoading(false);
    }
  };

  // handle blog post publish
  const handlePublish = async (isDraft) => {
    let coverImageUrl = "";

    if (!postData.title.trim()) {
      setError("Please enter a title");
      return;
    }

    if (!postData.content.trim()) {
      setError("Please enter some content");
      return;
    }

    if (!isDraft) {
      if (!postData.coverImageUrl && !postData.coverPreview) {
        setError("Please select a cover image");
        return;
      }
      if (!postData.tags.length) {
        setError("Please add some tags");
        return;
      }
    }
    setLoading(true);
    setError("");
    try {
      // Check if a new image was uploaded
      if (postData.coverImageUrl instanceof File) {
        const imageUploadRes = await uploadImage(postData.coverImageUrl);
        console.log("Uploaded image response:", imageUploadRes);
        coverImageUrl = imageUploadRes.imageUrl || "";
      } else {
        coverImageUrl = postData.coverPreview;
      }

      const regPayload = {
        title: postData.title,
        content: postData.content,
        coverImageUrl,
        tags: postData.tags,
        isDraft: isDraft ? true : false,
        generatedByAI: true,
      };

      const response = isEdit
        ? await axiosInstance.put(
            API_PATHS.POSTS.UPDATE(postData.id),
            regPayload,
          )
        : await axiosInstance.post(API_PATHS.POSTS.CREATE, regPayload);

      if (response.data) {
        toast.success(
          getToastMessageByType(
            isDraft ? "draft" : isEdit ? "edit" : "published",
          ),
        );
        navigate("/admin/posts");
      }
    } catch (error) {
      setError("Failed to publish blog post. Tray again");
      console.error("Error publishing post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get post data by slug
  const fetchPostDetailsBySlug = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_SLUG(postSlug),
      );

      const post = response.data;

      setPostData({
        id: post._id,
        title: post.title || "",
        content: post.content || "",
        coverImageUrl: "",
        coverPreview: post.coverImageUrl || "",
        tags: post.tags || [],
        isDraft: post.isDraft || false,
        generatedByAI: post.generatedByAI || false,
      });
    } catch (error) {
      console.error("Error fetching post:", error);

      toast.error("Failed to load post");
      navigate("/admin/posts");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog post
  const deletePost = async (id) => {
    try {
      setLoading(true);

      await axiosInstance.delete(API_PATHS.POSTS.DELETE(id));

      toast.success("Post deleted successfully");

      setOpenDeleteAlert({ open: false, data: null });

      // redirect after delete
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post. Try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchPostDetailsBySlug();
    } else {
      generateBlogPostIdeas();
    }
  }, []);
  if (loading && isEdit) {
    return (
      <DashboardLayout activeMenu="Blog Posts">
        <div className="p-5">
          <SkeletonLoader />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu={"Blog Posts"}>
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4">
          <div className="form-card p-6 col-span-12 md:col-span-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-medium">
                {isEdit ? "Edit Post" : "Add New Post"}
              </h2>

              <div className="flex items-center gap-3">
                {isEdit && (
                  <button
                    className="flex items-center gap-2.5 text-[13px] font-medium text-rose-500 bg-rose-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-rose-50 hover:border-rose-300 cursor-pointer hover:scale-[1.02] transition-all"
                    disabled={loading}
                    onClick={() =>
                      setOpenDeleteAlert({
                        open: true,
                        data: postData.id,
                      })
                    }
                  >
                    <LuTrash2 className="text-sm" />{" "}
                    <span className="hidden md:block">Delete</span>
                  </button>
                )}

                <button
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.02] transition-all"
                  disabled={loading}
                  onClick={() => handlePublish(true)}
                >
                  <LuSave className="text-sm" />{" "}
                  <span className="hidden md:block">Save as Draft</span>
                </button>

                <button
                  disabled={loading}
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-600 hover:text-white hover:bg-linear-to-r hover:from-sky-500 hover:to-indigo-500 rounded px-3 py-[3px] border-sky-500 hover:border-sky-50 cursor-pointer transition-all"
                  onClick={() => handlePublish(false)}
                >
                  {loading ? (
                    <LuLoaderCircle className="animate-spin text-[15px]" />
                  ) : (
                    <LuSend className="text-sm" />
                  )}{" "}
                  Publish
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <div className="mt-4">
              <label htmlFor="" className="text-xs font-medium text-slate-600">
                Post Title
              </label>

              <input
                placeholder="How to Build a MERN App"
                className="form-input"
                value={postData.title}
                onChange={({ target }) =>
                  handleValuChange("title", target.value)
                }
              />
            </div>

            <div className="mt-4">
              <CoverImageSelector
                image={postData.coverImageUrl}
                setImage={(value) => handleValuChange("coverImageUrl", value)}
                preview={postData.coverPreview}
                setPreview={(value) => handleValuChange("coverPreview", value)}
              />
            </div>

            <div className="mt-3">
              <label htmlFor="" className="text-xs font-medium text-slate-600">
                Content
              </label>

              <div data-color-mode="light" className="mt-3">
                <MDEditor
                  value={postData.content}
                  onChange={(data) => {
                    handleValuChange("content", data);
                  }}
                  commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.hr,
                    commands.title,
                    commands.divider,
                    commands.link,
                    commands.code,
                    commands.image,
                    commands.unorderedListCommand,
                    commands.orderedListCommand,
                    commands.checkedListCommand,
                  ]}
                  hideMenu={true}
                ></MDEditor>
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="" className="text-xs font-medium text-slate-600">
                Tags
              </label>

              <TagInput
                tags={postData.tags || []}
                setTags={(data) => {
                  handleValuChange("tags", data);
                }}
              />
            </div>
          </div>

          {!isEdit && (
            <div className="form-card col-span-12 md:col-span-4 p-0">
              <div className="flex items-center justify-between px-6 pt-6">
                <h4 className="text-sm md:text-base font-medium inline-flex items-center gap-2">
                  <span className="text-sky-600">
                    <LuSparkles />
                  </span>
                  Ideas for your new post
                </h4>

                <button
                  onClick={() =>
                    setOpenBlogPostGenForm({ open: true, data: null })
                  }
                  className="bg-linear-to-r from-sky-500 to-cyan-400 text-[13px] font-semibold text-white px-3 py-1 rounded hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-sky-200"
                >
                  Generate New
                </button>
              </div>

              <div>
                {ideaLoading ? (
                  <div className="p-5">
                    <SkeletonLoader />
                  </div>
                ) : (
                  postIdeas.map((idea, index) => (
                    <BlogPostIdeaCard
                      key={`idea_${index}`}
                      title={idea.title || ""}
                      description={idea.description || ""}
                      tags={idea.tags || []}
                      tone={idea.tone || "casual"}
                      onSelect={() =>
                        setOpenBlogPostGenForm({ open: true, data: idea })
                      }
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <Modal
          isOpen={openBlogPostGenForm?.open}
          onClose={() => {
            setOpenBlogPostGenForm({ open: false, data: null });
          }}
          hideHeader
        >
          <GenerateBlogPostForm
            contentParams={openBlogPostGenForm?.data || null}
            setPostContent={(title, content) => {
              const postInfo = openBlogPostGenForm?.data || null;
              setPostData((prevState) => ({
                ...prevState,
                title: title || prevState.title,
                content: content || prevState.content,
                tags: postInfo?.tags || prevState.tags,
                generatedByAI: true,
              }));
            }}
            handleCloseForm={() => {
              setOpenBlogPostGenForm({ open: false, data: null });
            }}
          />
        </Modal>
        {/* delete alert modal */}
        <Modal
          isOpen={openDeleteAlert.open}
          onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          title="Delete Post"
        >
          <DeleteAertContent
            content="Are you sure you want to delete this blog post?"
            onDelete={() => deletePost(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default BlogPostEditor;
