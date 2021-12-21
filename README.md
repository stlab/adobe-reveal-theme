# Adobe Corporate reveal.js theme

Live demo: http://stlab.cc/adobe-reveal-theme/
Demo sources: https://github.com/stlab/adobe-reveal-theme/tree/gh-pages

## HTML

Slides are expected to have the following HTML structure:

```html
<section>
   <div class='layout'>

     <!-- Headings and subtitles -->

     <div class='body'> 
       <!-- Main content -->
     </div>

     <div class='background'>
       <div><span></span><span></span></div>
       <div><span></span><span></span></div>
     </div>
   </div>
 </section>
```

The `div.background` is used for css injection of boilerplate text and
images, and should be present on every slide in exactly the above form.

## Slide layouts

Slide layouts are selected by the addition of a layout class to the `div.layout`
in the HTML structure. The default layout is a standard “light airy” arrangement
of text and, often, bullets.  The layouts classes are as follows. Unless
otherwise specified titles are expected to be `<h2>`.

`community-title-slide`
: An Adobe “community art” title slide having an `<h1>` title and an `<h2>`
  subtitle.  No other content is expected. One of the four artist classes
  `evans`, `swopes`, `sato`, or `zhu` should be added to choose the theme.

`community-about-slide`
: The “about the artist” layout that goes with the community art title slide.
  No slide content is expected, and the same artist class should be added.

`community-closer-slide`
: The “end of slideshow” layout that goes with the community art title slide.
  No slide content is expected, and the same artist class should be added.
  
`title-slide`
: A standard title slide having an `<h1>` title and an `<h2>` subtitle.  No
  other content is expected.

`closer-slide`
: A standard “end of slideshow” layout.  No slide content is expected.
  
`section-divider-slide`
: A section divider having an `<h1>` section title.  No other content is
  expected.

`agenda-slide`
: A slide containing a single `<table>` describing the schedule of a day's
  events.

`nolayout`
: the `div.body` occupies the entire slide area so that top-level elements
  within can use `style='position:absolute'` and be positioned at particular
  absolute coordinate on the slide.

…Etc…

## Configuration

### sass/SCSS
- The SCSS variable `$adobeRevealThemeDirectory` must be defined to the path
    to this repository's files before importing
    [css/corp-reveal-theme.scss](css/corp-reveal-theme.scss):
    
    ```scss
    $adobeRevealThemeDirectory: 'reveal-theme';
    @import 'reveal-theme/css/corp-reveal-theme';
    ```

- For presentations outside Adobe, the SCSS variable `$adobeConfidential`
    should also be defined to be `false`:

    ```scss
    $adobeRevealThemeDirectory: 'reveal-theme';
    $adobeConfidential: false;
    @import 'reveal-theme/css/corp-reveal-theme';
    ```
    
- The [reveal.js sources](https://github.com/hakimel/reveal.js) must be in the
    sass load path.  For jekyll that would mean adding something like this to
    your config.yml:
  
    ```yaml
    sass:
      load_paths:
          - path/to/reveal.js
    ```

### reveal.js
The  reveal.js initialization should incorporate the settings in
  [js/reveal-config.js](js/reveal-config.js).  For example:
    
  ```js
  import adobeRevealConfig from "path/to/adobe-reveal-theme/js/reveal-config.js";
  Reveal.initialize({
        controls: false,
        progress: true,
        // etc.
        ... adobeRevealConfig // <== here
      });       
  ```

