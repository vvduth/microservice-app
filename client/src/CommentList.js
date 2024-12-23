import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return (
      <li key={comment.id} className="list-group-item">
        {comment.content}
      </li>
    );
  });

  return (
    <div className="mt-3">
      <h5>Comments</h5>
      {comments.length === 0 ? (
        <p className="text-muted">No comments yet</p>
      ) : (
        <ul className="list-group">{renderedComments}</ul>
      )}
    </div>
  );
};

export default CommentList;
