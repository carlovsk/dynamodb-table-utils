import * as sst from '@serverless-stack/resources'

export class LambdaStack extends sst.Stack {
  constructor (scope, id, props) {
    super(scope, id, props)

    const Function = new sst.Function(this, 'lambda', {
      functionName: `${props.stage}-${props.projectName}-main`,
      handler: 'src/lambdas/copy-ddb-table.main',
      permissions: ['dynamodb:*'],
      environment: {
        DEBUG: `${props.projectName}:*`,
        PROJECT_NAME: props.projectName,
        STAGE: props.stage
      }
    })

    this.addOutputs({
      LambdaName: Function.functionName,
      ConsoleUrl: `https://console.aws.amazon.com/lambda/home?region=${props.region}#/functions/${Function.functionName}?tab=testing`
    })
  }
}
