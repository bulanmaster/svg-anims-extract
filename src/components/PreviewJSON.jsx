/**
 * PreviewJSON Component
 * @description: renders the preview for the extracted or uploaded JSON that contains the SVG animation(s)
 */
export function PreviewJSON(props) {
  // preview json components props
  const { json } = props;

  // preview json component structure
  return (
    <div className="preview-containers">
      <label htmlFor="preview-json">Preview JSON</label>
      <br />
      <output id="preview-json" name="preview-json">
        {json}
      </output>
    </div>
  );
}
