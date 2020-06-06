const transform = (data) => {
  let transformedData;
  return new Promise((resolve, reject) => {
    if(data.length) {
      transformedData = data.map(function(item) {
        let document = item
        let id = item._id;
        deleteFields(item)
        if(item.user) {
          let transformedUser = data.user
          let userId = item.user._id
          deleteFields(item.user)
        }
        return {id: id, ...document}
      })      
    } else {
      let document = data._doc;
      let id = data._id;
      deleteFields(data)
      transformedData = {id: id, ...document}
    }
    resolve(transformedData)
  })
}
function deleteFields (data) {
  // delete data._doc._id;
  // delete data._doc.__v;
  delete data._id
  if(data.__v)
    delete data.__v
}
exports.transform = transform
