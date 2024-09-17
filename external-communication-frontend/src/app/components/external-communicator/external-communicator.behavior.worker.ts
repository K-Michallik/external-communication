/// <reference lib="webworker" />
import {
    ApplicationBehaviors,
    ApplicationNode, OptionalPromise,
    registerApplicationBehavior,
    ScriptBuilder
} from '@universal-robots/contribution-api';
import { ExternalCommunicatorNode } from './external-communicator.node';

// factory is required
const createApplicationNode = (): OptionalPromise<ExternalCommunicatorNode> => ({
    type: 'urcaps-r-us-external-communication-frontend-external-communicator',    // type is required
    version: '1.0.0',     // version is required
    ipAddress: 'host.docker.internal'
});

// generatePreamble is optional
const generatePreambleScriptCode = (node: ExternalCommunicatorNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    return builder;
};

// upgradeNode is optional
const upgradeApplicationNode
  = (loadedNode: ApplicationNode, defaultNode: ExternalCommunicatorNode): ExternalCommunicatorNode =>
      defaultNode;

// downgradeNode is optional
const downgradeApplicationNode
  = (loadedNode: ApplicationNode, defaultNode: ExternalCommunicatorNode): ExternalCommunicatorNode =>
      defaultNode;

const behaviors: ApplicationBehaviors = {
    factory: createApplicationNode,
    generatePreamble: generatePreambleScriptCode,
    upgradeNode: upgradeApplicationNode,
    downgradeNode: downgradeApplicationNode
};

registerApplicationBehavior(behaviors);
