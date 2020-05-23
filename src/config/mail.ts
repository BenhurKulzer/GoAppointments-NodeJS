interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'benhur@bsksistemas.com.br',
      name: 'Benhur da Rocks',
    },
  },
} as IMailConfig;
