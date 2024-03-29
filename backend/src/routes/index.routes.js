const { Router } = require('express');
const pkg = require('../../package.json');
const userRoutes = require('./user.routes.js');
const messageRoutes = require('./message.routes.js');

const router = Router();

router.get('/', (_req, res) => {
	res.send(`
    <b>Name:</b> ${pkg.name}<br>
    <b>Author:</b> ${pkg.author}<br>
    <b>Version:</b> ${pkg.version}
    `);
});

router.use('/api/v1', userRoutes);
router.use('/api/v1', messageRoutes);

module.exports = router;
