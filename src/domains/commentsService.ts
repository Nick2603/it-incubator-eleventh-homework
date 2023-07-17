import { CommentsRepository } from "../repositories/commentsRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { IComment } from "../types/IComment";

export class CommentsService {
  constructor(
    protected readonly commentsRepository: CommentsRepository,
    protected readonly usersRepository: UsersRepository
  ) {};

  async deleteAllComments(): Promise<void> {
    await this.commentsRepository.deleteAllComments();
  };

  async getCommentById(id: string): Promise<IComment | null> {
    return await this.commentsRepository.getCommentById(id);
  };

  async createComment(content: string, postId: string, userId: string): Promise<IComment> {
    const user = await this.usersRepository.getUserById(userId);
    const newComment: IComment = {
      id: Date.now().toString(),
      postId,
      content,
      commentatorInfo: {
        userId,
        userLogin: user!.accountData.login,
      },
      createdAt: new Date().toISOString(),
    };
    await this.commentsRepository.createComment(newComment);
    return {
      id: newComment.id,
      content: newComment.content,
      commentatorInfo: newComment.commentatorInfo,
      createdAt: newComment.createdAt,
    };
  };

  async updateComment(commentId: string, content: string, userId: string): Promise<"Updated" | "Forbidden" | "Not found"> {
    const comment = await this.commentsRepository.getCommentById(commentId);
    if (!comment) return "Not found";
    if (comment?.commentatorInfo.userId !== userId) return "Forbidden";
    const updateResult = await this.commentsRepository.updateComment(commentId, content);
    if (!updateResult) return "Not found";
    return "Updated";
  };

  async deleteComment(commentId: string, userId: string): Promise<"Updated" | "Forbidden" | "Not found"> {
    const comment = await this.commentsRepository.getCommentById(commentId);
    if (!comment) return "Not found";
    if (comment?.commentatorInfo.userId !== userId) return "Forbidden";
    const updateResult =  await this.commentsRepository.deleteComment(commentId);
    if (!updateResult) return "Not found";
    return "Updated";
  };
};
