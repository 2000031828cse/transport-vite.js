import React, { useState } from 'react';
import { Box, Card } from '@mui/material';
import WatchListColumn from './WatchListColumn';

const WatchList = ({ stats }) => {
  const [tabs, setTab] = useState<string | null>('watch_list_columns');

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ pb: 3 }}></Box>
      {tabs === 'watch_list_columns' && <WatchListColumn stats={stats} />}
      {!tabs && (
        <Card sx={{ textAlign: 'center', p: 3 }}>
          {/* <EmptyResultsWrapper src="/static/images/placeholders/illustrations/1.svg" /> */}
        </Card>
      )}
    </>
  );
};

export default WatchList;
