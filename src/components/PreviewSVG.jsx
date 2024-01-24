import { useState } from "react";
import { giveError } from './Error.jsx';
import { emptyString, mimeTypes } from "../constants.js";

/**
 * PreviewSVG Component
 * @description: renders the preview for the uploaded SVG and extracts the animations into a JSON
 */
export function PreviewSVG(props) {
  const [ showSvg, setShowSvg ] = useState(true);
  // preview svg components props
  const { svg, svgBlobURI, setErrorText, setJson } = props;

  // toggle the display state of the SVG preview
  const toggleSvg = () => {
    setShowSvg(!showSvg);
  };

  // extracts the animations from the SVG into a JSON
  const getSvgAnim = (ev) => {
    if (ev === undefined || ev.target === undefined) {
      giveError(`Error: getSvgAnim ev is ${ev} and ev.target is ${ev.target}`, 'Something went wrong!', setErrorText);
      return;
    }

    const svgElem = ev.target.contentDocument;

    if (svgElem === null || svgElem === undefined) {
      giveError(`svgElem is ${svgElem}`, 'Something went wrong!', setErrorText);
      return;
    }

    const tempJson = {};

    // counter for duplicates
    let nthElem = 0;
    // get all nodes besides the style one
    const allNodes = svgElem.querySelectorAll('*:not(style)');
    for (const currentNode of allNodes) {
      const currentNodeAnims = currentNode.getAnimations();
      // if the current node has any animations
      if (currentNodeAnims.length > 0) {
        // form current nodes name adding tag, id and class names together and the counter (tag#id.class.names|counter)
        let key = `${currentNode.nodeName}`;
        key += currentNode.id ? `#${currentNode.id}` : emptyString;
        if (currentNode.classList.length > 0) {
          key += `.${currentNode.classList.value.replaceAll(' ', '.')}`;
        }
        key += `|${nthElem}`;

        tempJson[key] = {};

        const currentNodeComputedAnims = window.getComputedStyle(currentNode).getPropertyValue('animation').split(',');
        for (const currentNodeComputedAnim of currentNodeComputedAnims) {
          const x = currentNodeComputedAnim.trim().split(' ');
          tempJson[key][x[7]] = {
            'duration': x[0],
            'timing-function': x[1],
            'delay': x[2],
            'iteration-count': x[3],
            'direction': x[4],
            'fill-mode': x[5],
            'play-state': x[6]
          };
        }

        // getting keyframes for each animation of the current node
        for (const anim of currentNodeAnims) {
          tempJson[key][anim.animationName]['keyframes'] = anim.effect.getKeyframes();
        }
      }
      nthElem++;
    }

    setJson(tempJson);
  };

  // class changes for the state changing of displaying the SVG preview
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
