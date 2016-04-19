( function( $ ) {

    $.fn.fixColumn = function( options ) {

        // Establish our default settings
        var settings = $.extend( {
            table: '.table-fix-column',
            els: 'fixed-column'
        }, options );


      // count fixed column
      var rows = $('tr:first-child' + ' td.' + settings.els).length;

      // add border to last fixed column
      // $('tr .' + settings.els + ':nth-child(' + rows + ') ').css({
      //   'borderRight': '3px solid #efefef'
      // });

      $('tr:first-child th:nth-child(' + rows + ') ').addClass('border-last');

      // loop and generate class for each element
      for (var i = 0; i <= rows; i++) {
        var generatedClass = settings.els + '-' + i;
        $('tr .' + settings.els + ':nth-child(' + i + ')').addClass(generatedClass);
      }

      // generate total width
      var totalWidth = 0;
      for (var i = 1; i <= rows; i++) {

        var generatedClass = '.' + settings.els + '-' + i;
        var maxWidth = Math.max.apply(null, $(generatedClass).map(function() {
          return $(this).outerWidth(true);
        }).get());

        $(generatedClass).outerWidth(maxWidth);
        $(generatedClass).css({left: totalWidth});

        // calculate margin left from all hanging
        totalWidth += maxWidth;
      }

      // set margin left of other column
      var table = settings.table;
      $(table).css({'marginLeft': totalWidth - 1});

      // equal each height row
      var countRows = $(table + ' tr').length;
      for (var i = 1; i <= countRows; i++) {
        // height equal
        var maxHeight = Math.max.apply(null, $('tr:nth-child(' + i + ') td').map(function() {
          return $(this).outerHeight(true);
        }).get());

        $('tr:nth-child(' + i + ') td').height(maxHeight);
      }

      // equal each height heading
      var maxHeight = Math.max.apply(null, $('tr th').map(function() {
          return $(this).outerHeight(true);
      }).get());
      $('tr th').height(maxHeight);

      function centerVertical() {
        $( table + " span" ).each(function( index ) {
          var parentHeight = $(this).parent().height(),
          childHeight = $(this).height();
          $(this).css('marginTop', (parentHeight - childHeight) / 2);
        });
      }

      centerVertical();

      return {
        centerVertical: function() {
            $( table + " span" ).each(function( index ) {
                var parentHeight = $(this).parent().height(),
                childHeight = $(this).height();
                $(this).css('marginTop', (parentHeight - childHeight) / 2);
            });
        }
      };
    }
} ( jQuery ) );
