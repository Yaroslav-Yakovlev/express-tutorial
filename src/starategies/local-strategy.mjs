import passport from 'passport';
import Strategy from 'passport-local';
import { mockUsers } from '../utils/data.js';

passport.serializeUser((user, done) => {
  console.log('inside serializeUser');
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser id:', id);
  try {
    const findUser = mockUsers.find(user => user.id === id);
    if (!findUser) return done(null, false, { message: 'User not found' });
  } catch (err) {
    done(err, null);
  }

});
const localStrategy = passport.use(
  new Strategy((username, password, done) => {
    console.log(username);
    console.log(password);
    const findUser = mockUsers.find(user => user.username === username);
    if (!findUser) {
      return done(null, false, { message: 'User not found' });
    }
    if (findUser.password !== password) {
      return done(null, false, { message: 'Invalid Credentials' });
    }

    return done(null, findUser);
  }),
);

localStrategy.name = 'local';

export default localStrategy;
