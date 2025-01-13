import "./normalize.scss";
export const metadata = {
  title: "End-to-End Digital Developer | Цифровые продукты полного цикла",
  description: "Разработчик цифровых продуктов полного цикла. Создание и внедрение решений от концепции до поддержки.",
  openGraph: {
    title: "End-to-End Digital Developer | Цифровые продукты полного цикла",
    description: "Предоставляю услуги по разработке и внедрению цифровых решений полного цикла. Обеспечиваю полный процесс — начиная с обсуждения идеи и создания концепции приложения до его реализации и дальнейшей поддержки.",
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}