const signupBtn = document.getElementById('login');
signupBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const userEmail = document.getElementById('loginEmail').value;
  const userPassword = document.getElementById('loginPassword').value;

  // const userToken = document.cookie.jwt.token;

  $.ajax({
    url: '/api/v1/auth/signin',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    data: {
      email: userEmail,
      password: userPassword,
      // token: localStorage.getItem('token'),
    },
    success(res) {
      // post details method
      console.log(res);
      const { token } = res;
      sessionStorage.setItem('token', token);
      // console.log(`jossss${localStorage.getItem('token')}`);
    },
  });
  if (sessionStorage.getItem('token') !== undefined) {
    $.ajax({
      url: '/api/v1/products',
      method: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      // credentials: 'include',
      success(res1) {
        document.location = '../products';
      },
    });
  } else {
    document.location = '../auth/signin';
  }
});
