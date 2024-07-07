import passport from 'passport';
import Strategy from 'passport-local';
import { User } from '../mongoose/schemas/user.mjs';

passport.serializeUser((user, done) => {
  console.log('inside serializeUser');
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('deserializeUser id:', id);
  try {
    const findUser = await User.findById(id);
    if (!findUser) return done(null, false, { message: 'User not found' });
  } catch (err) {
    done(err, null);
  }

});
const localStrategy = passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error('User not found');
      if (findUser.password !== password) throw new Error('Bad Credentials');
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  }),
);

localStrategy.name = 'local';

export default localStrategy;
