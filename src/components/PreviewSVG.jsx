import { useState, useEffect, useRef } from "react";
import { giveError } from './Error.jsx';
import { emptyString, mimeTypes } from "../constants.js";

/**
 * PreviewSVG Component
 * @description: renders the preview for the uploaded SVG
 */
export function PreviewSVG(props) {
  const [ showSvg, setShowSvg ] = useState(true);
  // preview svg components props
  const { svg, setSvg, svgBlobURI, setErrorText, setJson, json } = props;

  // toggle the display state of the SVG preview
  const toggleSvg = () => {
    setShowSvg(!showSvg);
  };

  // gets the SVG DOM element
  const getSvgDomElem = (ev) => {
    if (ev === undefined || ev.target === undefined) {
      giveError(`getSvgDomElem ev is ${ev} and ev.target is ${ev.target}`, 'Error: Something went wrong!', setErrorText);
      return;
    }

    const svgElem = ev.target.contentDocument;

    if (svgElem === null || svgElem === undefined) {
      giveError(`svgElem is ${svgElem}`, 'Error: Something went wrong!', setErrorText);
      return;
    }

    setSvg(svgElem);
  };

  // TODO: fix animations
  // applies animations from uploaded JSON onto displayed SVG
  const animateSvg = () => {
    for (const elemKey in json) {
      const elems = svg.querySelectorAll(elemKey);
      const animName = Object.keys(json[elemKey])[0];
      if (json[elemKey][animName]['options']['iterations'] === 'infinite') {
        json[elemKey][animName]['options']['iterations'] = Infinity;
      }
      // console.log(json[elemKey][animName]['keyframes'], json[elemKey][animName]['options']);
      for (const elem of elems) {
        elem.animate(json[elemKey][animName]['keyframes'], json[elemKey][animName]['options']);
        // elem.style.animation = `${animName} ${json[elemKey][animName]['duration']} ${json[elemKey][animName]['easing']} ${json[elemKey][animName]['delay']} ${json[elemKey][animName]['iterations']} ${json[elemKey][animName]['direction']} ${json[elemKey][animName]['fill']}`;
        // console.log('anims', elem.getAnimations());
        // console.log(window.getComputedStyle(elem).getPropertyValue('animation'));
      }
    }
  };

  let prevSvgBlobURI = useRef(svgBlobURI);
  let prevJson = useRef(json);

  useEffect(() => {
    // if svg didnt change, but json did
    if (prevSvgBlobURI.current === svgBlobURI && JSON.stringify(prevJson.current) !== JSON.stringify(json)) {
      animateSvg();
    }
    prevSvgBlobURI.current = svgBlobURI;
    prevJson.current = json;
  }, [json]);

  // class changes for the state changing of displaying the SVG preview
  const previewSvgClasses = `preview-x${showSvg ? emptyString : ' hide'}`;
  const arrowClasses = `arrow ${showSvg ? 'down' : 'up'}`;

  // preview svg component structure
  return (
    <div className="preview-containers">
      <label htmlFor="preview-svg" onClick={toggleSvg}>Preview SVG<div className={arrowClasses}></div></label>
      <output id="preview-svg" name="preview-svg" className={previewSvgClasses}>
        <object type={mimeTypes.svg} data={svgBlobURI} onLoad={getSvgDomElem}>Preview SVG object</object>
      </output>
    </div>
  );
}
