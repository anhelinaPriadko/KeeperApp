import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={props.onInputChange}
          value={props.noteState.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={props.onInputChange}
          value={props.noteState.content}
          placeholder="Take a note..."
          rows="3"
        />
        <Fab onClick={props.onAdd}>
          <AddIcon />
        </Fab>
      </form>
    </div>
  );
}

export default CreateArea;
