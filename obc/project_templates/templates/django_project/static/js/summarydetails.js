function summaryDetails(context) {
    // Execute the fallback only if there’s no native `details` support
    // Chrome 10 beta passes this test, but there's no functionality there
    // if (!('open' in document.createElement('details'))) {
        var all;
        if ($(context).is("details")) {
                all = $(context).find("details").andSelf();
            } else {
                all = $(context).find("details");
            }

            all.each(function() {
   // Store a reference to the current `details` element in a variable
   var $details = $(this),
       // Store a reference to the `summary` element of the current `details` element (if any) in a variable
       $detailsSummary = $('summary:first', $details),
       // Do the same for the info within the `details` element
       $detailsNotSummary = $details.children(':not(summary:first)'),
       // This will be used later to look for direct child text nodes
       $detailsNotSummaryContents = $details.contents(':not(summary:first)');

   // If there is no `summary` in the current `details` element…
   if (!$detailsSummary.length) {
    // …create one with default text
    $detailsSummary = $(document.createElement('summary')).text('Details').prependTo($details);
   }

   // Look for direct child text nodes
   if ($detailsNotSummary.length !== $detailsNotSummaryContents.length) {
    // Wrap child text nodes in a `span` element
    $detailsNotSummaryContents.filter(function() {
     // Only keep the node in the collection if it’s a text node containing more than only whitespace
     return (this.nodeType === 3) && (/[^\t\n\r ]/.test(this.data));
    }).wrap('<span>');
    // There are now no direct child text nodes anymore — they’re wrapped in `span` elements
    $detailsNotSummary = $details.children(':not(summary:first)');
   }

   // Hide content unless the `open` attribute is truthy
   // (in Chrome 10 beta it will be false, other browsers undefined)
   if ($details.attr('open')) {
    $details.addClass('open');
    $detailsNotSummary.slideDown('fast');
   } else {
    $detailsNotSummary.hide();
   }

   // Set the `tabindex` attribute of the `summary` element to 0 to make it keyboard accessible
   $detailsSummary.attr('tabindex', 0).click(function() {
    // Focus on the `summary` element
    $detailsSummary.focus();
    // Toggle the `open` attribute of the `details` element
    $details.attr('open') ? $details.removeAttr('open') : $details.attr('open', 'open');
    // Toggle the additional information in the `details` element
    $detailsNotSummary.slideToggle('fast');
    $details.toggleClass('open');
   }).keyup(function(event) {
    if (13 === event.keyCode || 32 === event.keyCode) {
     // Enter or Space is pressed — trigger the `click` event on the `summary` element
     // Opera already seems to trigger the `click` event when Enter is pressed
     if (!($.browser.opera && 13 === event.keyCode)) {
      event.preventDefault();
      $detailsSummary.click();
     }
    }
   });
  });

// end "if no native support"
// }
}

$(function() {
      summaryDetails("body");
});
