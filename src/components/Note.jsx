import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  return (
    <div className="create-note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default Note;
