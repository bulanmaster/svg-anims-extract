/**
 * PreviewSVG Component
 * @description: renders the preview for the uploaded SVGs
 */
export function PreviewSVG(props) {
  // preview svg components props
  const { svg } = props;

  // create markup for dangerouslySetInnerHTML for the svg to show
  function createMarkup() {
    return { __html: svg };
  }

  // preview svg component structure
  return (
    <div className="preview-containers">
      <label htmlFor="preview-svg">Preview SVG</label>
      <br />
      <output id="preview-svg" name="preview-svg" dangerouslySetInnerHTML={createMarkup()}>
      </output>
    </div>
  );
}
