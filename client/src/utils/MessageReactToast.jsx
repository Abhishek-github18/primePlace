import PropTypes from "prop-types";

const MessageReactToast = ({ message}) => {
  // console.log("toastProps", toastProps);
  // console.log("message", message);
  return (
    <div>
      {message}
    </div>
  );
};

// PropTypes validation
MessageReactToast.propTypes = {
  closeToast: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  toastProps: PropTypes.shape({
    position: PropTypes.string,
  }),
};

export default MessageReactToast;
