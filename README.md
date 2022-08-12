23 Apr 2022

## E-commerce App 🎧 🔊 | [Live Link](https://next-e-com.vercel.app)

# Next-Js + Sanity + CSS

## Learning Context:
|No| Context learn by doing this project...                             | 
|--|--------------------------------------------------------------------|
| 1| Dynamic Routing                                                    | 
| 2| File Base Routing                                                  | 
| 3| Folder Structure                                                   | 
| 4| Layout Architecture                                                | 
| 5| Global Vanilla CSS                                                 | 
| 6| `Stripe` for Payment Gateway                                       | 
| 7| Data fetching from `BackEnd`                                       | 
| 8| Connect `Sanity` BackEnd with `Next-Js`                            | 
| 9| `Context API` for globally data sharing...                         | 
|10| Project data flow functional Architecture...                       | 
|11| `react-hot-toast` for displaying notification                      | 
|12| `canvas-confetti` firework animation for success sms               | 
|13| `getStripe` function call, in `SingleTon Pattern` style            | 
|14| Image change at hover state by the help of `onMouseEnter` attribute| 
|15| get`Static`Paths() ==> `SSG` ( statically `pre-render all the paths` )     | 
|16| get`Static`Props() ==> `SSG` ( `pre-render` fetching data at `build time` )| 
|17| get`ServerSide`Props() ==> `SSR` ( fetching data at `each user request` )  |




<br/>

```
yarn --legacy-peer-deps 
```
> run this short command for install packages... <br/>
> that listed inside dependencies { object } based on `package.json` file.


## Yarn | Dependencies...
|No| Package Installs               | Use for...          |
|--|--------------------------------|---------------------|
| 1| yarn add `@babel/core`         | slider              |
| 2| yarn add `@sanity/cli`         | managing Sanity installations, schemas & DB          |
| 3| yarn add `@sanity/client`      | Client for read, create & update data from Sanity.io |
| 4| yarn add `@sanity/image-url`   | Tools to generate image urls from Sanity content     |
| 5| yarn add `@stripe/stripe-js`   | Stripe.js loading utility |
| 6| yarn add `stripe`              | payment gateway     |
| 7| yarn add `react-icons`         | icons at UI         |
| 8| yarn add `react-hot-toast`     | short notification  |
| 9| yarn add `canvas-confetti`     | performant confetti animation in the browser         |
|10| yarn add `next-sanity-image`   | Utility for using responsive image host in Sanity.io |


```
🟨
    src
    ├── components
    |   ├── Cart.jsx
    |   ├── Footer.jsx
    |   ├── FooterBanner.jsx
    |   ├── HeroBanner.jsx
    |   ├── index.js
    |   ├── Layout.jsx
    |   ├── Navbar.jsx
    |   └── Product.jsx
    |
    ├── context
    |   └── StateContext.js     |🌐| Global Data Sharing |🌐|
    |
    ├── lib
    |   ├── client.js           |🟠| Sanity Connection Configuration  |🟠|
    |   ├── getStripe.js        |🟠| getStrip key- SingleTon Pattern  |🟠|
    |   └── utils.js            |🟠| Success animation after purchase |🟠|
    |
    ├── pages
    |   ├── api                 |🟨| BackEnd |🟨|
    |   |   └── stripe.js       |🟨| BackEnd |🟨|
    |   |
    |   ├──product
    |   |  └── [slug].js
    |   |
    |   ├── _app.js
    |   ├── index.js
    |   └── success.jsx
    |
    ├── sanity_ecommerce        |🔶| Headless CMS |🔶|
    |   └── schemas             |🔶| Headless CMS |🔶|
    |       ├── banner.js       |🔶| Headless CMS |🔶|
    |       ├── product.js      |🔶| Headless CMS |🔶|
    |       └── schema.js       |🔶| Headless CMS |🔶|
    |
    └── styles
        └── globals.css
🟨
```

[Sanity JSM](https://www.sanity.io/javascriptmastery2022)

[Success Animation](https://www.kirilv.com/canvas-confetti)

# Project Demo 
<img src='https://i.ibb.co/THnD3Dx/next-js.png' />

Learning by inspired from[.](https://youtu.be/4mOkFXyxfsU)
