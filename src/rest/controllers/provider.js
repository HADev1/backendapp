const providerService = require("../../common/services/provider-detail");

async function getProviderList(req, res) {
  const providers = await providerService.findProvider(req.user.id);
  res.send({providers});
}

module.exports = {getProviderList};