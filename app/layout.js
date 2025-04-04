import "./normalize.scss";
export const metadata = {
  title: "Разработка сайтов и приложений | Цифровые продукты под ключ",
  description: "Разрабатываю сайты, мобильные приложения и чат-ботов под ключ. Полный цикл: от идеи до запуска и поддержки",
  keywords: "разработка сайтов, создание мобильных приложений, веб-дизайн, фронтенд, backend, чат-боты, цифровые решения",
  openGraph: {
    title: "Разработка сайтов и приложений | Цифровые продукты под ключ",
    description: "Разрабатываю сайты, мобильные приложения и чат-ботов под ключ. Полный цикл: от идеи до запуска и поддержки",
    image: "/buv.jpg", // Укажите путь к изображению для OG
    url: "https://buvbuvbuv.ru", // Укажите ваш URL
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords}/>
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <title>{metadata.title}</title>

        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){
                  (m[i].a=m[i].a||[]).push(arguments)
                };
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
            <img
              src="https://mc.yandex.ru/watch/99528212"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        {/* /Yandex.Metrika */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
