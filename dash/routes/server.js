const router = require('express').Router();
const client = require('../../cybase');

router.get('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/');
  if (!req.session.guilds) return res.redirect('/');
  if (!client.guilds.has(req.query.id)) return res.redirect('/');
  if (!client.guilds.get(req.query.id).members.has(req.session.user.id)) return res.redirect('/');
  
  res.render('server/members', {user: req.session.user, guild: req.query.id, djsclient: client});
});

router.get('/config', async (req, res) => {
    if (!req.session.user) return res.redirect('/');
    if (!req.session.guilds) return res.redirect('/');
    if (!client.guilds.has(req.query.id)) return res.redirect('/');
  
    if (!client.guilds.get(req.query.id).members.get(req.session.user.id).hasPermission('ADMINISTRATOR')) return res.redirect('/guild?id=' + req.query.id);
  
    res.render('server/config', {user: req.session.user, guild: req.query.id, djsclient: client});
});

router.post('/config', async (req, res) => {
  if (!req.session.user) return res.redirect('/');
  if (!req.session.guilds) return res.redirect('/');
  if (!client.guilds.has(req.query.id)) return res.redirect('/');
  if (!client.guilds.get(req.query.id).members.has(req.session.user.id)) return res.redirect('/');
  
  if (!client.guilds.get(req.query.id).members.get(req.session.user.id).hasPermission('ADMINISTRATOR')) return res.redirect('/guild?id=' + req.query.id);
  
  client.settings.set(req.query.id, req.body);
  res.render('server/config', {user: req.session.user, guild: req.query.id, djsclient: client});
});

module.exports = router;
