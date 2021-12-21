export default {
  width: 1920, height: 1080,
  transition: 'fade',
  backgroundTransition: 'fade',
  transitionSpeed: 'slow',
  // We use absolute positioning, which is apparently overridden by
  // “center” until transitions finish, so this needs to be disabled to
  // avoid an apparent bounce.
  center: false,
  // At the bottom of slides, especially, a little more room is needed
  // than the default 0.04. We could expand just the bottom in CSS.
  margin: 0
};

// Local Variables:
// js-indent-level: 2
// End:
