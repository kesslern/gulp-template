# gulp-template

A basic gulp template. Easily extended. Enough for simple apps

## Features

* Automatic browser reload when resources change
* SCSS support
* Automatic injection of SCSS and JS resources into index.html
* Loads vendor resources before user resources

## Gulp tasks

1. clean - removes build directory
2. serve - compile project and watch for changes
3. user-resources - compile user resources, includes:
    1. user-scss - compile user SCSS to build directory
    2. user-js - compile user JS to build directory
4. vendor-resources - copy vendor resources, includes:
    1. vendor-css - copy vendor CSS to build directory
    2. vendor-js- copy vendor JS to build directory
5. inject - injects references to all user and vendor resources into index.html

## License

ISC License (ISC)

Copyright (c) 2016, Nathan Kessler

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
