import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/database";
import { Post } from "@/entities/Post";

type RouteContext = { params: { id: string } };

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const dataSource = await getDataSource();
    const postRepo = dataSource.getRepository(Post);
    const post = await postRepo.findOne({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ data: post });
  } catch (error) {
    console.error("GET /api/posts/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const dataSource = await getDataSource();
    const postRepo = dataSource.getRepository(Post);
    const post = await postRepo.findOne({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const body = await request.json();
    const { title, content, author, excerpt, featuredImage } = body;

    if (title !== undefined) post.title = title.trim();
    if (content !== undefined) {
      post.content = content.trim();
      if (excerpt === undefined || excerpt === null) {
        post.excerpt =
          content.trim().substring(0, 160) +
          (content.trim().length > 160 ? "..." : "");
      }
    }
    if (author !== undefined) post.author = author.trim();
    if (excerpt !== undefined && excerpt !== null) post.excerpt = excerpt.trim();
    if (featuredImage !== undefined)
      post.featuredImage = featuredImage?.trim() || null;

    await postRepo.save(post);
    return NextResponse.json({ data: post });
  } catch (error) {
    console.error("PUT /api/posts/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const dataSource = await getDataSource();
    const postRepo = dataSource.getRepository(Post);
    const post = await postRepo.findOne({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await postRepo.remove(post);
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/posts/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
