function mapTypeId(fields) {
  const { __v, _id, ..._fields } = fields._doc ?? fields;
  return { ..._fields, id: _id };
}

module.exports = mapTypeId;
