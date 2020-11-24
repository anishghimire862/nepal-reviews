exports.toGetAllThreadsResponse = function toGetAllThreadsResponse(data) {
  let response = []
  data.forEach(d => {
    response.push({
      id: d._id,
      title: d.title,
      description: d.description,
      category: d.category,
      images: d.images,
      average_rating: d.average_rating,
      created_at: d.created_at,
      user: {
        id: d.user._id,
        username: d.user.username,
        email: d.user.email
      }
    })
  })
  return response
}

exports.toGetOneThreadResponse = function toGetOneThreadResponse(data) {
  let response = {
    id: data._id,
    title: data.title,
    description: data.description,
    category: data.category,
    images: data.images,
    average_rating: data.average_rating,
    created_at: data.created_at,
    user: {
      id: data.user._id,
      username: data.user.username,
      email: data.user.email
    }
  }
  return response
}

exports.threadCreationResponse = function threadCreationResponse(data) {
  let response = {
    id: data._id,
    title: data.title,
    description: data.description,
    category: data.category,
    user_id: data.user_id,
    images: data.images,
    created_at: data.created_at
  }
  return response
}

exports.reviewCreationResponse = function reviewCreationResponse(data) {
  let response = {
    id: data._id,
    description: data.description,
    rating: data.rating,
    images: data.images,
    thread_id: data.thread_id,
    user_id: data.user_id,
    created_at: data.created_at
  }
  return response
}

exports.toGetAllReviewsResponse = function toGetAllReviewsResponse(data) {
  let response = []
  data.forEach(d => {
    response.push({
      id: d._id,
      description: d.description,
      images: d.images,
      rating: d.rating,
      created_at: d.created_at,
      user: {
        id: d.user._id,
        username: d.user.username,
        email: d.user.email
      }
    })
  })
  return response
}

exports.toGetOneReviewResponse = function toGetOneReviewResponse(data) {
   console.log(data) 
   let response = {
    id: data._id,
    description: data.description,
    images: data.images,
    rating: data.rating,
    user_id: data.user_id,
    created_at: data.created_at
  }
  return response
}

exports.replyCreationResponse = function threadCreationResponse(data) {
  let response = {
    id: data._id,
    review_id: data.review_id,
    description: data.description,
    user_id: data.user_id,
    images: data.images,
    created_at: data.created_at
  }
  return response
}

exports.toGetAllReplyResponse = function toGetAllReviewsResponse(data) {
  let response = []
  data.forEach(d => {
    response.push({
      id: d._id,
      description: d.description,
      images: d.images,
      created_at: d.created_at,
      user: {
        id: d.user._id,
        username: d.user.username,
        email: d.user.email
      }
    })
  })
  return response
}