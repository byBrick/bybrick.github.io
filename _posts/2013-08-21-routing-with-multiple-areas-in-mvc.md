---
layout: post
title: "Routing with multiple areas in MVC"
date: 2013-08-21
tags: .NET, C#, ASP.NET MVC
author: HŒkan Edling
excerpt: Routing in ASP.NET MVC is pretty straight forward, however, with multiple areas and the strong possibility of having controllers with the same name in several of them strange things can happen.
---

In my current work with getting Piranha CMS to play nice with MVC applications I ran into some 
issues with the routing and area setup. Previously, when I was hosting the core framework in a 
Razor website one could be pretty sure that the manager controllers would be the only controllers 
around, but with a MVC application this is of course not the case.

My scenario was that I wanted to provide two default controllers with my template, a PageController 
and a PostController. However, both these names already existed in the manager area, so I ran 
into some issues straight away.

So how do you go about getting good separation between areas, and not clogging up the namespace 
availble for controllers in the default route. Let's start off by examining the route config 
provided when you create a new empty MVC 4 application in Visual Studio.

{% highlight C# %}
routes.MapRoute(
  name: "Default",
  url: "{controller}/{action}/{id}",
  defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }) ;
{% endhighlight %}

## Adding a namespace to MapRoute

The first step is to add namespaces to the routes, thus making sure that only the right controllers 
are added to each route. In order to get this to work properly this must be added both for the default 
route as well as for the routes in your areas. In my template project I added the following to my 
default route:

{% highlight C# %}
routes.MapRoute(
  name: "Default",
  url: "{controller}/{action}/{id}",
  defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
  namespaces: new [] { "TemplateSite.Mvc.Controllers" }) ;
{% endhighlight %}

After adding this I could start the application without getting errors about having multiple controllers 
with the same name, but was I done? Unfortunately not.

It's seems that even though I specified an explicit namespace for the default route it still routes 
all of the controllers of the other areas, however it chooses the right one in case of multiplicity. 
For me this is some really weird out-of-the-box behaviour after you've specified a namespace. Fortunately, 
weird problems tend to have weird solutions.

## Just pass me that magic string

Thanks to some wicked googeling-skills of my co-worker we managed to come up with the following solution. 
It seems that you can pass data tokens into a route and alter its behaviour.  So by adding the following 
line to the default route, controllers from the other areas were no longer accessible.

{% highlight C# %}
routes.MapRoute(
  name: "Default",
  url: "{controller}/{action}/{id}",
  defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
  namespaces: new [] { "TemplateSite.Mvc.Controllers" }
).DataTokens["UseNamespaceFallback"] = false ;
{% endhighlight %}

And that's it, all I needed was a magic string to get it to work. Hope that this will help you in your 
future quests in routing with multiple areas.