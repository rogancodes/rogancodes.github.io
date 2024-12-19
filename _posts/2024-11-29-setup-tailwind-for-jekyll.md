---
layout: post
title:  "Setup Tailwind CSS for Jekyll"
tags: Tailwind Jekyll
---

### 1. Start a New Jekyll Project

First, install Jekyll and create a new blank project
{% highlight bash %}
gem install jekyll

jekyll new blog --blank
{% endhighlight %}

### 2. Clean Up Default Files

Remove the `_sass` folder and the `main.scss` file from the `assets/css` directory to prepare for Tailwind CSS.

### 3. Initialize a Node.js Project

Run the following command to initialize a Node.js project in your Jekyll project folder
{% highlight bash %}
npm init
{% endhighlight %}

### 4. Add Tailwind CSS to the Project

Install Tailwind CSS and create its configuration file

{% highlight bash %}
yarn add tailwindcss

npx tailwindcss init # creates tailwindcss config file
{% endhighlight %}


### 5. Configure Tailwind Paths

In the generated `tailwind.config.js` file, specify the paths to your Jekyll project's files where Tailwind classes will be used. Here's an example configuration

{% highlight javascript %}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_site/**/*.html", // Jekyll output files
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./*.md",
    "./**/.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
  ],
}
{% endhighlight %}

### 6. Create a Tailwind CSS File

In the `assets/css` directory, create a new file named `tailwind.css` and include the following lines:

{% highlight css %}
@tailwind base;
@tailwind components;
@tailwind utilities;
{% endhighlight %}

### 7. Add a Build Script

Open your `package.json` file and add the following script under the scripts section to compile and minify Tailwind CSS

{% highlight json %}
"build:css": "npx tailwindcss -i ./assets/css/tailwind.css -o ./assets/css/main.css --watch --minify"
{% endhighlight %}

### 8. Start the Development Server with Tailwind CSS Build Script

Open two terminal windows and run each command in a separate terminal.

{% highlight bash %}
# Start the Jekyll Server in Watch Mode
jekyll serve --watch

# compiles the tailwind.css file into main.css and watches for changes
npm run build:css
{% endhighlight %}

### 9. (Optional) Setup Tailwind CSS Typography plugin

Tailwind Typography plugin is useful if you plan to write your posts in Markdown format.

{% highlight bash %}
# Install the tailwind typography plugin
yarn add @tailwindcss/typography
{% endhighlight %}

{% highlight javascript %}
// Then add the plugin to your tailwind.config.js file:

module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
{% endhighlight %}

Add the following HTML content inside the layout you are using for posts.

{% highlight html %}
<div class="prose">
  {% raw %} {{ content }} {% endraw %}
</div>
{% endhighlight %}

For more details on typography, [Tailwind Typography repository](https://github.com/tailwindlabs/tailwindcss-typography).
