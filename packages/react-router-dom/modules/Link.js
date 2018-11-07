import React from "react";
import { __RouterContext as RouterContext } from "react-router";
import { createLocation } from "history";
import PropTypes from "prop-types";
import invariant from "tiny-invariant";

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function LinkAnchor({ innerRef, navigate, onClick, ...rest }) {
  const { target } = rest;

  return (
    <a
      {...rest}
      ref={innerRef} // TODO: Use forwardRef instead
      onClick={event => {
        if (onClick) onClick(event);

        if (
          !event.defaultPrevented && // onClick prevented default
          event.button === 0 && // ignore everything but left clicks
          (!target || target === "_self") && // let browser handle "target=_blank" etc.
          !isModifiedEvent(event) // ignore clicks with modifier keys
        ) {
          event.preventDefault();
          navigate();
        }
      }}
    />
  );
}

/**
 * The public API for rendering a history-aware <a>.
 */
function Link({ component = LinkAnchor, replace, to, ...rest }) {
  return (
    <RouterContext.Consumer>
      {context => {
        invariant(context, "You should not use <Link> outside a <Router>");

        const { history } = context;

        const location =
          typeof to === "string"
            ? createLocation(to, null, null, context.location)
            : to;
        const href = location ? history.createHref(location) : "";

        return React.createElement(component, {
          ...rest,
          href,
          navigate() {
            const method = replace ? history.replace : history.push;
            method(to);
          }
        });
      }}
    </RouterContext.Consumer>
  );
}

if (__DEV__) {
  const toType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);
  const refType = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);

  Link.propTypes = {
    innerRef: refType,
    onClick: PropTypes.func,
    replace: PropTypes.bool,
    target: PropTypes.string,
    to: toType.isRequired
  };
}

export default Link;
