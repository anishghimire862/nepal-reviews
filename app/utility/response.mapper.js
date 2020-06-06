exports.toResponse = function toResponse(data) {
  let response = []
  data.forEach(d => {
    response.push({
      id: d._id,
      user: {
        id: d.user._id
      }
    })
  })
  return response
}