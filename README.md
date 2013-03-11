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

`docsight` uses a [whitelist](https://github.com/chrisparnin/docsight/blob/master/js/filterpresets.js) approach for filtering visits to developer sites.  Adding own custom filtering is in development.  To filter google searches, only searches within the past 30 seconds of a developer site are included.  Version 1.0.4 supports 63 apis/languages!

Currently, `docsight` supports custom exclusion of urls/titles.  For example, to exclude visits to user pages on stackoverflow, you could write the following:

    User .*? \- Stack Overflow
    User .*? \- Meta Stack Overflow

These are based on [javascript regex](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Regular_Expressions).  Seperate each filter by a newline.
