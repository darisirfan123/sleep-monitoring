const userService = require("../services/userService");

exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getProfile(userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.updateMainProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name } = req.body;
        const message = await userService.updateMainProfile(userId, name);
        res.status(200).json({ message });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.updateDetailProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { weight, height, age, gender } = req.body;
        const message = await userService.updateDetailProfile(userId, {
            weight,
            height,
            age,
            gender,
        });
        res.status(200).json({ message });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};
