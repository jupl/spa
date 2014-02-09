'use strict';

// Enable Livereload if not in production
if(process.env.NODE_ENV !== 'production') {
  var url = '//' + location.hostname + ':35729/livereload.js';
  document.write('<script src="', url, '"></script>');
}
