import { Node_Environments } from '../../shared/enums/environments.enum';

const env = process.env;

export const PORT = env.PORT as string;

export const BASE_URL = env.BASE_URL as string;

export const NODE_ENVIRONMENT: Node_Environments =
  env.NODE_ENV as Node_Environments;
