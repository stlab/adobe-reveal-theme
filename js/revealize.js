// Treats headers not having the '.subtitle' class act as slide separators,
// adding markup necessary for our layout.
//
// If H and I are such slide separators, T is the content between them
// having class '.subtitle', and B is the remaining content between, H..<I is
// replaced with:
//
// <section data-transition='fade' data-transition-speed='slow'>
//   <div class='layout'>
//   H
//   T
//   <div class='body'> B </div>
//   <div class='background'>
//     <div><span></span><span></span></div>
//     <div><span></span><span></span></div>
//   </div>
//   </div>
// </section>
//
// Additionally:
//
// - any classes and attributes other than 'style=' on H are added to the
//   <section>.
// - all classes on H are added to those of the first <div> shown above.
// - the value of any 'data-body-class=' attribute on H replaces the classes
//   of the body <div>.
// - the value of any 'data-body-style=' attribute on H replaces the 'style'
//   attribute of the body <div>.
// - Any '<blockquote>' elements not having the '.blockquote' class become
//   speaker notes.
const Plugin = {
  id: 'revealize',

  backgroundElement: '<div><span></span><span></span></div>',

  init: function( reveal ) {
    // Wrap the content between headers in a div.body, and add an empty footer
    // div on which we can inject content with css.
    const slideBoundary
          = [1,2,3,4,5,6].map(x => 'h'+x+':not(.subtitle)').join(',');
    document.querySelectorAll(slideBoundary).forEach(slideTitle => {

      const slide = document.createElement('section');
      slide.setAttribute('data-transition', 'fade');
      slide.setAttribute('data-transition-speed', 'slow');
      slideTitle.before(slide);

      const layout = document.createElement('div');
      layout.classList.add('layout');
      slide.appendChild(layout);

      for (const a of slideTitle.attributes) {
        if (a.nodeName == 'style' || a.nodeName == 'class') continue;
          slide.setAttribute(a.nodeName, a.nodeValue);
      }

      for (const c of slideTitle.classList) {
        slide.classList.add(c);
        layout.classList.add(c);
      }

      var n = slideTitle.nextSibling; // start looking for body elements here
      layout.appendChild(slideTitle);

      // Wrap a div.body around anything remaining.
      const body = document.createElement('div');
      body.setAttribute(
        'class', slideTitle.getAttribute('data-body-class') ?? 'body');
      const bodyStyle = slideTitle.getAttribute('data-body-style');
      if (bodyStyle) { body.setAttribute('style', bodyStyle); }

      while (n && !elementMatches(n, slideBoundary)) {
        const next = n.nextSibling;
        if (elementMatches(n, '.subtitle')) {
          slideTitle.after(n);
          slideTitle = n;
        }
        else {
          if (elementMatches(n, 'blockquote:not(.blockquote)')) {
            n.parentNode.removeChild(n);
            n = replacingTag(n, 'aside');
            n.classList.add('notes');
          }
          body.appendChild(n);
        }
        n = next;
      }
      layout.appendChild(body);

      // Add div.background at bottom.
      const background = document.createElement('div');
	  layout.appendChild(background);
      background.outerHTML = '<div class="background">'
        + Plugin.backgroundElement + Plugin.backgroundElement + '</div>';
    });
  }
}

// Returns true iff e is an Element and matches pattern.
function elementMatches( e, pattern ) {
  return e instanceof Element && e.matches(pattern);
}

// Returns a DOM element equivalent to e, but the given tag name.
function replacingTag(e, tagName) {
  var r = document.createElement(tagName);
  for (const a of e.attributes) {
    r.setAttribute(a.nodeName, a.nodeValue);
  }
  r.innerHTML = e.innerHTML;
  return r
}

export default () => Plugin;

// Local Variables:
// js-indent-level: 2
// End:
