const sleepService = require("../services/sleepService");

exports.createSleepData = async (req, res) => {
    try {
        const result = await sleepService.createSleepData(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.getSleepRecordsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const records = await sleepService.getSleepRecordsByUser(userId);
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.checkSleepDataExists = async (req, res) => {
    try {
        const { user_id, date } = req.params;
        const exists = await sleepService.checkSleepDataExists(user_id, date);
        res.json({ exists });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
