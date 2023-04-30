const accountsModel = require("./accounts-model");
const yup = require("yup");
const accountScheme = yup.object().shape({
  name: yup
    .string()
    .min(3, "name of account must be between 3 and 100")
    .max(100, "name of account must be between 3 and 100")
    .required("name and budget are required"),
  budged: yup
    .number("budget of account must be a number")
    .min(0, "budget of account is too large or too small")
    .max(1000000, "budget of account is too large or too small")
    .required("name and budget are required"),
});

exports.checkAccountPayload = async (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  try {
    const { name, budget } = req.body;
    if (name === undefined || budget === undefined) {
      res.status(400).json({ message: "name and budget are required" });
    } else {
      req.body.name = req.body.name.trim();
      await accountScheme.validate(req.body);
      next();
    }
    /* if (!name || !budget) {
      res.status(400).json({ message: "name and budget are required" });
    } else {
      next();
    }  */
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    if (req.body && req.body.name) {
      req.body.name = req.body.name.trim();
    }
    await accountScheme.validate(req.body);

    const isExistWithName = await accountsModel.getByName(req.body.name);
    if (isExistWithName) {
      res.status(400).json({ message: "this name is taken" });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkAccountId = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let isExist = await accountsModel.getById(req.params.id);
    if (!isExist) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.Account = isExist;
    }
  } catch (error) {
    next(error);
  }
};
