/**
 * UploadSVG Component
 * @description: renders the input to upload SVG files and extracts the animation(s) from it into a JSON format
 */
export function UploadSVG(props) {
  // upload svg components props
  const { setSvg, setJson, setErrorText } = props;

  // upload svg function
  const onUploadSVG = obj => {
    console.clear();
    // clear preview svg when attempting to upload anything
    setSvg(null);
    let extractedSvg = null;
    setJson(null);

    // get file
    const svgFile = obj.target.files[0];
    // throw error if file is not of the right type
    if (svgFile.type !== 'image/svg+xml') {
      console.log('Error: File is not of type svg+xml');
      setErrorText('File is not of type svg+xml');
      setTimeout(() => { setErrorText(''); }, 10000);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // add svg to preview
      extractedSvg = reader.result;
      setSvg(extractedSvg);

      // TODO parse into json and setJson(parsedJSON);
      console.log(extractedSvg);
      setJson('{}'); // for testing purposes adding an object to the json since otherwise the other buttons dont show up
    };
    reader.onerror = err => {
      // throw error if any found
      console.log('Error: ', err);
      setErrorText(err);
      setTimeout(() => { setErrorText('') }, 10000);
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
