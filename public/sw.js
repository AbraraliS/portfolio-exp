if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + ".js", i).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, r) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[c]) return;
    let n = {};
    const t = (e) => a(e, c),
      o = { module: { uri: c }, exports: n, require: t };
    s[c] = Promise.all(i.map((e) => o[e] || t(e))).then((e) => (r(...e), n));
  };
}
define(["./workbox-f1770938"], function (e) {
  "use strict";
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/Pwa-logos/card-mobile.png",
          revision: "1448ebc942d91e201cc27a36e2a3d3af",
        },
        {
          url: "/Pwa-logos/card.png",
          revision: "d7f8bbcde5d6292b10172410c8b02382",
        },
        {
          url: "/Pwa-logos/new-icons/manifest-icon-192.maskable.png",
          revision: "c3075967ba9bbacf76500d2f4c690c66",
        },
        {
          url: "/Pwa-logos/new-icons/manifest-icon-512.maskable.png",
          revision: "28b70244abc3048a4ba072a085e661f7",
        },
        {
          url: "/_next/static/BXsDaSAVU_1XF2xpi0Bsc/_buildManifest.js",
          revision: "a7722c58472051aae130714d104bcfca",
        },
        {
          url: "/_next/static/BXsDaSAVU_1XF2xpi0Bsc/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/125-4716c1d418120a39.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/173-83818c8b39c951d3.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",
          revision: "2b4c1ee4fbe3a7cf",
        },
        {
          url: "/_next/static/chunks/218.d8ec56f1948566fd.js",
          revision: "d8ec56f1948566fd",
        },
        {
          url: "/_next/static/chunks/455-cb52452f058d84d6.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/4bd1b696-f694dce5afea0dbb.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/546-ea17d50c93f91baf.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/719.1e54262ee97d014d.js",
          revision: "1e54262ee97d014d",
        },
        {
          url: "/_next/static/chunks/970-246733d244944b9d.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-4901dac67fdaac78.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/about/page-26f96481c7689095.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/api/contact/route-669d90d481f55f3c.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/blog/%5Bslug%5D/page-1b9549ac69b40400.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/blog/page-6b7cbcb33656b573.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/contact/page-35b50af6b3fe835f.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/layout-2741d0e9393eb7c2.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/not-found-77bbe964144d6d42.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/page-04565c2af73b1b40.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/privacy/page-f5ed7d6797d12472.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/projects/%5Bid%5D/page-2ba9cfd5f46a9377.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/projects/page-f31f5222b26bfd10.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/app/template-ef1c418165c0084d.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/framework-d29117d969504448.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/main-8447b526b8a49ddb.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/main-app-eb0549cfe53aafd9.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/pages/_app-60989c630625b0d6.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/pages/_error-8a20a8cc0e244b4c.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-36565ecba5550efa.js",
          revision: "BXsDaSAVU_1XF2xpi0Bsc",
        },
        {
          url: "/_next/static/css/e160ef025d9c7b02.css",
          revision: "e160ef025d9c7b02",
        },
        {
          url: "/_next/static/media/313510e2713fb214-s.p.woff2",
          revision: "a6b899943e3136839ebb13d6d6263222",
        },
        {
          url: "/_next/static/media/35293e8ee31d230c-s.woff2",
          revision: "7fbd372fea3230cd64b19201e238ef5e",
        },
        {
          url: "/_next/static/media/851c4691abdf3def-s.woff2",
          revision: "7814274b600c9a4c2f4306d46ff80cec",
        },
        {
          url: "/_next/static/media/a6c19694cd327cd4-s.woff2",
          revision: "679c8ae97dcfaa700a3f86f0bfc15950",
        },
        {
          url: "/_next/static/media/a8a8dd7277bab4cf-s.woff2",
          revision: "a3a0917757d798b305df43be49bbc1c1",
        },
        {
          url: "/_next/static/media/c9afb02ae38ed40c-s.woff2",
          revision: "0298fffa619b9bc4b10846040652e3c1",
        },
        {
          url: "/_next/static/media/d4c34a86ae43ab6e-s.p.woff2",
          revision: "52bd5e699da730301121f89560b2c81e",
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
          url: "/assets/projects/buysmart/buysmart-main-poster.png",
          revision: "f67cbf199a541dbb35a56ffdb83d23c1",
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
        {
          url: "/assets/projects/tips/tips-main-poster.png",
          revision: "a184f9e3fc4d049f06409709f3050d90",
        },
        {
          url: "/blog/og/designing-an-upload-pipeline-around-github-limits.png",
          revision: "60f716ee4850f08094f27542cbc33f2f",
        },
        {
          url: "/blog/og/lessons-from-shipping-llm-features.png",
          revision: "b96c3e1d08798d3b2da3a58c81f789be",
        },
        {
          url: "/blog/og/one-service-or-three-texora-and-buysmart-architecture.png",
          revision: "69dfae546bda39391e146fe406a6b740",
        },
        {
          url: "/blog/og/performance-and-seo-for-a-nextjs-portfolio.png",
          revision: "dcb18304d00bb28d05bd9a01ceefb0ca",
        },
        {
          url: "/blog/og/responsive-design-beyond-breakpoints.png",
          revision: "2e70eeae75f1673534d2136fe0e5c6ab",
        },
        { url: "/logo.png", revision: "a797b3505f7eea13d58277a92c4b1345" },
        {
          url: "/lottie/build.json",
          revision: "7f35591080c60b039576187683de32e3",
        },
        {
          url: "/lottie/code.json",
          revision: "cee313c8dea1e2ba5e82309d0209294f",
        },
        {
          url: "/lottie/coding.json",
          revision: "0649d95a6ec7f0dccfde0c48dd7662c1",
        },
        {
          url: "/lottie/contact.json",
          revision: "2d1bcce2fdc8035225cc961b42d77702",
        },
        {
          url: "/lottie/development.json",
          revision: "582c52ec2d8176476aa539d942d100a4",
        },
        {
          url: "/lottie/education.json",
          revision: "970c2d83617e2a69a10f853a8420b19e",
        },
        {
          url: "/lottie/js.json",
          revision: "183cef149aacbf5f127079633100b52a",
        },
        {
          url: "/lottie/lotti.json",
          revision: "3647405daf90aadd70e003ce51ae236a",
        },
        {
          url: "/lottie/study.json",
          revision: "c7f0f0aab6a33d8e8d0edf89e3b3c076",
        },
        { url: "/og.png", revision: "0d4eff87e09dc0dd0e049568fed97157" },
        {
          url: "/placeholder/placeholder.png",
          revision: "c83aa10e488792c4e2e77a46ed396914",
        },
        {
          url: "/profile-portrait.webp",
          revision: "241a2e7708b96042a4220b52bed4cf01",
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
          url: "/projects/texora/marketing/01-Home-page.png",
          revision: "1293727af0d9adb0155e4f25b84f2981",
        },
        {
          url: "/projects/texora/marketing/02-Order_Management.png",
          revision: "246f4aad46fa08c2683cf4313c160d51",
        },
        {
          url: "/projects/texora/marketing/02.png",
          revision: "7821d6fc1ab09d3e47bfbc589b767e09",
        },
        {
          url: "/projects/texora/marketing/04-supplyer-directory.png",
          revision: "6b74e559b4a4fca810ddbae480e69c0d",
        },
        {
          url: "/projects/texora/marketing/05-product-details.png",
          revision: "420b9f3345f34c311cdf7f4085bf29bc",
        },
        {
          url: "/projects/texora/marketing/06-request-page.png",
          revision: "d133fcaa783d518da5bd297977555fbd",
        },
        {
          url: "/projects/texora/marketing/07-samples.png",
          revision: "cf7db9310860566ba12858ba9b185b99",
        },
        {
          url: "/projects/texora/marketing/08-supplyer-dashboard.png",
          revision: "f84fd8965d30bc985e76eb34b1cb7767",
        },
        {
          url: "/projects/texora/marketing/09-order-tacking.png",
          revision: "34323d058b5acf8fc7c2d994586bce6c",
        },
        {
          url: "/projects/texora/marketing/10-mobile.png",
          revision: "59398111ce899dc03da5704f03b6a229",
        },
        {
          url: "/projects/texora/marketing/11-admin.png",
          revision: "7be89b9027dd5400c2b3a5fd133f3985",
        },
        {
          url: "/projects/texora/marketing/12-Finale.png",
          revision: "bdd1ffedf1df1fd9f5744ef7fef48b0c",
        },
        {
          url: "/projects/texora/marketing/texora-poster.png",
          revision: "f2e7810634f2eb2a90f7d102b79432ac",
        },
        {
          url: "/projects/texora/texora-assistant.png",
          revision: "70f27e193f2a2a43aa9ef219e314e5b3",
        },
        {
          url: "/projects/texora/texora-home.png",
          revision: "ed2a0731905adba4c345147bd793f70d",
        },
        {
          url: "/projects/texora/texora-marketplace.png",
          revision: "bb2766fab79c5ad5724f6d95fc3e3071",
        },
        {
          url: "/projects/texora/texora-product.png",
          revision: "67511440c9f2faad00b6b6dc12212617",
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
          revision: "57a6a91b33f834819ee485044cfea3f1",
        },
        {
          url: "/svg/common/grid.svg",
          revision: "e35c653979e3096f7093aa764a43f508",
        },
        {
          url: "/svg/common/hero.svg",
          revision: "6e796d1ea4e696821418e6114ab114b5",
        },
        {
          url: "/svg/common/section.svg",
          revision: "2cd106a53834a0474163d47516a0b8ee",
        },
        {
          url: "/svg/skills/adobe-xd.svg",
          revision: "2599020077fb6fd0e0d1390cb88b734f",
        },
        {
          url: "/svg/skills/adobeaudition.svg",
          revision: "f6d6a8cb589aa2c334a4a0a51b700ffa",
        },
        {
          url: "/svg/skills/after-effects.svg",
          revision: "5ac6b6ec84d9722b662f2053f8dc5bd6",
        },
        {
          url: "/svg/skills/angular.svg",
          revision: "202b90d0e8701fe059e45c7cc1ad6230",
        },
        {
          url: "/svg/skills/aws.svg",
          revision: "bde4ea40a2cccb245e4729676e67a597",
        },
        {
          url: "/svg/skills/azure.svg",
          revision: "e34a90d5fd5dc2c49186b91583d9abf2",
        },
        {
          url: "/svg/skills/blender.svg",
          revision: "e8a0299a69e50a4be9291d4f1c538164",
        },
        {
          url: "/svg/skills/bootstrap.svg",
          revision: "79c2c41680cf98566b3a6dcb55bdbf00",
        },
        {
          url: "/svg/skills/bulma.svg",
          revision: "8f614cad8bfd05324ca6ccdcc599867a",
        },
        {
          url: "/svg/skills/c.svg",
          revision: "14bfb49f9e30f1051af25fdb3fe5f0e2",
        },
        {
          url: "/svg/skills/canva.svg",
          revision: "0397c10ee20d803780d11e2ceee2c0ed",
        },
        {
          url: "/svg/skills/capacitorjs.svg",
          revision: "d07872114b1027b2d3617a74e7a122ff",
        },
        {
          url: "/svg/skills/coffeescript.svg",
          revision: "f951912ac0ebe3acabf518df8fc899f7",
        },
        {
          url: "/svg/skills/cplusplus.svg",
          revision: "18ae83b098cad9d66cb603f83abc34b0",
        },
        {
          url: "/svg/skills/csharp.svg",
          revision: "299c3aa58b1c08d8021caa2bc555f79e",
        },
        {
          url: "/svg/skills/css.svg",
          revision: "f12256ac816604f347d1950948034aa8",
        },
        {
          url: "/svg/skills/dart.svg",
          revision: "9be754f9d6c69a79bef8dcf1ddec0ada",
        },
        {
          url: "/svg/skills/deno.svg",
          revision: "ff256ac71d367e7003e884dbe31b7331",
        },
        {
          url: "/svg/skills/django.svg",
          revision: "711c098d84605eeacdf7ede745b38157",
        },
        {
          url: "/svg/skills/docker.svg",
          revision: "f98f38268d029b1fa260f085c85adda0",
        },
        {
          url: "/svg/skills/fastify.svg",
          revision: "43831f4abc1e54fa237d0aa334e67897",
        },
        {
          url: "/svg/skills/figma.svg",
          revision: "05d3f6848be5ba50cce960abbdc51f05",
        },
        {
          url: "/svg/skills/firebase.svg",
          revision: "0887b85fc9385059d7192893a7c2d932",
        },
        {
          url: "/svg/skills/flutter.svg",
          revision: "80bad728963ac29d01a8768a01846551",
        },
        {
          url: "/svg/skills/gcp.svg",
          revision: "9691a2ffb853021d0dc5516517adddf4",
        },
        {
          url: "/svg/skills/gimp.svg",
          revision: "0cd0bc06bd325eb299dbc244d3ba2e4b",
        },
        {
          url: "/svg/skills/git.svg",
          revision: "feb28c650b0068074d77d3fd1462b3a3",
        },
        {
          url: "/svg/skills/go.svg",
          revision: "22eda6c5b933ded38d6ef779d7e53205",
        },
        {
          url: "/svg/skills/graphql.svg",
          revision: "7d4ee3f328bca46adecd3690648e8ffc",
        },
        {
          url: "/svg/skills/haxe.svg",
          revision: "3211f80a5f294be739159cd943a11480",
        },
        {
          url: "/svg/skills/html.svg",
          revision: "4196766f94def747ba58d82292172697",
        },
        {
          url: "/svg/skills/illustrator.svg",
          revision: "c986f0d411674b714fec2cb7e7430982",
        },
        {
          url: "/svg/skills/ionic.svg",
          revision: "ac7e1d64b359513a8a1860eea7413d55",
        },
        {
          url: "/svg/skills/java.svg",
          revision: "637fe6af336f90a0df96022548000bb5",
        },
        {
          url: "/svg/skills/javascript.svg",
          revision: "0484a8d2d45ffaad2834f59361d206fd",
        },
        {
          url: "/svg/skills/julia.svg",
          revision: "4fd3f3fce433fc835aea5c5436a55c79",
        },
        {
          url: "/svg/skills/kotlin.svg",
          revision: "1078bfd6b28e9707f5553ab97a2e6cf2",
        },
        {
          url: "/svg/skills/lightroom.svg",
          revision: "bd3b8b21822712b404caee0a1966fc33",
        },
        {
          url: "/svg/skills/markdown.svg",
          revision: "d66f22c08d6a74ab7a76f8a255f9791d",
        },
        {
          url: "/svg/skills/materialui.svg",
          revision: "53c8f867defac7bf24e5af56c50520b5",
        },
        {
          url: "/svg/skills/matlab.svg",
          revision: "7c6f889c03d7f0a8a14b728986aae8e5",
        },
        {
          url: "/svg/skills/memsql.svg",
          revision: "a370bd71ea8d72a1ad4da48ca6f606f5",
        },
        {
          url: "/svg/skills/microsoftoffice.svg",
          revision: "b45374f1f6d25d82887a05ffde9d2f3b",
        },
        {
          url: "/svg/skills/mongoDB.svg",
          revision: "85be680745d838b53aa7d48a9097a6e3",
        },
        {
          url: "/svg/skills/mysql.svg",
          revision: "c57e7443428ab067d3545dd02c77e8f1",
        },
        {
          url: "/svg/skills/nextJS.svg",
          revision: "9037feafa6bb03c2fc880a45aba63ea6",
        },
        {
          url: "/svg/skills/nginx.svg",
          revision: "e2b819e37f4c0da693c88bcf7d6da882",
        },
        {
          url: "/svg/skills/numpy.svg",
          revision: "7dda86e679b18029efd280f788143dbb",
        },
        {
          url: "/svg/skills/nuxtJS.svg",
          revision: "d433645968b3e47b2785a3d8dc4dffd3",
        },
        {
          url: "/svg/skills/opencv.svg",
          revision: "6bb8c58e7ae6f2ff833ce75982ecdbcb",
        },
        {
          url: "/svg/skills/photoshop.svg",
          revision: "816abc0ff4461221e6a0232ba76ebeab",
        },
        {
          url: "/svg/skills/php.svg",
          revision: "7cd861ebce35a4b22924629a9616a9f1",
        },
        {
          url: "/svg/skills/picsart.svg",
          revision: "f89fb5fa4eb40a2f47776c0e56aee144",
        },
        {
          url: "/svg/skills/postgresql.svg",
          revision: "0a61cf7ab417e5d57227116dbcee2cfc",
        },
        {
          url: "/svg/skills/premierepro.svg",
          revision: "e35506c55858f0b460460a94331b54f9",
        },
        {
          url: "/svg/skills/python.svg",
          revision: "fbea44889d262c328743da82176aa7d4",
        },
        {
          url: "/svg/skills/pytorch.svg",
          revision: "7eeaeef47160c90e685c39a99494f105",
        },
        {
          url: "/svg/skills/react.svg",
          revision: "a3163ac7fe36281f1b7dc7a2d91a2b8b",
        },
        {
          url: "/svg/skills/ruby.svg",
          revision: "d34e79c5beee3399796e5e5f0243146a",
        },
        {
          url: "/svg/skills/selenium.svg",
          revision: "1b7ce531b73032b35798ba81c7907b52",
        },
        {
          url: "/svg/skills/sketch.svg",
          revision: "1c3ae957f61637c7d1d4a687ea13dab4",
        },
        {
          url: "/svg/skills/sqlite.svg",
          revision: "71479666b13eecb8a516ee8069298476",
        },
        {
          url: "/svg/skills/strapi.svg",
          revision: "a0d8a6a8d7e3458916e9570c6cbe20b0",
        },
        {
          url: "/svg/skills/svelte.svg",
          revision: "ec68607813412c4831b3c3e34ba528f3",
        },
        {
          url: "/svg/skills/swift.svg",
          revision: "19d95e72efbb01654f6bcc80f1fc2396",
        },
        {
          url: "/svg/skills/tailwind.svg",
          revision: "dfa8abaecc34dcf850b3c33621b4834f",
        },
        {
          url: "/svg/skills/tensorflow.svg",
          revision: "76db955f7fbfdcedd66bd798d0a0c30c",
        },
        {
          url: "/svg/skills/typescript.svg",
          revision: "550fbd87250ac6fb68f390ab6ebab834",
        },
        {
          url: "/svg/skills/unity.svg",
          revision: "42c34404a7e4a5fd4998111876f69d90",
        },
        {
          url: "/svg/skills/vitejs.svg",
          revision: "6bf1686c0a8015ddbe30566f9bef7251",
        },
        {
          url: "/svg/skills/vue.svg",
          revision: "87ef18a6a2f103efb1ca52306b5fa189",
        },
        {
          url: "/svg/skills/vuetifyjs.svg",
          revision: "eeec0047f8e4bc071d983728c0067262",
        },
        {
          url: "/svg/skills/webix.svg",
          revision: "a2ea4f7492e69ad1ba6e1fcf902edea8",
        },
        {
          url: "/svg/skills/wolframalpha.svg",
          revision: "33a2e5995a6f91010226fc009cd4fb85",
        },
        {
          url: "/svg/skills/wordpress.svg",
          revision: "f69da95c1adfb46ae4580f3dfea76fe3",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: s } }) =>
        !(!e || s.startsWith("/api/auth/callback") || !s.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        a &&
        !s.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        "1" === e.headers.get("RSC") && a && !s.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: s }) => s && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    ));
});
