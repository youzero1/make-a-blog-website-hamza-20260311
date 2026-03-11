"use client";

import { useState } from "react";
import { CreatePostInput, PostData } from "@/types";
import styles from "./PostForm.module.css";

interface PostFormProps {
  initialData?: PostData;
  onSubmit: (data: CreatePostInput) => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function PostForm({
  initialData,
  onSubmit,
  loading = false,
  submitLabel = "Create Post",
}: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    else if (title.trim().length < 3)
      newErrors.title = "Title must be at least 3 characters";
    if (!content.trim()) newErrors.content = "Content is required";
    else if (content.trim().length < 10)
      newErrors.content = "Content must be at least 10 characters";
    if (!author.trim()) newErrors.author = "Author is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      excerpt: excerpt.trim() || undefined,
      featuredImage: featuredImage.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title <span>*</span>
        </label>
        <input
          id="title"
          type="text"
          className={`form-input ${errors.title ? "error" : ""}`}
          placeholder="Enter post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author" className="form-label">
          Author <span>*</span>
        </label>
        <input
          id="author"
          type="text"
          className={`form-input ${errors.author ? "error" : ""}`}
          placeholder="Enter author name..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={loading}
        />
        {errors.author && <span className="form-error">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="content" className="form-label">
          Content <span>*</span>
        </label>
        <textarea
          id="content"
          className={`form-textarea ${errors.content ? "error" : ""}`}
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          rows={12}
        />
        {errors.content && (
          <span className="form-error">{errors.content}</span>
        )}
        <span className="form-hint">
          {content.trim().split(/\s+/).filter(Boolean).length} words
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="excerpt" className="form-label">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          className="form-textarea"
          placeholder="Optional excerpt. If left blank, it will be auto-generated from content."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          disabled={loading}
          rows={3}
          style={{ minHeight: "80px" }}
        />
        <span className="form-hint">
          A brief summary shown in post listings.
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="featuredImage" className="form-label">
          Featured Image URL
        </label>
        <input
          id="featuredImage"
          type="url"
          className="form-input"
          placeholder="https://example.com/image.jpg"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
          disabled={loading}
        />
        <span className="form-hint">Optional URL for a featured image.</span>
      </div>

      {featuredImage && (
        <div className={styles.imagePreview}>
          <p className={styles.previewLabel}>Image Preview:</p>
          <img
            src={featuredImage}
            alt="Featured image preview"
            className={styles.previewImg}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <div className={styles.formActions}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
