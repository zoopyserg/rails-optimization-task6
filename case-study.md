# Case Study

1. Launching the app (it was an old Rails 5 app, so I had to do some steps to launch it)
2. Adding webpack-bundle-analyzer to see how heavy the front end is.
   It's tricky. Some permissions errors. Resolving.
   Installed.
3. Configured webpack-bundle-analyzer.
4. Ran the analyzer using `sudo docker compose run --rm webpacker` command.
5. Copied the report using `sudo docker cp $(sudo docker compose ps -q web):/app/public/packs/bundle-report.html .` command.
6. Opened the report in the browser.
   ![image](https://github.com/zoopyserg/rails-optimization-task6/assets/1587149/28c6345a-7f47-4ce5-9f4e-da5ef487e63a)
7. I visually confirm that (as per task) moment.js is a big part of vendor.js.
8. Comment contents of `app/javascript/packs/proCharts.js` (suggested fix)
9. Confirm that the size of vendor.js has decreased:
   ![image](https://github.com/zoopyserg/rails-optimization-task6/assets/1587149/048461f0-9333-4c0e-a471-7ffff3b56bf4)
10. Find where moment.js is used. And use it only there.
    Found that moment.js is using internally only in node modules.
    Found that charts are used only in app/views/dashboards/pro.html.erb
11. In the `config/webpack/environment.js` I find a construct that includes proCharts.js into a newly created vendor.js.
12. Excluding Chart.js and all moment-related JS from vendor.js.
    ![image](https://github.com/zoopyserg/rails-optimization-task6/assets/1587149/3e9fd23f-5c9b-4b3f-b5c0-77a427879ac4)
13. Making sure charts are loaded only on dashboards/pro.html.erb page.

14. Installing ngrok from https://dashboard.ngrok.com/get-started/setup/linux
15. Running ngrok: `ngrok http http://localhost:3000`
16. Creating a CI configuration for Github Actions.
    Long debugging session.
    I couldn't run the web in CI in docker (because of memory limits).
    Then I had troubles compiling assets.
    Then I had to set up the database.
    Setting up ngrok tests with sitespeed.io.
    Many hours later after a lot of trial and error my CI started working.

    Task completed.

# Lecture notes

## Why

Front end optimization
Be fullstack. So that later you can become an architect and a decision maker.
Learn how APIs work.
Make stats what users actually input. You can optimize for that. This is only possible with complex vision (as a fullstack developer).

Speed up deploy.
And mostly the deploys are slow because assets take long to precompile.

Speed up server page rendering.
Speed up SPAs.

So fullstack can answer questions whhich just back or just front can't.

TODO (!): Front end performance checklist from Vitaly Friedman (62 items)
Today's lecture is just a part of his checklist.

## Front End Metrics:

- Count of requests
- Size of requests
- Rule based metrics (e.g. Google PageSpeed)
- Time to first conversion
- Synthetic metrics (e.g. WebPageTest)
- Real User Metrics (e.g. Google Analytics)

CRUX - Chrome User Experience Report
Chrome Lighthouse (Audit tab)
PWMetrics
Pagespeed Insights
Measure conversion using A/B testing
ThinkWithGoogle (monitary calculator, comparison with competitors, etc)
New Relic Browser RUM (Real User Monitoring)
Lighthouse Keeper (for continuous monitoring)
SpeedCurve (for continuous monitoring + post deploy monitoring)
Calibre (for continuous monitoring)

## Monitoring

Sitespeed.io (InfluxDB, Grafana) - unites all the tools above + setting budgets for CI (Github, Travis), etc.
WebPageReplay (for testing on real devices)
Sizelimit Machinery (for setting budgets for CI)

## Optimization

- Try using 2G on your website (2G tuesdays) - use Throttling (in Chrome, in OS, etc)
- JS is the most expensive part of web
- Time to interactive
- Sublime has plugin to see js import cost
- Devtools coverage (shows which JS you use from all JS you download)
- Bundle Analyzer (Webpack plugin) - great visual tool for seeing sizes of imported js files

### Solutions:

- Code splitting
- Lazy loading
- Give only necessary js for each page
- Weight minimization
- Reducing time to interactive
- Optimize time to conversion

### Service Workers

- Non-blocking
- Can handle requests
- Can cache requests
- Works onlly on HTTPS

### Critical CSS

- Load only CSS that is required for drawing what fits in the initial screen (14kb - 1 TCP round trip). The rest can be loaded later.
- UnCSS, PurgeCSS can help finding unused CSS
- Give different CSS for every network (for 2G, for 3G, for different phones, etc)
- Styled components (Like in React or Vue CSS can be written inside the JS component)

## Images Optimization

- Website Speed Test has image analysis - the compression tips etc
- Webp images can be generated based on pngs and jpgs and given by nginx
- Also have budgets

## Fonts Optimization

- Defeat FOIT (Flash of Invisible Text) and FOUT (Flash of Unstyled Text)
- Use Webfonts only when necessary
- Minimize sizes
- Measure Speed Index (WebPageTest)
- Measyre Last Painted Hero (WebPageTest)
- Measure time of rendering main text

## Load Order

- Load HTML
- Parse HTML
- Load a resource async (image, etc)
- Load JS syncronously (stop, load, continue) - solved by preloader, async directives, defer directives, etc (best one is async)
- CSS in head blocks rendering (solutions: critical CSS, rest of CSS later - preload, cssload, body, js components, etc)

## Resource hints

- DNS Prefetch <link rel="dns-prefetch" href="https://example.com">
- Preconnect <link rel="preconnect" href="https://example.com"> - trims DNS, TCP etc for each domain.
- Prefetch <link rel="prefetch" href="https://example.com/image.jpg"> - fetches resource in background
- Prerender (AMP) <link rel="prerender" href="https://example.com"> - fetches resource in background and renders it

### TLDR: Instant load is better than waiting.

## Other courses:

- Udacity: Website Performance Optimization
- JS Loading Priorities (how to do preload, defer, where to put them, etc)
