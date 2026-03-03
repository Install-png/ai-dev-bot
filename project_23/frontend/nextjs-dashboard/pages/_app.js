javascript
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const pageVariants = {
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 200 }
  };

  return (
    <>
      <Head>
        <title>Ситуаційний центр МВС України</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Повнофункціональний, інтерактивний дашборд Ситуаційного центру МВС України" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ type: "tween", duration: 0.3 }}
            className="h-full w-full"
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default MyApp;