module.exports = function () {
  return function (req, res, next) {
    res.setHeader('Pragma', 'no-cache');
    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, max-age=0, must-revalidate, post-check=0, pre-check=0',
    );
    res.setHeader('Vary', '*');
    res.setHeader('Expires', '-1');
    res.setHeader('Last-Modified', new Date().toUTCString());
    next();
  };
};
