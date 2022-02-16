export const environment = {
  production: true,
  api: 'http://localhost:8083',
  do_login: '/auth/login',
  get_users: '/app/users',
  get_clients: '/app/clients',
  get_messages: '/app/messages',
  get_transactions: '/app/transactions',
  post_messages: '/app/postMessage',
  post_user: '/app/user',
  post_message_file: '/app/uploadSmsFile',
  get_dashboard: '/app/dashboard',

  phoneNumberRegExp: '^(254)[0-9]{9}$'
};
