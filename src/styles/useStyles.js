import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'default',
  },
  input: {
    width: '100%',
    margin: '16px 0 0',
  },
  chatInput: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    border: '1px solid grey',
    borderRadius: '6px',
  },
}));
