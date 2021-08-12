import React from 'react';
import PageLayout from 'components/PageLayout';
import TicTacToe from 'components/TicTacToe';

const TicTacToePage = () => {
  return (
    <PageLayout title="Tic Tac Toe">
      <TicTacToe />
    </PageLayout>
  );
};

export default TicTacToePage;
