export const environment = {
  production: true,
  api: 'http://localhost:8083',
  do_login: '/auth/login',
  get_messages: '/app/messages',
  get_transactions: '/app/transactions',
  post_messages: '/app/postMessage',
  post_message_file: '/app/uploadSmsFile',

  phoneNumberRegExp: '^(254)[0-9]{9}$'
};
