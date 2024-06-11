import React, { useState, useEffect } from "react";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { postsAPI } from "../../../API/API";

const PostActions = ({ postLikes, comments, userId, postId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const initialLikes = postLikes?.filter((like) => like.rate === true).length;
    const initialDislikes = postLikes?.filter(
      (like) => like.rate === false
    ).length;
    const userLike = postLikes?.find((like) => like.userId === userId);

    setLikes(initialLikes);
    setDislikes(initialDislikes);
    if (userLike) {
      setUserRating(
        userLike.rate === true ? 1 : userLike.rate === false ? -1 : 0
      );
    }
  }, [postLikes, userId]);

  const handleLike = () => {
    if (userRating === 1) {
      setLikes(likes - 1);
      setUserRating(0);
      updateServerRating(0);
    } else {
      if (userRating === -1) setDislikes(dislikes - 1);
      setLikes(likes + 1);
      setUserRating(1);
      updateServerRating(1);
    }
  };

  const handleDislike = () => {
    if (userRating === -1) {
      setDislikes(dislikes - 1);
      setUserRating(0);
      updateServerRating(0);
    } else {
      if (userRating === 1) setLikes(likes - 1);
      setDislikes(dislikes + 1);
      setUserRating(-1);
      updateServerRating(-1);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const updateServerRating = (newRating) => {
    postsAPI.addRate(newRating, postId, userId);
  };

  return (
    <div className="p-4 rounded-lg space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 hover:text-blue-700 ${
            userRating === 1 ? "text-blue-800" : "text-blue-500"
          }`}
        >
          <ThumbsUp />
          <span>{likes}</span>
        </button>
        <button
          onClick={handleDislike}
          className={`flex items-center space-x-1 hover:text-red-700 ${
            userRating === -1 ? "text-red-800" : "text-red-500"
          }`}
        >
          <ThumbsDown />
          <span>{dislikes}</span>
        </button>
        <button
          onClick={toggleComments}
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
        >
          <MessageCircle />
          <span>Comments {comments?.length}</span>
        </button>
      </div>
      {showComments && (
        <div className="mt-4 space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="p-2 border rounded-lg">
              {comment}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostActions;
