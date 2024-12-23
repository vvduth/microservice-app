import React from "react";

const CommentList = ({ comments }) => {
  const styles = {
    container: {
      marginTop: '20px',
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    },
    header: {
      fontSize: '1.5em',
      marginBottom: '10px',
      color: '#333'
    },
    listItem: {
      padding: '10px',
      borderBottom: '1px solid #ddd'
    },
    noComments: {
      color: '#999',
      fontStyle: 'italic'
    }
  };

  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    }
    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }
    return (
      <li key={comment.id} className="list-group-item" style={styles.listItem}>
        {content}
      </li>
    );
  });

  return (
    <div style={styles.container}>
      <h5 style={styles.header}>Comments</h5>
      {comments.length === 0 ? (
        <p style={styles.noComments}>No comments yet</p>
      ) : (
        <ul className="list-group">{renderedComments}</ul>
      )}
    </div>
  );
};

export default CommentList;
