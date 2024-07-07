import { MouseEvent, useState } from 'react';
import {
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  Typography,
  styled
} from '@mui/material';
import ViewWeekTwoToneIcon from '@mui/icons-material/ViewWeekTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import WatchListColumn from './WatchListColumn';

const EmptyResultsWrapper = styled('img')(
  ({ theme }) => `
      max-width: 100%;
      width: ${theme.spacing(66)};
      height: ${theme.spacing(34)};
`
);

function WatchList() {
  const [tabs, setTab] = useState<string | null>('watch_list_columns');

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      ></Box>

      {tabs === 'watch_list_columns' && <WatchListColumn />}

      {!tabs && (
        <Card
          sx={{
            textAlign: 'center',
            p: 3
          }}
        >
          {/* <EmptyResultsWrapper src="/static/images/placeholders/illustrations/1.svg" /> */}
        </Card>
      )}
    </>
  );
}

export default WatchList;
