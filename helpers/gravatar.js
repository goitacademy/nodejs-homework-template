import gravatar from 'gravatar';

export const generateAvatarFromEmail = async (email) => {
  return await gravatar.url(email, {
    protocol: 'https',
    s: '100',
    r: 'pg',
    d: 'retro',
  });
};
