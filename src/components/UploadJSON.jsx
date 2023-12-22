/**
 * UploadJSON Component
 * @description: renders the input to upload JSON files containing SVG animation(s) and applies it to the given SVG, if possible (has the tags, ids, classes)
 */
export function UploadJSON(props) {
  // upload json components props
  const { json, setJson, svg, setErrorText } = props;

  // upload json function
  const onUploadJSON = () => {
    /*
       TODO
     - get uploaded json contents as text
     - parse it into css animation(s) and apply to svg
     - keep in mind tags, ids, classes
    */
    console.log('TODO upload JSON');
  };

  return svg && json ? (
    <div className="btns-containers">
      <label htmlFor="upload-json">Upload JSON</label>
      <input type="file" accept=".json" id="upload-json" name="upload-json" onChange={onUploadJSON} />
    </div>
  ) : null;
}
