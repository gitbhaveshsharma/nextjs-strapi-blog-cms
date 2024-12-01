import '../styles/globals.css'; // Import global styles
import Head from 'next/head'; // Import Head for meta tags

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="description" content="Welcome to the Blog" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>My Blog</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
