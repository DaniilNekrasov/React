import React, { useState, useEffect } from "react";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { postsAPI } from "../../../API/API";
import { Input, Button } from "antd";
import dayjs from "dayjs";
import Author from "./Components/Author";

const PostActions = ({ postLikes, comments, userId, postId, profile }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");

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

  const addComment = () => {
    comments.unshift({
      date: new Date(Date.now()).toISOString(),
      text: comment,
      author: profile,
      userId: userId,
    });
    postsAPI.addComment(comment, postId, userId);
    setComment("");
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
        <div className="mt-4 space-y-2">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className="p-2 border rounded-lg bg-slate-500 max-w-[870px]"
            >
              <div className="flex items-center space-x-3">
                <Author
                  author={comment.author}
                  width={"30px"}
                  height={"30px"}
                />
                <span className="break-words max-w-3xl flex-1">
                  {comment.text}
                </span>
              </div>
              <div className="text-xs block mt-1 opacity-50">
                {dayjs(comment.date).format(`MM.DD HH:mm`)}
              </div>
            </div>
          ))}
          <Input
            placeholder="Comment"
            className="w-[600px]"
            maxLength={500}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
          />
          <Button onClick={addComment}>Comment</Button>
        </div>
      )}
    </div>
  );
};

export default PostActions;
