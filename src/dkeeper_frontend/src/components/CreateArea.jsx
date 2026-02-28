import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [inputClicked, setInputClicked] = useState(false);

  function handleInputSize() {
    setInputClicked(true);
  }
  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={props.onInputChange}
          value={props.noteState.title}
          placeholder="Title"
          hidden={!inputClicked}
        />
        <textarea
          name="content"
          onClick={handleInputSize}
          onChange={props.onInputChange}
          value={props.noteState.content}
          placeholder="Take a note..."
          rows={inputClicked ? 3 : 1}
        />
        <Zoom in={inputClicked}>
          <Fab onClick={props.onAdd}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;