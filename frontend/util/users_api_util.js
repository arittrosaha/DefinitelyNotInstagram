export const updateCurrentUser = (user) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: {user}
  });
};

export const updateCurrentUserAvatar = (user) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    processData: false,
    contentType: false,
    data: user
  });
};

export const fetchUser = (userId) => {
  return $.ajax({
    method: 'GET',
    url:`/api/users/${userId}`,
  });
};
