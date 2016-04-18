$(document).ready(function() {
  // set equal width
  var els = 'fixed-column';

  // count fixed column
  var rows = $('tr:first-child' + ' td.' + els).length;

  $('tr .fixed-column:nth-child(' + rows + ') ').css({
    'borderRight': '3px solid #efefef'
  });

  // loop and generate class
  for (var i = 0; i <= rows; i++) {
    var generatedClass = els + '-' + i;
    $('tr .fixed-column:nth-child(' + i + ')').addClass(generatedClass);
  }

  // generate total width
  var totalWidth = 0;
  for (var i = 1; i <= rows; i++) {

    var generatedClass = '.' + els + '-' + i;
    var maxWidth = Math.max.apply(null, $(generatedClass).map(function() {
      return $(this).outerWidth(true);
    }).get());

    $(generatedClass).outerWidth(maxWidth);
    $(generatedClass).css({left: totalWidth});

    // calculate margin left from all hanging
    totalWidth += maxWidth;
  }

  // set margin left of other column
  var table = 'table';
  $(table).css({'marginLeft': totalWidth - 1});


  var countRows = $('table tr').length;
  for (var i = 1; i <= countRows; i++) {
    // height equal
    var maxHeight = Math.max.apply(null, $('tr:nth-child(' + i + ') td').map(function() {
      return $(this).outerHeight(true);
    }).get());

    $('tr:nth-child(' + i + ') td').height(maxHeight);
  }

});
