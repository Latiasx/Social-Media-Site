import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, getErrorMessage } from "../lib/api";
import type { FeedResponse, FeedPost } from "../lib/types";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { useToast } from "../ui/Toast";
import { ImagePlus, Trash2, RefreshCcw, Video } from "lucide-react";

export function FeedPage() {
  const qc = useQueryClient();
  const { show } = useToast();

  const feed = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const res = await api.get<FeedResponse>("/feed");
      return res.data.posts;
    },
  });

  const upload = useMutation({
    mutationFn: async (payload: { file: File; caption: string }) => {
      const fd = new FormData();
      fd.append("file", payload.file);
      fd.append("caption", payload.caption);
      const res = await api.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: async () => {
      show("Posted!", "success");
      await qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: (e: any) => show(getErrorMessage(e), "error"),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/posts/${id}`);
    },
    onSuccess: async () => {
      show("Deleted.", "success");
      await qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: (e: any) => show(getErrorMessage(e), "error"),
  });

  return (
    <div className="grid gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Feed</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Upload a post and see it appear instantly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2"
            onClick={() => feed.refetch()}
            disabled={feed.isFetching}
          >
            <RefreshCcw className="h-4 w-4" /> Refresh
          </Button>
          <UploadCard
            onUpload={(file, caption) => upload.mutate({ file, caption })}
            loading={upload.isPending}
          />
        </div>
      </header>

      {feed.isLoading ? (
        <SkeletonGrid />
      ) : feed.isError ? (
        <div className="glass rounded-3xl p-6 border border-rose-500/20 bg-rose-500/5">
          <div className="text-sm text-rose-200">Could not load feed.</div>
          <div className="mt-2 text-sm text-zinc-300">
            {getErrorMessage((feed as any).error)}
          </div>
        </div>
      ) : feed.data?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {feed.data.map((p) => (
            <PostCard key={p.id} post={p} onDelete={() => del.mutate(p.id)} deleting={del.isPending} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function UploadCard({
  onUpload,
  loading,
}: {
  onUpload: (file: File, caption: string) => void;
  loading: boolean;
}) {
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const [caption, setCaption] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const pick = () => fileRef.current?.click();

  const submit = () => {
    if (!file) return;
    onUpload(file, caption);
    setCaption("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="glass rounded-2xl p-3 shadow-soft">
      <div className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <Button variant="secondary" size="sm" onClick={pick} className="gap-2">
          <ImagePlus className="h-4 w-4" />
          {file ? "Change" : "Upload"}
        </Button>
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs text-zinc-300">
            {file ? file.name : "Pick an image or video"}
          </div>
          <div className="text-[11px] text-zinc-500">
            Max size/limits depend on backend.
          </div>
        </div>
        <Button size="sm" onClick={submit} disabled={!file} loading={loading}>
          Post
        </Button>
      </div>

      <div className="mt-3">
        <Textarea
          placeholder="Write a caption…"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
    </div>
  );
}

function PostCard({
  post,
  onDelete,
  deleting,
}: {
  post: FeedPost;
  onDelete: () => void;
  deleting: boolean;
}) {
  const created = new Date(post.created_at);
  const pretty = created.toLocaleString();

  return (
    <article className="glass overflow-hidden rounded-3xl shadow-soft">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{post.email}</div>
          <div className="text-xs text-zinc-500">{pretty}</div>
        </div>
        {post.is_owner ? (
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-rose-200 hover:bg-rose-500/10"
            onClick={() => {
              const ok = window.confirm("Delete this post?");
              if (ok) onDelete();
            }}
            disabled={deleting}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        ) : null}
      </div>

      <div className="relative aspect-[4/3] bg-zinc-900">
        {post.file_type === "video" ? (
          <div className="absolute inset-0 grid place-items-center">
            <video
              src={post.url}
              controls
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <img src={post.url} alt={post.file_name} className="h-full w-full object-cover" />
        )}
        {post.file_type === "video" ? (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
            <Video className="h-3.5 w-3.5" /> video
          </div>
        ) : null}
      </div>

      <div className="px-4 py-4">
        {post.caption ? (
          <p className="text-sm text-zinc-200">{post.caption}</p>
        ) : (
          <p className="text-sm text-zinc-500 italic">No caption</p>
        )}
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="glass rounded-3xl p-10 text-center shadow-soft">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-500/15 border border-indigo-500/25">
        <ImagePlus className="h-6 w-6 text-indigo-300" />
      </div>
      <h2 className="text-lg font-semibold">No posts yet</h2>
      <p className="mt-2 text-sm text-zinc-400">
        Upload the first image/video to kick off the feed.
      </p>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass rounded-3xl overflow-hidden">
          <div className="px-4 py-3">
            <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
            <div className="mt-2 h-3 w-24 animate-pulse rounded bg-white/10" />
          </div>
          <div className="aspect-[4/3] animate-pulse bg-white/5" />
          <div className="px-4 py-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
