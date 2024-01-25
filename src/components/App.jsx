import { useState } from "react";

import { Error } from "./Error.jsx";
import { PreviewSVG } from "./PreviewSVG.jsx";
import { PreviewJSON } from "./PreviewJSON.jsx";
import { UploadSVG } from "./UploadSVG.jsx";
import { DownloadJSON } from "./DownloadJSON.jsx";
import { UploadJSON } from "./UploadJSON.jsx";

import { emptyString, emptyDomObj } from "../constants.js";

/**
 * App Component
 * @description: main component, the entire app
 */
export function App() {
  // set components states
  const [ errorText, setErrorText ] = useState(emptyString);
  const [ svg, setSvg ] = useState(null);
  const [ svgBlobURI, setSvgBlobURI ] = useState(emptyDomObj);
  const [ json, setJson ] = useState({});

  // app structure
  return (
    <div id="container">
      <Error errorText={errorText} />

      <div className="buttons">
        <UploadSVG svg={svg} setSvgBlobURI={setSvgBlobURI} svgBlobURI={svgBlobURI} setJson={setJson} setErrorText={setErrorText} />
        <DownloadJSON json={json} svgBlobURI={svgBlobURI} setErrorText={setErrorText} />
        <UploadJSON json={json} setJson={setJson} svgBlobURI={svgBlobURI} setErrorText={setErrorText} />
      </div>

      <div className="previews">
        <PreviewSVG svg={svg} setSvg={setSvg} svgBlobURI={svgBlobURI} setErrorText={setErrorText} setJson={setJson} json={json} />
        <PreviewJSON json={json} svgBlobURI={svgBlobURI} />
      </div>
    </div>
  );
}
