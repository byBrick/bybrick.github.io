# byBrick Labs

Welcome to our tech blog.

## How to contribute with posts

Check out this repo, add your post in the `_posts` directory and commit your changes. Github Pages rebuilds the site and push the changes live to [`bybrick.github.io`](http://bybrick.github.io/). Posts are written in [`Markdown`](http://daringfireball.net/projects/markdown/) format, so it should be easy to pick up.

A better explanation on how this works and how you embed code with the correct syntax highlighting, insert an image or embed a gist into your post can be found in the official [Jekyll](http://jekyllrb.com/) documentation: http://jekyllrb.com/docs/posts/ 

### YAML

Post settings are handled with [YAML](http://yaml.org/) and must be at the top of your `Markdown` file. Here’s a basic example with everything that this site is set up to recognize

```
---
layout: post
title: ”Your blog post title”
date: 2013-08-21
tags: tag1 tag2 tag3
author: Your Name
excerpt: The post excerpt
tldr: The TL;DR (too long, didn’t read) is a quick explanation WITH the post conclusion for those who are lazy.
---
```

**Note**: Only `layout`, `title`, `date` and `author` are required. The rest is just icing on the ~~cake~~ blog.

## Changelog

* 130821: First release.