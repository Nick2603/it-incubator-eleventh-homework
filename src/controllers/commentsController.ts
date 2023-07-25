import { Request, Response } from "express";
import { CommentsService } from "../domains/commentsService";
import { CommentsQueryRepository } from "../repositories/commentsQueryRepository";
import { CodeResponsesEnum } from "../types/CodeResponsesEnum";

export class CommentsController {
  constructor(
    protected readonly commentsService: CommentsService,
    protected readonly commentsQueryRepository: CommentsQueryRepository
  ) {}

  async getCommentById(req: Request, res: Response) {
    const commentId = req.params.commentId;

    const comment = await this.commentsService.getCommentById(commentId);
    if (comment) {
      res.status(200).send(comment);
      return;
    }
    res.sendStatus(CodeResponsesEnum.Not_found_404);
  }

  async updateComment(req: Request, res: Response) {
    const commentId = req.params.commentId;
    const content = req.body.content;
    const userId = req.user!.id;

    const result = await this.commentsService.updateComment(
      commentId,
      content,
      userId
    );
    if (result === "Not found")
      return res.sendStatus(CodeResponsesEnum.Not_found_404);
    if (result === "Forbidden")
      return res.sendStatus(CodeResponsesEnum.Forbidden_403);
    if (result === "Updated")
      return res.sendStatus(CodeResponsesEnum.No_content_204);
  }

  async deleteComment(req: Request, res: Response) {
    const commentId = req.params.commentId;
    const userId = req.user!.id;
    const result = await this.commentsService.deleteComment(
      commentId,
      userId.toString()
    );
    if (result === "Not found")
      return res.sendStatus(CodeResponsesEnum.Not_found_404);
    if (result === "Forbidden")
      return res.sendStatus(CodeResponsesEnum.Forbidden_403);
    if (result === "Updated")
      return res.sendStatus(CodeResponsesEnum.No_content_204);
  }

  async updateLikeStatus(req: Request, res: Response) {
    const commentId = req.params.commentId;
    const userId = req.user!.id;
    const likeStatus = req.body.likeStatus;

    const result = await this.commentsService.updateLikeStatus(
      commentId,
      userId,
      likeStatus
    );
    if (!result) return res.sendStatus(CodeResponsesEnum.Not_found_404);
    return res.sendStatus(CodeResponsesEnum.No_content_204);
  }
}
