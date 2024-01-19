import { useState } from "react";

import { Error } from "./Error.jsx";
import { PreviewSVG } from "./PreviewSVG.jsx";
import { PreviewJSON } from "./PreviewJSON.jsx";
import { UploadSVG } from "./UploadSVG.jsx";
import { DownloadJSON } from "./DownloadJSON.jsx";
import { UploadJSON } from "./UploadJSON.jsx";

/**
 * App Component
 * @description: main component, the entire app
 */
export function App() {
  // set components states
  const [ errorText, setErrorText ] = useState('');
  const [ svg, setSvg ] = useState(null);
  const [ svgBlobURI, setSvgBlobURI ] = useState('about:blank');
  const [ json, setJson ] = useState(null);

  // app structure
  return (
    <div id="container">
      <Error errorText={errorText} />

      <div className="previews">
        <PreviewSVG svg={svg} svgBlobURI={svgBlobURI} />
        <PreviewJSON json={json} />
      </div>

      <div className="buttons">
        <UploadSVG setSvg={setSvg} setSvgBlobURI={setSvgBlobURI} setJson={setJson} setErrorText={setErrorText} />
        <DownloadJSON json={json} svg={svg} setErrorText={setErrorText} />
        <UploadJSON json={json} setJson={setJson} svg={svg} setErrorText={setErrorText} />
      </div>
    </div>
  );
}

