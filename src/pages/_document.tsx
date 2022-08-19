import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <>
          <title>Quiz App</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <meta name="theme-color" content="#5865F2" />
          <meta name="title" content="Quiz App" />
          <meta
            name="description"
            content="Quiz app is an application created to test your knowledge!"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Quiz App" />
          <meta
            property="og:description"
            content="Quiz app is an application created to test your knowledge!"
          />
        </>
        <noscript>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "#2b2d31",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: "26px",
                fontFamily:
                  "system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,sans-serif",
              }}
            >
              You need to enable Javascript on your browser to use quiz app!
            </span>
          </div>
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
