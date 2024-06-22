/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "../styled-components.js";

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
          <Button onClick={toggleVisibility}>{buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {children} <Button onClick={toggleVisibility}>cancel</Button>
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
