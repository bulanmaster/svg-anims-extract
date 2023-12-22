/**
 * DownloadJSON Component
 * @description: renders the button for downloading the extracted JSON containing the SVG animation(s) and creates and delivers the JSON file for the user that requested it
 */
export function DownloadJSON(props) {
  // download json components props
  const { json, svg, setErrorText } = props;

  // download json function
  const onDownloadJSON = () => {
    /*
       TODO
     - extract svg animations
     - parse it into json
     - provide json file with the svg animations to the user that requested it
    */
    console.log('TODO download JSON');
  };

  // download json components structure
  return svg && json ? (
    <div className="btns-containers">
      <input type="button" id="download-json" name="download-json" value="Download JSON" onClick={onDownloadJSON} />
    </div>
  ) : null;
}
