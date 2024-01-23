import { mimeTypes } from '../constants.js';

/**
 * DownloadJSON Component
 * @description: renders the button for downloading the extracted JSON containing the SVG animation(s) and creates and delivers the JSON file for the user that requested it
 */
export function DownloadJSON(props) {
  // download json components props
  const { json, svg, setErrorText } = props;

  // download json function
  const onDownloadJSON = () => {
    if (Object.keys(json).length === 0) {
      return;
    }

    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(json)], { type: mimeTypes.json });
    a.href = URL.createObjectURL(file);
    a.download = 'svgAnimations.json';
    a.click();
  };

  // download json components structure
  return svg && json ? (
    <div className="btns-containers">
      <input type="button" id="download-json" name="download-json" value="Download JSON" onClick={onDownloadJSON} disabled={Object.keys(json).length === 0} />
    </div>
  ) : null;
}
