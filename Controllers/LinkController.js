import LinkModel from "../Models/LinkModel.js";
const LinkController = {
    getLinks: async (req, res) => {
        try {
            const links = await LinkModel.find();
            res.json({ links });

        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    getById: async (req, res) => {
        try {
            const ipAddress = req.ip;
            const link = await LinkModel.findById(req.params.id);
            if (!link) {
                return res.status(404).json({ message: "Link not found" });
            }
            const id = link.clicks.length + 1;
            const targetParamValue = req.query[link.targetParamName];
            const duplicateClick = link.clicks.some(click => click.ipAddress === ipAddress
                && ((click.targetParamValue != null && click.targetParamValue === targetParamValue)
                    || click.targetParamValue==null));
            if (duplicateClick) {
                return res.redirect(link.originalUrl);;
            }
            link.clicks.push({ id, ipAddress, insertedAt: new Date(), targetParamValue });
            await link.save();
            res.redirect(link.originalUrl);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    getByTarget: async (req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id);
            if (!link) {
                return res.status(404).json({ message: "Link not found" });
            }
            const stats = link.clicks.reduce((acc, click) => {
                const key = click.targetParamValue || 'unknown';
                if (!acc[key]) {
                    acc[key] = 0;
                }
                acc[key]++;
                return acc;
            }, {});
            res.json(stats);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    post: async (req, res) => {
        const { originalUrl, targetParamName, targetValues } = req.body;
        try {
            const existingLink = await LinkModel.findOne({ originalUrl });
            if (existingLink) {
                const fullUrl = `${req.protocol}://${req.get('host')}/links/${existingLink.id}`;
                return res.send(fullUrl);
            }
            const newLink = await LinkModel.create({ originalUrl, targetParamName, targetValues });
            const fullUrl = `${req.protocol}://${req.get('host')}/links/${newLink.id}`;
            res.send(fullUrl);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },


    put: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedLink = await LinkModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.json(updatedLink);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await LinkModel.findByIdAndDelete(id);
            res.json(deleted);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

};

export default LinkController;







