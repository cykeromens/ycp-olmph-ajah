export function generateRandomString(string_length){
  let random_string = '';
  let random_ascii;
  let ascii_low = 65;
  let ascii_high = 90;
  for(let i = 0; i < string_length; i++) {
    random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
    random_string += String.fromCharCode(random_ascii);
  }
  return random_string
}
