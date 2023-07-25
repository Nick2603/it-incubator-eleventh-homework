import { BlogsRepository } from "../repositories/blogsRepository";
import { PostsRepository } from "../repositories/postsRepository";
import { IPost } from "../types/IPost";

export class PostsService {
  constructor(
    protected readonly postsRepository: PostsRepository,
    protected readonly blogsRepository: BlogsRepository
  ) {}

  async deleteAllPosts(): Promise<void> {
    await this.postsRepository.deleteAllPosts();
  }

  async getPostById(id: string): Promise<IPost | null> {
    return await this.postsRepository.getPostById(id);
  }

  async createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<IPost> {
    const blog = await this.blogsRepository.getBlogById(blogId);
    const newPost: IPost = {
      id: Date.now().toString(),
      title,
      shortDescription,
      content,
      blogId,
      createdAt: new Date().toISOString(),
      blogName: blog!.name,
    };
    await this.postsRepository.createPost(newPost);
    return {
      id: newPost.id,
      title: newPost.title,
      shortDescription: newPost.shortDescription,
      content: newPost.content,
      blogId: newPost.blogId,
      createdAt: newPost.createdAt,
      blogName: newPost.blogName,
    };
  }

  async updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    return await this.postsRepository.updatePost(
      id,
      title,
      shortDescription,
      content,
      blogId
    );
  }

  async deletePost(id: string): Promise<boolean> {
    return await this.postsRepository.deletePost(id);
  }
}
