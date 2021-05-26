import React from 'react';
import PageLayout from 'components/PageLayout';
import TwoFactor from 'components/TwoFactor';

const TwoFactorPage = () => {
  return (
    <PageLayout title="Two Factor Code Input">
      <TwoFactor />
    </PageLayout>
  );
};

export default TwoFactorPage;
