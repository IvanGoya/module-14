const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId
        })
        res.json(newPost);
    }
    catch(err) {
        res.json(500).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const[affectedRow] = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if(affectedRow >0 ) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const [affectedRow] = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if(affectedRow >0 ) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;