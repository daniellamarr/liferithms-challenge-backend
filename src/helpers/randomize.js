const shuffleString = string => {
  const a = string.split(""),
    n = a.length;

  for(var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

const randomize = (string, noOfCharacters) => {
  const letters = string || 'abcdefghijklmnopqrstuvwxyz1234567890';
  const number = noOfCharacters || 8;
  const characters = shuffleString(letters.replace(/[^A-Z0-9]/ig, ""));
  const random = characters.substring(0, number);

  return random;
}

export default randomize;
