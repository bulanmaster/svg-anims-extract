import { giveError } from './Error.jsx';
import { emptyDomObj, mimeTypes } from '../constants.js';

/**
 * UploadJSON Component
 * @description: renders the input to upload JSON files containing SVG animation(s) and applies it to the given SVG, if possible (has the tags, ids, classes)
 */
export function UploadJSON(props) {
  // upload json components props
  const { json, setJson, svgBlobURI, setErrorText } = props;

  // upload json function
  const getJson = obj => {
    // get file
    const jsonFile = obj.target.files[0];
    if (jsonFile === undefined) {
      return;
    }
    let extractedJson = {};
    // throw error if file is not of the right type
    if (jsonFile.type !== mimeTypes.json) {
      giveError(`File is not of type ${mimeTypes.json}. It is of type ${jsonFile.type}`, 'Error: Wrong file format. Be sure you are uploading a JSON file.', setErrorText);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // get JSON
      extractedJson = reader.result;
      setJson(JSON.parse(extractedJson));
    };

    reader.onerror = err => {
      // throw error if any found
      giveError(err, `Error: ${err}`, setErrorText);
      return;
    };
    // read file as text
    reader.readAsText(jsonFile);
  };

  return svgBlobURI !== emptyDomObj && json ? (
    <div className="btns-containers">
      <label htmlFor="upload-json">Upload JSON</label>
      <input type="file" accept={mimeTypes.json} id="upload-json" name="upload-json" onChange={getJson} />
    </div>
  ) : null;
}
