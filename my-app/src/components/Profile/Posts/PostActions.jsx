import React, { useState } from "react";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";

const PostActions = ({ initialLikes, initialDislikes, comments }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="p-4 rounded-lg space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
        >
          <ThumbsUp></ThumbsUp>
          <span>{likes}</span>
        </button>
        <button
          onClick={handleDislike}
          className="flex items-center space-x-1 text-red-500 hover:text-red-700"
        >
          <ThumbsDown></ThumbsDown>
          <span>{dislikes}</span>
        </button>
        <button
          onClick={toggleComments}
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
        >
          <MessageCircle></MessageCircle>
          <span>Comments</span>
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
