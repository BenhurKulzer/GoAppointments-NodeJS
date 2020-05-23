import { container } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

import HandlebarsMailerProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProviders';

const providers = {
  handlebars: HandlebarsMailerProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
