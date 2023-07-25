import { ILikesInfo, LikeStatus } from "../types/IComment";

export const getUserLikeStatus = (
  likesInfo: ILikesInfo,
  userId: string
): LikeStatus => {
  const { likes, dislikes } = likesInfo;

  if (likes.userIds.includes(userId)) {
    return LikeStatus.Like;
  }

  if (dislikes.userIds.includes(userId)) {
    return LikeStatus.Dislike;
  }

  return LikeStatus.None;
};
