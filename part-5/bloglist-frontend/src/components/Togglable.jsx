/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(
  // @ts-ignore
  ({ buttonLabel, children }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {children} <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    );
  },
);

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  // @ts-ignore
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
