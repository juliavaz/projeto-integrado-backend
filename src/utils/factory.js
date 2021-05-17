const QueryFeatures = require('../utils/queryFeatures');

exports.create = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);

    return res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.retrieve = (Model) => async (req, res, next) => {
  try {
    const queryFeatures = new QueryFeatures(Model.find(), req.query).filter().sort().limitFields().paginate();
    const docs = await queryFeatures.query;

    return res.status(200).json({
      status: 'success',
      data: {
        docs,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.retrieveOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);

    return res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.update = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: 'success',
      doc,
    });
  } catch (err) {
    return next(err);
  }
};

exports.delete = (Model) => async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  return res.status(204).json({
    status: 'success',
    data: null,
  });
};
