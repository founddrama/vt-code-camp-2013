# Beyond `ng-hello-world`: Speaker Notes

## 0

### Abstract
> AngularJS is an open-source front-end MVC framework
> from Google for dynamic web apps. On top of the
> customary MVC features, AngularJS has a rich
> vocabulary of components including services for code
> sharing, filters for view layer data transformation,
> and directives for extending HTML. At Dealer.com, we
> recently built a centralized remote configuration
> service and we chose AngularJS to handle the user
> interface concerns. This talk will provide a high-
> level introduction to AngularJS, discuss the front-
> end challenges we faced, and describe how we solved
> those problems with AngularJS.

## 1
_n/a_

## 2
_n/a_

### 2.1
_n/a_

### 2.2
_n/a_

### 2.3
* re: open source: MIT
* "complex webapps" is the part where I mention the Tripoli case study

### 2.4
* "It's like Clojure or some other Lisp like that..."
  * it's the tools to build the tools...
  * "Not quite macros but..."

## 3
* re: "the basics" - philosophy: yes; but only the
  briefest intro
  * there are already lots of good intro tutorials
* re: "feature coverage": _not_ here to introduce and/or
  discuss every feature
  * won't be talking about routes (much), views,
    resource plugin, etc.
* re: "side-by-side" - this is _not_ "Angular vs. Ember"
* re: "SPAs" - I assume you've already done your own
  homework on this subject

## 4
_n/a_

### 4.1
* "You probably already know that..."
* "...know what that means..."
* the whatever is _their_ term

### 4.2
_n/a_

### 4.3
* some explanation is in order
* UN-opinionated about models ("mostly")
  * c/w Backbone, Ember
* UN-opinionated about views ("mostly")
  * we've heard this before
    * (Murphey, 2012; re: Backbone)
  * similar critique as hers?
  * and/but (TO TOTALLY UNDERMINE MYSELF HERE...)
    plenty of "magic" in the views by way of directives
* "So why _opinionated in the middle_ ?"
  * RE: opinions about how to separate code
  * RE: opinions about how to re-use code
  * RE: opinions about how to fit things together
  * examples:
    * controllers call services directly
    * directives get their own scope whenever possible
    * (_WHAT ELSE?_)
    * "Does this all seem like common sense?"

## 5
* example Angular "app" put together in approx. 30 min
* uses Bootstrap (_only_ for CSS) and _only_ Angular
* nothing fancy/crazy - just an ng-controller
  * and the stock filters/directives
  * only service = $window
