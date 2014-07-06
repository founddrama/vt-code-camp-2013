/**
 * node get-books.js [-u <userId>] [-s <shelf>]
 */

var fs      = require('fs');
var url     = require('url');
var request = require('request');
var parser  = require('libxml-to-js');
var moment  = require('moment');
var grData  = require('./gr-api-token');

var shelf = 'javascript';

/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
/**
 * Re-usable RegExp for sanitizing book titles for use in the timeline.
 * @type {RegExp}
 */
var TITLE_SANITIZE_RE = /(\s\(.+\s#\d.*\))$/g;

function isString(s) {
  return typeof s === 'string';
}

/**
 * Use Moment.js to consume just about any formatted date string, turn it into
 * a real date, and return that.
 * @param dateStr {String} A string that looks like a date.
 * @return {Date}
 */
function sanitizeDate(dateStr) {
  return moment(dateStr)._d;
}

function BookRecord(book) {
  if (this instanceof BookRecord) {
    if (!this.shelf) {
      this.shelf = new Date().getFullYear();
    }

    
  } else {
    return new BookRecord(book);
  }
}
/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

var grUrl = url.format({
  protocol : 'http',
  host     : 'www.goodreads.com',
  pathname : 'review/list',
  query    : {
    v        : 2,
    key      : grData.GOODREADS_API_TOKEN,
    id       : grData.GOODREADS_USER_ID,
    shelf    : shelf,
    sort     : 'date_read',
    per_page : 100,
    order    : 'a'
  }
});

console.log('requesting: %s', grUrl);

request(grUrl, function(error, response, body) {
  if (error) {
    console.error('Something went wrong. %s', error);
  } else if (response.statusCode === 200) {
    var json;

    parser(body, '//reviews', function(error, result) {
      if (error) {
        console.error('Error: %s', error);
        json = {"error": error};
      } else {
        json = result[0].review.map(function(book) {
          //console.log(JSON.stringify(book, undefined, 2));

          return {
            id         : book.id,
            url        : book.url,
            isbn       : book.book.isbn,
            isbn13     : book.book.isbn13,
            title      : book.book.title.replace(TITLE_SANITIZE_RE, ''),
            cover      : book.book.image_url || null,
            author     : book.book.authors.author.name,
            started    : isString(book.started_at) ? sanitizeDate(book.started_at) : new Date(shelf, 0, 1),
            finished   : isString(book.read_at) ? sanitizeDate(book.read_at) : null,
            read_count : book.read_count ? parseInt(book.read_count, 10) : 0,
            rating     : parseInt(book.rating, 10) || 0
          };
        });
        json.sort(function(a, b) {
          return (new Date(a.started) > new Date(b.started)) ? 1 : -1;
        });

        //console.log(JSON.stringify(json, undefined, 2));
        fs.writeFileSync('books.js', JSON.stringify(json), {flag:'w'});
      }
    });
  }
});