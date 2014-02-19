'use strict';

if(process.env.NODE_ENV === 'production') {
  // Production-specific code
}
else {
  // Development-specific code
  document.write('<script src="//', location.hostname, ':35729/livereload.js"></script>');
}
