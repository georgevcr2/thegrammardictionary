import Form from "react-bootstrap/Form";
import { Editor } from "@tinymce/tinymce-react";

import classes from "./InputTextbox.module.css";

const InputTextbox = (props) => {
  const handleEditorChange = (evt) => {
    const newText = evt.target.getContent();
    //if (removeTags(newText) !== removeTags(props.text))
    props.onChangeTextboxText(newText);
  };

  const removeTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  const editorSetup = (editor) => {
    //https://www.tiny.cloud/docs-4x/advanced/creating-a-custom-button/
    function removeAllText() {
      editor.setContent(<p></p>);
    }

    editor.ui.registry.addButton("removealltext", {
      icon: "insertdatetime",
      image:
        "http://p.yusukekamiyamane.com/icons/search/fugue/icons/calendar-blue.png",
      tooltip: "Removes all text",
      text: "Delete",
      onAction: removeAllText,
    });
  };

  return (
    <div className={classes.checker}>
      <Form>
        <Form.Group controlId="textarea">
          <div className={classes.container}>
            <div className={classes["grammar-textarea"]}>
              {/* <ContentEditable
                key="editor1"
                html={props.text}
                spellCheck="false"
                disabled={false} // use true to disable editing
                onChange={handleChange} // handle innerHTML change
              /> */}
              <Editor
                initialValue=''
                apiKey="06yzfag3nuillnn8xmvcjewhbupow10u5qzbt07utanr21w3"
                init={{
                  selector: "#tinyeditor",
                  height: 500,
                  menubar: false,
                  branding: false,
                  resize: false,
                  placeholder: "Some placeholder text...",
                  plugins: ["wordcount"],
                  toolbar: "copy removealltext",
                  setup: editorSetup,
                }}
                onChange={handleEditorChange}
              />
            </div>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};
export default InputTextbox;
