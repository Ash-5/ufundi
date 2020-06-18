$('#add-to-cart').click(() => {
  $.ajax({
    url: 'http://localhost:7000/api/v1/add-to-cart/:prod_id',
    type: 'GET',
    data: {
      product: $('prod_id').val(),
    },
    success(data) {
      alert(`Data: ${data}`);
    },
  });
});
