/**
 * PreviewSVG Component
 * @description: renders the preview for the uploaded SVGs
 */
export function PreviewSVG(props) {
  // preview svg components props
  const { svg, svgBlobURI } = props;

  // preview svg component structure
  return (
    <div className="preview-containers">
      <label htmlFor="preview-svg">Preview SVG</label>
      <br />
      <object id="preview-svg" name="preview-svg" type="image/svg+xml" data={svgBlobURI}>Preview SVG object</object>
    </div>
  );
}
