import { useEffect } from 'react';
import { giveError } from './Error.jsx';
import { emptyString, emptyDomObj, mimeTypes } from "../constants.js";

/**
 * UploadSVG Component
 * @description: renders the input to upload SVG files, forms the blob URI for it and extracts the animations from the displayed SVG into a JSON
 */
export function UploadSVG(props) {
  // upload svg components props
  const { svg, setSvgBlobURI, svgBlobURI, setJson, setErrorText } = props;

  // upload svg function
  const getSvgBlobURI = obj => {
    console.clear(); // TODO: delete when project is finished
    // get file
    const svgFile = obj.target.files[0];
    if (svgFile === undefined) {
      return;
    }
    // clear preview svg when attempting to upload anything
    URL.revokeObjectURL(svgBlobURI);
    let extractedSvg = null;

    // throw error if file is not of the right type
    if (svgFile.type !== mimeTypes.svg) {
      giveError(`File is not of type ${mimeTypes.svg}. It is of type ${svgFile.type}`, 'Error: Wrong file format. Be sure you are uploading an SVG file.', setErrorText);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // get SVG to make blob
      extractedSvg = reader.result;

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

  const getSvgAnimations = () => {
    if (svg !== null) {
      const tempJson = {};

      // get all nodes besides the style one
      const allNodes = svg.querySelectorAll('*:not(style)');
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

          tempJson[key] = {};

          const currentNodeComputedAnims = window.getComputedStyle(currentNode).getPropertyValue('animation').split(',');
          for (const currentNodeComputedAnim of currentNodeComputedAnims) {
            const x = currentNodeComputedAnim.trim().split(' ');
            tempJson[key][x[7]] = {
              'options': {
                'id': x[7],
                'duration': parseFloat(x[0]) * 1000,
                'easing': x[1],
                'delay': parseFloat(x[2]) * 1000,
                'iterations': x[3],
                'direction': x[4],
                'fill': x[5]
              }
            };
          }

          // getting keyframes for each animation of the current node
          for (const anim of currentNodeAnims) {
            let currentAnimKeyframes = anim.effect.getKeyframes();
            const newCurrentAnimKeyframes = [];
            // remove computedOffset since it is not used => smaller JSON
            for (const currentAnimKeyframe of currentAnimKeyframes) {
              let {['computedOffset']: _, ...rest} = currentAnimKeyframe;
              newCurrentAnimKeyframes.push(rest);
            }
            tempJson[key][anim.animationName]['keyframes'] = newCurrentAnimKeyframes;
          }
        }
      }

      setJson(tempJson);
    }
  };

  // extract the animations when SVG DOM element is set
  useEffect(getSvgAnimations, [svg]);

  // upload svg components structure
  return (
    <div className="btns-containers">
      <label htmlFor="upload-svg">Upload SVG</label>
      <input type="file" accept={mimeTypes.svg} id="upload-svg" name="upload-svg" onChange={getSvgBlobURI} />
    </div>
  );
}
