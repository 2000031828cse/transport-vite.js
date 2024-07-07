import { FC, useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import { PassOrderStatus } from 'src/models/pass_request';
import { useStops } from '../Stops/StopsContext';
import { useBusRoutes } from '../Busroutes/BusRoutesContext';
interface ApprovalDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    status: PassOrderStatus,
    route: string,
    stop: string,
    details: string
  ) => void;
}

const useStyles = makeStyles({
  textArea: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '10px',
    resize: 'vertical'
  }
});

const ApprovalDialog: FC<ApprovalDialogProps> = ({ open, onClose, onSave }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [selectedStop, setSelectedStop] = useState<string>('');
  const { stops } = useStops();
  const { getRoutesForStop } = useBusRoutes();
  const [filteredRoutes, setFilteredRoutes] = useState<string[]>([]);

  useEffect(() => {
    if (selectedStop) {
      const routes = getRoutesForStop(selectedStop).map(
        (route) => route.routeName
      );
      setFilteredRoutes(routes);
    }
  }, [selectedStop, getRoutesForStop]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDetails(event.target.value);
  };

  const handleRouteChange = (event: SelectChangeEvent<string>) => {
    setSelectedRoute(event.target.value);
  };

  const handleStopChange = (event: SelectChangeEvent<string>) => {
    setSelectedStop(event.target.value);
  };

  const handleApprove = () => {
    onSave('completed', selectedRoute, selectedStop, details);
  };

  const handleReject = () => {
    onSave('rejected', selectedRoute, selectedStop, details);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Approval Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="approval-details"
          label="Bus Pass ID"
          type="text"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
        />
        <textarea
          className={classes.textArea}
          placeholder="REASON"
          rows={3}
          value={details}
          onChange={handleDetailsChange}
        />
        <Select
          value={selectedStop}
          onChange={handleStopChange}
          displayEmpty
          fullWidth
          style={{ marginTop: '10px' }}
        >
          <MenuItem value="" disabled>
            Select Stop
          </MenuItem>
          {stops.map((stop) => (
            <MenuItem key={stop.name} value={stop.name}>
              {stop.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={selectedRoute}
          onChange={handleRouteChange}
          displayEmpty
          fullWidth
          style={{ marginTop: '10px' }}
        >
          <MenuItem value="" disabled>
            Select Route
          </MenuItem>
          {filteredRoutes.map((route) => (
            <MenuItem key={route} value={route}>
              {route}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleApprove} color="primary">
          Approve
        </Button>
        <Button onClick={handleReject} color="primary">
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApprovalDialog;
