import { emptyString } from "../constants.js";

export const giveError = (consoleError, userError, setErrorText) => {
  console.log('Error: ', consoleError);
  setErrorText(userError);
  setTimeout(() => {
    setErrorText(emptyString);
  }, 10000);
};

/**
 * Error Component
 * @description: renders any error messages
 */
export function Error(props) {
  // error components props
  const { errorText } = props;

  // check if error has to be shown or not
  let classShow = errorText === emptyString ? emptyString : 'show';

  // error components structure
  return (
    <div id="error" className={classShow}>
      Error: {errorText}
    </div>
  );
}
