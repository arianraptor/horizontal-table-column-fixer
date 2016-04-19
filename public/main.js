$(document).ready(function() {
  var fixColumn = $('.table-fix-column').fixColumn();

  $('.table-fix-column-wrapper').mousewheel(function(event, delta) {
    //The "30" represents speed. preventDefault ensures the page won't scroll down.
    this.scrollLeft -= (delta * 30);
    this.scrollRight -= (delta*30);
    event.preventDefault();
  });

});
