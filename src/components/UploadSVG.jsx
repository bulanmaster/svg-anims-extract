import { giveError } from './Error.jsx';
import { emptyString, emptyDomObj, mimeTypes } from "../constants.js";

/**
 * UploadSVG Component
 * @description: renders the input to upload SVG files
 */
export function UploadSVG(props) {
  // upload svg components props
  const { setSvg, setSvgBlobURI, svgBlobURI, setJson, setErrorText } = props;

  // upload svg function
  const onUploadSVG = obj => {
    console.clear(); // TODO: delete when project is finished
    // get file
    const svgFile = obj.target.files[0];
    if (svgFile === undefined) {
      return;
    }
    // clear preview svg when attempting to upload anything
    URL.revokeObjectURL(svgBlobURI);
    setSvg(null);
    setSvgBlobURI(emptyDomObj);
    let extractedSvg = null;
    setJson({});

    // throw error if file is not of the right type
    if (svgFile.type !== mimeTypes.svg) {
      giveError(`File is not of type ${mimeTypes.svg}. It is of type ${svgFile.type}`, 'Error: Wrong file format. Be sure you are uploading an SVG file.', setErrorText);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // get SVG to make blob
      extractedSvg = reader.result;
      setSvg(extractedSvg);

      // create blob URI to use to display SVG in preview
      const blob = new Blob([extractedSvg], {type: mimeTypes.svg});
      const blobURI = URL.createObjectURL(blob);
      setSvgBlobURI(blobURI);
    };

    reader.onerror = err => {
      // throw error if any found
      giveError(err, `Error: ${err}`, setErrorText);
      return;
    };
    // read file as text
    reader.readAsText(svgFile);
  }

  // upload svg components structure
  return (
    <div className="btns-containers">
      <label htmlFor="upload-svg">Upload SVG</label>
      <input type="file" accept=".svg" id="upload-svg" name="upload-svg" onChange={onUploadSVG} />
    </div>
  );
}
