import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={props.onInputChange}
          value={props.noteState.title}
          placeholder="Title"
          hidden={!props.showAll}
        />
        <textarea
          name="content"
          onClick={props.onInputClick}
          onChange={props.onInputChange}
          value={props.noteState.content}
          placeholder="Take a note..."
          rows={props.rowsNumber}
        />
        <Zoom in={props.showAll}>
          <Fab onClick={props.onAdd}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
