---
name: From Frontend to Backend
series: Random Everyday Talks
description: After this, you'll probably think about frontend development differently
date: "11/24/2024"
---

# From Frontend to Backend

In my opinion, front-end development is much harder than back-end development. Today's edition of "Random Everyday Talks", a series I just made (on the fly) for talks about a random topic on developer everyday activities and experiences, shares with us the full story of frontend development (and I don't mean just websites), and why you might want to take it more seriously after now.

It's a bit of a read, so enjoy.

---

I've had experience writing applications: the frontend, backend, database, services, and anything else needed in an application. This [website](/) is an application. So are the apps on your phone. One could argue that some CLI tools are applications (called command-line applications), but that's going to be only lightly referenced in this blog.

## The Pain of UI and UX

> I am saying all this not because I'm perfect at doing UI (I mean look at this website) - I'm trying to learn that by the way and it will reflect soon on this website - but because UI is important nonetheless.
>
> This blog post is also to give credit to those who have been able to learn such a skill because I used to underrate it until I tried (and failed).

People tend to underestimate how hard it is to make a website **look good**. In my design processes, it is always much easier to draw out a layout of the application (using the backend schemas and other things as the main reference for structure) than to make designs for it. This is why not all of us are UI whizzes cooking up 3D games as our portfolio websites. Making good UIs, especially when you know you can't just "use a pencil and draw it out" on your website or "Figma" it out: you have to deal with dumpster fires like HTML, CSS, and the legendary JavaScript if you're working on the web; nested brackets, braces, words and math if you're going Native Mobile; and even crazier math if you're making the UI for a command line interface and the final boss: **Games**.

