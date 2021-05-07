import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Apex from '../lib/apex-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Apex.ApexStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
