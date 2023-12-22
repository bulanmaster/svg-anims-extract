/**
 * Error Component
 * @description: renders any error messages
 */
export function Error(props) {
  // error components props
  const { errorText } = props;

  // check if error has to be shown or not
  let classShow = errorText === '' ? '' : 'show';

  // error components structure
  return (
    <div id="error" className={classShow}>
      Error: {errorText}
    </div>
  );
}