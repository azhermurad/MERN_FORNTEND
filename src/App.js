import React, { useContext, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import MainHeader from './Share/Components/Navigation/MainHeader';
// import Users from './Users/Pages';
// import NewPlace from './Places/Pages';
// import UpdatePlace from './Places/Pages/UpdatePlace';
// import UserPlaces from './Places/Pages/userPlaces';
import Auth from './Users/Pages/Auth';
import { Cotext } from './Context/auth';
import classes from './App.module.css';
import Loader from './Share/Components/UIElements/Loader';

// lazy loading  
const Users = React.lazy(()=> import('./Users/Pages'));
const UpdatePlace = React.lazy(()=> import('./Places/Pages/UpdatePlace'));
const NewPlace = React.lazy(()=> import('./Places/Pages'));
const UserPlaces = React.lazy(()=> import('./Places/Pages/userPlaces'));

const App = () => {
  const auth = useContext(Cotext);
  let route;
  if (auth.isLoggedIn) {
    route = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact >
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace/>
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact >
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
      <Router >
        <MainHeader />
        <Suspense fallback={<Loader/>}>
          <main className={classes.main__container}>
          {route}
          </main>
        </Suspense>
      </Router>
  );
};

export default App;
