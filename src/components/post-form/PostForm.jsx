import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file && post.featuredImage) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

return (
    <form onSubmit={handleSubmit(submit)} className="flex text-white px-6 py-10">
        {/* Left side: RTE editor */}
        <div className="w-2/3 pr-6">
            <RTE
                label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}
                labelClassName="text-white text-3xl font-bold mb-4 block tracking-wide transition-all duration-300 hover:text-blue-400 hover:drop-shadow-glow cursor-default"
            />
        </div>

        {/* Right side: Fields - ALIGNED WITH RTE BOX START */}
        <div className="w-1/3 space-y-4 mt-16">
            {/* Title Field */}
            <div className="flex items-center gap-2">
                <label className="w-28 text-white font-medium text-left">Title</label>
                <input
                    placeholder="Enter your title..."
                    className="flex-1 px-4 py-3 rounded-full bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                    {...register("title", { required: true })}
                />
            </div>

            {/* Slug Field */}
            <div className="flex items-center gap-2">
                <label className="w-28 text-white font-medium text-left">Slug</label>
                <input
                    placeholder="auto-generated-slug"
                    className="flex-1 px-4 py-3 rounded-full bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
            </div>

            {/* Featured Image - ONE LINE ONLY */}
            <div className="flex items-center gap-2">
                <label className="w-28 text-white font-medium text-left whitespace-nowrap">Image</label>
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="flex-1 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/10 file:text-white hover:file:bg-white/20 file:transition cursor-pointer"
                    {...register("image", { required: !post })}
                />
            </div>

            {/* Image Preview */}
            {post && (
                <div className="w-full">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg shadow-lg border border-gray-600"
                    />
                </div>
            )}

            {/* Status Field */}
            <div className="flex items-center gap-2">
                <label className="w-28 text-white font-medium text-left">Status</label>
                <select
                    className="flex-1 px-4 py-3 rounded-full bg-white/5 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition cursor-pointer"
                    {...register("status", { required: true })}
                >
                    <option value="active" className="bg-[#1e1e1e]">active</option>
                    <option value="inactive" className="bg-[#1e1e1e]">inactive</option>
                </select>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                className="w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition mt-6"
            >
                {post ? "Update Post" : "Submit Post"}
            </Button>
        </div>

        {/* Optional custom style for glow */}
        <style jsx>{`
            .hover\\:drop-shadow-glow:hover {
                filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.6));
            }
        `}</style>
    </form>
);

}