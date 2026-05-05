if (!self.define) {
  let s,
    e = {};
  const i = (i, a) => (
    (i = new URL(i + ".js", a).href),
    e[i] ||
      new Promise((e) => {
        if ("document" in self) {
          const s = document.createElement("script");
          (s.src = i), (s.onload = e), document.head.appendChild(s);
        } else (s = i), importScripts(i), e();
      }).then(() => {
        let s = e[i];
        if (!s) throw new Error(`Module ${i} didn’t register its module`);
        return s;
      })
  );
  self.define = (a, n) => {
    const c =
      s ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (e[c]) return;
    let r = {};
    const l = (s) => i(s, c),
      t = { module: { uri: c }, exports: r, require: l };
    e[c] = Promise.all(a.map((s) => t[s] || l(s))).then((s) => (n(...s), r));
  };
}
define(["./workbox-3c9d0171"], function (s) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
      [
        {
          url: "/Pwa-logos/card.png",
          revision: "c59465cf2964b15728e3c3de30251bfa",
        },
        {
          url: "/Pwa-logos/new-icons/manifest-icon-192.maskable.png",
          revision: "e620f3ea76421e60124f4775ed3f1740",
        },
        {
          url: "/Pwa-logos/new-icons/manifest-icon-512.maskable.png",
          revision: "e620f3ea76421e60124f4775ed3f1740",
        },
        {
          url: "/_next/static/X73o8ObElnYTWXymh7iY-/_buildManifest.js",
          revision: "4047bbd5f0be4ac5c7eeae1e31a36e1f",
        },
        {
          url: "/_next/static/X73o8ObElnYTWXymh7iY-/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/0b0944fb-8e338f9f8cad9fa1.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/109-d89a81a7cb5263ba.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/146-8530ef38c5671b3d.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/16a011e1-700c89045d1e67ae.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/1727213d-f4d5b068a1655af0.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/181-69c08a3fd238b81b.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/192-a6a2ed78022df428.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/1d1a025a-611dcba6e7aa8842.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/215-52f92bd1dbde0aa4.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/399-114dbe0a7e58323c.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/519-e19a589dbd5573da.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/564-fc578d6b054ab2b6.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/655-19b0d5a7a3ae7866.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/6661209f-b6d9a91a2ead87c8.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/753-b97929142762eab6.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/771-13dca9f25a590348.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/77b0f844-4748bab6b5e1eab1.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/799-8ed431e744fa9827.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/863-83b7138274ef69b6.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/8c0f1391-96ec5981da106837.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/911-d120815de248078b.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/941-b2a8cf87d39fffb1.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/98ac4a98-c10d92033b58d4dc.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/a3ca2b5c-8be1df0e2d1af7bc.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-498c8d1581ad83a1.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/api/contact/route-2f11607e924dfe33.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/components/about/page-d050da831c2cbc47.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/components/certifications/page-8ab6851607e3bdcc.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/components/education/page-42a6f88e64d376dd.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/components/experience/page-3cdb8af937ed25e8.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/components/hero-section/page-624b44ef352e74c5.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/components/skills/page-57819755b33fefff.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/layout-54d5598b21665a1f.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/page-dc9cb051edc43e39.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/projects/%5Bid%5D/page-2c33af5e7fd0f766.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/app/projects/page-2b402c44982d9394.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/d5b5b10f-37cdf2e44fe53d73.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/ed4d8db7-52921f53efab3637.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/framework-b9249f7c37b35cb8.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/main-app-c44a073280413e7f.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/main-f939c149825e2d8d.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/pages/_app-01e71b693ddee785.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/pages/_error-a874df12d2a6ac3d.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-e9d269f9e9a54a5e.js",
          revision: "X73o8ObElnYTWXymh7iY-",
        },
        {
          url: "/_next/static/css/2541febea3b3b99e.css",
          revision: "2541febea3b3b99e",
        },
        {
          url: "/_next/static/css/de27f1c1334c3538.css",
          revision: "de27f1c1334c3538",
        },
        {
          url: "/_next/static/media/4473ecc91f70f139-s.p.woff",
          revision: "78e6fc13ea317b55ab0bd6dc4849c110",
        },
        {
          url: "/_next/static/media/463dafcda517f24f-s.p.woff",
          revision: "cbeb6d2d96eaa268b4b5beb0b46d9632",
        },
        {
          url: "/_next/static/media/logo.42917f0c.svg",
          revision: "391921d81dc621c10edfc9f940648ff5",
        },
        {
          url: "/assets/projects/buysmart/buysmart-analysis.png",
          revision: "abf60ec4389761ae039f7b424ed33740",
        },
        {
          url: "/assets/projects/buysmart/buysmart-architecture.png",
          revision: "32d58ff9f2c4b8f64ba9d2da3828595b",
        },
        {
          url: "/assets/projects/buysmart/buysmart-dashboard.png",
          revision: "5388ced81b9664ab01e9ec5e2e03318d",
        },
        {
          url: "/assets/projects/buysmart/buysmart-overview.png",
          revision: "db387c63ffdd471da9b722ed8bd318d2",
        },
        {
          url: "/assets/projects/buysmart/buysmart-search.png",
          revision: "998d599a4b0e61574bcda15707120eed",
        },
        {
          url: "/assets/projects/buysmart/buysmart-wishlist.png",
          revision: "b49c1e24639d934c88be5b83cf76704d",
        },
        {
          url: "/assets/projects/inventrack/inventrack-analytics.png",
          revision: "55c63ec7ae6639cd92bcc72f57c64b27",
        },
        {
          url: "/assets/projects/inventrack/inventrack-auth.png",
          revision: "e6f5d8117a5d1a557c492d206ed4d53a",
        },
        {
          url: "/assets/projects/inventrack/inventrack-barcode.png",
          revision: "4ce59220bff3ce1e30c0a02c0093c6a1",
        },
        {
          url: "/assets/projects/inventrack/inventrack-dashboard.png",
          revision: "142c79601bf17c330703914abf5669d2",
        },
        {
          url: "/assets/projects/inventrack/inventrack-invoice.png",
          revision: "df69ca99ed2c0fb3037e64cfd0a9bba2",
        },
        {
          url: "/assets/projects/inventrack/inventrack-products.png",
          revision: "f0a835514f1115424433dfd6664c8b3f",
        },
        {
          url: "/assets/projects/tips/tips-architecture-v2.png",
          revision: "afff038ced4bbb0f0ca1eda1cd29c7b2",
        },
        { url: "/logo.svg", revision: "391921d81dc621c10edfc9f940648ff5" },
        {
          url: "/lottie/build.json",
          revision: "a6ddf6e22242cad2ca6085b24d1c277f",
        },
        {
          url: "/lottie/code.json",
          revision: "ae769dfb5eafc645619f9279761e43ad",
        },
        {
          url: "/lottie/coding.json",
          revision: "9780a8f715b9a3accc2d2399551e0a44",
        },
        {
          url: "/lottie/contact.json",
          revision: "2d74c8213b82654fba5362749e289739",
        },
        {
          url: "/lottie/development.json",
          revision: "31f75da79676027a6a6384b4e7562eaf",
        },
        {
          url: "/lottie/education.json",
          revision: "13c1078ac32e1572de723b853d6d59ad",
        },
        {
          url: "/lottie/js.json",
          revision: "ad2ffff084c35a1ef8212677c89dbc34",
        },
        {
          url: "/lottie/lotti.json",
          revision: "c1bdff0f692923acf7c8301d5deac9fd",
        },
        {
          url: "/lottie/study.json",
          revision: "5e985e66436f52e7e9107e59bac9f127",
        },
        {
          url: "/placeholder/placeholder.png",
          revision: "c83aa10e488792c4e2e77a46ed396914",
        },
        { url: "/profile.jpg", revision: "613a67f42b2981660ca3d116e49ab72d" },
        {
          url: "/projects/gitstore/gitstore-main.png",
          revision: "a939a61158d2d3f8e4afff7ede0d8631",
        },
        {
          url: "/projects/surveysense/surveysense-analytics.png",
          revision: "97df59c5b77cb3ab2becf69fc431add2",
        },
        {
          url: "/projects/surveysense/surveysense-charts.png",
          revision: "99f8688db3931429deb6b3d48e010b83",
        },
        {
          url: "/projects/surveysense/surveysense-generator.png",
          revision: "37422fb890b74fa9bfabdec1085b00b3",
        },
        {
          url: "/projects/surveysense/surveysense-main.png",
          revision: "ddc57bb43f26cbf7593e4b529a131622",
        },
        {
          url: "/projects/surveysense/surveysense-overview.png",
          revision: "f773d2be43b0edcdb385082c75ef7ff7",
        },
        {
          url: "/projects/surveysense/surveysense-survey.png",
          revision: "c86f9ab7ca81812f15c6c39bdb812cd7",
        },
        {
          url: "/projects/tips/tips-analysis.png",
          revision: "8dc8df7654a1d72c46d914f14ed28810",
        },
        {
          url: "/projects/tips/tips-dashboard.png",
          revision: "0ff852911ea347d5a225faca55bae356",
        },
        {
          url: "/projects/tips/tips-overview.png",
          revision: "866c76ae1490a408f31fca9894f2c590",
        },
        {
          url: "/projects/tips/tips-qa.png",
          revision: "141af1c08c892d34e272766f81752585",
        },
        {
          url: "/projects/tips/tips-timeline.png",
          revision: "658944bd575441c71fdee0f24fe993ae",
        },
        {
          url: "/svg/common/blur-23.svg",
          revision: "a75aa61e5a246b6d47b0004a9d27309b",
        },
        {
          url: "/svg/common/grid.svg",
          revision: "4059253fedf8e205d870303d6129d239",
        },
        {
          url: "/svg/common/hero.svg",
          revision: "d33b61b8bd3f0dcce3b67c27f1273467",
        },
        {
          url: "/svg/common/section.svg",
          revision: "1118180cd02e6fd6a9804f27e92a5baf",
        },
        {
          url: "/svg/skills/adobe-xd.svg",
          revision: "0ee1cc5928c8db3e85c65e51e6525d6e",
        },
        {
          url: "/svg/skills/adobeaudition.svg",
          revision: "58f3d81d8e9264fc8df8cfde4cf58af1",
        },
        {
          url: "/svg/skills/after-effects.svg",
          revision: "241dc01a0aff9c60da913f5b6a65d0e4",
        },
        {
          url: "/svg/skills/angular.svg",
          revision: "7696d862bb70908392a79df5230ec110",
        },
        {
          url: "/svg/skills/aws.svg",
          revision: "b7f09ee2045ad700ccba4102f2e4155e",
        },
        {
          url: "/svg/skills/azure.svg",
          revision: "f548d3f1cd3e4faf1f0b7099db1a4907",
        },
        {
          url: "/svg/skills/blender.svg",
          revision: "8b61b044e68e4a0e7c0b94654d4ae793",
        },
        {
          url: "/svg/skills/bootstrap.svg",
          revision: "53b32f2e7321dcaa2a27c637c6e36b82",
        },
        {
          url: "/svg/skills/bulma.svg",
          revision: "346e11a0bddfc1b06c07cc1596186d1c",
        },
        {
          url: "/svg/skills/c.svg",
          revision: "e85538a5f40888dcbc932f14f03ae3aa",
        },
        {
          url: "/svg/skills/canva.svg",
          revision: "b8f13636be472787575c9a38a40d1c2a",
        },
        {
          url: "/svg/skills/capacitorjs.svg",
          revision: "f406481aac55baee3cb09d8a858cd8c2",
        },
        {
          url: "/svg/skills/coffeescript.svg",
          revision: "188980bfae79e5e6115b2eb00ea97322",
        },
        {
          url: "/svg/skills/cplusplus.svg",
          revision: "f525a103eda91528ace5248914305d93",
        },
        {
          url: "/svg/skills/csharp.svg",
          revision: "eaa9632e78db110e155c571e7bcd3742",
        },
        {
          url: "/svg/skills/css.svg",
          revision: "989a735cec29082b067dc389ea2da68a",
        },
        {
          url: "/svg/skills/dart.svg",
          revision: "6775917ea12c014f2459559b962b7dab",
        },
        {
          url: "/svg/skills/deno.svg",
          revision: "4b150ace63ac1e340780402489c9f53f",
        },
        {
          url: "/svg/skills/django.svg",
          revision: "8c0e0365dbe471cb772c4d96eceda8a6",
        },
        {
          url: "/svg/skills/docker.svg",
          revision: "7e6ccb94a73afd23c3960aef7e296210",
        },
        {
          url: "/svg/skills/fastify.svg",
          revision: "fb59f648c047ed2b322c28c951445dd4",
        },
        {
          url: "/svg/skills/figma.svg",
          revision: "8e60c911c41bc8c6166ddb414532893d",
        },
        {
          url: "/svg/skills/firebase.svg",
          revision: "704986854726d329449f30664550f986",
        },
        {
          url: "/svg/skills/flutter.svg",
          revision: "9ca247cd652b40ff125ee3c0a7657992",
        },
        {
          url: "/svg/skills/gcp.svg",
          revision: "d2115a79cde7279b8d1769f76ec14e89",
        },
        {
          url: "/svg/skills/gimp.svg",
          revision: "f9df1ce5d3cbb84b2a5abd3a9a29960a",
        },
        {
          url: "/svg/skills/git.svg",
          revision: "e6b832b0c31b469c8fcdfd4f2c4f1d3b",
        },
        {
          url: "/svg/skills/go.svg",
          revision: "adc194341db39b5cbaf53da38122de45",
        },
        {
          url: "/svg/skills/graphql.svg",
          revision: "b6b6c04bcc0e9f73b357dcd6036822a0",
        },
        {
          url: "/svg/skills/haxe.svg",
          revision: "8b08228c47e3c6a081f4bba19007e8c4",
        },
        {
          url: "/svg/skills/html.svg",
          revision: "68aab8d074270f9ee0a7e385519d98fa",
        },
        {
          url: "/svg/skills/illustrator.svg",
          revision: "6deb63cde26eab996119f0e442984c1c",
        },
        {
          url: "/svg/skills/ionic.svg",
          revision: "fede5c3abee4ba5015901a255e53b443",
        },
        {
          url: "/svg/skills/java.svg",
          revision: "dd071c0b9452691dffc27aae39ce7d80",
        },
        {
          url: "/svg/skills/javascript.svg",
          revision: "46524a43caf30828c17e38ec573dc5a3",
        },
        {
          url: "/svg/skills/julia.svg",
          revision: "5a1447e927d55aac27779dfb4c155d43",
        },
        {
          url: "/svg/skills/kotlin.svg",
          revision: "4ca0bb1e4556fd0f62cc6842d9520969",
        },
        {
          url: "/svg/skills/lightroom.svg",
          revision: "4a62a1bd9ed87f1e3b0352894eeda281",
        },
        {
          url: "/svg/skills/markdown.svg",
          revision: "2c92d1b98fd7db382f1232823118537d",
        },
        {
          url: "/svg/skills/materialui.svg",
          revision: "16e051373d0089014e66365b82a9380f",
        },
        {
          url: "/svg/skills/matlab.svg",
          revision: "d9f74f0a1b6fe9575b438de61755b9ea",
        },
        {
          url: "/svg/skills/memsql.svg",
          revision: "e4a5e511e3d7bcb57b8390a2fc0d376c",
        },
        {
          url: "/svg/skills/microsoftoffice.svg",
          revision: "733d1a4387ba008f27e784bde2c9b2e4",
        },
        {
          url: "/svg/skills/mongoDB.svg",
          revision: "e7d230b7ad2cb1744a781ad63b10487f",
        },
        {
          url: "/svg/skills/mysql.svg",
          revision: "2cf2fd30658ed833e714cf1fd682d120",
        },
        {
          url: "/svg/skills/nextJS.svg",
          revision: "b9159e822528599d52e216907227a0bd",
        },
        {
          url: "/svg/skills/nginx.svg",
          revision: "3868dbe51aafc3df8a240d58fe8fb392",
        },
        {
          url: "/svg/skills/numpy.svg",
          revision: "961f7a1bd730836151b5687a91a3fe1c",
        },
        {
          url: "/svg/skills/nuxtJS.svg",
          revision: "59fdf8e11c4231ac9353be8aa2d0fef3",
        },
        {
          url: "/svg/skills/opencv.svg",
          revision: "b18a26d418342b335ac5129a45fa9129",
        },
        {
          url: "/svg/skills/photoshop.svg",
          revision: "dda9f7b1ca28d3d3e0ee20eff198bbef",
        },
        {
          url: "/svg/skills/php.svg",
          revision: "a6ce9f3d438bd4a39e9acae56eeb30b8",
        },
        {
          url: "/svg/skills/picsart.svg",
          revision: "467f568a277aa3b2c7751e51a6fe7376",
        },
        {
          url: "/svg/skills/postgresql.svg",
          revision: "58ecff980609fade0b1cb5f8ded6cef3",
        },
        {
          url: "/svg/skills/premierepro.svg",
          revision: "78b22e7158a93a28eb2b7d0ab5e331e0",
        },
        {
          url: "/svg/skills/python.svg",
          revision: "bcf6930fc92ab953201424bb0908e456",
        },
        {
          url: "/svg/skills/pytorch.svg",
          revision: "5f2b7688dfcf98a41922dc5f6b74ffba",
        },
        {
          url: "/svg/skills/react.svg",
          revision: "7be113a51aa59fbe2be7ac966109e3de",
        },
        {
          url: "/svg/skills/ruby.svg",
          revision: "ab4f7ad7c6790993a00c5b6f9994c145",
        },
        {
          url: "/svg/skills/selenium.svg",
          revision: "db9de5c67343d81db7ffedcf7618954c",
        },
        {
          url: "/svg/skills/sketch.svg",
          revision: "6129bbaf3c61e1bbb7e5ec033591992b",
        },
        {
          url: "/svg/skills/sqlite.svg",
          revision: "23bf430b6b73e93205d7f72d9e125cef",
        },
        {
          url: "/svg/skills/strapi.svg",
          revision: "c2c413f2e00734611ef38826c533ee1f",
        },
        {
          url: "/svg/skills/svelte.svg",
          revision: "6275bb59e5ee52a6652185d7ea84ee3d",
        },
        {
          url: "/svg/skills/swift.svg",
          revision: "24e1c0382e569faf2ca47fa1c802a180",
        },
        {
          url: "/svg/skills/tailwind.svg",
          revision: "b6952af50c6e4db78abefc8d9a529a8b",
        },
        {
          url: "/svg/skills/tensorflow.svg",
          revision: "e9e391585abd9c372c20c8b9b5bb08d9",
        },
        {
          url: "/svg/skills/typescript.svg",
          revision: "8854b02a490d214fb564211c1cf531e2",
        },
        {
          url: "/svg/skills/unity.svg",
          revision: "639e923cdca2c22431b25cb42f975345",
        },
        {
          url: "/svg/skills/vitejs.svg",
          revision: "64d68c9e11c592778203b486575d6e8d",
        },
        {
          url: "/svg/skills/vue.svg",
          revision: "940fb2b1181eaac0546c5270ff383212",
        },
        {
          url: "/svg/skills/vuetifyjs.svg",
          revision: "0fa842cba4f33f0851827e7937150239",
        },
        {
          url: "/svg/skills/webix.svg",
          revision: "8014b75ee0ced9b136ffb1b59e093c71",
        },
        {
          url: "/svg/skills/wolframalpha.svg",
          revision: "ac304980b06315ed7b541d6e22cd5054",
        },
        {
          url: "/svg/skills/wordpress.svg",
          revision: "199652e448e77f58952b655a74b42956",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      "/",
      new s.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: s }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new s.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new s.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /\/_next\/static.+\.js$/i,
      new s.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new s.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new s.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /\.(?:mp4|webm)$/i,
      new s.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /\.(?:js)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /\.(?:css|less)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new s.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new s.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      ({ sameOrigin: s, url: { pathname: e } }) =>
        !(!s || e.startsWith("/api/auth/callback") || !e.startsWith("/api/")),
      new s.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      ({ request: s, url: { pathname: e }, sameOrigin: i }) =>
        "1" === s.headers.get("RSC") &&
        "1" === s.headers.get("Next-Router-Prefetch") &&
        i &&
        !e.startsWith("/api/"),
      new s.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      ({ request: s, url: { pathname: e }, sameOrigin: i }) =>
        "1" === s.headers.get("RSC") && i && !e.startsWith("/api/"),
      new s.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      ({ url: { pathname: s }, sameOrigin: e }) => e && !s.startsWith("/api/"),
      new s.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      ({ sameOrigin: s }) => !s,
      new s.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
