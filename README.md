# Warsaw Apartment prices


### Data
Scraped from gumtree.com using scraper set up on Raspberry Pi.
Started scraping in January 2021, crawler is loading new data every hour since then.

---

## Run the website locally

This project uses Node.js and python 3.

- Node.js version >= 12.13.0 or above (which can be checked by running node -v).
- Yarn version >= 1.5 (which can be checked by running yarn --version).

### Installation

To install required Node packages:

```console
yarn install
```

To install required python packages:

- The only package required is `openCC`, which can be installed via

  ```console
  pip install opencc
  ```

- Alternatively, you can install from Pipfile (with `pipenv`, **python 3.9** used):

  ```console
  pipenv install
  ```

## Build and serve

Build the website:

```console
yarn build
```

This command generates static content into the `build` directory, which usually takes a few minutes (5-10 min.).

You can then serve build locally by running:

```console
yarn serve
```

## NVM, Node.js

[installing nvm](https://tecadmin.net/install-nvm-macos-with-homebrew/)