* noted: `ng-app` (don't forget this)
* noted: `ng-app` (remember to tell it your module)
  * b/c you _are_ going to want to use the modules

## 6
_n/a_

### 6.1
* get this point out of the way right off the bat
* module pattern more/less enforced by the framework
* if you're writing idiomatic Angular it should be hard to
  accidentally leak globals

### 6.2
* JS is for business logic (mostly)
* services should never touch the DOM
* controllers should _almost_ never touch the DOM
* filters won't even let you "do HTML"
* directives: if you need to touch the DOM, do it here

### 6.3
* HTML: great for static docs
* JS: actually a pretty nice language for solving problems
  * and even if you don't like it... you're stuck with it
* HTML + JS: starts to give you what you want
* but what you want are dynamic docs
* now: how do you _want_ to wire things up?
* ANECDOTES: compare/contrast
  * dev work w/ something like ExtJS
    * "do it all in JS" (and/but: what about the mark-up?)
  * HTML + jQuery = jQuery soup
  * Knockout: getting warmer...

## 7
_n/a_

### 7.1
_n/a_

### 7.2
* "familiar with controllers"
  * from other MVCs...
* arguably more of a "ViewModel"
  * c/w Knockout.js
* main function of controller:
  * set up execution context for your views
    * that's `$scope`
  * putting your data onto `$scope`
  * putting your methods etc. onto `$scope`
    * example:
      * `ng-hide="{{ thing == true }}"`
      * and/but have that more than once and consider
      * `ng-hide="hasThing()"`
* yes: you can have more than 1 per "page"
  * and you _should_ b/c each controller should really just be responsible for
    _one thing_
* `$scope` inheritance
  * as prototypal...
  * controllers w/in controllers...
  * directives w/in controllers
  * `$scope.thing` ... `thing` may _actually_ be from `$scope.$parent`
  * see also: `$rootScope`

### 7.3
_n/a_

### 7.4
_n/a_

### 7.5
* important point: `$scope` is not your model
* `$scope` is the surface area b/w controller + view
* remember: ng has not strong opinions about model
  * "bring your own model" philosophy
  * your model is largely a back-end concern
  * (hence putting it in a little abstract cloud here)
* 2-way relationships, but mediated

### 7.6
* anything you want to share b/w controllers
* you're not setting up inheritance chains b/w controllers
* share code through DI
  * side note: the "DI" bit bothers me - you're just
    passing references to the service singletons into your
    controllers as function args
  * _anyway_ - "inject" as args into contructor functions
    for controllers, directives, other services
  * side note: the DI winds up feeling a bit like "ceremony"
* THINK FUNCTIONALLY HERE
  * w/ services you don't want side effects
    * (just arguments and return values)
  * (side note: Angular is designed to not have side effects - remember: "lethally allergic to global state")

### 7.7
_n/a_

### 7.8
* _don't_ transform data in your controllers
* data (on your model) goes _directly_ to the view via
  `$scope`
* then: `{{ value | filter: filterArg }}`
  * transformations happen like that
* AGAIN : the idea there is to minimize side effects
  * i.e., don't transform the data "in place" (in the model)
  * transform it for the view where it makes sense (in the
    view)
* "pure functions" - simply returning the transformed value
  to the rendered view

### 7.9
_n/a_

### 7.10
_n/a_

### 7.11
* THIS IS THE MAGIC
* "extending" HTML
  * turns `<div my-directive></div>` into... whatever
    you want
* directives and `$scope`
* compiling + linking
* templates + templateUrl
* restriction
  * Attributes
  * Classes
  * Elements
  * coMments
* the "core" ng directives make up the heart of the
  framework
  * `ng-app`? `ng-controller`? consider that those are
    both directives necessary to even bootstrap the app
* EXCELLENT WAY to break your app down into small pieces

### 7.12
_n/a_

### 7.13
_n/a_

### 7.14
_n/a_

### 7.15
* plenty I'm not covering here
* core APIs
  * called "global APIs" in the docs
    * but hey... "global" is a dirty word
  * the point: some utils to help keep other libraries out
    * not _to_ keep them out but: why bring in all of jQuery
      if all you need are some simple selectors?
    * which leads us to...
* jqLite (explain!)
* routes (for making sane and sensible and shareable URLs
  for client-side state...)
* `$apply`, `$digest`, + `$watch`
  * noted: some of the "magic" around `$scope` objects
  * the digests are on short but regular intervals
  * ...to try to prevent ng from performing poorly
    * "don't watch yourself to death"
  * some added security there - i.e., throw errors if
    items in the apply/digest loop start setting each
    other recursively and dangerously
* testing (testable out of the box!)

## 8
_n/a_

### 8.1
* refer back to Pearlin's talk
* quick-n-dirty definition for centralized config
* Tripoli as the front-end app for that
  * "making simple that which is not"
* explain the pun:
  * Externalized Environmental End-Point Config Service
  * -> EEECS -> "triple-E" -> Tripoli
  * haha

## 9
_et al._

## 10
* "Preface this discussion by saying..."
* we already knew that we needed client-side
  * the way that we were working w/ the config trees
  * (recall: not discussing pros/cons of SPAs here)
* as a co. we'd done some experiments with a few
  client-side MVCs...
* most success w/ Angular so... prototype w/ Angular
  * (and prototype worked well and grew...)

### 10.1
* ng idioms encourage strong/opinionated ways to
  separate your code
* see above: controllers, services, filters,
  directives, etc.
* the idioms behind that SOC make it easy to figure out
  where everything is
  * i.e., you aren't wondering about some magical class
    that is magically picked up by jQuery...
  * ...ng-controller tells you exactly what to look for

### 10.2
* services: look a certain way
* controllers: look a certain way
* directives + filters : ...you get the idea
* "idiomatic Angular" : guided by the opinionated SOC
* this makes it easy to jump right in and know what's going on

### 10.3
* not just a buzzwordy "Agile" word!
* SOC leads to idiomaticity
  * idiomaticity leads to clarity
    * clarity leads to simplicity
* w/ ng we were able to iterate quickly
* w/ ng we were able to refactor quickly
  * example: the "params as DI" idiom makes it very easy to
    find where a given service is being used
  * example: b/c of the declarative nature of controllers
    and directives... it's also easy to find where they are
    used
    * "And also the reverse..." (but more on that in a bit)
* w/ ng we were able to on-board another UI dev quickly

### 10.4
* ng module system keeps everything out of the global scope
* effectively zero chance of stomping all over something
  provided by some other library, etc.
* granted: ng module system isn't buying you anything
  super-fancy (e.g., not AMD style lazy-loading or anything
  like that)
* but use it now b/c who knows what the next version will
  bring?

### 10.5
* anecdote: select2
  * needed to use it in the app...
  * tried to hook into it w/ "naked ng"
  * tried to roll our own wrapper directive
    * quickly discovered there was more to it...
  * found "AngularUI" + its `select2` directive
    * did the trick (and in way less time)
* other notes on this:
  * >280 packages in Bower
  * >3300 questions on Stack Overflow
  * >7800 threads on the Google Group

### 10.6
* "You hear this a lot..."
  * the smaller the framework, the louder this is touted?
* and/but - "normal patterns apply"
  * lots of "pure functions"
  * "pure fns" attached to `$scope`
  * basically one big module pattern all over the place
* exceptions to this?
  * data binding may require some dances w/ `$watch` and
    `$apply` etc. (but most of the time not)
  * see also the `@` + `=` + `&` stuff with directives
    * "but you get used to it"

### 10.7
* hoping by the time I give this talk, this isn't an
  empty statement...
* ng as testable "out of the box"
* ng idioms as being easily testable
  * and/or encouraging testability
* ...so? anything to show for it?

## 11
* not all unicorns and rainbows
* a couple of things are ... weird

### 11.1
* NOT ACROSS THE BOARD!
* some of the docs are actually really good
* but about 50% of the API docs feel about 50% done
  * information seems to be missing
  * or else the example provided is... too simple
* Developer Guide is richer, but takes a lot more digging
* forums + Stack Overflow are good resources but the usual
  warnings for those apply...

### 11.2
* reiterate : claim : "lethally allergic to global state"
* and/but a lot of the examples do "this..."
  * (reveal code example)

### 11.3
**RIGHT OFF THE BAT...***

* a function that goes right into the global ns
* `$scope` through DI and/but that won't survive
  minification
* seems minor and forgivable but...

### 11.4
* tutorial is OK and/but...
* difficult to know where to start with some of ng's
  concepts/features
* given that the examples appear to lead you ever so
  slightly astray, there is an argument to make there that
  the credibility is a bit hurt
* BACK UP : most things you _can_ just pick up and start
  using
* BUT again ng is more of a fwk than a lib
  * and as such: you're using it to "build apps"
  * you _can_ just sprinkle a little bit in to your
    existing apps
  * but I'm not sure that that's where you'll get the most
    value (i.e., best results from going all in?)
* in other words: although you _can_ try to just sprinkle it
  in a little bit at a time to experiment with it, you're
  likely to get better results if you do some up-front
  research and design...

### 11.5
* all that "hands off the DOM" business...
* great for decoupling, great for arch.
* and/but: "You're a UI developer and you care about that
  fit-and-finish that goes in to the end result..."
* animations are not always gratuitous
  * they're part of "surprise and delight"
  * they're part of your brand
  * and they can serve a _function_ in your UI as well
  * (but you already know this...)
* ng can make this... difficult sometimes
* through 1.0.8 there is nothing build-in
  * and the 1.1.x stuff is unstable
  * and I can't say I've figured out the 1.2.0 animation
    support yet
  * (and/but: links!)
* you can get down into the directives to do some of this
  * recall: directive are where it's "safe" to do DOM
    manipulation
* and/but : pros and cons here
  * restricting DOM manipulation to directives makes a lot
    of sense
  * but sometimes it also feels like overkill?

### 11.6
* ng does a lot of work "for you" w/r/t/ tracking values
  that are attached to `$scope`
  * (that's the `$digest`)
* and/but it isn't always clear how or why or when you can
  update items directly and have it "just work" and when
  you need to hit it `$apply`
* the rule of thumb from the docs: use `$apply` whenever
  "non-ng" code is updating values in ng scopes
* which seems like a simple enough rule except...
  * ...when you _do_ update w/o `$apply` and think that
    you _should have_ but then it just works anyway; vs.
  * ...when you update a value fr/ w/in ng but it doesn't
    (appear) to update the way it "should"
  * CAN BE CONFUSING
* also: be doubly careful w/ the latter case: it's almost
  too easy to think "oh I just need to wrap that in an
  `$apply`" and then you get that error about already being
  in a `$digest` cycle etc.

### 11.7
* the temptation is strong
* b/c ng is probably quite unlike any front-end fwk you've
  dealt with before
* anecdote: events
  * I wanted to use events in a certain way...
  * ...b/c that's how I've done it in other fwks
    (e.g., ExtJS)
  * ...but Stack Overflow thread leads us to a classic
    case of "you're doing it wrong"
* observation: temptation to use `$scope` as model
* controversy: the `ng-` attrs...
  * they _feel_ dirty
  * b/c we've spent the last couple years arguing about
    `onclick` + the like
  * "decouple your HTML and JS!"
  * will feel like _that_
    * see also: that HN thread from 6 months ago...
  * ANYWAY: don't think of it as tightly coupling your
    DOM to your JS; think of it as turning your HTML into
    a potent DSL for your app
* (starting to sound like a selling point, eh?)

## 12
_n/a_

### 12.1
* w/ controllers: less is more...
* set up your `$scope` and ask hard questions if you wind
  up doing anything else

### 12.2
* take the time to learn directives
* use the built-in stuff as much as you can
* but directives are where you'll see your most powerful
  code re-use

### 12.3
* oddly (!?) ng docs don't seem to have any strong opinions
  about how to organize your ng code
* Angular Seed project puts all controllers, filters,
  services, and directives into one file for each type
* instead try something more like...

### 12.4
* variation on Angular Seed
  * "...but better!"
* `ng-app-base.js` (or eq.) is where your modules are
  declared, where you do global config, etc.
* separate directory for each type
* each type gets its own file
  * (you're concat'ing and min'ing anyway, right?)
* each file should match what is inside
  * makes everything easy to find
* templates: each partial name should match the directive
  that it corresponds with
  * (we use Grails so ours went into...)
* side note: directive namespace! decide on one early
  * use a good (short!) one for your app-specific stuff
  * and if you can't decide on one... use `ngx-`
    * for "ng-extended"

## 13
_n/a_

## 14
_n/a_