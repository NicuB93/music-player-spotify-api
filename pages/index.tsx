import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Sidebar from '@components/Sidebar';
import Center from '@components/Center';
import Player from '@components/Player';

import { getSession, GetSessionParams } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import { isSearchActiveState } from 'atoms/searchAtom';
import Search from '@components/Search';

const Home: NextPage = () => {
  const isSearchActive = useRecoilValue(isSearchActiveState);
  return (
    <div className="">
      <Head>
        <title>Music Player - Spotify API</title>
        <meta name="description" content="Music Player App (Spotify)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />

          {isSearchActive ? <Search /> : <Center />}
        </main>
      </div>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
};
