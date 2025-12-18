---
layout: layouts/base.njk
title: RevenueSpot
permalink: projects/revenuespot.html
---

RevenueSpot was an early project I worked on with the goal of learning a bit more about web scraping and how to use the Spotify API. I was also just genuinely curious about how much money each track on Spotify made. 

## Motivation
It was during the legendary Drake-Kendrick Lamar rap beef that a friend and I joked about how much more money these guys must be making off of this drama, what with people going to stream their music more. As these conversations often go, the topic of how much money they make came up and as musicians ourselves, how much money they must get per stream on Spotify. Given that Drake has songs with over 1 billion streams, I wanted to do the calculation.

The long-held understanding has been that Spotify pays artists less than pennies per stream. According to this music site, some forums, and others, [the estimation that each stream is equivalent to $0.00028 in revenue](https://dittomusic.com/en/blog/how-much-does-spotify-pay-per-stream). Spotify [denies this (sort of)](https://support.spotify.com/us/artists/article/understanding-spotify-royalties/). Either way, I have always looked for an excuse to use the Spotify API. 

<img src="https://concourse-codes.s3.us-east-1.amazonaws.com/RevenueSpot_Screenshot3.png" alt="Drake Spotify screenshot" width="500"/>

## Initial Build

My first plan when building this out was to tap into the Spotify API to get play counts per track, then do some simple math to calculate the revenue. Strangely, the [Spotify API doesn't tell you this](https://developer.spotify.com/documentation/web-api/reference/get-track). I sort of understand this given how play counts must be stored as a hyper-dynamic value, especially for artists like Drake. There were also no third party tools online that offered this info. 

So, I whipped up a simple 'fetch track info' input element that grabbed whatever the Spotify API had to offer, and off I went into the wonderful world of web scraping. 

<img src="https://concourse-codes.s3.us-east-1.amazonaws.com/RevenueSpot_Screenshot1.png" alt="Drake Spotify screenshot" width="500"/>

## Web Scraping

Believe it or not, I actually have a non-insignificant amount of professional experience using web scraping. One of the first tasks I had upon my first job out of Uni was helping the company QA team develop some Python scripts to test for the new design implementations. <br/>

At that time, the directive was to use Java with Selenium. It was fairly straight forward in 2018, before React and SPAs took over more of the web. The problem was that it was quite cumbersome (as is Java in general). Each element required practically a full 80-character line of code to drill down into. Innovation was needed.


One of the grand triumphs of my early career was making the decision to switch to Python and use BeautifulSoup instead to accomplish this task in front of me while also parameterizing the test suite for the QA team. They loved that. I loved that. Everyone was happy. 

--

But now, years later, I was confronted with web scraping in the context of a new tech stack: a Node.js backend. Some research revealed that Puppeteer was the best library for this and off I went. 

## Success!

From there, it was relatively straight forward. Getting the play count element on the web page was pretty simple, just a matter of finding the right unique combination of HTML elements to drill into. A bit of configuration research was needed but that's exactly where our new AI Copilot friends can excel in. Ez.

The one tricky part was working around bot-tracking behaviors that browsers try to stomp out. I had to throw in some timeouts, tinker with the correct version of Chromium browser to use, and ensure I had the proper HTTP request configuration to prevent security measures from quickly shutting it down.

Sure enough, I had my solution! It was a bit slow, but it worked.

<img src="https://concourse-codes.s3.us-east-1.amazonaws.com/RevenueSpot_Screenshot2.png" alt="Drake Spotify screenshot" width="500"/>

## Failure!

Well, not sure if it's totally fair to say "failure" but I did toss this project up quickly into an AWS EC2 instance so I could move on to new, cooler (shinier) ideas. 

The need for an EC2 instance was pressing as I needed a way for the scraper to boot up a headless chromium browser, let it run for anywhere between 15-90 seconds, and fetch the page data. I also just knew how to setup an EC2 instance from past experience.

In my deployment research, Copilot had pointed towards an AWS Elastic Beanstalk configuration to help save with costs when the project wasn't in use. I recognized that that was the best solution, it wasn't even particularly much more complicated... I just hadn't used it before and didn't feel like spending the time to learn. (guilty as charged).

This proved to be my downfall. What a surprise it was when I saw a $10 charge come across my credit card bill courtesy of AWS because of my RevenueSpot instance. I didn't budget for that!! 

The failure part becomes a bit clearer when I mention that I let that go on for a couple months without digging too deep as I had moved interest to new projects and life situations. I also thought that perhaps I had just gotten some random hits of people using it and that it would go down the next month since I wasn't sharing it anywhere really. 

I was wrong.

## The End

It took a few months, but I finally have gotten around to shutting down the EC2 instance and the project as a whole. It's not a terribly useful tool, and I frankly don't feel that compelled or have enough free time to dig into how to make the deployment infra more cost efficient for this particular project. 

That said, I did record a nice little video of it in action which you can see above or below.


## Lessons Learned

I might be able to speak on the lessons learned from the technical implementations, or the infrastrcuture struggles, or even just how Spotify is doing as little as they can to pay artists. But truthfully, I think the lesson learned was how to go about these impulsive little project ideas in a more thorough manner. 

Until next time,

Ben