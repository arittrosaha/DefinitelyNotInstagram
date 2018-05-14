export const updateUser = (user) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/users/${user.id}`,
    processData: false,
    contentType: false,
    data: user
  });
};
