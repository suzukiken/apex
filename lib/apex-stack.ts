import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as route53 from '@aws-cdk/aws-route53';
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as targets from "@aws-cdk/aws-route53-targets/lib";
import * as ssm from "@aws-cdk/aws-ssm";

export class ApexStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const domain = this.node.tryGetContext('domain')
   
    const bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: domain,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      /*
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.HEAD,
            s3.HttpMethods.GET,
          ],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
      */
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName: domain,
    })
    
    const record = new route53.ARecord(this, "Record", {
      target: route53.RecordTarget.fromAlias(
        new targets.BucketWebsiteTarget(bucket)
      ),
      zone: zone,
    })
  }
}
