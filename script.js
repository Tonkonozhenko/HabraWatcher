var rating_selector = '.rating .num',
    karma_selector = '.score .num',
    comments_selector = '.posts .post .comments .all',
    rating = parseFloat($(rating_selector).html().replace(',', '.')),
    karma = parseFloat($('.score .num').html().replace(',', '.')),
    lastPostCommentsCount = parseInt($(comments_selector).first().html()),
    delay = 1 * 1000, // 1 second
    username = document.location.pathname.split('/')[2]; // Get username from current URL

setInterval(function () {
  $.ajax({
    method: 'GET',
    url: 'http://habrahabr.ru/users/' + username + '/topics/',
    success: function (data) {
      var body = $(data),
          newRating = parseFloat(body.find(rating_selector).html().replace(',', '.')),
          newKarma = parseFloat(body.find(karma_selector).html().replace(',', '.')),
          newCommentsCount = parseInt(body.find(comments_selector).first().html());

      if (newRating != rating) {
        alert("New rating: " + newRating + ', change: ' + (newRating - rating));
        rating = newRating;
      }
      if (newKarma != karma) {
        alert("New carma: " + newKarma + ', change: ' + (newKarma - karma));
        karma = newKarma;
      }
      if (newCommentsCount != lastPostCommentsCount) {
        alert("Comments added: " + (newCommentsCount - lastPostCommentsCount));
        lastPostCommentsCount = newCommentsCount;
      }
    }
  })
}, delay);