UI and UX are an extremely valuable skill, not just because it is hard to make a good design, but because it is much easier to make a good design **on paper** than **on an application**. Luckily, very talented people have been able to make tools for making UI and UX design much easier (to name a few: design tools like [Figma](https://www.figma.com/) and UI Libraries like [MaterialUI](https://mui.com/material-ui/), [Bootstrap](https://getbootstrap.com/) and to some extent [PrimeFaces](https://www.primefaces.org/)). The tools don't solve the full picture, and doing UI/UX is still difficult even with these tools available: transferring designs from Figma to real code is **not** an easy task to do yourself, libraries like [ShadCDN](https://ui.shadcn.com/) and [Bootstrap](https://getbootstrap.com/) are opinionated which may get you a design quick but not get you the design you want as easy (or sometimes at all).

### Have we all been copying the same design?

If you've been like me and have been browsing many websites that weren't just built with WordPress or by AI, you'll notice that a good number of them, to some extent, look the same (including mine). It makes one wonder, have we lost our unique design systems, and have just chosen to stick with one single method? Have we lost creativity?

Well, the reason for such similarities is that making designs this way has become so common and popular that it's much easier to design websites this way than to recreate your own, complex and difficult design system you probably have somewhere lurking in your brain. I could go on and on on this, but I think that can be done in a separate blog post.

### Desktop Environments

But sometimes, we don't agree that it is our fault for making bad UI designs. Sometimes, where we implement the UI is the problem. Most of us may not have experience in

Making good UIs on platforms like Linux (thumbs up if you've tried on a [Berkeley Software Distribution](https://www.freebsd.org/)), you'll know how hard it is to make a UI good in today's world on those platforms, and this is more of a [desktop environment](https://en.wikipedia.org/wiki/Desktop_environment) issue.

I am not making this point to criticize desktop environment designers, as it is still not an easy task to create such software. That being said, take a look at one like [KDE](https://en.wikipedia.org/wiki/KDE_Plasma_5#/media/File:KDE_5.png), and maybe your typical [Windows 11](https://sl.bing.net/jwQ9saRTeWi) desktop environment. The KDE image is much better than the ones I've physically encountered, however, but such a difference made me wonder. What's the big difference?

Well, you could say funding - can't compare a free and open source project probably backed by donations to a corporate environment. But let's look at it from a developer standpoint. The reason for the difference, as well as how much better KDE is now from before, is UI/UX (not a hardware problem). Fun Fact: One was made using React, while the other was made using C++ - guess. Does that mean we should be using JavaScript on such platforms? [Not really](https://www.usenix.org/system/files/atc22-lion.pdf). But it's probably much easier to find a UI designer that can work with React than one for C++. It is also much easier to design good UIs quickly with one of them. React may not have been the best option, but it works, and despite the tradeoffs (which I haven't seen at the moment working on this on a Windows 11 System), the results are clear. A similar thing can be seen with MacOS.

> At this point I was thinking of a proof of work for such a desktop environment, but implemented with UI in mind (using a different language that'll be easier for UI/UX). If you're already doing something similar, or find such interesting, [link me up](https://github.com/nikeokoronkwo).

### But why should I care about UI...

Is it really important to have a good UI? If I were to go through all the hassle of learning modern UI would it matter? The most important thing about an application is that it works, and so that is usually the primary goal. You _don't need_ to have a very good UI for your application, as long as the application works. However, you'll want to have at least a decent UI for the sake of your users. This whole website could just be a set of lines of text, buttons, and links, without any bit of CSS, and it would still function the same if not better. However, many of us **know** that we wouldn't want to go to such a website.

The same way you pick out a good outfit or dress when going out, either for work hanging out or for going on a date, is the same way websites have a good "outfit" or "appearance" for going out to be visited by "you". UI should be as important as you see a good outfit or makeup. Some of us like and remember certain websites because of how they look. Just like a pretty person can catch the eye, is the same way a pretty website can catch the eye.

It isn't easy, and that's why not everyone does it.

## The Complexity of Frontend

Out of all the technologies that we use in our society, one of the most evolved, developed, and possibly iterated technologies is the web.

Frontend Development has evolved **a lot** compared to the evolution of other parts of an application. Making an application twenty years ago just needed a line of HTML - and you were fine. Nowadays, you will need more than that:

- CSS to make your site look good
- JavaScript to make your site act well
- TypeScript because JavaScript sucks to work with directly
- A JavaScript Framework because plain JS and TS suck on big applications (and now the **average website** is big): JavaScript frameworks have complexities much more than I can explain here, but you can go and check your favorite out on its web page. A few will be mentioned here
- CSS Preprocessors because plain CSS sucks to work with
- SASS because people needed more than plain CSS
- JavaScript bundlers because all this extra weight became too big to run on their own
- JavaScript developer tools because (again) JavaScript Sucks to work with.

Even though functionality matters, what most of us see, and therefore judge first, is how the website _looks_ (UI which we just [talked about](#the-pain-of-ui-and-ux)) and _feels_ (meaning interaction). Therefore, the front end is much more important than what it once was back in the day (i.e. more of an afterthought). Writing the backend for a website with minimal functionality, like a portfolio platform, a blog page, or anything that doesn't need to store data, could just be a single Go file (or probably none). However, writing a good front end requires more than just an `index.html`.

## Connecting the backend

Depending on how you started making your application, this part shouldn't be too difficult. If your frontend was designed with the backend in mind, then connecting both of them shouldn't be as hard as working with a backend you don't know works.

However, if such provisions weren't made, then it might take a while to make such connections. Such barriers between frontend and backend are what brought up the rise of JavaScript metaframeworks like [Nuxt](https://nuxt.com/) (what built this website) or [Remix](https://remix.run/), which help to break such divides and couple the frontend and backend together; and tools like [Phoenix's Live View](https://github.com/phoenixframework/phoenix_live_view) and [Laravel's Inertia](https://inertiajs.com/).

## Here's an example

I recently made a [flashcards app](/apps/flashcards) that runs on a desktop (no backend), and drawing up the functionality for the app took almost less than five to ten minutes. The rest of the day was spent making the frontend of the application.

I've made a few CLI tools, where the functionality also didn't take much time, but most of the progress was locked on making the User Interface for the command-line application look usable.

Frontend doesn't just mean frontend for websites. It also applies to desktop applications, mobile applications (which most of us can agree on the importance of a good frontend), command-line interfaces, and embedded interfaces at times (like your Car's Infotainment). Apart from websites and embedded devices (that run on-device or are not IoT devices, mostly unlike your Car's Infotainment), most of these devices are frontend-only, and backends for them would be mostly decoupled from the application, running on a server. This means that the front end is the primary application.

---

The basic idea of this post is for you, and me (very much me) to take frontend development seriously. The reason the front end isn't taken as seriously as it is these days is because people just choose not to. People don't like difficult things, especially things that they can always choose not to worry so much about like making a pretty website. As long as I can serve some PHP or send some HTML it will be just fine... _would it?_ One major reason why it's so difficult is because it's constantly changing. Outfits that were once the reigning style in the 50s or 60s aren't nowadays, and such is similar for UIs because we wanted _more_. Websites that look good today may not be enough anymore in the future, and keeping up with such a burden of change isn't easy. Websites didn't need to be _this_ complicated, but they are (sadly), and we need to keep up with it (honestly, I hope websites don't get any more than this, cos I think, and hope, this is enough for the next 20 years).

So don't ignore or run from it, instead learn from it, and let's all embrace making things look good.
