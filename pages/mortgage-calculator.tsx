import React from 'react';
import PageLayout from 'components/PageLayout';
import MortgageCalculator from 'components/MortgageCalculator';

const MortgagePage = () => {
  return (
    <PageLayout title="Mortgage Calculator">
      <MortgageCalculator />
    </PageLayout>
  );
};

export default MortgagePage;
