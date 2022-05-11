import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
import { login } from '../actions/auth';

import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import JournalRouter from './JournalRouter';
import { startLoadingNotes } from '../actions/notes';
import Loading from '../components/loading/Loading';

const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAuth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        dispatch(login(currentUser.uid, currentUser.displayName));
        dispatch(startLoadingNotes(currentUser.uid));

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking]);

  if (checking) {
    return <Loading />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth">
            <PublicRoute isLoggedIn={isLoggedIn}>
              <AuthRouter />
            </PublicRoute>
          </Route>

          <Route exact path="/">
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <JournalRouter />
            </PrivateRoute>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
