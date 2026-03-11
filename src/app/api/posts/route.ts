import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/database";
import { Post } from "@/entities/Post";
import { Like } from "typeorm";

export async function GET(request: NextRequest) {
  try {
    const dataSource = await getDataSource();
    const postRepo = dataSource.getRepository(Post);
    const search = request.nextUrl.searchParams.get("search");

    let posts: Post[];
    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      posts = await postRepo.find({
        where: [
          { title: Like(term) },
          { author: Like(term) },
        ],
        order: { createdAt: "DESC" },
      });
    } else {
      posts = await postRepo.find({ order: { createdAt: "DESC" } });
    }

    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author, excerpt, featuredImage } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: "Title, content, and author are required" },
        { status: 400 }
      );
    }

    const dataSource = await getDataSource();
    const postRepo = dataSource.getRepository(Post);

    const post = postRepo.create({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      excerpt: excerpt?.trim() || content.trim().substring(0, 160) + (content.trim().length > 160 ? "..." : ""),
      featuredImage: featuredImage?.trim() || null,
    });

    await postRepo.save(post);
    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
