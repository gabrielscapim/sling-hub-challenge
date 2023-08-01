const { createToken } = require('../security/authFunctions');
const { startupService } = require('../services');

const serverErrorMessage = { message: 'Erro interno' };

const getAllStartups = async (_req, res) => {
  try {
    const { status, data } = await startupService.getAllStartups();

    if (status !== 'SUCESSFUL') {
        return res.status(404).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(serverErrorMessage);
  }
};

const getStartupsByName = async (req, res) => {
  try {
    const { q: startupName } = req.query;
    const { status, data } = await startupService.getStartupsByName(startupName);

    if (status !== 'SUCESSFUL') {
        return res.status(404).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(serverErrorMessage);
  }
};

const getStartupsByGoal = async (req, res) => {
  try {
    const { id: goalId } = req.query;
    const { status, data } = await startupService.getStartupsByGoal(goalId);

    if (status !== 'SUCESSFUL') {
        return res.status(404).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(serverErrorMessage);
  }
};

const addStartup = async (req, res) => {
  try {
    const startup = req.body;
    const { status, data } = await startupService.addStartup(startup);

    if (status !== 'SUCESSFUL') {
        return res.status(404).json(data);
    }

    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(serverErrorMessage);
  }
};

const loginAuthentication = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await startupService.getStartupByEmail(email);

    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid fields' });
    }

    const { password: _password, ...userWithoutPassword } = user.dataValues;

    const payload = { data: userWithoutPassword };
    const token = createToken(payload);

    return res.status(200).json({ token });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno' });
  }
};

const editStartup = async (req, res) => {
  try {
    const startup = req.body;
    const { status, data } = await startupService.addStartup(startup);

    if (status !== 'SUCESSFUL') {
        return res.status(404).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(serverErrorMessage);
  }
};

module.exports = {
  getAllStartups,
  getStartupsByName,
  getStartupsByGoal,
  addStartup,
  loginAuthentication,
  editStartup,
};
