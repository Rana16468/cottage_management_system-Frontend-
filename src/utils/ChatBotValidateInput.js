const ChatBotValidateInput = (input) => {
  const textNumberRegex = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "zero",
  ];

  // Check for phone numbers
  const phoneNumberRegex = /^(017|018|019|013|016|018)[0-9]{8}$/;
  if (phoneNumberRegex.test(input)) {
    return false; // Phone number detected
  }

  // text number
  const lowercaseInput = input.toLowerCase();
  if (textNumberRegex.some((word) => lowercaseInput.includes(word))) {
    return false;
  }

  // Check for email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(input)) {
    return false; // Email address detected
  }

  // Check for forbidden characters
  const forbiddenChars = /[,#@!1234567890]/;
  if (forbiddenChars.test(input)) {
    return false; // Forbidden characters detected
  }

  return true; // Input is valid
};

export default ChatBotValidateInput;
