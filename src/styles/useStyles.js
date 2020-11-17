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
    // position: 'fixed',
    // bottom: '20px',
    backgroundColor: 'white',
    width: '600px',
    border: '1px solid grey',
    borderBottom: 'none',
    borderRadius: '6px 6px 0 0',
    padding: '0 15px',
  },
  chatInputWrapper: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'white',
    width: '80%',
    paddingBottom: '20px',
    margin: '0 15px',
  },
}));
