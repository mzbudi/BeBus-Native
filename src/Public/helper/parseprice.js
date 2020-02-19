const formatRupiah = (number, prefix) => {
  let number_string = number.toString().replace(/[^,\d]/g, '');
  let split = number_string.split(',');
  let remains = split[0].length % 3;
  let rupiah = split[0].substr(0, remains);
  let thausand = split[0].substr(remains).match(/\d{3}/gi);

  if (thausand) {
    let separator = remains ? '.' : '';
    rupiah += separator + thausand.join('.');
  }

  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
};

export { formatRupiah };
