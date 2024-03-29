const router = require('express').Router();
const verify = require('../validation/verify-token');
let Asset = require('../models/asset.model');

router.route('/').get(verify, (req, res) => {
  Asset.find()
    .then(assets => res.json(assets))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(verify, (req, res) => {
  //expected fields
  const assetID = req.body.assetid;
  const assetSN = req.body.assetsn;
  const assetVendor = req.body.assetvendor;
  const assetModel = req.body.assetmodel;
  const assetStatus = req.body.assetstatus;
  const assetDep = req.body.assetdep;

  const newAsset = new Asset({
    assetID,
    assetSN,
    assetVendor,
    assetModel,
    assetStatus,
    assetDep,
  });

  newAsset
    .save()
    .then(() => res.json('Asset added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(verify, (req, res) => {
  Asset.findById(req.params.id)
    .then(asset => res.json(asset))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route(':/id').delete(verify, (req, res) => {
  Asset.findOneAndDelete(req.params.id)
    .then(() => res.json('Asset deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(verify, (req, res) => {
  Asset.findById(req.params.id)
    .then(asset => {
      asset.assetID = req.body.assetid;
      asset.assetSN = req.body.assetsn;
      asset.assetVendor = req.body.assetvendor;
      asset.assetModel = req.body.assetmodel;
      asset.assetStatus = req.body.assetstatus;
      asset.assetDep = req.body.assetdep;

      asset
        .save()
        .then(() => res.json('Asset Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id/user').post(verify, (req, res) => {
  Asset.findById(req.params.id)
    .then(asset => {
      asset.assetUser = req.body.assetuser;
      asset
        .save()
        .then(() => res.json('Asset Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
