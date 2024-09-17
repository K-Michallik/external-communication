import { ApplicationNode } from '@universal-robots/contribution-api';

export interface ExternalCommunicatorNode extends ApplicationNode {
  type: string;
  version: string;
  ipAddress: string;
}
