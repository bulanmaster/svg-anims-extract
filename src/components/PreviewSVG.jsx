import { useState } from "react";
import { giveError } from './Error.jsx';
import { emptyString, mimeTypes } from "../constants.js";

/**
 * PreviewSVG Component
 * @description: renders the preview for the uploaded SVGs
 */
export function PreviewSVG(props) {
  const [ showSvg, setShowSvg ] = useState(true);
  // preview svg components props
  const { svg, svgBlobURI, setErrorText, setJson } = props;

  const toggleSvg = () => {
    setShowSvg(!showSvg);
  };

  const getSvgAnim = (ev) => {
    if (ev === undefined) {
      giveError(`Error: getSvgAnim ev is ${ev}`, 'Something went wrong!', setErrorText);
      return;
    }

    const svgElem = ev.target.contentDocument;

    if (svgElem === null || svgElem === undefined) {
      giveError(`svgElem is ${svgElem}`, 'Something went wrong!', setErrorText);
      return;
    }

    const tempJson = {};

    let i = 0;
    const allNodes = svgElem.querySelectorAll('*:not(style)');
    for (const currentNode of allNodes) {
      let currentNodeAnims = currentNode.getAnimations();
      if (currentNodeAnims.length > 0) {
        let key = `${currentNode.nodeName}`;
        key += currentNode.id ? `#${currentNode.id}` : emptyString;
        if (currentNode.classList.length > 0) {
          key += `.${currentNode.classList.value}`; // TODO: class names with . before each
        }
        key += `|${i}`;

        tempJson[key] = {};

        for (const anim of currentNodeAnims) {
          tempJson[key][anim.animationName] = anim.effect.getKeyframes();
        }
      }
      i++;
    }

    setJson(tempJson);
  };

  const previewSvgClasses = `preview-x${showSvg ? emptyString : ' hide'}`;
  const arrowClasses = `arrow ${showSvg ? 'down' : 'up'}`;

  // preview svg component structure
  return (
    <div className="preview-containers">
      <label htmlFor="preview-svg" onClick={toggleSvg}>Preview SVG<div className={arrowClasses}></div></label>
      <output id="preview-svg" name="preview-svg" className={previewSvgClasses}>
        <object type={mimeTypes.svg} data={svgBlobURI} onLoad={getSvgAnim}>Preview SVG object</object>
      </output>
    </div>
  );
}
