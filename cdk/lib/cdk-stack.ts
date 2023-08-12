import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dockerImage = new ecr_assets.DockerImageAsset(this, 'DockerImage', {
      directory: '../',
    });

    const handler = new lambda.DockerImageFunction(this, 'Handler', {
      code: lambda.DockerImageCode.fromEcr(dockerImage.repository),
    });

    const api = new apigateway.RestApi(this, 'Api', {
      restApiName: 'My Service',
      description: 'This service serves a static website',
    });

    const getIntegration = new apigateway.LambdaIntegration(handler);

    api.root.addMethod('GET', getIntegration);
  }
}
