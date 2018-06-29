![IMA.js logo](https://imajs.io/static/img/imajs-logo.png)

# IMA.js skeleton application

The IMA.js is an application development stack for developing isomorphic
applications written in pure JavaScript and React.

## Why we use IMA.js and you should too?

Here at [Seznam.cz](https://www.seznam.cz/vychytavky/), development of a frontend application comes with many checkboxes that need to be ticked off before the project goes public. Mainly because of a diverse audience and a challenging product requirements.

In order to **not** reinvent the wheel on every project and to address all of these problems (checkboxes) we created the IMA.js framework. Here are a few outlines that we're most proud of:

- [X] **Isomorphic** - application logic is first executed at the server-side, generates the page markup, and then when the application logic is executed at the client-side it automatically binds to the server-generated markup and acts like a single-page application (or a multi-page application if the client does not support JavaScript). This allows for fast load times, out-of-box support for web crawlers and greater overall user experienc (or UX for short).
- [X] **React compatible** - IMA.js Views extend the React Component and are in tight cooperation with our Controllers. That means you can use the full magic of React v16 without loosing anything.
- [X] **Production ready** - there's no need for additional setup or configuration. IMA.js uses evironment-specific configurations from the start.
- [X] **Battle tested** - IMA.js is used on various projects across Seznam.cz. Some of them pushing the limits of what a frontend application can do.

## Installation

To install the IMA.js application development stack, start by cloning this git
repository:

```
git clone https://github.com/seznam/IMA.js-skeleton.git
```

Switch to the cloned `IMA.js-skeleton` directory and run the following commands
to set-up your application:

```
npm install
npm run app:hello
npm run dev

// for older browser (IE11)
npm run dev --legacy-compat-mode
```

These commands install the dependencies locally, prepare the basic demo
application and start the development server. Go ahead and open
[`http://localhost:3001/`](http://localhost:3001/) in your browser!

Running `npm run dev` builds ES6 version of your app. Transpiling to ES5 happens only when you append `--legacy-compat-mode` flag or when running `npm run build` command *(see [Production use](#production-use))*.

You also may want to install the [`gulp`](http://gulpjs.com/) tool globally in
order to access all the available tools, examples and commands (you may need to
use `sudo` on a UNIX-like system):

```
npm install -g gulp
```

You probably will have to install also [`node-gyp`](https://github.com/nodejs/node-gyp#installation) - follow the installation instructions for your operating system in the linked README.md.

You may also try other local demos by running either of the following commands:

`npm run app:feed` - [Demo](https://imajs.io/examples/feed) - [Source code](https://github.com/seznam/IMA.js-examples/tree/master/feed)

`npm run app:todos` - [Demo](https://imajs.io/examples/todos) - [Source code](https://github.com/seznam/IMA.js-examples/tree/master/todos)

## Production use

If you want to deploy your IMA.js application to production, the installation is
similar to the dev enviroment.

To install the IMA.js application, start by cloning your application git
repository on your production server:

```
git clone https://github.com/seznam/IMA.js-skeleton.git // use your application's repository
```

Switch to the cloned directory and run the following commands to set-up your
application - same as in the development mode:

```
npm install
npm run build
```

Now your server is ready for running the built IMA.js application.

You can run your application using the following command:

```
npm run start
```

Your application is running at [`http://localhost:3001/`](http://localhost:3001/)
(unless configured otherwise) now!

### Building for SPA deployment

It is also possible to deploy your IMA.js application as an SPA (single-page
application). To do that, run the following command to build your application:

```
npm run build:spa
```

Your built application will be in the `build` directory, ready for deployment
to an HTTP server.

## Tutorial

We have prepared a complex tutorial for you:
[Your first IMA.js application](https://github.com/seznam/IMA.js-skeleton/wiki/Tutorial,-part-1).
This tutorial covers the basics of creating isomorphic web applications using
IMA.js, but you will encounter some more advanced concepts in there as well.

## IMA.js overview

IMA.js consists of several components:
- React for UI, which you should learn before you dive head-first into IMA.js
- Express.js as the web server, but you don't need to know express to use
  IMA.js
- ...and various little utilities you don't need to concern yourself with :)

The IMA.js is divided into the core library, which you'll use to build your
application, and the application server build on top of Express.js, that brings
your application to life.

You can find the core library at
[https://github.com/seznam/IMA.js-core](https://github.com/seznam/IMA.js-core),
while the server can be found at
[https://github.com/seznam/IMA.js-server](https://github.com/seznam/IMA.js-server).

## Structure of your IMA.js application

You application resides in the `app` directory, so let's take a closer look at
the contents of the demo "hello world" application:

- `assets` - files that are preprocessed and copied to our built application,
  usually as static resources
  - `less` - Less CSS files defining common rules, overrides, macros, mixins
    and the basic UI layout.
  - `static` - any files that do not need preprocessing (3rd party JS files,
    images, ...)
- `base` - base classes providing default implementation of some of the
  abstract APIs. We can use these to make our lives a little easier in some
  cases.
- `component` - our React components for use in the view. We'll cover those
  in the tutorial.
- `config` - configuration files. You don't need to worry about those right
  now, but feel free to study them.
- `locale` - localization files, providing localized phrases used in our
  application. This directory contains sub-directories for specific languages,
  each named after the
  [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
  two-character language code for the given language.
- `page` - controllers, main views and page-specific Less CSS files for pages
  in our application. Usage of these is configured via routing.
  - `error` - the page shown when the application encounters an error that
    prevents it from working properly.
  - `home` - the index (home) page.
  - `notFound` - the page shown when the user navigates to a page that is not
    defined in our application.

The `assets`, `config` and `locale` directories are expected by the IMA.js
application stack, the remaining directories can be renamed or moved and you
are free to organize your files in any way you like (but you will have to
update the configuration accordingly).

## Configuration

There are several configuration files in your IMA.js application:
- `gulpConfig.js` contains configuration for the gulp tasks we use to build and
  run your application.
- `app/build.js` specifies which JavaScript, JSX, Less CSS and language files
  your application consists of and should be included in your built
  application.
  The file also specifies the 3rd party vendor libraries to link as ES2015
  modules in your application, separated into three groups: common (shared),
  server-side and client-side.
  The file also specifies which 3rd party bundled JavaScript and CSS files are
  to be included in your application.
- `app/environment.js` configures the server-side environment. Note that the
  `dev` and `test` environment configuration automatically inherits values from
  the `prod` environment (except for the `$Language` which has to be configured
  individually).
- `app/main.js` is the bootstrap of your application. You don't need to concern
  yourself with this file usually.
- `app/config/services.js` specifies how the fatal application errors should be
  handled at the client side.
- `app/config/routes.js` configures your router, mapping routes to the
  controllers and views in your application.
- `app/config/settings.js` configures your application and IMA.js services.
  Note that, again, the `dev` and `test` environment configuration
  automatically inherits values from the `prod` environment.
- and finally, the `app/config/bind.js` configures the object container (think
  of it as a more powerful dependency injector) with support for constants,
  managing dependencies of your classes and setting the default implementors of
  interfaces. You can also create aliases for your classes and interfaces using
  the object container.

All of these files are necessary and must remain in their locations.

## Other content

There are several directories we have not mentioned so far:
- `doc` contains the generated documentation of IMA.js and your application.
  The IMA.js relies on [YUI doc](http://yui.github.io/yuidoc/) for
  documentation building, and augments the YUI doc with support for several
  [jsdoc](http://usejsdoc.org/)-specific annotations.
- `build` contains your built application. All files are generated, so any
  changes you make will be automatically discarded once the application is
  rebuilt.
- `node_modules/ima-examples` contains the example IMA.js
  applications for you to study. You can install any of the examples into your
  project skeleton by running the `gulp app:(name of the example)` command.
  (It is recommended to run `gulp app:clean` first to remove any extra files
  that might be left by the previously installed application).
- `server` contains the application server. You will most likely won't have to
  concern yourself with these files, but feel free to study them or modify them
  if the need arises.

## Plugins
Here's a list of plugins maintained by Seznam.cz and other contributors that you can safely use in your app:
- [Abstract analytic](https://github.com/seznam/IMA.js-plugin-analytic)
- [Google analytic](https://github.com/seznam/IMA.js-plugin-analytic-google)
- [3rd party scripts loader](https://github.com/seznam/IMA.js-plugin-script-loader)
- [3rd party styles loader](https://github.com/seznam/IMA.js-plugin-style-loader)
- [REST-API Client](https://github.com/jurca/IMA-plugin-rest-client)
- [XHR](https://github.com/seznam/IMA.js-plugin-xhr) *(This is not a replacement for the fetch API that IMA.js uses by default.)*
- [UI Atoms](https://github.com/seznam/IMA.js-ui-atoms)
- [Extra-props selector](https://github.com/seznam/IMA.js-plugin-select)
- [Self XSS](https://github.com/seznam/IMA.js-plugin-self-xss)
