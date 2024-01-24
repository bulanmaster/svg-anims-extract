import { useState } from "react";
import { emptyString, emptyDomObj } from "../constants.js";

/**
 * PreviewJSON Component
 * @description: renders the preview for the extracted or uploaded JSON that contains the SVG animation(s)
 */
export function PreviewJSON(props) {
  const [ showJson, setShowJson ] = useState(true);
  // preview json components props
  const { json, svgBlobURI } = props;

  // toggle the display state of the JSON preview
  const toggleJson = () => {
    setShowJson(!showJson);
  };

  // class changes for the state changing of displaying the JSON preview
  const previewJsonClasses = `preview-x${showJson ? emptyString : ' hide'}`;
  const arrowClasses = `arrow ${showJson ? 'down' : 'up'}`;

  // logic for showing the JSON in the preview
  let preview = (
      <output id="preview-json" name="preview-json" className={previewJsonClasses}>
        <code>{JSON.stringify(json, undefined, 2)}</code>
      </output>
    );
  if (Object.keys(json).length === 0) {
    if (svgBlobURI !== emptyDomObj) {
      preview = <span>Not an animated SVG</span>;
    } else {
      preview = null;
    }
  }

  // preview json component structure
  return (
    <div className="preview-containers">
      <label htmlFor="preview-json" onClick={toggleJson}>Preview JSON<div className={arrowClasses}></div></label>
      {preview}
    </div>
  );
}
