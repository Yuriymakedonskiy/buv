import "./normalize.scss";
import Script from 'next/script';

export const metadata = {
  title: "Разработка сайтов, приложений и ботов | Цифровые продукты под ключ",
  description: "Разрабатываю сайты, мобильные приложения и чат-ботов под ключ. Полный цикл: от идеи до запуска и поддержки",
  keywords: "разработка сайтов, сайты, создание мобильных приложений, приложения, веб-дизайн, анимация, фронтенд, backend, чат-боты, боты, цифровые решения",
  openGraph: {
    title: "Разработка сайтов, приложений и ботов | Цифровые продукты под ключ",
    description: "Разрабатываю сайты, мобильные приложения и чат-ботов под ключ. Полный цикл: от идеи до запуска и поддержки",
    images: ["/buv.jpg"], // обратите внимание: массив, как требует spec
    url: "https://buvbuvbuv.ru",
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body>
        {children}

        <Script
          strategy="afterInteractive"
          src="https://mc.yandex.ru/metrika/tag.js"
        />
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                k.async=1;
                k.src=r;
                a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(99528212, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/99528212" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>

      </body>
    </html>
  );
}
