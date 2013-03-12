docsight
==============

## About
Chrome extension for visualizing past visits to developer resources such as blog posts or Stack Overflow questions.

This enables two things:

1. A quick way to browse your history for recovering important development resources. 

2. An episodic timeline for reviewing your coding activities.  It is amazing what we can remember by viewing a history
of developer activities.


![Screenshot](https://github.com/chrisparnin/docsight/raw/master/docs/docSightTitleView.png)

## Testimonials

> really helpful to avoid open tab creep :) &mdash; <cite>Jens</cite>

## Icon View
The view can be toggled between an icon cloud visualization or title view of your developement history.

![ICON VIEW](https://github.com/chrisparnin/docsight/raw/master/docs/IconViews.png)

## History Range
The default view shows the past 5 days.  Alternative date ranges include 1 month and 3 months.

## Filtering

`docsight` uses a [whitelist](https://github.com/chrisparnin/docsight/blob/master/js/filterpresets.js) approach for filtering visits to developer sites.  You can add your own custom filtering!  To filter google searches, only searches within the past 30 seconds of a developer site are included.  As of version 1.0.4, supports 63 apis/languages!

There are two kinds of filter expressions supported 1) simple greasemonkey-like patterns with globs and 2) Javascript regex.
Each pattern starts on a new line.

1. You can choose which sites to include or exclude with the following syntax.

		@include https://github.com/*/issues* 
		@exclude https://github.com/*/issues/new* 
		@exclude *://stackoverflow.com/users*

2. You can exclude sites based on its url or title content with a Javascript regex.  For example, to exclude visits to user pages on stackoverflow, you could write the following:

      User .*? \- Stack Overflow
      User .*? \- Meta Stack Overflow

See the following for more detail about [javascript regex](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Regular_Expressions).
